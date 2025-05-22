import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Resource } from "sst";

import { NotFoundError } from "@/api/http-errors";
import docClient from "@/database/dynamodb";
import { verifyTokenInEvent } from "@/token/jwt";

export const getRoleFromEvent = async (
  event: APIGatewayProxyEvent
): Promise<Role> => {
  const payload = await verifyTokenInEvent(event);

  const userId = payload.id;

  const queryUserCommand = new QueryCommand({
    TableName: Resource.UsersTable.name,
    ExpressionAttributeValues: {
      ":id": userId,
    },
    KeyConditionExpression: "id = :id",
    ProjectionExpression: "#role",
    ExpressionAttributeNames: {
      "#role": "role",
    },
  });
  const queryUserResult = await docClient.send(queryUserCommand);
  if (!queryUserResult.Count) {
    throw new NotFoundError("User could not be found");
  }

  const foundedUser = queryUserResult.Items?.[0] as GetRoleResponseData;

  return foundedUser.role as Role;
};
