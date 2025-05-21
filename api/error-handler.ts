import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "./http-errors";
import { formatErrorResponse } from "./response";

const handleError = (error: unknown) => {
  if (error instanceof RequestError) {
    return formatErrorResponse(error.statusCode, error.message, error.errors);
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    return formatErrorResponse(
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    return formatErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }

  return formatErrorResponse(
    StatusCodes.INTERNAL_SERVER_ERROR,
    "An unexpected error occurred"
  );
};

export default handleError;
