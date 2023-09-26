import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = `${process.env.VUE_APP_PRJ_KEY}`;
const scopes = [`manage_project:${projectKey}`];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.australia-southeast1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: `${process.env.VUE_APP_CLI_ID}`,
    clientSecret: `${process.env.VUE_APP_CLI_SCR}`,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.australia-southeast1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withProjectKey(projectKey)
  // .withLoggerMiddleware() // Include middleware for logging
  .build();

export const ctpAnonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withProjectKey(projectKey)
  // .withLoggerMiddleware() // Include middleware for logging
  .build();
