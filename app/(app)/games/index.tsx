import GamesScroll from "@/components/app/gamesScroll";
import mt from "@/styles/mtWind";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/app/navbar";
import { GamePreviewType } from "@/types/api/games/gamePreview";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { PlaylistController } from "@/api/controllers/PlaylistController";
import { Playlist, SimplePlaylist } from "@/types/Playlist";

export default function Index() {
  const user = useAtomValue(userAtom);
  const popularGamesQuery = useQuery({
    queryKey: ["games", "popular"],
    queryFn: GamesController.getPopularGames,
  });

  const simplePlaylistQuery = useQuery<SimplePlaylist>({
    queryKey: ["playlist", "simple"],
    queryFn: PlaylistController.getSimplePlaylist,
  });

  const inPlaylist = useMemo(() => {
    console.log("simplePlaylistQuery", simplePlaylistQuery.data?.gameIds);
    return simplePlaylistQuery.data?.gameIds || [];
  }, [simplePlaylistQuery.data]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[mt.pt(12), mt.p(2)]}>
        <Navbar />
        <GamesScroll
          title="Popular Games"
          gamesQuery={popularGamesQuery}
          inPlaylist={inPlaylist}
          playlistQuery={simplePlaylistQuery}
        />
        {/* <GamesScroll
          title="MTCritics"
          gamesQuery={popularGamesQuery}
          inPlaylist={inPlaylist}
        />
        <GamesScroll
          title="Newest"
          gamesQuery={popularGamesQuery}
          inPlaylist={inPlaylist}
        /> */}
      </View>
    </ScrollView>
  );
}
