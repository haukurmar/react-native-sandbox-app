import {
  AUTH_AUTHORITY,
  AUTH_CLIENT_ID,
  AUTH_REDIRECT_URI,
  AUTH_POST_LOGOUT_REDIRECT_URI,
  AUTH_DISCOVERY_URL,
  AUTH_TOKEN_ENDPOINT,
  AUTH_END_SESSION_ENDPOINT,
  AUTH_SCOPES,
} from '@env';

export const AuthConfig = {
  // Client configuration
  clientId: AUTH_CLIENT_ID,
  redirectUri: AUTH_REDIRECT_URI,
  postLogoutRedirectUri: AUTH_POST_LOGOUT_REDIRECT_URI,

  // Identity Server endpoints
  authority: AUTH_AUTHORITY,
  discoveryUrl: AUTH_DISCOVERY_URL,
  endSessionEndpoint: AUTH_END_SESSION_ENDPOINT,
  tokenEndpoint: AUTH_TOKEN_ENDPOINT,

  // Scopes you want to request
  scopes: AUTH_SCOPES.split(' '),
} as const;
