import z from "zod"
import { CommentSchema } from "../Comment";

export interface getComments {
  gameId: number;
}

export const GetCommentsResponseSchema = z.array(CommentSchema).optional()

export type CreateCommentRequest = {
  content: string;
  rating: number;
  gameId: number;
  userId: string;
}

export type UpdateCommentRequest = {
  _id: string;
  content?: string;
  rating?: number;
}

export const CreateCommentResponseSchema = z.object({
  _id: z.string()
})

export const UpdateCommentResponseSchema = z.object({
  _id: z.string()
})

export const DeleteCommentResponseSchema = z.object({
  _id: z.string()
})

export type GetCommentsResponse = z.infer<typeof GetCommentsResponseSchema>
export type CreateCommentResponse = z.infer<typeof CreateCommentResponseSchema>
export type UpdateCommentResponse = z.infer<typeof UpdateCommentResponseSchema>
export type DeleteCommentResponse = z.infer<typeof DeleteCommentResponseSchema>
