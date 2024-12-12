/**
 * @description
 * Enum for API endpoint keys.
 *
 * @enum {string}
 */
export enum ApiEndpointKeys {
  BASE_URL = 'BASE_URL',
  // Add more endpoint keys here as needed
}

/**
 * An object containing common API endpoints.
 *
 * @remarks
 * The API endpoints are used by the `ApiClient` to make requests to the API.
 * The endpoints are defined as environment variables, and the values are
 * retrieved from the `process.env` object.
 *
 * @type {Record<ApiEndpointKeys, string>}
 *
 * @example
 * import { ApiEndpoints } from '@/constants/api.constants';
 *
 * const apiClient = new ApiClient(ApiEndpoints.BASE_URL);
 */
export const ApiEndpoints: Record<ApiEndpointKeys, string> = {
  [ApiEndpointKeys.BASE_URL]: process.env.API_URL || '',
  // Add more endpoints here as needed
};
