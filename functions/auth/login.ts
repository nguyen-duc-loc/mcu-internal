import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { UnauthorizedError, ValidationError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { sign } from "@/token/jwt";
import { LoginSchema } from "@/validation";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(String(event.body));

    const validatedData = LoginSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, password } = validatedData.data;
    const invalidCredentialsErr = new UnauthorizedError("Invalid credentials");

    const queryUserCommand = new QueryCommand({
      TableName: Resource.UsersTable.name,
      IndexName: "EmailIndex",
      ExpressionAttributeValues: {
        ":email": email,
      },
      KeyConditionExpression: "email = :email",
    });

    const queryUserResult = await docClient.send(queryUserCommand);
    if (queryUserResult.Count === 0) {
      throw invalidCredentialsErr;
    }

    const foundUser = queryUserResult.Items?.[0] as UserModel;
    const hashedPassword = foundUser.hashedPassword;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordCorrect) {
      throw invalidCredentialsErr;
    }

    const token = await sign({
      id: foundUser.id,
    });

    const data = {
      token,
    };

    return formatSuccessResponse(StatusCodes.OK, data);
  } catch (error) {
    return handleError(error);
  }
};
