import z from "zod"
import { CommentSchema } from "../Comment";

export interface getComments {
  gameId: number;
}

export const GetCommentsResponseSchema = z.array(CommentSchema).optional()


export type CreateCommentRequest = {
  content: string;
  createdAt: Date;
  updatedAt: Date;
  gameId: number;
  userId: string;
}

export const CreateCommentResponseSchema = z.object({
  _id: z.string()
})

export type GetCommentsResponse = z.infer<typeof GetCommentsResponseSchema>
export type CreateCommentResponse = z.infer<typeof CreateCommentResponseSchema>