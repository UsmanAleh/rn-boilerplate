/**
 * @packageDocumentation
 * This file contains constants and options related to the Web3Auth service.
 */
import { WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3AuthOptions } from '@web3auth/modal';

import { ChainConfig } from './chains';

/**
 * The client ID for the Web3Auth service. If not provided, it will default to an empty string.
 * @type {string}
 */
const WEB3AUTH_CLIENT_ID: string = process.env.WEB3AUTH_CLIENT_ID || '';

/**
 * The private key provider for the Web3Auth service. This is used to encrypt the
 * user's private key and store it securely.
 */
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: ChainConfig.Native.metadata },
});
/**
 * The options for the Web3Auth service. These options are used to initialize the
 * Web3Auth service and set up the private key provider.
 * @type {Web3AuthOptions} AuthOptions
 *
 * The Web3Auth service is used to authenticate the user and
 * provide access to the user's wallet.
 *
 * The options are used in the `Web3AuthProvider` component to initialize the
 * Web3Auth service and set up the private key provider.
 */
export const AuthOptions: Web3AuthOptions = {
  chainConfig: ChainConfig.Native.metadata,
  privateKeyProvider,
  clientId: WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
};
