import {
  DevChainConfig,
  DevChainID,
} from '@/constants/chains/development.constants';
import {
  ProdChainConfig,
  ProdChainID,
} from '@/constants/chains/production.constants';
import {
  StagChainConfig,
  StagChainID,
} from '@/constants/chains/staging.constants';
import { IContracts } from '@/enums/Contracts.enum';

/**
 * The type of an Ethereum address.
 */
export type IAddress = `0x${string}`;

/**
 * The type of a chain ID. This is a union of all possible chain IDs,
 * which are defined in the development, staging, and production constants.
 */
export type IChainID = DevChainID | StagChainID | ProdChainID;

/**
 * A mapping of contract names to addresses.
 */
type ContractList = Record<IContracts, IAddress>;

/**
 * The configuration for a single chain.
 */
export interface IChainConfig {
  readonly name: string;
  readonly contract: ContractList;
  readonly metadata: {
    readonly symbol: string;
    readonly chainId: string | number;
    readonly rpcUrl: string;
    readonly explorerUrl: string;
  };
}

/**
 * A mapping of chain IDs to their configurations.
 *
 * @template ChainID The type of the chain ID.
 */
export type ConfigListByChainID<ChainID extends number> = Record<
  ChainID,
  IChainConfig | undefined
>;

/**
 * A mapping of chain IDs to their contract lists.
 *
 * @template ChainID The type of the chain ID.
 */
export type ContractListByChainID<ChainID extends number> = Record<
  ChainID,
  ContractList
>;

/**
 * Type representing the combined configuration of all environments.
 *
 * @type {typeof DevChainConfig & typeof StagChainConfig & typeof ProdChainConfig}
 */
export type CombinedChainConfig = typeof DevChainConfig &
  typeof StagChainConfig &
  typeof ProdChainConfig;
