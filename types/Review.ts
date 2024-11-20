import z from "zod";

export const reviewSchema = z.object({
  _id: z.string(),
  content: z.string(),
  rating: z.number(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
  gameId: z.string(),
  userId: z.string(),
  user: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  reviewType: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
