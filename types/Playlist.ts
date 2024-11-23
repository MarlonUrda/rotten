import z from 'zod'
import { gamePreview } from './api/games/gamePreview'
import { gameDetails } from './api/games/gameDetails'

export const playlistSchema = z.object({
  _id: z.string(),
  gameIds: z.array(gamePreview),
  userId: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(), 
    _id: z.string(),
  })
})

export const simplePlaylistSchema = z.object({
  _id: z.string(),
  gameIds: z.array(z.string()),
  userId: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(), 
    _id: z.string(),
  })
})

export type Playlist = z.infer<typeof playlistSchema>
export type SimplePlaylist = z.infer<typeof simplePlaylistSchema>