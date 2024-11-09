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
import "../util/sheet"
import { type GameDetails } from "@/types/api/games/gameDetails";

interface GameDetailsProps {
  game: GameDetails
}

export function GameDetails({ game }: GameDetailsProps) {
  return (
    <Animated.View
      layout={LinearTransition}
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={[mt.flexCol, mt.gap(4), mt.justify("center")]}
    >
      <View style={[mt.pt(10), mt.mb(20)]}>
        <View>
          <Image
            source={{ uri: game.background_image }}
            style={[mt.w("full"), mt.h(72), mt.resize("cover")]}
          />
    
          <Text weight="black" size="2xl" style={[mt.align("center")]}>
            {game.name}
          </Text>
        </View>
      </View>
      <Animated.View
        layout={LinearTransition}
        style={[
          mt.w("full"),
          mt.backgroundColor("blueOpacity", 900, 0.6),
          mt.rounded("base"),
          mt.flexRow,
          mt.justify("space-between"),
          mt.gap(4),
          mt.p(3),
        ]}
      >
        <GameInfo game={game}/>
      </Animated.View>
      <Animated.View>
        <ButtonWrapper />
      </Animated.View>
    </Animated.View>
  );
}
