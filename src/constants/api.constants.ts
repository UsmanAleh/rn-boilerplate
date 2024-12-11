/**
 * Enum for API endpoint keys.
 * @enum {string}
 */
export enum ApiEndpointKeys {
  BASE_URL = 'BASE_URL',
  IPNS_APP_CONFIG = 'IPNS_APP_CONFIG',
  CUSTOM = 'CUSTOM',
}

/**
 * Object containing common API endpoints.
 */
export const ApiEndpoints = {
  [ApiEndpointKeys.BASE_URL]: process.env.API_URL || '',
  [ApiEndpointKeys.IPNS_APP_CONFIG]: '',
};
