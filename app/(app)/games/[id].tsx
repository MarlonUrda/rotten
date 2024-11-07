import { ScrollView, View } from "react-native";
import { GameDetails } from "@/components/app/gameDetails";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";

export default function DetailsScreen() {
  return (
    <ScrollView>
      <Animated.View
        layout={LinearTransition}
        entering={SlideInLeft}
        exiting={SlideOutRight}
      >
        <GameDetails />
      </Animated.View>
    </ScrollView>
  );
}
