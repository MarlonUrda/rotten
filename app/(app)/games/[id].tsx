import { ScrollView, View } from "react-native";
import { GameDetails } from "@/components/app/gameDetails";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { useEffect } from "react";

export default function DetailsScreen() {

  const { id } = useLocalSearchParams()

  const numberId = Number(id)

  console.log(id);

  const getGameQuery = useQuery({
    queryKey: ["game", id],
    queryFn: () => GamesController.getGame({ id: numberId }),
  })

  useEffect(() => {
    console.log(getGameQuery.data)
  }, [getGameQuery])

  return (
    <ScrollView>
      <Animated.View
        layout={LinearTransition}
        entering={SlideInLeft}
        exiting={SlideOutRight}
      >
        {getGameQuery.data && <GameDetails game={getGameQuery.data} />}
      </Animated.View>
    </ScrollView>
  );
}
