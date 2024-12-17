/**
 * Helper functions for common operations.
 */

import { ChainID } from '@/constants/chains';
import { AppEnvironment } from '@/enums/AppEnvironment.enum';
import { IChainID } from '@/interfaces/chains.interface';

/**
 * Returns the environment of the application.
 *
 * The environment is determined based on the value of the
 * `NODE_ENV` environment variable.
 *
 * @returns {AppEnvironment} The environment of the application.
 *
 */
export const getEnv = (): AppEnvironment => {
  switch (process.env.NODE_ENV) {
    case 'staging': {
      return AppEnvironment.Staging;
    }
    case 'production': {
      return AppEnvironment.Production;
    }
    default: {
      return AppEnvironment.Development;
    }
  }
};

/**
 * Checks if the given chain ID is the native chain ID of the current environment.
 *
 * @param {IChainID} id The chain ID to check.
 * @returns {boolean} Whether the given chain ID is the native chain ID of the current environment.
 *
 */
export const isNativeChainID = (id: IChainID): boolean => id === ChainID.Native;
