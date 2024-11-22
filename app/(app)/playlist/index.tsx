import { View, ScrollView } from "react-native";
import { GamePreview } from "@/components/app/GamePreview";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistResponse } from "@/types/api/Playlist";
import { useEffect } from "react";
import mt from "@/styles/mtWind";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { PlaylistController } from "@/api/controllers/PlaylistController";
import Loader from "@/components/ui/loader";
import { EmptyPlaylist } from "@/components/app/emptyPlaylist";
import { Playlist } from "@/types/Playlist";
import Animated, {LinearTransition} from "react-native-reanimated";
import { SimpleNavbar } from "@/components/app/simpleNavbar";

export default function PlaylistScreen() {
  const [currentUser] = useAtom(userAtom)

  const playlistQuery = useQuery<Playlist>({
    queryKey: ["playlist", currentUser?._id],
    queryFn: () => currentUser?._id ? PlaylistController.getPlaylist(currentUser._id) : Promise.reject("User ID is undefined"),
    enabled: !!currentUser?._id
  })

  useEffect(() => {
    console.log(playlistQuery.data)
  }, [playlistQuery])

  const renderGamePreviews = () => {
    if (!playlistQuery.data?.gameIds) return null;

    const rows = [];
    for (let i = 0; i < playlistQuery.data.gameIds.length; i += 2) {
      rows.push(
        <View key={i} style={[mt.flexRow, mt.justify("space-between"), mt.gap(2)]}>
          <GamePreview game={{ ...playlistQuery.data.gameIds[i] }} title={playlistQuery.data.gameIds[i].name} isListed />
          {playlistQuery.data.gameIds[i + 1] && (
            <GamePreview game={{ ...playlistQuery.data.gameIds[i + 1] }} title={playlistQuery.data.gameIds[i + 1].name} isListed />
          )}
        </View> 
      );
    }
    return rows;
  };

  return (
    <View style={[mt.flexCol, mt.gap(4), mt.justify("center"), mt.items("center"), mt.pt(10)]}>
      <SimpleNavbar />
      <Text size="lg" weight="bold" style={[mt.align("center")]}>
        {currentUser?.firstName}'s Playlist
      </Text>
      {playlistQuery.isPending && <Loader />}
      {playlistQuery.data?.gameIds && playlistQuery.data?.gameIds.length > 0 ? (
        <Animated.ScrollView showsVerticalScrollIndicator contentContainerStyle={[mt.flexCol, mt.p(4), mt.w("full"), mt.gap(6)]} layout={LinearTransition}>
          {renderGamePreviews()}
        </Animated.ScrollView>
      ): (
        <EmptyPlaylist playlistQuery={playlistQuery}/>
      )}
    </View>
  );

}