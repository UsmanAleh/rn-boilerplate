/**
 * Web3Auth context provider for managing Web3Auth state.
 *
 * This module provides a context provider for managing the state of the Web3Auth
 * client. It also provides a hook for connecting to the Web3Auth client and
 * retrieving the user's wallet and provider.
 *
 * @module web3auth
 */
import { Maybe, UserInfo } from '@web3auth/base';
import { getInjectedAdapters } from '@web3auth/default-evm-adapter';
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal';
import { ethers } from 'ethers';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import '@/constants/Auth.constants';

import { AuthOptions } from '@/constants/Auth.constants';
import AppLogger from '@/helpers/AppLogger';

/**
 * Context to hold Web3Auth state and actions
 *
 * The Web3Auth state is managed by this context, which is used to store and
 * update the user's information and wallet. The context also provides actions
 * to connect and disconnect the user from the Web3Auth client.
 */
const Web3AuthContext = createContext({
  address: '' as string,
  connected: false as boolean,
  wallet: null as Maybe<ethers.Wallet>,
  user: undefined as Maybe<Partial<UserInfo>>,
  provider: null as Maybe<ethers.JsonRpcProvider>,
  connect: async () => {},
  disconnect: async () => {},
});

/**
 * Initialize Web3Auth client and configure injected adapters
 *
 * The Web3Auth client is initialized with the options from
 * `@/constants/Auth.constants`. The injected adapters are also configured
 * during initialization.
 */
const client = new Web3Auth(AuthOptions);
getInjectedAdapters({ options: AuthOptions }).forEach((adapter) =>
  client.configureAdapter(adapter),
);

/**
 * Provider component to manage and provide Web3Auth state
 * @param {PropsWithChildren} children - Component's children
 * @returns {JSX.Element} Provider component
 */
export const Web3AuthProvider = ({ children }: PropsWithChildren) => {
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState<Maybe<ethers.Wallet>>(null);
  const [provider, setProvider] = useState<Maybe<ethers.JsonRpcProvider>>(null);
  const [user, setUser] = useState<Maybe<Partial<UserInfo>>>(null);

  /**
   * The `useEffect` hook is used to initialize the Web3Auth client and set up
   * the connection handler. This effect is run once when the component is
   * mounted.
   */
  useEffect(() => {
    const initialize = async () => {
      try {
        await client.initModal();

        connectHandler();
      } catch (e: any) {
        AppLogger.error(
          'Failed to initialize Auth Client.',
          'Reason: ' + e?.message,
        );
      }
    };

    initialize();
  }, []);

  /**
   * Connect to the Web3Auth client
   */
  const connect = async () => {
    try {
      await client.connect();
      connectHandler();
    } catch (e: any) {
      AppLogger.error(
        'Auth Client failed to initiate connection.',
        'Reason: ' + e?.message,
      );
    }
  };

  /**
   * Handle post-connection setup and state update
   *
   * After connecting to the Web3Auth client, this function is called to setup
   * the user's wallet and provider.
   */
  const connectHandler = async () => {
    try {
      if (!client.connected || !client.provider) {
        return AppLogger.info('Auth Client not connected.');
      }

      const privateKey: Maybe<string> = await client.provider.request({
        method: 'eth_private_key',
      });

      if (!privateKey) {
        AppLogger.error('No private key available');
        return;
      }

      const baseProvider = new ethers.JsonRpcProvider(
        AuthOptions.chainConfig?.rpcTarget,
      );

      const wallet = new ethers.Wallet(privateKey, baseProvider);
      const userInfo = await client.getUserInfo();

      setUser(userInfo);
      setWallet(wallet);
      setAddress(wallet.address);
      setProvider(baseProvider);
      setConnected(client.connected);

      AppLogger.debug('User connected', {
        user: userInfo,
        wallet: wallet,
      });
    } catch (e: any) {
      clearState();
      AppLogger.error(
        'Auth Client failed to setup wallet.',
        'Reason: ' + e?.message,
      );
    }
  };

  /**
   * Disconnect from the Web3Auth client and clear state
   *
   * Disconnects the user from the Web3Auth client and clears the user's state.
   */
  const disconnect = async () => {
    try {
      await client.logout();
      clearState();
      AppLogger.debug('User disconnected');
    } catch (e: any) {
      AppLogger.error(
        'An error occurred when trying to log out.',
        'Reason: ' + e?.message,
      );
    }
  };

  /**
   * Clear the Web3Auth-related state
   *
   * Clears the user's state, such as the user's wallet and provider.
   */
  const clearState = () => {
    setProvider(null);
    setUser(null);
    setConnected(false);
    setWallet(null);
    setAddress('');
  };

  return (
    <Web3AuthContext.Provider
      value={{
        user,
        wallet,
        address,
        provider,
        connected,
        connect,
        disconnect,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

/**
 * Custom hook to use Web3Auth context
 * @returns {object} Web3Auth context values
 */
export const useWallet = () => useContext(Web3AuthContext);
