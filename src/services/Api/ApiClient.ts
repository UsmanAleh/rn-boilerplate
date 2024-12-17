import ky, { HTTPError, Input, KyInstance, Options } from 'ky';

import { ApiEndpointKeys, ApiEndpoints } from '@/constants/api.constants';
import AppLogger from '@/helpers/AppLogger';
import CustomError from '@/helpers/CustomError';

/**
 * ApiClient provides methods to interact with a REST API.
 */
export class ApiClient {
  private readonly client: KyInstance | null;

  /**
   * Initializes an instance of ApiClient.
   * @param keyOrUrl - The key to determine the API endpoint, or a custom URL.
   */
  constructor(keyOrUrl?: ApiEndpointKeys | string) {
    const resolvedUrl = this.resolveUrl(keyOrUrl);

    if (!resolvedUrl) {
      throw new CustomError('URL not found or provided.');
    }

    this.client = ky.extend({
      headers: {
        Accept: 'application/json',
      },
      prefixUrl: resolvedUrl,
    });
  }

  /**
   * Resolves the URL based on the provided key or URL.
   * @param keyOrUrl - The key to determine the API endpoint, or a custom URL.
   * @returns The resolved URL.
   * @throws Will throw an error if the argument is invalid.
   */
  private resolveUrl(keyOrUrl?: ApiEndpointKeys | string): string | undefined {
    if (!keyOrUrl) {
      return ApiEndpoints[ApiEndpointKeys.BASE_URL];
    }

    if (Object.values(ApiEndpointKeys).includes(keyOrUrl as ApiEndpointKeys)) {
      return ApiEndpoints[keyOrUrl as ApiEndpointKeys];
    }

    if (typeof keyOrUrl === 'string') {
      return keyOrUrl;
    }

    throw new CustomError(
      'Invalid argument: must provide either a ApiEndpointKey or a URL.',
    );
  }

  /**
   * Performs a GET request.
   * @param path - The path added to the prefix url.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async get<T>(path?: Input, options?: Options): Promise<T> {
    if (!this.client) {
      throw new CustomError('ApiClient is not initialized.');
    }

    try {
      const response = await this.client.get(path ?? '', options);
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
   * @param path - The path added to the prefix url.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async post<T>(
    path?: Input,
    body: unknown = {},
    options?: Options,
  ): Promise<T> {
    if (!this.client) {
      throw new CustomError('ApiClient is not initialized.');
    }

    try {
      const response = await this.client.post(path ?? '', {
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
   * @param path - The path added to the prefix url.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async put<T>(
    path?: Input,
    body: unknown = {},
    options?: Options,
  ): Promise<T> {
    if (!this.client) {
      throw new CustomError('ApiClient is not initialized.');
    }

    try {
      const response = await this.client.put(path ?? '', {
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
   * @param path - The path added to the prefix url.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async delete<T>(
    path?: Input,
    body: unknown = {},
    options?: Options,
  ): Promise<T> {
    if (!this.client) {
      throw new CustomError('ApiClient is not initialized.');
    }

    try {
      const response = await this.client.delete(path ?? '', {
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
   * @param path - The path added to the prefix url.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   */
  async patch<T>(
    path?: Input,
    body: unknown = {},
    options?: Options,
  ): Promise<T> {
    if (!this.client) {
      throw new CustomError('ApiClient is not initialized.');
    }

    try {
      const response = await this.client.patch(path ?? '', {
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
   * Performs a POST request for the GraphClient.
   * @param body - The request payload.
   * @param options - Optional request options.
   * @returns A promise resolving to the response data.
   * @throws Will throw an error if the request fails.
   *
   * @remarks
   * The GraphClient handles the errors, so this method throws the error
   * as it is.
   */
  async graphQuery<T>(body: unknown = {}, options?: Options): Promise<T> {
    if (!this.client) {
      throw new CustomError('ApiClient is not initialized.');
    }

    try {
      const response = await this.client.post('', {
        json: body,
        ...options,
      });
      if (response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (error: any) {
      throw error;
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
