import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
{
}
import { View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Image } from "react-native-elements";
import mt, { generic } from "@/styles/mtWind";
import { GameInfo } from "./gameInfo";
import { ButtonWrapper } from "./buttonWrapper";
import "../util/sheet";
import { type GameDetails } from "@/types/api/games/gameDetails";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";

interface GameDetailsProps {
  game: GameDetails;
}

export function GameDetails({ game }: GameDetailsProps) {
  return (
    <Animated.View
      layout={LinearTransition}
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={[mt.flexCol, mt.justify("center")]}
    >
      <GameHeader title={game.name} image={game.background_image} />
      <Animated.View
        layout={LinearTransition}
        style={[mt.w("full"), mt.flexRow, mt.gap(4), mt.p(3)]}
      >
        <GameInfo game={game} />
      </Animated.View>
      <Animated.View>
        <ButtonWrapper gameId={game.id} />
      </Animated.View>
    </Animated.View>
  );
}

function GameHeader({title, image} : {title: string, image: string}) {
  return <View>
    <View
      style={[
        mt.w("full"),
        mt.h(72),
        mt.position("relative"),
        mt.borderBottom(4),
        mt.flexCol,
        mt.justify("flex-end"),
        mt.items("flex-end"),
        mt.p(4),
      ]}
    >
      <View style={[mt.position("absolute"), mt.inset(0)]}>
        <Image
          source={{ uri: image }}
          style={[mt.w("full"), mt.h("full")]} />
      </View>
      <GameTitle title={title} />
    </View>
  </View>;
}

function GameTitle({ title }: { title: string }) {
  return (
    <View style={[mt.rotate(3)]}>
      <Shadow {...mt.shadow.mdNoRound}>
        <View style={[mt.p(1), mt.border(4), mt.backgroundColor("white")]}>
          <Text size="xl" weight="black" style={[mt.fontWeight("black")]}>
            {title}
          </Text>
        </View>
      </Shadow>
    </View>
  );
}
