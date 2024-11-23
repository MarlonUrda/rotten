import { superFetch, SuperFetchError } from "./superFetch";
import {
  StandardGameResponse,
  standardGameResponse,
} from "@/types/api/games/standardGameResponse";
import {
  GetGameRequest,
  GetGameScreenshotsRequest,
  SearchGamesRequest,
} from "@/types/api/games/getGameRequest";
import { getGameScreenshotsResponse } from "@/types/api/games/gameScreenshots";
import type { GetGameScreenshotsResponse } from "@/types/api/games/gameScreenshots";
import { GameDetails, gameDetails } from "@/types/api/games/gameDetails";

export class GamesController {
  static async getPublicCollection(

    collection: "popular" | "new" | "highest-rated" = "popular"
  ): Promise<StandardGameResponse> {
    try {
      const result = await superFetch<
        undefined,
        StandardGameResponse,
        "popular" | "new" | "highest-rated"
      >({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: collection,
        responseSchema: standardGameResponse,
      });


      return result;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching popular games");
    }
  }

  static async getGame(payload: GetGameRequest): Promise<GameDetails> {
    try {
      const result = await superFetch<GetGameRequest, GameDetails, "game/:id">({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "game/:id",
        routeParams: [payload.id.toString()],
        responseSchema: gameDetails,
      });
      return result;
    } catch (error) {
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching game details");
    }
  }

  static async getGameScreenshots(payload: GetGameScreenshotsRequest) {
    try {
      const result = await superFetch<
        GetGameRequest,
        GetGameScreenshotsResponse,
        "game/:id/screenshots"
      >({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "game/:id/screenshots",
        routeParams: [payload.external_id],
        responseSchema: getGameScreenshotsResponse,
      });

      console.log("result");

      return result;
    } catch (error) {
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching game screenshots");
    }
  }

  static async searchGames(payload: SearchGamesRequest) {
    try {
      const result = await superFetch<
        undefined,
        StandardGameResponse,
        "game/search",
        SearchGamesRequest
      >({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "game/search",
        routeParams: [],
        queryParams: payload,
        responseSchema: standardGameResponse,
      });

      console.log(result.next, "result.next");

      return result;
    } catch (error) {
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error searching games");
    }
  }
}
