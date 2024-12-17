import { CHAIN_NAMESPACES } from '@web3auth/base';

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
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      ticker: 'ETH',
      chainId: '0x66eee',
      rpcTarget: 'https://sepolia-rollup.arbitrum.io/rpc',
      tickerName: 'Ethereum',
      displayName: 'Arbitrum Sepolia',
      blockExplorerUrl: 'https://sepolia.arbiscan.io',
      chainNamespace: CHAIN_NAMESPACES.EIP155,
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
