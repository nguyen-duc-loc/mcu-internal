import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatISO } from "date-fns";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import { Resource } from "sst";

import handleError from "@/api/error-handler";
import { ForbiddenError, ValidationError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import docClient from "@/database/dynamodb";
import { CustomerSchema } from "@/validation";

import { getRoleFromEvent } from "../users/getRole";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userRole = await getRoleFromEvent(event);
    if (userRole === "viewer") {
      throw new ForbiddenError();
    }

    const body = JSON.parse(String(event.body));

    const validatedData = CustomerSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const id = nanoid();

    const insertNewCustomerCommand = new PutCommand({
      TableName: Resource.CustomersTable.name,
      Item: {
        id,
        ...validatedData.data,
        endDate:
          validatedData.data.endDate && formatISO(validatedData.data.endDate),
      },
    });
    await docClient.send(insertNewCustomerCommand);

    const newCustomer: CreateCustomerResponseData = {
      id,
      ...validatedData.data,
    };

    return formatSuccessResponse(StatusCodes.CREATED, newCustomer);
  } catch (error) {
    return handleError(error);
  }
};
