import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import delay from "delay";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { ForbiddenError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";

import { getRoleFromEvent } from "./getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userRole = await getRoleFromEvent(event);
    if (userRole !== "admin") {
      throw new ForbiddenError();
    }

    let lastEvaluatedKey: Record<string, unknown> | undefined;
    let data: UserModel[] = [];

    do {
      const scanUsersCommand = new ScanCommand({
        TableName: Resource.UsersTable.name,
        ProjectionExpression: "#id, email, fullName, #role",
        ExpressionAttributeNames: {
          "#id": "id",
          "#role": "role",
        },
        ExclusiveStartKey: lastEvaluatedKey,
      });
      const scanUsersResult = await docClient.send(scanUsersCommand);

      await delay(100);
      data = [...data, ...(scanUsersResult.Items as UserModel[])];
      lastEvaluatedKey = scanUsersResult.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return formatSuccessResponse(StatusCodes.OK, data);
  } catch (error) {
    return handleError(error);
  }
};
