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
  ArbitrumSepolia = 421614,
  Native = ArbitrumSepolia,
}

/**
 * A mapping of chain IDs to their contract addresses.
 *
 * @type {ContractListByChainID<ChainID>}
 */
const Addresses: ContractListByChainID<ChainID> = {
  [ChainID.ArbitrumSepolia]: {
    [IContracts.ERC20]: '0x...', // Replace with actual ERC20 contract address
  },
};

/**
 * A mapping of chain IDs to their configurations.
 *
 * @type {ConfigListByChainID<ChainID>}
 */
const ChainConfig: ConfigListByChainID<ChainID> = {
  [ChainID.ArbitrumSepolia]: {
    name: 'Arbitrum Sepolia',
    contract: Addresses[ChainID.ArbitrumSepolia],
    metadata: {
      symbol: 'ETH',
      chainId: ChainID.ArbitrumSepolia,
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      explorerUrl: 'https://sepolia.arbiscan.io',
    },
  },
};

/**
 * Exports the chain configuration and chain ID for development.
 *
 * @exports
 */
export { ChainConfig as DevChainConfig, ChainID as DevChainID };
