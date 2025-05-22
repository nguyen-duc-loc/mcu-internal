// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mcu-internal",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },

  async run() {
    // ----------------------- //
    // DynamoDB store database //
    // ----------------------- //
    const usersTable = new sst.aws.Dynamo("UsersTable", {
      fields: {
        id: "string",
        email: "string",
      },
      primaryIndex: {
        hashKey: "id",
      },
      globalIndexes: {
        EmailIndex: {
          hashKey: "email",
        },
      },
    });

    // ----------------------------------- //
    // API Gateway handle client requests  //
    // ----------------------------------- //
    const api = new sst.aws.ApiGatewayV2("Api", {
      cors: {
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    // Authentication API
    // Login
    api.route("POST /auth/login", {
      handler: "functions/auth/login.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
        JWT_MAX_AGE: process.env.JWT_MAX_AGE!,
      },
    });
  },
});
