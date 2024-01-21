import { StatusCodes } from "http-status-codes";
import { handler as getNotesHandler } from "../get-notes/index";
import { handler as createNoteHandler } from "../post-note/index";
import { handler as updateNoteHandler } from "../note-id/patch-note";
import { randomUUID } from "crypto";
import { addUser } from "../../../db/controller/users-controller";
import { UserEntity } from "../../../db/models/users-model";

describe("note tests", () => {
  const requestContext = {};
  const context = {} as any;

  const userId = randomUUID();
  beforeAll(async () => {
    addUser({
      id: userId,
      email: "test@getMaxListeners.com",
      name: "test",
    });
  });
  afterAll(async () => {
    UserEntity.delete({ id: userId });
  });
  test("create note with proper input", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json",
      },
      httpMethod: "POST",
      body: JSON.stringify({
        id: "1",
        title: "test note 1",
        content: "hello world",
        userId,
      }),
      requestContext,
    } as any;
    const response = await createNoteHandler(event, context);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(response.body).message).toBe("record created");
  });
  test("create note with validation error", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json",
      },
      httpMethod: "POST",
      body: JSON.stringify({
        content: "hello world",
        userId,
      }),
      requestContext,
    } as any;
    const response = await createNoteHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
  test("get notes", async () => {
    const event = {
      httpMethod: "GET",
      queryStringParameters: {
        userId,
      },
      requestContext,
    } as any;
    const response = await getNotesHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(response.body).data.length).toBe(1);
  });
  test("get notes with validation error", async () => {
    const event = {
      httpMethod: "GET",
      queryStringParameters: {},
      requestContext,
    } as any;
    const response = await getNotesHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
  test("update note", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json",
      },
      httpMethod: "PATCH",
      body: JSON.stringify({
        userId,
        title: "updated note",
        content: "updated content",
      }),
      pathParameters: {
        noteId: "1",
      },
      requestContext,
    } as any;
    const response = await updateNoteHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(response.body).data.content).toBe("updated content");
    expect(JSON.parse(response.body).data.title).toBe("updated note");
  });
  test("update note with validation error", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json",
      },
      httpMethod: "PATCH",
      body: JSON.stringify({
        userId,
        content: "updated content",
      }),
      pathParameters: {
        noteId: "1",
      },
      requestContext,
    } as any;
    const response = await updateNoteHandler(event, context);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
