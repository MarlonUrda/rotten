import z from "zod";
import { reviewSchema } from "../Review";

export interface GetReviews {
  gameId: string;
}

export const getReviewsResponseSchema = z.array(reviewSchema).optional();

export type CreateReviewRequest = {
  content: string;
  rating: number;
  gameId: string;
};

export type UpdateReviewRequest = {
  _id: string;
  content?: string;
  rating?: number;
};

export const CreateReviewResponseSchema = z.object({
  _id: z.string(),
});

export const UpdateReviewResponseSchema = z.object({
  _id: z.string(),
});

export const DeleteReviewResponseSchema = z.object({
  _id: z.string(),
});

export type GetReviewsResponse = z.infer<typeof getReviewsResponseSchema>;
export type CreateReviewResponse = z.infer<typeof CreateReviewResponseSchema>;
export type UpdateReviewResponse = z.infer<typeof UpdateReviewResponseSchema>;
export type DeleteReviewResponse = z.infer<typeof DeleteReviewResponseSchema>;
