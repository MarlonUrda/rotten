import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { View } from "react-native";
import { Image } from "react-native-elements";
import mt from "@/styles/mtWind";
import { Shadow } from "react-native-shadow-2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMemo } from "react";
import { router } from "expo-router";
import type { GamePreview } from "@/types/api/games/gamePreview";
import s from "@/styles/styleValues";
import { ESRBChip } from "./ESRBChip";

interface GamePreviewProps {
  title: string;
  game: GamePreview;
}

export function GamePreview({ title, game }: GamePreviewProps) {
  const gameName = useMemo(() => {
    return (
      game.name.length > 22 ? game.name.slice(0, 20) + "..." : game.name
    ).toUpperCase().replace(/-/g, " ");
  }, [game.name]);
  return (
    <Shadow {...mt.shadow.md}>
      <TouchableOpacity onPress={() => router.push(`/games/${game.id}`)}>
        <View
          style={[
            mt.flexCol,
            mt.gap(4),
            mt.rounded("base"),
            mt.border(4),
            mt.backgroundColor("white"),
            mt.w(56),
            mt.h(96),
            mt.p(4),
            mt.backgroundColor("yellow"),
          ]}
        >
          <View
            style={[
              mt.flexRow,
              mt.gap(2),
              mt.items("center"),
              mt.justify("center"),
            ]}
          >
            <Text
              size="md"
              weight="black"
              style={[mt.fontWeight("black"), mt.flex1]}
            >
              {gameName}
            </Text>

            <View
              style={[
                mt.justify("center"),
                mt.items("center"),
                mt.flex,
                // mt.rotate(7),
              ]}
            >
              <ESRBChip
                rating={game.esrb_rating}
                style={[mt.h(14), mt.w(10)]}
              />
            </View>
          </View>
          <View>
            <Image
              source={{ uri: game.background_image }}
              style={[mt.h(32), mt.w("full"), mt.border(4)]}
            />
          </View>
          <ReleaseDate released={game.released} />

          <Scores
            score={{
              audience: game.metacritic,
              critic: game.metacritic,
            }}
          />
        </View>
      </TouchableOpacity>
    </Shadow>
  );
}
function ReleaseDate({ released }: { released: string }) {
  return (
    <View
      style={[
        mt.flexRow,
        mt.w("full"),
        mt.items("center"),
        mt.justify("center"),
      ]}
    >
      <View
        style={[
          mt.border(2),
          mt.p(1),
          mt.rotate(-3),
          mt.backgroundColor("white"),
        ]}
      >
        <Text size="sm">RELEASED</Text>
      </View>
      <View
        style={[
          mt.border(2),
          mt.p(1),
          mt.rotate(3),
          mt.backgroundColor("white"),
        ]}
      >
        <Text size="lg" weight="black">
          {released}
        </Text>
      </View>
    </View>
  );
}




const getColor = (score: number): "red" | "orange" | "green" => {
  if (score < 50) return "red";
  if (score < 75) return "orange";
  return "green";
}

function Scores({
  score,
}: {
  score: {
    audience: number;
    critic: number;
  };
}) {
  return (
    <View
      style={[mt.flexRow, mt.items("center"), mt.justify("center"), mt.gap(2)]}
    >
      <View
        style={[
          mt.flexCol,
          mt.gap(1),
          mt.items("flex-start"),
          mt.justify("center"),
        ]}
      >
        <View
          style={[
            mt.border(2),
            mt.p(1),
            mt.rotate(-3),
            mt.backgroundColor("white"),
          ]}
        >
          <Text size="sm">USER SCORE</Text>
        </View>
        <View
          style={[
            mt.border(2),
            mt.p(2),
            mt.backgroundColor(getColor(score.audience)),
            mt.w(14),
            mt.h(14),
            mt.flexCol,
            mt.items("center"),
            mt.justify("center"),
          ]}
        >
          <Text size="lg" weight="black">
            {score.audience}
          </Text>
        </View>
      </View>

      <View
        style={[
          mt.flexCol,
          mt.gap(1),
          mt.items("flex-start"),
          mt.justify("center"),
        ]}
      >
        <View
          style={[
            mt.border(2),
            mt.p(1),
            mt.rotate(3),
            mt.backgroundColor("white"),
          ]}
        >
          <Text size="sm">CRITIC SCORE</Text>
        </View>

        <View
          style={[
            mt.border(2),
            mt.p(2),
            mt.backgroundColor(getColor(score.audience)),
            mt.w(14),
            mt.h(14),
            mt.flexCol,
            mt.items("center"),
            mt.justify("center"),
          ]}
        >
          <Text size="lg" weight="black">
            {score.audience}
          </Text>
        </View>
      </View>
    </View>
  );
}
