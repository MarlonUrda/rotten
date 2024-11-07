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
import { MovieInfo } from "./movieInfo";
import { ButtonWrapper } from "./buttonWrapper";

interface GameDetailsProps {
  //movie: Movie;
}

export function GameDetails() {
  return (
    <Animated.View
      layout={LinearTransition}
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={[mt.flexCol, mt.gap(4), mt.justify("center")]}
    >
      <View style={[mt.pt(10), mt.mb(20)]}>
        <View style={[mt.position("relative")]}>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            style={[mt.w("full"), mt.h(72), mt.resize("cover")]}
          />
          <View style={[mt.position("absolute"), mt.top(16), mt.left(32)]}>
            <Image
              source={require("../../assets/images/adaptive-icon.png")}
              style={[mt.w(36), mt.h(64), mt.resize("cover"), mt.border(4)]}
            />
            <Text weight="black" size="2xl">
              I'm a Poop
            </Text>
          </View>
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
        <MovieInfo />
      </Animated.View>
      <Animated.View>
        <ButtonWrapper />
      </Animated.View>
    </Animated.View>
  );
}
