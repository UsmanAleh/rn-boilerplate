/**
 * @description
 * Enum for GraphQL node keys.
 *
 * @enum {string}
 */
export enum GraphNodeKeys {
  BASE_URL = 'BASE_URL',
  // Add more endpoint keys here as needed
}

/**
 * An object containing common GraphQL node endpoints.
 *
 * @remarks
 * These endpoints are used by the `GraphClient` to make requests to the GraphQL API.
 * The endpoints are defined as environment variables, and their values are retrieved
 * from the `process.env` object.
 *
 * @type {Record<GraphNodeKeys, string>}
 *
 * @example
 * import { GraphNodes } from '@/constants/graph.constants';
 *
 * const graphClient = new GraphClient(GraphNodes.BASE_URL);
 */
export const GraphNodes: Record<GraphNodeKeys, string> = {
  [GraphNodeKeys.BASE_URL]: process.env.GRAPH_NODE_URL || '',
  // Add more endpoints here as needed
};
