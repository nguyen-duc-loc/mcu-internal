import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import {
  ConflictError,
  ForbiddenError,
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
    const userRole = await getRoleFromEvent(event);
    if (userRole !== "admin") {
      throw new ForbiddenError();
    }

    const body = JSON.parse(String(event.body));

    const validatedData = UserSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, fullName, password, role } = validatedData.data;

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
    if (queryExistingUserResult.Count) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(12));
    const id = nanoid();

    const putUserCommand = new PutCommand({
      TableName: Resource.UsersTable.name,
      Item: {
        id,
        email,
        fullName,
        role,
        hashedPassword,
      },
    });
    await docClient.send(putUserCommand);

    const newUser = { id, email, role, fullName };

    return formatSuccessResponse(StatusCodes.CREATED, newUser);
  } catch (error) {
    return handleError(error);
  }
};
