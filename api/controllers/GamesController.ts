import { superFetch, SuperFetchError } from "./superFetch";
import { StandardGameResponse, standardGameResponse } from "@/types/api/games/standardGameResponse";
import { getGameRequest } from "@/types/api/games/getGameRequest";
import { GameDetails, gameDetails } from "@/types/api/games/gameDetails";

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
      console.log("error")
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching popular games");
    }
  }

  static async getGame(payload: getGameRequest): Promise<GameDetails> {
    try {
      const result = await superFetch<getGameRequest, GameDetails, "game/:id">({
        options: {
          method: "GET",
        },
        route: "game/:id",
        routeParams: [payload.id],
        responseSchema: gameDetails,
      })

      console.log("result");

      return result;
      
    } catch (error) {
      const sfError = error as SuperFetchError
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching game details");
    }
  }
}