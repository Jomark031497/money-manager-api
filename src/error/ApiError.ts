export class APIError {
  code!: number;

  message!: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static badRequest(message: string) {
    return new APIError(400, message);
  }

  static internal(message: string) {
    return new APIError(500, message);
  }

  static notFound(message: string) {
    return new APIError(404, message);
  }
}
