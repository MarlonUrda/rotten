import { gamePreview } from "@/types/api/games/gamePreview";
import { z } from "zod";

export function removeRawgDuplicates(
  games: z.infer<typeof gamePreview>[]
): z.infer<typeof gamePreview>[] {
  const gameMap = new Map<string, z.infer<typeof gamePreview>>();

  games.forEach((game) => {
    const existingGame = gameMap.get(game.external_id.toString());

    if (existingGame) {
      if (existingGame._id === "temp" && game._id !== "temp") {
        gameMap.set(game.external_id.toString(), game);
      }
    } else {
      gameMap.set(game.external_id.toString(), game);
    }
  });

  return Array.from(gameMap.values());
}
