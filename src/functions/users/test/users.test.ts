import { StatusCodes } from "http-status-codes";
import { handler as getUsersHandler } from "../get-users";
import { handler as createUserHandler } from "../post-user";
import { handler as getUserHandler } from "../user-id/get-user";
import { randomUUID } from "crypto";

describe("user tests", () => {
  const requestContext = {};
  const context = {} as any;

  // create user test
  test("create user with proper input", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json",
      },
      httpMethod: "POST",
      body: JSON.stringify({
        id: "2",
        email: "tester@gmail.com",
        name: "tester-1",
      }),
      requestContext,
    } as any;
    const response = await createUserHandler(event, context);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(response.body).message).toBe("user created");
  });
  test("create user with validation error", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json",
      },
      httpMethod: "POST",
      body: JSON.stringify({
        name: "tester-2",
      }),
      requestContext,
    } as any;
    const response = await createUserHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  // list users test
  test("get users", async () => {
    const event = {
      httpMethod: "GET",
      requestContext,
    } as any;
    const response = await getUsersHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.OK);
  });
  test("get users with validation error", async () => {
    const event = {
      httpMethod: "GET",
      queryStringParameters: {
        nextToken: 1,
      },
      requestContext,
    } as any;
    const response = await getUsersHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  // get user tests
  test("get note", async () => {
    const event = {
      httpMethod: "GET",
      pathParameters: {
        userId: "2",
      },
      requestContext,
    } as any;
    const response = await getUserHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(response.body).data.name).toBe("tester-1");
  });

  test("get note with validation error", async () => {
    const event = {
      httpMethod: "GET",
      pathParameters: {
        noteId: 1,
      },
      requestContext,
    } as any;
    const response = await getUserHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
