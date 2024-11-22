import { View, ScrollView, FlatList } from "react-native";
import { Text } from "../ui/text";
import mt, { generic } from "@/styles/mtWind";
import { GamePreview } from "./GamePreview";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import { StandardGameResponse } from "@/types/api/games/standardGameResponse";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import Loader from "../ui/loader";

interface GamesScrollerProps {
  title: string;
  gamesQuery: UseQueryResult<StandardGameResponse>;
  order?: "date" | "critics";
}

const GamesScroll = ({ title, gamesQuery, order }: GamesScrollerProps) => {
  const sortedGames = useMemo(() => {
    if (!gamesQuery.data?.results) return [];

    const games = [...gamesQuery.data.results];

    if (order === "date") {
      return games.sort(
        (a, b) =>
          new Date(b.released ?? "").getTime() -
          new Date(a.released ?? "").getTime()
      );
    } else if (order === "critics") {
      return games.sort(
        (a, b) => (b.mt_rating_user ?? 0) - (a.mt_rating_user ?? 0)
      );
    }

    return games;
  }, [gamesQuery.data, order]);

  return (
    <View>
      <View style={[mt.p(4), mt.flexRow]}>
        <View
          style={[
            mt.p(1),
            mt.border(4),
            mt.rotate(-3),
            mt.backgroundColor("white"),
          ]}
        >
          <Text size="xl" weight="black" style={[mt.fontWeight("black")]}>
            {title}
          </Text>
        </View>
      </View>
      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          mt.flexRow,
          mt.gap(5),
          mt.overflow("hidden"),
          mt.p(4),
          mt.pt(0)
        ]}
        data={sortedGames}
        keyExtractor={(item) => item.external_id.toString()}
        renderItem={({ item }) => {
          return <GamePreview game={item} title={item.name} key={item.external_id}/>
        }}
        ListHeaderComponent={gamesQuery.isPending ? <Loader />: null}
      />
    </View>
  );
};

export default GamesScroll;
