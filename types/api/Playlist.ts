import z from 'zod'
import { playlistSchema } from '../Playlist';

export interface getPlaylist {
  userId: string;
}

export interface addOrRemoveGameToPlaylist {
  gameId: string;
}

export const getPlaylistResponseSchema = z.object({
  playlist: playlistSchema.optional(),
})

export const addToPlaylistResponseSchema = z.object({
  _id: z.string(),
})

export const removeFromPlaylistResponseSchema = z.object({
  _id: z.string(),
})

export type getPlaylistResponse = z.infer<typeof getPlaylistResponseSchema>
export type addToPlaylistResponse = z.infer<typeof addToPlaylistResponseSchema>
export type removeFromPlaylistResponse = z.infer<typeof removeFromPlaylistResponseSchema>