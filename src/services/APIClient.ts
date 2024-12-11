import ky, { HTTPError, Input, KyInstance, Options } from 'ky';

import { ApiEndpointKeys, ApiEndpoints } from '@/constants/api.constants';
import AppLogger from '@/helpers/AppLogger';
import CustomError from '@/helpers/CustomError';

/**
 * APIClient provides methods to interact with a REST API.
 */
export class APIClient {
  private readonly client: KyInstance;

  /**
   * Initializes an instance of APIClient.
   * @param endpointKey - The key to determine the API endpoint. Defaults to 'BASE_URL'.
   * @param customUrl - A custom URL for the endpoint, required if endpointKey is CUSTOM.
   * @throws Will throw an error if customUrl is not provided when endpointKey is CUSTOM.
   */
  constructor(
    endpointKey: ApiEndpointKeys = ApiEndpointKeys.BASE_URL,
    customUrl?: string,
  ) {
    if (endpointKey === ApiEndpointKeys.CUSTOM && !customUrl) {
      throw createAPIError({
        message: `Custom URL is missing for endpoint type: ${endpointKey}`,
      });
    }

    this.client = ky.extend({
      headers: {
        Accept: 'application/json',
      },
      prefixUrl:
        endpointKey === ApiEndpointKeys.CUSTOM
          ? customUrl
          : ApiEndpoints[endpointKey],
    });
  }

  /**
   * Performs a GET request.
   * @param url - The endpoint URL.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async get<T>(url: Input, options?: Options): Promise<T> {
    try {
      const response = await this.client.get(url, options);
      if (response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (error: any) {
      throw createAPIError(error);
    }
  }

  /**
   * Performs a POST request.
   * @param url - The endpoint URL.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async post<T>(url: Input, body: unknown = {}, options?: Options): Promise<T> {
    try {
      const response = await this.client.post(url, {
        json: body,
        ...options,
      });
      if (response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (error: any) {
      throw createAPIError(error);
    }
  }

  /**
   * Performs a PUT request.
   * @param url - The endpoint URL.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async put<T>(url: Input, body: unknown = {}, options?: Options): Promise<T> {
    try {
      const response = await this.client.put(url, {
        json: body,
        ...options,
      });
      if (response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (error: any) {
      throw createAPIError(error);
    }
  }

  /**
   * Performs a DELETE request.
   * @param url - The endpoint URL.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async delete<T>(
    url: Input,
    body: unknown = {},
    options?: Options,
  ): Promise<T> {
    try {
      const response = await this.client.delete(url, {
        json: body,
        ...options,
      });
      if (response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (error: any) {
      throw createAPIError(error);
    }
  }

  /**
   * Performs a PATCH request.
   * @param url - The endpoint URL.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async patch<T>(
    url: Input,
    body: unknown = {},
    options?: Options,
  ): Promise<T> {
    try {
      const response = await this.client.patch(url, {
        json: body,
        ...options,
      });
      if (response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (error: any) {
      throw createAPIError(error);
    }
  }
}

/**
 * Creates and logs an API error.
 * @param error - The error to process.
 * @returns An Error object with the error message.
 */
const createAPIError = (error: any) => {
  if (error instanceof HTTPError) {
    AppLogger.apiError(
      error.request.method,
      error.request.url,
      error.response.status,
      error.message,
    );
  } else {
    AppLogger.error(error);
  }
  return new CustomError(error.message ?? error);
};
