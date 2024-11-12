import z from "zod"

export const CommentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  gameId: z.number(),
  userId: z.string()
})

export type Comments = z.infer<typeof CommentSchema>