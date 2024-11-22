import { ScrollView, View } from "react-native";
import { GameDetails } from "@/components/app/gameDetails";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { useEffect } from "react";
import Loader from "@/components/ui/loader";
import mt from "@/styles/mtWind";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams() as { id: string };
  const queryClient = useQueryClient()

  const getGameQuery = useQuery({
    queryKey: ["game", id],
    queryFn: () => GamesController.getGame({ id }),
  });

  useEffect(() => {
    if(getGameQuery.isSuccess){
      queryClient.invalidateQueries({ queryKey: ["games", "popular"] })
    }
    console.log(getGameQuery.data);
  }, [getGameQuery]);

  return (
    <View>
      {getGameQuery.data && (
        <ScrollView>
          <GameDetails game={getGameQuery.data} />
        </ScrollView>
      )}
      {getGameQuery.isLoading && (
        <Animated.View
          entering={SlideInLeft}
          exiting={SlideOutRight}
          style={[
            mt.w("full"),
            mt.h("full"),
            mt.flexCol,
            mt.justify("center"),
            mt.items("center"),
          ]}
        >
          <Loader size="large" />
        </Animated.View>
      )}
    </View>
  );
}
