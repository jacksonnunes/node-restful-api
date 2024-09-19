export class AppError {
  public readonly messages: string | string[];
  public readonly statusCode: number;

  constructor(messages: string | string[], statusCode = 400) {
    this.messages = messages;
    this.statusCode = statusCode;
  }
}