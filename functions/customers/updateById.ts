import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatISO } from "date-fns";
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
import { CustomerSchema } from "@/validation";

import { getRoleFromEvent } from "../users/getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const customerId = event.pathParameters?.id;
    if (!customerId) {
      throw new BadRequestError("Customer id is required");
    }

    const userRole = await getRoleFromEvent(event);
    if (userRole === "viewer") {
      throw new ForbiddenError();
    }

    const queryCustomerCommand = new QueryCommand({
      TableName: Resource.CustomersTable.name,
      ExpressionAttributeValues: {
        ":id": customerId,
      },
      KeyConditionExpression: "id = :id",
      ProjectionExpression: "id",
    });
    const queryCustomerCommandResult = await docClient.send(
      queryCustomerCommand
    );
    if (!queryCustomerCommandResult.Count) {
      throw new NotFoundError("Customer could not be found");
    }

    const body = JSON.parse(String(event.body));

    const validatedData = CustomerSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const updateUserCommand = new PutCommand({
      TableName: Resource.CustomersTable.name,
      Item: {
        id: customerId,
        ...validatedData.data,
        endDate:
          validatedData.data.endDate && formatISO(validatedData.data.endDate),
      },
    });

    await docClient.send(updateUserCommand);

    return formatSuccessResponse(StatusCodes.OK, {
      id: customerId,
      ...validatedData.data,
    });
  } catch (error) {
    return handleError(error);
  }
};
