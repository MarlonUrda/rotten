import { View, ScrollView, FlatList } from "react-native";
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
import Animated, { LinearTransition } from "react-native-reanimated";
import { SimpleNavbar } from "@/components/app/simpleNavbar";

export default function PlaylistScreen() {
  const [currentUser] = useAtom(userAtom);

  const playlistQuery = useQuery<Playlist>({
    queryKey: ["playlist", currentUser?._id],
    queryFn: () =>
      currentUser?._id
        ? PlaylistController.getPlaylist(currentUser._id)
        : Promise.reject("User ID is undefined"),
  });

  useEffect(() => {
    console.log(playlistQuery.data);
  }, [playlistQuery.data]);

  return (
    <View style={[mt.flexCol, mt.gap(4), mt.justify("center"), mt.items("center"), mt.pt(16)]}>
      <SimpleNavbar />
      <Text size="lg" weight="bold" style={[mt.align("center")]}>
        {currentUser?.firstName}'s Playlist
      </Text>
      {playlistQuery.isPending && <Loader />}
      {playlistQuery.data?.gameIds && playlistQuery.data?.gameIds.length > 0 ? (
        <Animated.View layout={LinearTransition} style={[mt.w("full")]}>
          <FlatList
            data={playlistQuery.data.gameIds}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => {
              return <GamePreview game={item} title={item.name} key={item.external_id} direction="row" isListed/>
            }}
            contentContainerStyle={[mt.flexCol, mt.p(4), mt.w("full"), mt.gap(6)]}
            showsVerticalScrollIndicator={false}
          />
      </Animated.View>
      ): (
        <EmptyPlaylist playlistQuery={playlistQuery}/>
      )}
    </View>
  );
}
