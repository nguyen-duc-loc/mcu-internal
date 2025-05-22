import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { BadRequestError, ForbiddenError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";

import { getRoleFromEvent } from "./getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.id;
    if (!userId) {
      throw new BadRequestError("User id is required");
    }

    const userRole = await getRoleFromEvent(event);
    if (userRole !== "admin") {
      throw new ForbiddenError();
    }

    const deleteUserCommand = new DeleteCommand({
      TableName: Resource.UsersTable.name,
      Key: {
        id: userId,
      },
    });
    await docClient.send(deleteUserCommand);

    return formatSuccessResponse(StatusCodes.OK, null);
  } catch (error) {
    return handleError(error);
  }
};
