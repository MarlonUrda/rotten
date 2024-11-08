import { Button } from "../ui/button";
import { Text } from "../ui/text";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { View } from "react-native";
import { Image } from "react-native-elements";
import mt from "@/styles/mtWind";
import { Shadow } from "react-native-shadow-2";
import { TouchableOpacity } from "react-native-gesture-handler";
import s from "@/styles/styleValues";
import { ActivityIndicator } from "react-native";
import { useMemo, useState } from "react";
import { MoviePreview as MP } from "@/types/MoviePreview";
import { router } from "expo-router";
import type { GamePreview } from "@/types/api/games/gamePreview";
import { hasSubscribers } from "diagnostics_channel";

interface GamePreviewProps {
  title: string;
  game: GamePreview;
}

export function GamePreview({ title, game }: GamePreviewProps) {
  const gameName = useMemo(() => {
    return game.name.length > 20 ? game.name.slice(0, 18) + "..." : game.name;
  }, [game.name]);
  return (
    <Shadow {...mt.shadow.md}>
      <View
        style={[
          mt.flexCol,
          mt.gap(4),
          mt.rounded("base"),
          mt.border(2),
          mt.backgroundColor("white"),
          mt.w(48),
          mt.p(4),
        ]}
      >
        <TouchableOpacity onPress={() => router.push(`/games/${game.id}`)}>
          <View>
            <Image
              source={{ uri: game.background_image }}
              style={[
                mt.h(40),
                mt.w("full"),
                mt.rounded("md"),
                mt.border(2),
              ]}
            />
          </View>
        </TouchableOpacity>
        <View style={[mt.flexRow, mt.justify("space-between")]}>
          <View style={[mt.flexRow, mt.gap(1)]}>
            <Image
              source={require("../../assets/images/icon1.png")}
              style={{
                height: 16,
                width: 16,
                resizeMode: "contain",
                marginTop: 3,
              }}
            />
            <Text weight="bold">{game.metacritic}%</Text>
          </View>
          <View style={[mt.flexRow, mt.gap(1)]}>
            <Image
              source={require("../../assets/images/icon2.png")}
              style={{
                height: 16,
                width: 16,
                resizeMode: "contain",
                marginTop: 3,
              }}
            />
            <Text weight="bold">76%</Text>
          </View>
        </View>
        <Text size="md" weight="normal">
          {gameName}
        </Text>

        <View>
          <Button
            variant="primary"
            onPress={() => console.log(`Pelicula ${title} agregada`)}
          >
            <Text weight="bold" size="md">
              Agregar
            </Text>
          </Button>
        </View>
      </View>
    </Shadow>
  );
}
