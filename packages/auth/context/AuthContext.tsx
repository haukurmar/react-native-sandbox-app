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
    // Clean up any existing auth sessions and load tokens
    const init = async () => {
      try {
        await WebBrowser.coolDownAsync();
      } catch (error) {
        console.log('Error cleaning up initial browser session:', error);
      }

      // Load tokens from secure storage
      const storedAccessToken = await SecureStore.getItemAsync('accessToken');
      const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    };

    init();
  }, []);

  const discovery = {
    authorizationEndpoint: `${AuthConfig.authority}/connect/authorize`,
    tokenEndpoint: AuthConfig.tokenEndpoint,
  };

  const login = async () => {
    try {
      console.log('Starting login process...');
      
      // Clean up any existing browser sessions
      try {
        await WebBrowser.coolDownAsync();
      } catch (error) {
        console.log('Error cooling down browser:', error);
      }

      const request = new AuthRequest({
        clientId: AuthConfig.clientId,
        scopes: [...AuthConfig.scopes],
        redirectUri: AuthConfig.redirectUri,
        usePKCE: true,
        responseType: ResponseType.Code
      });

      console.log('Auth request created with config:', {
        clientId: AuthConfig.clientId,
        redirectUri: AuthConfig.redirectUri,
        scopes: AuthConfig.scopes
      });

      console.log('Opening browser...');
      const result = await request.promptAsync(discovery, {
        showInRecents: true,
        preferEphemeralSession: true
      });
      
      console.log('Browser result:', result);

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

        console.log('Token response received');

        // Store tokens securely
        await SecureStore.setItemAsync('accessToken', tokenResponse.accessToken);
        if (tokenResponse.refreshToken) {
          await SecureStore.setItemAsync('refreshToken', tokenResponse.refreshToken);
        }

        setAccessToken(tokenResponse.accessToken);
        setRefreshToken(tokenResponse.refreshToken || null);
        console.log('Login process completed successfully!');
      } else {
        console.log('Login failed or was cancelled:', result.type);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Try to clean up browser session on error
      try {
        await WebBrowser.coolDownAsync();
      } catch (cleanupError) {
        console.log('Error cleaning up browser:', cleanupError);
      }
    }
  };

  const logout = async () => {
    try {
      // Clear tokens from secure storage first
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      
      setAccessToken(null);
      setRefreshToken(null);

      // Construct logout URL with post_logout_redirect_uri and state
      const returnUrl = encodeURIComponent(AuthConfig.postLogoutRedirectUri);
      const state = encodeURIComponent(Date.now().toString());
      const logoutUrl = `${AuthConfig.endSessionEndpoint}?post_logout_redirect_uri=${returnUrl}&state=${state}`;

      // Open logout URL in browser
      const result = await WebBrowser.openBrowserAsync(logoutUrl);
      console.log('Logout browser result:', result);

      // Clean up browser session
      await WebBrowser.coolDownAsync();
    } catch (error) {
      console.error('Logout error:', error);
      await WebBrowser.coolDownAsync();
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
