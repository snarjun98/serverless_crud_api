import { z } from "zod";

const noteEventBodySchema = z.object({
  userId: z.string(),
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  updatedBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

// for validation we need the wrapper
export const noteEventSchema = z.object({
  body: noteEventBodySchema,
});

// export type projectEventBodyType = z.infer<typeof projectEventSchema>;
export type noteEventBodyType = z.infer<typeof noteEventBodySchema>;
