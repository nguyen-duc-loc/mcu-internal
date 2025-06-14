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

    const customersTable = new sst.aws.Dynamo("CustomersTable", {
      fields: {
        id: "string",
      },
      primaryIndex: {
        hashKey: "id",
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

    // Users API
    // Create user (only admin)
    api.route("POST /users", {
      handler: "functions/users/create.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Get all users (only admin)
    api.route("GET /users", {
      handler: "functions/users/getAll.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Get user by id (only admin and authorized)
    api.route("GET /users/{id}", {
      handler: "functions/users/getById.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Update user role by id (only admin)
    api.route("PUT /users/{id}/role", {
      handler: "functions/users/updateRoleById.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Delete user (only admin)
    api.route("DELETE /users/{id}", {
      handler: "functions/users/deleteById.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Get me (only authorized)
    api.route("GET /me", {
      handler: "functions/users/getMe.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });

    // CustomersAPI
    // Get all customers
    api.route("GET /customers", {
      handler: "functions/customers/getAll.handler",
      link: [customersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Create customer (except viewer)
    api.route("POST /customers", {
      handler: "functions/customers/create.handler",
      link: [customersTable, usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Get customer by id
    api.route("GET /customers/{id}", {
      handler: "functions/customers/getById.handler",
      link: [customersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Update customer (except viewer)
    api.route("PUT /customers/{id}", {
      handler: "functions/customers/updateById.handler",
      link: [customersTable, usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Delete customer (except viewer)
    api.route("DELETE /customers/{id}", {
      handler: "functions/customers/deleteById.handler",
      link: [customersTable, usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Update user information by id (only authorized)
    api.route("PUT /me", {
      handler: "functions/users/updateMe.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
    // Update user information by id (only authorized)
    api.route("PUT /me/password", {
      handler: "functions/users/updatePassword.handler",
      link: [usersTable],
      environment: {
        JWT_SECRET: process.env.JWT_SECRET!,
      },
    });
  },
});
