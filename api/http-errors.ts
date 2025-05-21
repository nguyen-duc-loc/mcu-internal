import { StatusCodes } from "http-status-codes";

export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;
  name: string;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    const message = ValidationError.formatFieldErrors(fieldErrors);
    super(StatusCodes.BAD_REQUEST, message, fieldErrors);
    this.name = "ValidationError";
    this.errors = fieldErrors;
  }

  static formatFieldErrors(errors: Record<string, string[]>): string {
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

        if (messages[0].toLowerCase() === "required") {
          return `${fieldName} is required`;
        } else {
          return messages.join(" and ");
        }
      }
    );

    return formattedMessages.join(", ");
  }
}

export class BadRequestError extends RequestError {
  constructor(message: string = "Bad request") {
    super(StatusCodes.BAD_REQUEST, message);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string = "Not Found") {
    super(StatusCodes.NOT_FOUND, message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends RequestError {
  constructor(message: string = "Conflict") {
    super(StatusCodes.CONFLICT, message);
    this.name = "ConflictError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(StatusCodes.FORBIDDEN, message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(StatusCodes.UNAUTHORIZED, message);
    this.name = "UnauthorizedError";
  }
}
