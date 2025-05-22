import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { verifyTokenInEvent } from "@/token/jwt";

import { getRoleFromEvent } from "./getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.id;
    if (!userId) {
      throw new BadRequestError("User ID is required");
    }

    const [payload, userRole] = await Promise.all([
      verifyTokenInEvent(event),
      getRoleFromEvent(event),
    ]);
    if (payload.id !== userId && userRole !== "admin") {
      throw new ForbiddenError();
    }

    const queryUserCommand = new QueryCommand({
      TableName: Resource.UsersTable.name,
      ExpressionAttributeValues: {
        ":id": userId,
      },
      KeyConditionExpression: "id = :id",
      ProjectionExpression: "id, email, fullName, #role",
      ExpressionAttributeNames: {
        "#role": "role",
      },
    });
    const queryUserResult = await docClient.send(queryUserCommand);
    if (!queryUserResult.Count) {
      throw new NotFoundError("User could not be found");
    }

    const foundedUser = queryUserResult.Items?.[0];

    return formatSuccessResponse(StatusCodes.OK, foundedUser);
  } catch (error) {
    return handleError(error);
  }
};
