import { z } from "zod";

const getUserEventPathSchema = z.object({
  userId: z.string(),
});

// for validation we need the wrapper
export const getUserEventSchema = z.object({
  pathParameters: getUserEventPathSchema,
});
