import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { NotFoundError, ValidationError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { verifyTokenInEvent } from "@/token/jwt";
import { UpdatePasswordSchema } from "@/validation";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const payload = await verifyTokenInEvent(event);

    const userId = payload.id;

    const queryUserCommand = new QueryCommand({
      TableName: Resource.UsersTable.name,
      ExpressionAttributeValues: {
        ":id": userId,
      },
      KeyConditionExpression: "id = :id",
      ProjectionExpression: "id",
    });
    const queryUserResult = await docClient.send(queryUserCommand);
    if (!queryUserResult.Count) {
      throw new NotFoundError("User could not be found");
    }

    const body = JSON.parse(String(event.body));

    const validatedData = UpdatePasswordSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { password } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(12));

    const updatePasswordCommand = new UpdateCommand({
      TableName: Resource.UsersTable.name,
      Key: {
        id: userId,
      },
      UpdateExpression: "SET hashedPassword = :hashedPassword",
      ExpressionAttributeValues: {
        ":hashedPassword": hashedPassword,
      },
    });

    await docClient.send(updatePasswordCommand);

    return formatSuccessResponse(StatusCodes.OK, null);
  } catch (error) {
    return handleError(error);
  }
};
