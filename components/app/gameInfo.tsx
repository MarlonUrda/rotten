import mt from "@/styles/mtWind";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "../ui/text";
import { GameDetails } from "@/types/api/games/gameDetails";

interface GameInfoProps {
  game: GameDetails
}

export function GameInfo({ game }: GameInfoProps) {

  const dev = game.developers.map(dev => dev.name).join(", ")
  const genres = game.genres.map(genre => genre.name).join(", ")
  const platforms = game.platforms.map(platform => platform.platform.name).join(", ")

  const cutDescription = (description: string, word: string) => {
    const index = description.indexOf(word)
    if (index !== -1){
      return description.slice(index + word.length).trim()
    }

    return description
  }

  const description = cutDescription(game.description_raw, "Español")

  return (
    <>
      <View style={[mt.flexCol, mt.justify("center"), mt.gap(2), mt.pl(3), mt.pr(3)]}>
        <Text weight="bold">
          Fecha de lanzamiento: <Text>{game.released}</Text>
        </Text>
        <Text weight="bold">
          Tiempo de juego: <Text>{game.playtime}h</Text>
        </Text>
        <Text weight="bold">
          Plataformas: <Text>{platforms}</Text>
        </Text>
        <Text weight="bold">
          Desarrollador: <Text>{dev}</Text>
        </Text>
        <Text weight="bold" >
          Generos: <Text>{genres}</Text>
        </Text>
        <Text weight="bold" >
          Sinopsis: <Text>{description}</Text>
        </Text>
      </View>
    </>
  );
}
