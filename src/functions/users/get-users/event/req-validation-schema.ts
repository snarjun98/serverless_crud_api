import { z } from "zod";

const getUsersEventQuerySchema = z
  .object({
    nextToken: z.string().optional(),
  })
  .nullable();

export const getUsersEventSchema = z.object({
  queryStringParameters: getUsersEventQuerySchema.optional(),
});
