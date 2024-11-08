import { superFetch, SuperFetchError } from "./superFetch";
import { StandardGameResponse, standardGameResponse } from "@/types/api/games/standardGameResponse";

export class GamesController {
  static async getPopularGames(): Promise<StandardGameResponse> {
    try {
      const result = await superFetch<undefined, StandardGameResponse, "popular">({
        options: {
          method: "GET",
        },
        route: "popular",
        responseSchema: standardGameResponse,
      });

      console.log("result");

      return result;
    } catch (error) {
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching popular games");
    }
  }
}