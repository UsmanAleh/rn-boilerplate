// Importing polyfill for generating random values in React Native
import 'react-native-get-random-values';
// Importing Ethereum shims for compatibility with ethers.js
import '@ethersproject/shims';

// Importing the `Buffer` class for compatibility with Web3Auth
import { Buffer } from 'buffer';

/**
 * Check if Buffer is not defined globally, and if not, assign it.
 * This ensures compatibility with environments that do not have Buffer
 * available globally by default.
 */
if (!global.Buffer) {
  global.Buffer = Buffer;
}

/**
 * Override console.warn to ignore specific warning patterns.
 * Only applies in a browser environment where window.console is available.
 */
// @ts-ignore
if (typeof window !== 'undefined' && window.console) {
  // Store the original console.warn method
  const originalWarn = console.warn;

  /**
   * New console.warn implementation that checks against ignore patterns.
   * @param args - Arguments passed to console.warn
   */
  console.warn = (...args) => {
    // Define patterns of warnings to ignore
    const ignorePatterns = [
      /.*deprecated.*/,
      /.*Source map error.*/,
      /.*HMR.*/,
    ];

    // Check if any ignore pattern matches the warning message
    if (ignorePatterns.some((pattern) => pattern.test(args[0]))) {
      return; // Skip logging this warning if matched
    }

    // Call the original warn method if no patterns match
    originalWarn(...args);
  };
}
