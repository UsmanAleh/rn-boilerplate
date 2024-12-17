import { HTTPError } from 'ky';

import { GraphNodeKeys, GraphNodes } from '@/constants/graph.constants';
import AppLogger from '@/helpers/AppLogger';
import CustomError from '@/helpers/CustomError';
import { ApiClient } from '@/services/Api/ApiClient';

/**
 * GraphClient provides methods to interact with a GraphQL API.
 */
export class GraphClient {
  private readonly client: ApiClient | null;

  /**
   * Initializes an instance of GraphClient.
   * @param endpointKeyOrUrl - The key to determine the API endpoint, or a custom URL.
   * @throws Will throw an error if the key is not found or provided.
   */
  constructor(endpointKeyOrUrl?: GraphNodeKeys | string) {
    const resolvedUrl = this.resolveUrl(endpointKeyOrUrl);

    if (!resolvedUrl) {
      throw new CustomError('URL not found or provided.');
    }

    // Initialize the ApiClient with the resolved URL
    this.client = new ApiClient(resolvedUrl);
  }

  /**
   * Resolves the URL based on the provided key or URL.
   * @param endpointKeyOrUrl - The key to determine the API endpoint, or a custom URL.
   * @returns The resolved URL.
   * @throws Will throw an error if the argument is invalid.
   */
  private resolveUrl(
    endpointKeyOrUrl?: GraphNodeKeys | string,
  ): string | undefined {
    if (!endpointKeyOrUrl) {
      return GraphNodes[GraphNodeKeys.BASE_URL];
    }

    if (
      Object.values(GraphNodeKeys).includes(endpointKeyOrUrl as GraphNodeKeys)
    ) {
      return GraphNodes[endpointKeyOrUrl as GraphNodeKeys];
    }

    if (typeof endpointKeyOrUrl === 'string') {
      return endpointKeyOrUrl;
    }

    throw new CustomError(
      'Invalid argument: must provide either a GraphNodeKey or a URL.',
    );
  }

  /**
   * Performs a GraphQL query.
   * @param graphqlQuery - The GraphQL query to execute.
   * @param queryVariables - The variables to pass to the query.
   * @returns A promise resolving to the result of the query, or undefined if it fails.
   * @throws Will throw an error if the query fails.
   */
  async query<T>(
    graphqlQuery: string,
    queryVariables: Record<string, unknown> = {},
  ): Promise<T | undefined> {
    if (!this.client) {
      throw new CustomError('GraphClient is not initialized.');
    }

    if (!graphqlQuery) {
      throw new CustomError('Query must be provided');
    }

    try {
      // Execute the GraphQL query using the ApiClient
      const response: any = await this.client.graphQuery({
        query: graphqlQuery,
        variables: queryVariables,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    } catch (error: any) {
      if (error instanceof HTTPError) {
        const errorResponse = await error.response?.json();
        if (!errorResponse) {
          throw new CustomError('Failed to parse error response');
        }
        throw this.createApiError(errorResponse);
      }
      throw this.createApiError(error);
    }
  }

  /**
   * Creates and logs an API error.
   * @param errorDetail - The error to process.
   * @returns An Error object with the error message.
   */
  private createApiError(errorDetail: any): CustomError {
    if (errorDetail instanceof Error) {
      AppLogger.error('GraphQL Request Error', errorDetail);
    } else {
      AppLogger.error(
        'GraphQL Request Error, An unknown error occurred:',
        errorDetail,
      );
    }
    return new CustomError(errorDetail?.message ?? 'Unknown error occurred');
  }
}
