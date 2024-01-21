import { z } from "zod";

const patchNoteEventPathSchema = z.object({
  noteId: z.string(),
});
const patchNoteEventBodySchema = z.object({
  userId: z.string(),
  title: z.string(),
  content: z.string(),
});

// for validation we need the wrapper
export const patchNoteEventSchema = z.object({
  body: patchNoteEventBodySchema,
  pathParameters: patchNoteEventPathSchema,
});

export type patchNoteEventBodyType = z.infer<typeof patchNoteEventBodySchema>;
