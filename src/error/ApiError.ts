export class APIError extends Error {
  code!: number;

  message!: string;

  helperMessage?: string;

  constructor(code: number, message: string, helperMessage?: string) {
    super();
    this.code = code;
    this.message = message;
    if (helperMessage) this.helperMessage = helperMessage;
  }

  static badRequest(message: string, helperMessage?: string) {
    return new APIError(400, message, helperMessage);
  }

  static internal(message: string, helperMessage?: string) {
    return new APIError(500, message, helperMessage);
  }

  static notFound(message: string, helperMessage?: string) {
    return new APIError(404, message, helperMessage);
  }
}
