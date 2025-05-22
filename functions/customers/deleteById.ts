import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { BadRequestError, ForbiddenError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";

import { getRoleFromEvent } from "../users/getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const customerId = event.pathParameters?.id;
    if (!customerId) {
      throw new BadRequestError("Customer ID is required");
    }

    const userRole = await getRoleFromEvent(event);
    if (userRole === "viewer") {
      throw new ForbiddenError();
    }

    const deleteCustomerCommand = new DeleteCommand({
      TableName: Resource.CustomersTable.name,
      Key: {
        id: customerId,
      },
    });
    await docClient.send(deleteCustomerCommand);

    return formatSuccessResponse(StatusCodes.OK, null);
  } catch (error) {
    return handleError(error);
  }
};
