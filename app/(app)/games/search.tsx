import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { GamePreview } from "@/components/app/GamePreview";
import { SimpleInput } from "@/components/forms/formsUtils/SimpleInput";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native";
import { SimpleNavbar } from "@/components/app/simpleNavbar";
import mt from "@/styles/mtWind";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { FlatList } from "react-native";
import Loader from "@/components/ui/loader";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

export default function Screen() {
  const [query, setQuery] = useState("");

  const searchInfiniteQuery = useInfiniteQuery({
    queryKey: ["games", { query }],
    queryFn: async ({ pageParam }) => {

      console.log("pageParam", pageParam);
      if (!query || query.length > 100) {
        return {
          results: [],
          count: 0,
          next: undefined,
        };
      }

      const response = await GamesController.searchGames({
        query,
        page: pageParam.page,
        external_page: pageParam.external_page,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;

      if (!next) {
        return undefined;
      }

      return {
        page: next?.page ?? 0,
        external_page: next?.external_page ?? 0,
      };
    },
    initialPageParam: {
      page: 1,
      external_page: 0,
    },

    enabled: false,
  });

  const items = useMemo(() => {
    return (
      searchInfiniteQuery.data?.pages.map((page) => page.results ?? []).flat() ?? []
    );
  }, [searchInfiniteQuery.data]);

  return (
    <View
      style={[
        mt.flex1,
        mt.justify("flex-start"),
        mt.items("center"),
      ]}
    >
      <SimpleNavbar />
      <View style={[mt.p(4), mt.flexCol, mt.flex1, mt.gap(4)]}>
        <View
          style={[
            mt.flexRow,
            mt.items("center"),
            mt.justify("center"),
            mt.gap(2),
            mt.h(12),
          ]}
        >
          <SimpleInput
            placeholder="Search for games"
            inputStyle={[mt.w(56)]}
            onChangeText={setQuery}
            value={query}
          />
          <Button
            onPress={() => {
              searchInfiniteQuery.refetch();
            }}
          >
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
          </Button>
          {/* filters */}
          <Button>
            <MaterialCommunityIcons name="filter" size={24} color="black" />
          </Button>
        </View>
        <View
          style={[
            mt.flex1,
            mt.justify("center"),
            mt.items("center"),
          ]}
        >
          {searchInfiniteQuery.isLoading && (
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[mt.flex1, mt.justify("center"), mt.items("center")]}
            >
              <Loader />
            </Animated.View>
          )}
          {searchInfiniteQuery.isError && (
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[mt.flex1, mt.justify("center"), mt.items("center")]}
            >
              <Text style={[mt.fontWeight("bold"), mt.color("red")]}>
                Error loading games
              </Text>
            </Animated.View>
          )}
          {searchInfiniteQuery.isSuccess && items.length === 0 && (
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[mt.flex1, mt.justify("center"), mt.items("center")]}
            >
              <Text>No games found</Text>
            </Animated.View>
          )}
          {searchInfiniteQuery.isSuccess && items.length > 0 && (
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[mt.flex1, mt.justify("center"), mt.items("center")]}
            >
              <FlatList
                data={items}
                renderItem={({ item }) => <GamePreview game={item} title="" />}
                keyExtractor={(item) => item.external_id.toString()}
                style={[mt.flex1]}
                onEndReached={() => {
                  searchInfiniteQuery.fetchNextPage();
                }}
                onEndReachedThreshold={0.2}
              />
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}
