/**
 * Helper functions for common operations.
 */

import { ChainID } from '@/constants/chains';
import { IChainID } from '@/interfaces/chains.interface';


/**
 * Checks if the given chain ID is the native chain ID of the current environment.
 *
 * @param {IChainID} id The chain ID to check.
 * @returns {boolean} Whether the given chain ID is the native chain ID of the current environment.
 *
 */
export const isNativeChainID = (id: IChainID): boolean => id === ChainID.Native;
