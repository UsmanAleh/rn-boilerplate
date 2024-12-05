/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import type { IWeb3Auth } from '@web3auth/react-native-sdk';

// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import Web3Auth, {
  ChainNamespace,
  LOGIN_PROVIDER,
  WEB3AUTH_NETWORK,
} from '@web3auth/react-native-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as WebBrowser from 'react-native-webview';

global.Buffer = global.Buffer || Buffer;

interface UserInfo {
  [key: string]: unknown;
  email?: string;
  name?: string;
  privateKey?: string;
  profileImage?: string;
}

interface UseWeb3AuthResult {
  error: Error | null;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (provider: any) => Promise<null | UserInfo>;
  logout: () => Promise<void>;
  userInfo: null | UserInfo;
  web3auth: IWeb3Auth | null;
}

const scheme = 'web3authrnexample'; // Or your desired app redirection scheme
// IMP START - Whitelist bundle ID
const redirectUrl = `${scheme}://openlogin`;
// IMP END - Whitelist bundle ID

// IMP START - Dashboard Registration
const clientId =
  'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ'; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - SDK Initialization
const chainConfig = {
  chainId: '0xaa36a7',
  chainNamespace: ChainNamespace.EIP155,
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  blockExplorerUrl: 'https://sepolia.etherscan.io',
  decimals: 18,
  displayName: 'Ethereum Sepolia Testnet',
  logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  ticker: 'ETH',
  tickerName: 'Ethereum',
};

const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

/**
 * Custom Hook for Web3Auth
 */
const useWeb3Auth = (
  clientId: string,
  network: 'mainnet' | 'testnet' = 'testnet',
): UseWeb3AuthResult => {
  const [web3auth1, setWeb3Auth] = useState<IWeb3Auth | null>(null);
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const web3auth = useMemo(() => {
    // @ts-ignore
    return new Web3Auth(WebBrowser, EncryptedStorage, {
      clientId,
      // IMP START - Whitelist bundle ID
      redirectUrl,
      // IMP END - Whitelist bundle ID
      network: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // or other networks
    });
  }, [clientId]);

  const initializeWeb3Auth = useCallback(async () => {
    console.log('initializeWeb3Auth CALLED');
    try {
      // IMP START - SDK Initialization
      await web3auth.init();
      // @ts-ignore

      if (web3auth.privKey) {
        // @ts-ignore

        await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
        // IMP END - SDK Initialization
        // @ts-ignore

        setProvider(ethereumPrivateKeyProvider);
        setLoggedIn(true);
      }

      setWeb3Auth(web3auth);
      console.log('Web3Auth Initialized');
    } catch (error_) {
      console.error('Error initializing Web3Auth:', error_);
      setError(error_ as Error);
    } finally {
      setLoading(false);
    }
  }, [web3auth]);

  useEffect(() => {
    initializeWeb3Auth();
  }, [clientId, initializeWeb3Auth, network]);

  const login = async (
    provider = LOGIN_PROVIDER.GOOGLE,
  ): Promise<null | UserInfo> => {
    if (!web3auth) {
      console.warn('Web3Auth is not initialized yet');
      return null;
    }

    try {
      // initializeWeb3Auth();

      setLoading(true);
      const user = await web3auth.login({
        loginProvider: provider, // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
        mfaLevel: 'default', // Pass on the MFA level of your choice: default, optional, mandatory, none
        redirectUrl,
      });

      setUserInfo(user as unknown as UserInfo);
      console.log('Login successful:', user);
      return user as unknown as UserInfo;
    } catch (error_) {
      console.error('Login Error:', error_);
      setError(error_ as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (!web3auth) {
      console.warn('Web3Auth is not initialized yet');
      return;
    }

    try {
      setLoading(true);
      await web3auth.logout();
      setUserInfo(null);
      console.log('Logout successful');
    } catch (error_) {
      console.error('Logout Error:', error_);
      setError(error_ as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    login,
    logout,
    userInfo,
    web3auth,
  };
};

export default useWeb3Auth;
