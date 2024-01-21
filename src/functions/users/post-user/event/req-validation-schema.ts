import { z } from "zod";

const userEventBodySchema = z.object({
  email: z.string(),
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

// for validation we need the wrapper
export const userEventSchema = z.object({
  body: userEventBodySchema,
});

export type userEventBodyType = z.infer<typeof userEventBodySchema>;
