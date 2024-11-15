import z from "zod";

export const screenShot = z.object({
  id: z.number(),
  image: z.string(),
});
export const getGameScreenshotsResponse = z.object({
  count: z.number(),
  results: z.array(screenShot),
});

export type GetGameScreenshotsResponse = z.infer<typeof getGameScreenshotsResponse>;
