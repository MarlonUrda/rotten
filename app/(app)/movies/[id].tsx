import { ScrollView, View } from "react-native";
import { MovieDetails } from "@/components/app/movieDetails";
import Animated, {LinearTransition, SlideInLeft, SlideOutRight} from "react-native-reanimated";

export default function DetailsScreen() {
  return (
    <ScrollView>
      <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutRight}>
        <MovieDetails />
      </Animated.View>
    </ScrollView>
  )
}