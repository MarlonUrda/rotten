import { z } from "zod";

export interface GetGameRequest {
  id: string;
}
export interface GetGameScreenshotsRequest {
  external_id: number;
}

export const searchGameSchema = z.object({
  query: z.string().max(100).optional(),
  page: z.number({ coerce: true }).int().min(0).optional(),
  external_page: z.number({ coerce: true }).int().min(0).optional(),
  platforms: z.string().optional(),
});

export type SearchGamesRequest = z.infer<typeof searchGameSchema>;
