import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { BadRequestError, NotFoundError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { verifyTokenInEvent } from "@/token/jwt";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await verifyTokenInEvent(event);

    const customerId = event.pathParameters?.id;
    if (!customerId) {
      throw new BadRequestError("Customer ID is required");
    }

    const queryCustomerCommand = new QueryCommand({
      TableName: Resource.CustomersTable.name,
      ExpressionAttributeValues: {
        ":id": customerId,
      },
      KeyConditionExpression: "id = :id",
      ProjectionExpression:
        "id, #name, #status, proservice, funding, credit, endYear, endMonth, endDate, win",
      ExpressionAttributeNames: {
        "#name": "name",
        "#status": "status",
      },
    });
    const queryCustomerCommandResult = await docClient.send(
      queryCustomerCommand
    );
    if (!queryCustomerCommandResult.Count) {
      throw new NotFoundError("Customer could not be found");
    }

    const foundedCustomer = queryCustomerCommandResult.Items?.[0];

    return formatSuccessResponse(StatusCodes.OK, foundedCustomer);
  } catch (error) {
    return handleError(error);
  }
};
