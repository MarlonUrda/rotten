import { superFetch, SuperFetchError } from "./superFetch";
import {
  StandardGameResponse,
  standardGameResponse,
} from "@/types/api/games/standardGameResponse";
import { GetGameRequest, GetGameScreenshotsRequest } from "@/types/api/games/getGameRequest";
import { getGameScreenshotsResponse } from "@/types/api/games/gameScreenshots";
import type { GetGameScreenshotsResponse } from "@/types/api/games/gameScreenshots";
import { GameDetails, gameDetails } from "@/types/api/games/gameDetails";

export class GamesController {
  static async getPopularGames(): Promise<StandardGameResponse> {
    try {
      const result = await superFetch<
        undefined,
        StandardGameResponse,
        "popular"
      >({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "popular",
        responseSchema: standardGameResponse,
      });

      console.log("result");

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
        routeParams: [payload.id],
        responseSchema: gameDetails,
      });

      console.log("result");

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
}
