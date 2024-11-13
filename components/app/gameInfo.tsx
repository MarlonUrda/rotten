import mt, { MTTypes } from "@/styles/mtWind";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "../ui/text";
import { GameDetails } from "@/types/api/games/gameDetails";
import Animated from "react-native-reanimated";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";

interface GameInfoProps {
  game: GameDetails;
}

export function GameInfo({ game }: GameInfoProps) {
  const dev = game.developers.map((dev) => dev.name).join(", ");
  const genres = game.genres.map((genre) => genre.name).join(", ");
  const platforms = game.platforms
    .map((platform) => platform.platform.name)
    .join(", ");

  const cutDescription = (description: string, word: string) => {
    const index = description.indexOf(word);
    if (index !== -1) {
      return description.slice(index + word.length).trim();
    }

    return description;
  };

  const description = cutDescription(game.description_raw, "Español");

  return (
    <>
      <View style={[mt.flexCol, mt.justify("center"), mt.gap(8), mt.p(4)]}>
        <Animated.View
          style={[
            mt.flexCol,
            mt.gap(4),
            mt.justify("flex-start"),
            mt.items("flex-start"),
          ]}
        >
          <Title title={"Informacion del juego"} color="yellow"></Title>
          <View style={[mt.border(2), mt.p(2)]}>
            <Text weight="bold">
              Fecha de lanzamiento: <Text>{game.released}</Text>
            </Text>
            <Text weight="bold">
              Plataformas: <Text>{platforms}</Text>
            </Text>
            <Text weight="bold">
              Desarrollador: <Text>{dev}</Text>
            </Text>
            {/* <Text weight="bold">
              Generos: <Text>{genres}</Text>
            </Text> */}
            <Text weight="bold">
              Tiempo de juego: <Text>{game.playtime}h</Text>
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            mt.flexCol,
            mt.gap(4),
            mt.justify("flex-start"),
            mt.items("flex-start"),
          ]}
        >
          <Title title={"Sinopsis"} color="blue"></Title>
          <View style={[mt.border(2), mt.p(2)]}>

            <Text weight="bold">
              <Text>{description}</Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
}

function Title({ title, color }: { title: string, color: MTTypes["Color"] }) {
  return (
      <View
        style={[
          mt.p(1),
          mt.px(2),
          mt.border(2),
          mt.backgroundColor(color),
          mt.rotate(-3),
        ]}
      >
        <Text size="lg" weight="black" style={[mt.fontWeight("bold")]}>
          {title}
        </Text>
      </View>
  );
}
