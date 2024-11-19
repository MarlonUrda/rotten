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
import mt from "@/styles/mtWind";
import { GameInfo } from "./gameInfo";
import "../util/sheet";
import { type GameDetails } from "@/types/api/games/gameDetails";
import { Shadow } from "react-native-shadow-2";
import { SheetManager } from "react-native-actions-sheet";
import React from "react";
import { ReviewController } from "@/api/controllers/ReviewController";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface GameDetailsProps {
  game: GameDetails;
}

export function GameDetails({ game }: GameDetailsProps) {
  useQuery({
    queryKey: ["comments", game._id],
    queryFn: () => ReviewController.getGameReviews(game._id),
  });
  const router = useRouter();

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
        <Button
          variant="secondary"
          onPress={() => {
            SheetManager.show("commentSheet", {
              payload: {
                gameId: game._id,
              },
            });            
          }}
        >
          <Text>Ver comentarios</Text>
        </Button>
      </Animated.View>
    </Animated.View>
  );
}

function GameHeader({ title, image }: { title: string; image: string }) {
  const router = useRouter();

  return (
    <View>
      <View
        style={[
          mt.w("full"),
          mt.h(72),
          mt.position("relative"),
          mt.borderBottom(4),
          mt.flexCol,
          mt.justify("space-between"),
          mt.items("flex-end"),
          mt.p(4),
        ]}
      >
        <View style={[mt.position("absolute"), mt.inset(0)]}>
          <Image source={{ uri: image }} style={[mt.w("full"), mt.h("full")]} />
        </View>
        <View
          style={[mt.w("full"), mt.flexRow, mt.justify("flex-start"), mt.mt(4)]}
        >
          <Button onPress={() => router.back()} variant="error">
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Button>
        </View>
        <GameTitle title={title} />
      </View>
    </View>
  );
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
