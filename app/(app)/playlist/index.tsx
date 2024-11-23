import { View, ScrollView, FlatList } from "react-native";
import { GamePreview } from "@/components/app/GamePreview";
import { useAtomValue } from "jotai";
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
  const user = useAtomValue(userAtom);

  const playlistQuery = useQuery<Playlist>({
    queryKey: ["playlist", user?._id],
    queryFn: () => {
      if (!user?._id) {
        throw new Error("User ID is undefined");
      }
      return PlaylistController.getPlaylist(user._id);
    },
  });


  return (
    <View
      style={[mt.flexCol, mt.gap(4), mt.justify("center"), mt.items("center"), mt.flex1, mt.w("full")]}
    >
      <SimpleNavbar />
      <Text size="lg" weight="bold" style={[mt.align("center")]}>
        {user?.firstName}'s Playlist
      </Text>
      <View style={[mt.flex1, mt.w("full")]}>
        {playlistQuery.isPending && <Loader />}
        {playlistQuery.data && playlistQuery.data.gameIds.length > 0 && (
          <Animated.View layout={LinearTransition} style={[mt.w("full")]}>
            <FlatList
              data={playlistQuery.data.gameIds}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => {
                return (
                  <GamePreview
                    game={item}
                    title={item.name}
                    key={item.external_id}
                    direction="row"
                    isListed
                  />
                );
              }}
              contentContainerStyle={[mt.flexCol, mt.p(4), mt.w("full"), mt.gap(6)]}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        )}

        {/* not loading and empty */}
        {playlistQuery.isSuccess && playlistQuery.data && playlistQuery.data.gameIds.length === 0 && (
            <Animated.View layout={LinearTransition} style={[mt.w("full"), mt.flex1, mt.items("center"), mt.justify("center")]}>
            <EmptyPlaylist playlistQuery={playlistQuery} />
          </Animated.View>
        )}

        
      </View>

    </View>
  );
}
