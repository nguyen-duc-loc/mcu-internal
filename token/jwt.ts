import { APIGatewayProxyEvent } from "aws-lambda";
import { jwtVerify, SignJWT } from "jose";

import { BadRequestError, UnauthorizedError } from "../api/http-errors";

export const sign = async (payload: AuthTokenPayload): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + Number(process.env.JWT_MAX_AGE);

  return new SignJWT({ ...payload })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyTokenInEvent = async (event: APIGatewayProxyEvent) => {
  const authHeader = event.headers.authorization?.split(" ");

  if (!authHeader || authHeader.length !== 2 || authHeader[0] !== "Bearer") {
    throw new BadRequestError("Required token is missing or invalid");
  }

  const token = authHeader[1];
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload as AuthTokenPayload;
};

export const verifyTokenInCookies = async (authToken?: string) => {
  if (!authToken) {
    throw new UnauthorizedError("Authentication token is missing");
  }

  const { payload } = await jwtVerify(
    authToken,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload as AuthTokenPayload;
};
