export const AuthConfig = {
  // Client configuration
  clientId: 'namfus_mobile_app',
  redirectUri: 'io.namfusmobileapp:/callback',
  postLogoutRedirectUri: 'io.namfusmobileapp:/loggedout',

  // Identity Server endpoints
  authority: 'https://identity.namfus.com',
  discoveryUrl: 'https://identity.namfus.com/.well-known/openid-configuration',
  endSessionEndpoint: 'https://identity.namfus.com/connect/endSession',
  tokenEndpoint: 'https://identity.namfus.com/connect/token',

  // Scopes you want to request
  scopes: ['openid', 'profile', 'offline_access'],
} as const;
