export class BaseError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
