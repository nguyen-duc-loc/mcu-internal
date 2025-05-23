import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { verifyTokenInEvent } from "@/token/jwt";
import { UpdateUserInformationSchema } from "@/validation";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const payload = await verifyTokenInEvent(event);

    const userId = payload.id;

    const queryRequestedUserCommand = new QueryCommand({
      TableName: Resource.UsersTable.name,
      ExpressionAttributeValues: {
        ":id": userId,
      },
      KeyConditionExpression: "id = :id",
      ProjectionExpression: "id",
    });
    const queryRequestedUserResult = await docClient.send(
      queryRequestedUserCommand
    );
    if (!queryRequestedUserResult.Count) {
      throw new NotFoundError("User could not be found");
    }

    const body = JSON.parse(String(event.body));

    const validatedData = UpdateUserInformationSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { fullName, email } = validatedData.data;

    const queryExistingUserCommand = new QueryCommand({
      TableName: Resource.UsersTable.name,
      IndexName: "EmailIndex",
      ExpressionAttributeValues: {
        ":email": email,
      },
      KeyConditionExpression: "email = :email",
    });

    const queryExistingUserResult = await docClient.send(
      queryExistingUserCommand
    );
    if (
      queryExistingUserResult.Count &&
      email !== queryExistingUserResult.Items?.[0].email
    ) {
      throw new ConflictError("Email already exists");
    }

    const updateUserCommand = new UpdateCommand({
      TableName: Resource.UsersTable.name,
      Key: {
        id: userId,
      },
      UpdateExpression: "SET email = :email, fullName = :fullName",
      ExpressionAttributeValues: {
        ":email": email,
        ":fullName": fullName,
      },
      ReturnValues: "UPDATED_NEW",
    });

    const updateUserResult = await docClient.send(updateUserCommand);

    return formatSuccessResponse(StatusCodes.OK, {
      id: userId,
      ...updateUserResult.Attributes,
    });
  } catch (error) {
    return handleError(error);
  }
};
