/**
 * A custom error class that extends the built-in Error class.
 * The stack property is set to undefined to avoid including the stack trace
 * in the error message.
 * @param {string} message - The error message.
 * @constructor
 */
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    /**
     * The stack property is set to undefined to avoid including the stack trace
     * in the error message.
     * @type {undefined}
     */
    this.stack = undefined;
  }
}

/**
 * Exports the CustomError class as the default export.
 */
export default CustomError;
