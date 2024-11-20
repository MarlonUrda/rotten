import z from 'zod'
import { gamePreview } from './api/games/gamePreview'

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

export type Playlist = z.infer<typeof playlistSchema>