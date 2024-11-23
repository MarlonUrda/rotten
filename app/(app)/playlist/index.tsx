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
import Animated, { LinearTransition, SlideInLeft, SlideOutRight, ZoomIn, ZoomOut } from "react-native-reanimated";
import { SimpleNavbar } from "@/components/app/simpleNavbar";
import { useRouter } from "expo-router";
import { Title } from "@/components/ui/Title";

export default function PlaylistScreen() {
  const user = useAtomValue(userAtom);
  const router = useRouter();

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
      <Title size="2xl" 
      color="white"
        title={`${user?.firstName}'s Playlist`}
      >
      </Title>
      <View style={[mt.flex1, mt.w("full")]}>
        {playlistQuery.isPending && 
          <Animated.View style={[mt.w("full"), mt.flex1, mt.items("center"), mt.justify("center")]}
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Loader size="large" />
          </Animated.View>
        }
        {playlistQuery.data && playlistQuery.data.gameIds.length > 0 && (
          <Animated.View style={[mt.w("full"), mt.flex1, mt.borderTop(2)]}
            layout={LinearTransition}
            entering={SlideInLeft}
            exiting={SlideOutRight}
          >
            <Animated.FlatList
              data={playlistQuery.data.gameIds}
              keyExtractor={(item) => item._id.toString()}
              style={[mt.flex1, mt.w("full")]}
              
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
              contentContainerStyle={[mt.p(4), mt.w("full"), mt.gap(6)]}
            />
            <View
              style={[mt.p(4), ]}
            >

              <Button
                onPress={() => {
                  router.push("/games/search");
                }}
                variant="success"
              >
                <Text>
                  Explore
                </Text>
              </Button>
            </View>
          </Animated.View>
        )}

        {/* not loading and empty */}
        {playlistQuery.isSuccess && playlistQuery.data && playlistQuery.data.gameIds.length === 0 && (
          <Animated.View style={[mt.w("full"), mt.flex1, mt.items("center"), mt.justify("center")]}>
            <EmptyPlaylist playlistQuery={playlistQuery} />
          </Animated.View>
        )}

        
      </View>

    </View>
  );
}
