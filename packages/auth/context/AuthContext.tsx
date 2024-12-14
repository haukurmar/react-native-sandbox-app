import { createContext, useContext, useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { AuthRequest, exchangeCodeAsync, ResponseType } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { AuthConfig } from '../config';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // Load tokens from secure storage on startup
    const loadTokens = async () => {
      const storedAccessToken = await SecureStore.getItemAsync('accessToken');
      const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    };

    loadTokens();
  }, []);

  const discovery = {
    authorizationEndpoint: `${AuthConfig.authority}/connect/authorize`,
    tokenEndpoint: AuthConfig.tokenEndpoint,
  };

  const login = async () => {
    try {
      console.log('Starting login process...');
      const request = new AuthRequest({
        clientId: AuthConfig.clientId,
        scopes: [...AuthConfig.scopes],
        redirectUri: AuthConfig.redirectUri,
        usePKCE: true,
        responseType: ResponseType.Code
      });

      console.log('Auth request created, opening browser...');
      const result = await request.promptAsync(discovery);
      console.log('Auth result:', JSON.stringify(result, null, 2));

      if (result.type === 'success' && result.params.code) {
        console.log('Received auth code, exchanging for tokens...');
        // Exchange code for tokens
        const tokenResponse = await exchangeCodeAsync({
          clientId: AuthConfig.clientId,
          code: result.params.code,
          redirectUri: AuthConfig.redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier,
          }
        }, discovery);

        console.log('Token response:', JSON.stringify({
          accessToken: tokenResponse.accessToken.substring(0, 20) + '...',
          tokenType: tokenResponse.tokenType,
          expiresIn: tokenResponse.expiresIn,
          refreshToken: tokenResponse.refreshToken ? '(present)' : '(not present)',
          scope: tokenResponse.scope,
        }, null, 2));

        // Store tokens securely
        await SecureStore.setItemAsync('accessToken', tokenResponse.accessToken);
        if (tokenResponse.refreshToken) {
          await SecureStore.setItemAsync('refreshToken', tokenResponse.refreshToken);
        }

        setAccessToken(tokenResponse.accessToken);
        setRefreshToken(tokenResponse.refreshToken || null);
        console.log('Login process completed successfully!');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      // Clear tokens from secure storage
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      
      setAccessToken(null);
      setRefreshToken(null);

      // Redirect to end session endpoint
      await WebBrowser.openAuthSessionAsync(
        `${AuthConfig.endSessionEndpoint}?post_logout_redirect_uri=${AuthConfig.postLogoutRedirectUri}`,
        AuthConfig.postLogoutRedirectUri
      );
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        login,
        logout,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
