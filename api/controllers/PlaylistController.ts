import { SuperFetchError } from "./superFetch";
import { superFetch } from "./superFetch";
import {
  getPlaylist,
  getPlaylistResponseSchema,
  addOrRemoveGameToPlaylist,
  removeFromPlaylistResponseSchema,
  addToPlaylistResponseSchema,
  removeFromPlaylistResponse,
  addToPlaylistResponse
} from "@/types/api/Playlist";
import type { getPlaylistResponse } from "@/types/api/Playlist";
import type { Playlist } from "@/types/Playlist";
import { playlistSchema } from "@/types/Playlist";

export class PlaylistController {
  static async getPlaylist(userId: string): Promise<Playlist>{
    try {
      const response = await superFetch<undefined, Playlist, ":id/playlist">(
        {
          options: {
            method: "GET",
            includeCredentials: true,
          },
          route: ":id/playlist",
          routeParams: [userId],
          responseSchema: playlistSchema,
        }
      )
      console.log(response)

      return response;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching playlist");
    }
  }

  static async addToPlaylist(payload: addOrRemoveGameToPlaylist): Promise<addToPlaylistResponse>{
    try {
      const response = await superFetch<addOrRemoveGameToPlaylist, addToPlaylistResponse, "playlist">({
        options: {
          method: "POST",
          includeCredentials: true,
        },
        route: "playlist",
        routeParams: [],
        responseSchema: addToPlaylistResponseSchema,
        payload: payload,
      })

      console.log(response)
      return response;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error adding game to your playlist");
    }
  }

  static async removeFromPlaylist(userId:string, gameId: string): Promise<removeFromPlaylistResponse>{
    try {
      const response = await superFetch<undefined, removeFromPlaylistResponse, "playlist/:id">({
        options: {
          method: "DELETE",
          includeCredentials: true,
        },
        route: "playlist/:id",
        routeParams: [userId, gameId],
        responseSchema: removeFromPlaylistResponseSchema,
      })

      console.log(response)
      return response;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error removing the game from playlist");
    }
  }
}