import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import delay from "delay";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { verifyTokenInEvent } from "@/token/jwt";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await verifyTokenInEvent(event);

    let lastEvaluatedKey: Record<string, unknown> | undefined;
    let data: CustomerModel[] = [];

    do {
      const scanCustomersCommand = new ScanCommand({
        TableName: Resource.CustomersTable.name,
        ProjectionExpression:
          "#id, #name, #status, proservice, funding, credit, win, endYear, endMonth, endDate",
        ExpressionAttributeNames: {
          "#id": "id",
          "#name": "name",
          "#status": "status",
        },
        ExclusiveStartKey: lastEvaluatedKey,
      });
      const scanCustomersCommandResult = await docClient.send(
        scanCustomersCommand
      );

      await delay(100);
      data = [
        ...data,
        ...(scanCustomersCommandResult.Items as CustomerModel[]),
      ];
      lastEvaluatedKey = scanCustomersCommandResult.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return formatSuccessResponse(StatusCodes.OK, data);
  } catch (error) {
    return handleError(error);
  }
};
