/**
 * Utility class for logging messages with styled console output.
 */
export default class AppLogger {
  /**
   * Utility method to log styled messages to the console.
   * @param color - The color to use for the label.
   * @param label - The label to display.
   * @param optionalParams - Additional parameters to log.
   */
  private static styledLog(
    color: string,
    label: string,
    ...optionalParams: any[]
  ) {
    console.log(
      `%c${label}`,
      `color: ${color}; font-weight: bold;`,
      ...optionalParams,
    );
  }

  /**
   * Logs a general message with a predefined color.
   * @param label - The label of the log.
   * @param optionalParams - Additional parameters to log.
   */
  static log(label: string, ...optionalParams: any[]) {
    this.styledLog('#1DBC60', label, ...optionalParams);
  }

  /**
   * Logs an informational message.
   * @param label - The label of the log.
   * @param optionalParams - Additional parameters to log.
   */
  static info(label: string, ...optionalParams: any[]) {
    this.styledLog('#1E90FF', label, ...optionalParams);
  }

  /**
   * Logs a warning message.
   * @param label - The label of the log.
   * @param optionalParams - Additional parameters to log.
   */
  static warn(label: string, ...optionalParams: any[]) {
    this.styledLog('#FF8C00', label, ...optionalParams);
  }

  /**
   * Logs an error message.
   * @param label - The label of the log.
   * @param optionalParams - Additional parameters to log.
   */
  static error(label: string, ...optionalParams: any[]) {
    this.styledLog('#EF5250', label, ...optionalParams);
  }

  /**
   * Logs an API request error with detailed information.
   * @param method - The HTTP method used.
   * @param url - The URL of the API request.
   * @param status - The HTTP status code returned.
   * @param message - The error message.
   * @param optionalParams - Additional parameters to log.
   */
  static apiError(
    method: string,
    url: string,
    status: number,
    message: string,
    ...optionalParams: any[]
  ) {
    this.styledLog(
      '#EF5250',
      'API Request Error',
      {
        method,
        url,
        status,
        message,
      },
      ...optionalParams,
    );
  }

  /**
   * Logs a debug message if the environment is set to development.
   * @param label - The label of the log.
   * @param optionalParams - Additional parameters to log.
   */
  static debug(label: string, ...optionalParams: any[]) {
    if (process.env.NODE_ENV === 'development') {
      this.styledLog('#6A5ACD', 'Debug: ' + label, ...optionalParams);
    }
  }
}
