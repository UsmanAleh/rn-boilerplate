import { AppEnvironment } from '@/enums/AppEnvironment.enum';
import { getEnv } from '@/helpers/common';
import {
  CombinedChainConfig,
  IChainConfig,
} from '@/interfaces/chains.interface';

import { DevChainConfig, DevChainID } from './development.constants';
import { ProdChainConfig, ProdChainID } from './production.constants';
import { StagChainConfig, StagChainID } from './staging.constants';

/**
 * Get the current environment setting.
 *
 * @returns {AppEnvironment} The current environment.
 */
const ENV = getEnv();

/**
 * An object that maps the current environment to its corresponding native chain ID.
 *
 * @constant {Readonly<DevChainID.Native | StagChainID.Native | ProdChainID.Native>}
 */
const NativeChainID = {
  [AppEnvironment.Development]: DevChainID.Native,
  [AppEnvironment.Staging]: StagChainID.Native,
  [AppEnvironment.Production]: ProdChainID.Native,
}[ENV];

/**
 * An object that maps environments to their corresponding chain IDs.
 *
 * @constant {Readonly<{ Native: typeof NativeChainID, Dev: typeof DevChainID, Stag: typeof StagChainID, Prod: typeof ProdChainID }>}
 */
export const ChainID = {
  /**
   * The native chain ID of the current environment.
   * @readonly
   * @type {typeof NativeChainID}
   */
  Native: NativeChainID as typeof NativeChainID,
  /**
   * The chain ID of the development environment.
   * @readonly
   * @type {typeof DevChainID}
   */
  Dev: DevChainID as typeof DevChainID,
  /**
   * The chain ID of the staging environment.
   * @readonly
   * @type {typeof StagChainID}
   */
  Stag: StagChainID as typeof StagChainID,
  /**
   * The chain ID of the production environment.
   * @readonly
   * @type {typeof ProdChainID}
   */
  Prod: ProdChainID as typeof ProdChainID,
} as const;

/**
 * An object that maps application environments to their corresponding chain configurations.
 *
 * @constant {Readonly<{ [key in AppEnvironment]: typeof DevChainConfig | typeof StagChainConfig | typeof ProdChainConfig }>}
 */
const configs = {
  [AppEnvironment.Development]: DevChainConfig,
  [AppEnvironment.Staging]: StagChainConfig,
  [AppEnvironment.Production]: ProdChainConfig,
} as const;

/**
 * Retrieves the chain configuration for the current environment.
 *
 * The chain configuration is determined by the current environment setting (i.e. `NODE_ENV`).
 *
 * @constant
 * @type {CombinedChainConfig}
 */
const ConfigByENV: CombinedChainConfig = configs[ENV] as CombinedChainConfig;

/**
 * The configuration for the native chain of the current environment.
 *
 * This object contains the configuration for the native chain
 * of the active environment, such as RPC URLs and explorer URLs.
 *
 */
export const ChainConfig = {
  /**
   * Configuration details for the native chain within the active environment.
   *
   * This entry provides comprehensive settings for the native chain, including
   * RPC URLs, explorer URLs, and associated contract addresses.
   *
   * @readonly
   * @type {IChainConfig}
   *
   * @see {@link IChainConfig} for structure details.
   */
  Native: ConfigByENV[ChainID.Native]! as IChainConfig,
  /**
   * All chain configurations for the current environment.
   * @readonly
   * @type {CombinedChainConfig}
   */
  ...(ConfigByENV as CombinedChainConfig),
} as const;
