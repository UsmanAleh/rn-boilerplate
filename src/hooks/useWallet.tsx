import { ethers } from 'ethers';

import AppLogger from '@/helpers/AppLogger';
import { useAppSelector } from '@/store/utils';

/**
 * Custom hook to create an ethers.js Wallet instance using a private key
 * from the Redux store.
 *
 * @returns {ethers.Wallet | null} A Wallet instance if a private key is available, otherwise null.
 */
const useWallet = (): ethers.Wallet | null => {
  // Select the private key from the Redux store
  const privateKey = useAppSelector((state) => state.privateKey.key);

  // If no private key is available, return null
  if (!privateKey) {
    AppLogger.error('No private key available');
    return null;
  }

  // Initialize a JSON-RPC provider
  const provider = new ethers.JsonRpcProvider('PROVIDER_URL');

  // Create and return a new Wallet instance with the provider
  return new ethers.Wallet(privateKey, provider);
};

export default useWallet;
