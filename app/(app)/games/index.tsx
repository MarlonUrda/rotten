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

export default function Index() {
  const user = useAtomValue(userAtom);
  const popularGamesQuery = useQuery<StandardGameResponse>({
    queryKey: ["games", "popular"],
    enabled: false,
  });
  const newGamesQuery = useQuery<StandardGameResponse>({
    queryKey: ["games", "new"],
    enabled: false,
  });
  const highestRatedGamesQuery = useQuery<StandardGameResponse>({
    queryKey: ["games", "highest-rated"],
    enabled: false,
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
  );
}
