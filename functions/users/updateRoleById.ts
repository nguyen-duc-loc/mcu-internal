import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { UserSchema } from "@/validation";

import { getRoleFromEvent } from "./getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.id;
    if (!userId) {
      throw new BadRequestError("User ID is required");
    }

    const userRole = await getRoleFromEvent(event);
    if (userRole !== "admin") {
      throw new ForbiddenError();
    }

    const queryExistingUserCommand = new QueryCommand({
      TableName: Resource.UsersTable.name,
      ExpressionAttributeValues: {
        ":id": userId,
      },
      KeyConditionExpression: "id = :id",
      ProjectionExpression: "id",
    });
    const queryExistingUserResult = await docClient.send(
      queryExistingUserCommand
    );
    if (!queryExistingUserResult.Count) {
      throw new NotFoundError("User could not be found");
    }

    const body = JSON.parse(String(event.body));

    const validatedData = UserSchema.pick({ role: true }).safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { role } = validatedData.data;

    const updateUserCommand = new UpdateCommand({
      TableName: Resource.UsersTable.name,
      Key: {
        id: userId,
      },
      UpdateExpression: "SET #role = :role",
      ExpressionAttributeNames: {
        "#role": "role",
      },
      ExpressionAttributeValues: {
        ":role": role,
      },
      ReturnValues: "UPDATED_NEW",
    });

    const updateUserResult = await docClient.send(updateUserCommand);

    return formatSuccessResponse(StatusCodes.OK, {
      id: userId,
      role: updateUserResult.Attributes?.role,
    });
  } catch (error) {
    return handleError(error);
  }
};
