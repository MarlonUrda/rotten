import z from "zod";
import { gamePreview } from "./gamePreview";
import { searchGameSchema } from "./getGameRequest";

export const standardGameResponse = z.object({
  count: z.number(),
  results: z.array(gamePreview),
  next: searchGameSchema.optional(),
});

export type StandardGameResponse = z.infer<typeof standardGameResponse>;
