import { getReasonPhrase } from "http-status-codes";
import { AppError } from "./app.error";

export class HttpError extends AppError {
  public constructor(
    message: string,
    public status: number,
    parent?: Error | null,
  ) {
    super(message);

    const description = parent
      ? `${parent.constructor.name}: ${parent.message}`
      : message;
    // eslint-disable-next-line no-nested-ternary
    const stack =
      process.env.STAGE === "staging"
        ? parent
          ? parent.stack
          : this.stack
        : undefined;

    const error = {
      statusCode: status,
      error: getReasonPhrase(status),
      message: description,
      stack,
    };

    this.message = JSON.stringify(error);

    this.statusCode = status;

    this.expose = true;
    this.headers = {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
    };
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public statusCode: number;

  public expose: boolean;
  public headers: unknown;
}
