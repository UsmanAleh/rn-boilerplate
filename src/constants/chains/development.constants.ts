import { IContracts } from '@/enums/Contracts.enum';
import type {
  ConfigListByChainID,
  ContractListByChainID,
} from '@/interfaces/chains.interface';

/**
 * Enumeration of supported chain IDs.
 *
 * @enum {number}
 */
enum ChainID {
  ArbitrumSepolia = 421_614,
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
    contract: Addresses[ChainID.ArbitrumSepolia],
    metadata: {
      chainId: ChainID.ArbitrumSepolia,
      explorerUrl: 'https://sepolia.arbiscan.io',
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      symbol: 'ETH',
    },
    name: 'Arbitrum Sepolia',
  },
};

/**
 * Exports the chain configuration and chain ID for development.
 *
 * @exports
 */
export { ChainConfig as DevChainConfig, ChainID as DevChainID };
