import z from "zod"

export const CommentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  rating: z.number().optional(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
  gameId: z.number(),
  userId: z.any()
})

export type Comments = z.infer<typeof CommentSchema>