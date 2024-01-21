import { z } from "zod";

const getNotesEventQuerySchema = z.object({
  userId: z.string(),
  nextToken: z.string().optional(),
});

export const getNotesEventSchema = z.object({
  queryStringParameters: getNotesEventQuerySchema,
});
