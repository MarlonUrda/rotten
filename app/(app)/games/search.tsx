import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { GamePreview } from "@/components/app/GamePreview";
import { SimpleInput } from "@/components/forms/formsUtils/SimpleInput";
import { Button } from "@/components/ui/button";
import { SimpleNavbar } from "@/components/app/simpleNavbar";
import mt from "@/styles/mtWind";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { FlatList } from "react-native";
import Loader from "@/components/ui/loader";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { SearchFilterSheet } from "@/components/app/searchFilterSheet";
import { SearchGameQuery } from "@/types/api/games/getGameRequest";
import { SheetManager } from "react-native-actions-sheet";

interface SearchQuery {
  query?: string;
  year?: number;
  minYear?: number;
  maxYear?: number;
  minRating?: number;
  maxRating?: number;
  genres?: number[];
  platforms?: number[];
}

export default function Screen() {
  const [searchQuery, setSearchQuery] = useState<SearchGameQuery>({});

  const showFilterSheet = async () => {
    const newFilters = await SheetManager.show("searchFilterSheet", {
      payload: searchQuery,
    })
    setSearchQuery((prev) => ({ ...prev, ...newFilters }));
  }

  const searchInfiniteQuery = useInfiniteQuery({
    queryKey: ["games", { searchQuery }],
    queryFn: async ({ pageParam }) => {

      console.log("pageParam", pageParam);
      if (!canSearch) {
        return {
          results: [],
          count: 0,
          next: undefined,
        };
      }

      const queryCopy: Record<string, string | undefined> = { 
        ...searchQuery,
        year: searchQuery.year?.toString() ?? undefined,
        minYear: searchQuery.minYear?.toString() ?? undefined,
        maxYear: searchQuery.maxYear?.toString() ?? undefined,

      };

      const response = await GamesController.searchGames({
        ...searchQuery,
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

  const canSearch = useMemo(() => {
    return (
      (searchQuery.query?.length ?? 0) > 3 && (searchQuery.query?.length ?? 0) < 100
    ) || Object.keys(searchQuery).some(
      (key) => key !== "query" && searchQuery[key as keyof SearchGameQuery] !== undefined
    );
  }, [searchQuery.query]);

  return (
    <View
      style={[
        mt.flex1,
        mt.justify("flex-start"),
        mt.items("center"),

        mt.w("full"),
      ]}
    >
      <SimpleNavbar />
      <View style={[mt.p(4), mt.flexCol, mt.flex1, mt.gap(4), mt.w("full")]}>
        <View
          style={[
            mt.flexCol,
            mt.gap(2),
            mt.w("full"),
            mt.justify("center"),
            mt.items("center"),
          ]}
        >

          <View
            style={[
              mt.flexRow,
              mt.items("center"),
              mt.justify("center"),
              mt.gap(2),
              mt.h(12),
              mt.w("full"),
            ]}
          >
            <SimpleInput
              placeholder="Search for games"
              inputStyle={[mt.w(56)]}
              onChangeText={(text) => {
                setSearchQuery((prev) => ({ ...prev, query: text }));
              }}
              value={searchQuery.query ?? ""}
            />
            <Button
              onPress={() => {
                searchInfiniteQuery.refetch();
              }}
              disabled={!canSearch}
            >
              <MaterialCommunityIcons name="magnify" size={24} color="black" />
            </Button>
            {/* filters */}
            <Button onPress={showFilterSheet}>
              <MaterialCommunityIcons name="filter" size={24} color="black" />
            </Button>
          </View>
          <QueryText query={searchQuery} />
        </View>

        <View style={[mt.flex1, mt.w("full"), mt.borderTop(2)]}>
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
              style={[
                mt.flex1,
                mt.justify("center"),
                mt.items("center"),
                mt.w("full"),
              ]}
            >
              <FlatList
                data={items}
                renderItem={({ item }) => (
                  <GamePreview game={item} title="" direction="row" />
                )}
                keyExtractor={(item) => item.external_id.toString()}
                style={[mt.flex1, mt.w("full")]}
                onEndReached={() => {
                  searchInfiniteQuery.fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
                contentContainerStyle={[mt.gap(4), mt.w("full"), mt.p(2)]}
              />
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

function QueryText(
  {query}: {query: SearchGameQuery}
) {
  // show the query (minus the query.query) so the user can see what filters are applied
  return (
    <View
      style={[
        mt.flexRow,
        mt.flexWrap,
        mt.gap(2),
        mt.items("flex-start"),
        mt.justify("flex-start"),
        mt.w("full"),
      ]}

    >
      <Text
        style={[
          mt.fontWeight("bold"),
          mt.color("black"),
        ]}
      >
        {Object.keys(query).length > 1
         ? "Filters:" : "No filters applied"}
      </Text>
      {Object.keys(query).map((key) => {
        if (key === "query") {
          return null;
        }
        return (
          <Text key={key}>
            <Text
              style={[
                mt.fontWeight("bold"),
                mt.color("black"),
              ]}
            >{key.toLocaleUpperCase()}</Text>: {query[key as keyof SearchGameQuery]}
          </Text>
        );
      })}
    </View>
  );
}
