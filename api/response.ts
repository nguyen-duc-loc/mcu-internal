import { APIGatewayProxyResult } from "aws-lambda";

export function formatSuccessResponse<T = null>(
  status: number,
  data: T
): APIGatewayProxyResult {
  const responseContent = {
    success: true,
    data,
  };

  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseContent),
  };
}

export const formatErrorResponse = (
  status: number,
  message: string,
  error?: Record<string, string[]>
): APIGatewayProxyResult => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: error,
    },
  };

  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseContent),
  };
};
