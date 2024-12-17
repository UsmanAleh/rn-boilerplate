/**
 * Enum for representing the status of a request.
 *
 * @remarks
 * There are 4 possible states:
 * - Pending: The request is in progress.
 * - Success: The request is completed and was successful.
 * - Error: The request is completed and was unsuccessful.
 * - Idle: The request is not in progress and was not attempted.
 *
 * @packageDocumentation
 */

enum RequestStatus {
  Error = 'error',
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
}

export default RequestStatus;
