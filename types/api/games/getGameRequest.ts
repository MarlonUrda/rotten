import { z } from "zod";
import { genres } from "./generics";

export interface GetGameRequest {
  id: string | number;
}
export interface GetGameScreenshotsRequest {
  external_id: number;
}

export const searchGameSchema = z.object({
  query: z.string().max(100).optional(),
  page: z.number({ coerce: true }).int().min(0).optional(),
  external_page: z.number({ coerce: true }).int().min(0).optional(),
  platforms: z.string().optional(),
  genres: z.string().optional(),
  year: z.number().optional(),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxRating: z.number().min(0).max(5).optional(),
  minCriticsRating: z
    .number({
      coerce: true,
    })
    .min(0)
    .max(5)
    .optional(),
  maxCriticsRating: z
    .number({
      coerce: true,
    })
    .min(0)
    .max(5)
    .optional(),
});

export type SearchGamesRequest = z.infer<typeof searchGameSchema>;

export type SearchGameQuery = Omit<
  z.infer<typeof searchGameSchema>,
  "page" | "external_page"
>;
