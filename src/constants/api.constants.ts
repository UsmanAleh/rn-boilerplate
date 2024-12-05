/**
 * Enum for API endpoint keys.
 * @enum {string}
 */
export enum ApiEndpointKeys {
  BASE_URL = 'BASE_URL',
  CUSTOM = 'CUSTOM',
}

/**
 * Object containing the API endpoints.
 */
export const ApiEndpoints = {
  [ApiEndpointKeys.BASE_URL]: process.env.API_URL || '',
};
