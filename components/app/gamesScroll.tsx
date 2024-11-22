import { View, ScrollView } from "react-native";
import { Text } from "../ui/text";
import mt, { generic } from "@/styles/mtWind";
import { GamePreview, HoldGamePreview } from "./GamePreview";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import { StandardGameResponse } from "@/types/api/games/standardGameResponse";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";

interface GamesScrollerProps {
  title: string;
  gamesQuery: UseQueryResult<StandardGameResponse>;
}

const GamesScroll = ({ title, gamesQuery }: GamesScrollerProps) => {
  return (
    <View>
      <View style={[mt.p(4), mt.flexRow]}>
        <View
          style={[
            mt.p(1),
            mt.border(4),
            mt.rotate(-3),
            mt.backgroundColor("white")
          ]}
        >

          <Text size="xl" weight="black"
            style={[mt.fontWeight("black")]}
          >
            {title}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          mt.flexRow,
          mt.gap(5),
          mt.overflow("hidden"),
          mt.p(4),
          mt.pt(0),
        ]}
        style={[]}
      >
        {gamesQuery.data?.results.map((game) => (
            <GamePreview game={game} title={game.name} key={game.external_id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default GamesScroll;
