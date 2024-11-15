import { count } from "console";
import { z } from "zod";
import { developers, esrbRating, genres, parentPlatform, platformDetails } from "./generics";


export const gameDetails = z.object({
  _id: z.string(),
  external_id: z.number(),
  name: z.string(),
  slug: z.string(),
  tba: z.boolean(),
  metacritic: z.number(),
  released: z.string(),
  description_raw: z.string(),
  background_image: z.string(),
  playtime: z.number(),
  rating: z.number(),
  esrb_rating: esrbRating,
  platforms: z.array(platformDetails),
  parent_platforms: z.array(parentPlatform),
  genres: z.array(genres),
  developers: z.array(developers),
});

export type GameDetails = z.infer<typeof gameDetails>;
