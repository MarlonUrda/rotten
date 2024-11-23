import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { GamePreview } from "@/components/app/GamePreview";
import { SimpleInput } from "@/components/forms/formsUtils/SimpleInput";
import { Button } from "@/components/ui/button";
import { SimpleNavbar } from "@/components/app/simpleNavbar";
import mt from "@/styles/mtWind";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { FlatList } from "react-native";
import Loader from "@/components/ui/loader";
import Animated, { ZoomIn, ZoomOut, LinearTransition, SlideInLeft, SlideOutRight, SlideOutLeft } from "react-native-reanimated";
import { SearchFilterSheet } from "@/components/app/searchFilterSheet";
import { SearchGameQuery } from "@/types/api/games/getGameRequest";
import { SheetManager } from "react-native-actions-sheet";
import { removeRawgDuplicates } from "@/hooks/removeRawgDuplicates";
import { useDebouncedInput } from "./useDebouncedInput";
import { platforms } from "@/components/util/statics/platforms";
import { genres } from "@/components/util/statics/genres";
import { FlashList } from "@shopify/flash-list";

export default function Screen() {
  const [searchQuery, setSearchQuery] = useState<SearchGameQuery>({});
  const [debouncedText, text, setDebouncedText] = useDebouncedInput("", 500);

  useEffect(() => {
    setSearchQuery((prev) => ({ ...prev, query: debouncedText }));
  }, [debouncedText]);

  const showFilterSheet = async () => {
    const newFilters = await SheetManager.show("searchFilterSheet", {
      payload: searchQuery,
    });
    if (!newFilters) {
      return;
    }
    if (newFilters.clear) {
      setSearchQuery((prev) => ({ query: prev.query }));
      return;
    }
    setSearchQuery((prev) => ({ ...prev, ...newFilters.filters }));
  };

  const searchInfiniteQuery = useInfiniteQuery({
    queryKey: ["games", { searchQuery }],
    queryFn: async ({ pageParam }) => {
      console.log("searchQuery", searchQuery);

      const response = await GamesController.searchGames({
        ...searchQuery,
        page: pageParam.page,
        external_page: pageParam.external_page,
      });
      return response;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
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

    enabled: true,
  });

  const items = useMemo(() => {
    return removeRawgDuplicates(
      searchInfiniteQuery.data?.pages
        .map((page) => page.results ?? [])
        .flat() ?? []
    );
  }, [searchInfiniteQuery.data]);

  return (
    <Animated.View layout={LinearTransition}
      style={[
        mt.flex1,
        mt.justify("flex-start"),
        mt.items("center"),

        mt.w("full"),
      ]}
    >
      <SimpleNavbar />
      <Animated.View layout={LinearTransition} style={[mt.p(4), mt.flexCol, mt.flex1, mt.gap(4), mt.w("full")]}>
        <Animated.View layout={LinearTransition}
          style={[
            mt.flexCol,
            mt.gap(2),
            mt.w("full"),
            mt.justify("center"),
            mt.items("center"),
          ]}
        >
          <Animated.View layout={LinearTransition}
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
              value={text}
              onChangeText={setDebouncedText}
            />
            <Button
              onPress={() => {
                searchInfiniteQuery.refetch();
              }}
            >
              <MaterialCommunityIcons name="magnify" size={24} color="black" />
            </Button>
            <Button onPress={showFilterSheet}>
              <MaterialCommunityIcons name="filter" size={24} color="black" />
            </Button>
          </Animated.View>
          <QueryText query={searchQuery} />
        </Animated.View>

        <Animated.View layout={LinearTransition} style={[mt.flex1, mt.w("full"), mt.borderTop(2)]}>
          {searchInfiniteQuery.isLoading && (
            <Animated.View
              layout={LinearTransition}
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[mt.flex1, mt.justify("center"), mt.items("center")]}
            >
              <Loader size="large" />
            </Animated.View>
          )}
          {searchInfiniteQuery.isError && (
            <Animated.View
              layout={LinearTransition}
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
              layout={LinearTransition}
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[mt.flex1, mt.justify("center"), mt.items("center")]}
            >
              <Text>No games found</Text>
            </Animated.View>
          )}
          {searchInfiniteQuery.isSuccess && items.length > 0 && (
            <Animated.View
              layout={LinearTransition}
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
                  if (searchInfiniteQuery.hasNextPage)
                    searchInfiniteQuery.fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
                contentContainerStyle={[mt.gap(4), mt.w("full"), mt.p(2)]}
              />
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

function QueryText({ query }: { query: SearchGameQuery }) {
  // show the query (minus the query.query) so the user can see what filters are applied
  const [viewQuery, setViewQuery] = useState(false)
  return (
    <Animated.View layout={LinearTransition}
      style={[
        mt.flexCol,
        mt.flexWrap,
        mt.gap(2),
        mt.items("flex-start"),
        mt.justify("flex-start"),
        mt.w("full"),
      ]}
    >
      <TouchableOpacity>
        <Text
          style={[
            mt.fontWeight("bold"),
            mt.color("black"),
            mt.color(viewQuery ? "blue" : "red", 600),
          ]}
          onPress={() => setViewQuery((prev) => !prev)}
        >
          {viewQuery ? "Hide query" : "Show query"}
        </Text>
      </TouchableOpacity>
      {viewQuery && 
      <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
        {query.year && (
          <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
            <Text>Year: {query.year}</Text>
          </Animated.View>
        )}
        {(query.minYear || query.maxYear) && (
          <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
            <Text>Year range: {query.minYear ?? "1975"} - {query.maxYear ?? "now"}</Text>
          </Animated.View>
        )}
        {query.platforms && (
          <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
            <Text>
              Platforms: {query.platforms.split(",").map((platform) => platforms.find((p) => p.id === parseInt(platform))?.name).join(", ")}
            </Text>
          </Animated.View>
        )}
        {query.genres && (
          <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
            <Text>
              Genres: {query.genres.split(",").map((genre) => genres.find((g) => g.id === parseInt(genre))?.name).join(", ")}
            </Text>
          </Animated.View>
        )}
        {(query.minRating || query.maxRating) && (
          <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
            <Text>Rating: {query.minRating ?? 0} - {query.maxRating ?? 5}</Text>
          </Animated.View>
        )}
        {(query.minCriticsRating || query.maxCriticsRating) && (
          <Animated.View layout={LinearTransition} entering={SlideInLeft} exiting={SlideOutLeft}>
            <Text>Critics rating: {query.minCriticsRating ?? 0} - {query.maxCriticsRating ?? 5}</Text>
          </Animated.View>
        )}
      </Animated.View>
      }
    </Animated.View>
  );
}

const queryText = {
  minRating: "Min rating",
  maxRating: "Max rating",
  criticsRating: "Critics rating",

}
