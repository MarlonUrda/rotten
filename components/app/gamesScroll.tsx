import { View, ScrollView, FlatList } from "react-native";
import { Text } from "../ui/text";
import mt, { generic } from "@/styles/mtWind";
import { GamePreview } from "./GamePreview";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import { StandardGameResponse } from "@/types/api/games/standardGameResponse";
import { useCallback, useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import Loader from "../ui/loader";
import { Playlist, SimplePlaylist } from "@/types/Playlist";
import { EmptySplash } from "./emptyComentariesSplash";


interface GamesScrollerProps {
  title: string;
  gamesQuery: UseQueryResult<StandardGameResponse>;
  inPlaylist: string[];
  playlistQuery: UseQueryResult<SimplePlaylist>;
}

const GamesScroll = ({ title, gamesQuery, inPlaylist}: GamesScrollerProps) => {
  const isListed = useCallback((gameId: string) => {
    return inPlaylist.includes(gameId);
  }, [inPlaylist]);

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
      <View
        style={[
          mt.w("full"),
          mt.h(100),
          mt.flexRow,
          mt.justify("center"),
          mt.items("center"),
        ]}
      >

        {
          gamesQuery.isSuccess && gamesQuery.data?.results.length > 0 && (

            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                mt.flexRow,
                mt.gap(5),
                mt.overflow("hidden"),
                mt.p(4),
                mt.pt(0),
                mt.h("full")
              ]}
              data={gamesQuery.data?.results || []}
              keyExtractor={(item) => item.external_id.toString()}
              renderItem={({ item }) => {
                return <GamePreview game={item} title={item.name} key={item.external_id}
      
                  isListed={isListed(item._id) || isListed(item.external_id.toString())}
                
      
                />
              }}
              
            />

          ) 
        }
        {
          gamesQuery.isSuccess && gamesQuery.data?.results.length === 0 && (
            <EmptySplash
              title="No games found"
              subtitle="Let's try another search"
            />
          )
        }
        {
          gamesQuery.isLoading && (
            <Loader size="large" />
          )
        }
        {
          gamesQuery.isError && (
            <Text style={[mt.fontWeight("bold"), mt.color("red")]}>
              Error loading games
            </Text>
          )
        }
      </View>

    </View>
  );
};

export default GamesScroll;
