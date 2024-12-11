import { IContracts } from '@/enums/Contracts.enum';
import {
  ConfigListByChainID,
  ContractListByChainID,
} from '@/interfaces/chains.interface';

/**
 * Enumeration of supported chain IDs.
 *
 * @enum {number}
 */
enum ChainID {
  ForkedMainnet = 1,
  Native = ForkedMainnet,
}

/**
 * A mapping of chain IDs to their contract addresses.
 *
 * @type {ContractListByChainID<ChainID>}
 */
const Addresses: ContractListByChainID<ChainID> = {
  [ChainID.ForkedMainnet]: {
    [IContracts.ERC20]: '0x...',
  },
};

/**
 * A mapping of chain IDs to their configurations.
 *
 * @type {ConfigListByChainID<ChainID>}
 */
const ChainConfig: ConfigListByChainID<ChainID> = {
  [ChainID.ForkedMainnet]: {
    name: '',
    contract: Addresses[ChainID.ForkedMainnet],
    metadata: {
      symbol: '',
      chainId: ChainID.ForkedMainnet,
      rpcUrl: '',
      explorerUrl: '',
    },
  },
};

/**
 * Exports the chain configuration and chain ID for staging.
 *
 * @exports
 */
export { ChainConfig as StagChainConfig, ChainID as StagChainID };