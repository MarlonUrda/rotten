import GamesScroll from "@/components/app/gamesScroll";
import mt from "@/styles/mtWind";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Navbar } from "@/components/app/navbar";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { PlaylistController } from "@/api/controllers/PlaylistController";
import { SimplePlaylist } from "@/types/Playlist";
import { StandardGameResponse } from "@/types/api/games/standardGameResponse";
import Bg from "@/components/app/Bg";

export default function Index() {
  const user = useAtomValue(userAtom);
  const popularGamesQuery = useQuery<StandardGameResponse>({
    queryKey: ["games", "popular"],
  });
  const newGamesQuery = useQuery<StandardGameResponse>({
    queryKey: ["games", "new"],
  });
  const highestRatedGamesQuery = useQuery<StandardGameResponse>({
    queryKey: ["games", "highest-rated"],
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
    <View
      style={[mt.flex1]}
    >

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[mt.p(2)]}>
          <Navbar />
          <GamesScroll
            title="Popular Games"
            gamesQuery={popularGamesQuery}
            inPlaylist={inPlaylist}
            playlistQuery={simplePlaylistQuery}
          />
          <GamesScroll
            title="MTCritics' Favorites"
            gamesQuery={highestRatedGamesQuery}
            inPlaylist={inPlaylist}
            playlistQuery={simplePlaylistQuery}
          />
          <GamesScroll
            title="Newest"
            gamesQuery={newGamesQuery}
            inPlaylist={inPlaylist}
            playlistQuery={simplePlaylistQuery}
          />
        </View>
      </ScrollView>
    </View>
  );
}
