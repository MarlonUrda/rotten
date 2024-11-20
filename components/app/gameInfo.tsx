import mt, { MTTypes } from "@/styles/mtWind";
import { View } from "react-native";
import { Image, Dimensions } from "react-native";
import { Text } from "../ui/text";
import { GameDetails } from "@/types/api/games/gameDetails";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";
import { platforms } from "../util/platforms/platforms";
import { GamesController } from "@/api/controllers/GamesController";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Carousel from "react-native-reanimated-carousel";
import Loader from "../ui/loader";
import { useEffect, useMemo } from "react";
import s from "@/styles/styleValues";
import { Title } from "../ui/Title";
import { GameRatingDisplay } from "./gameRating";
import { Review } from "@/types/Review";
import { GetReviewsResponse } from "@/types/api/Reviews";


interface GameInfoProps {
  game: GameDetails;
  reviews: UseQueryResult<GetReviewsResponse>;
}

export function GameInfo({ game, reviews }: GameInfoProps) {
  const dev = game.developers.map((dev) => dev.name).join(", ");
  const genres = game.genres.map((genre) => genre.name).join(", ");

  const cutDescription = (description: string, word: string) => {
    const index = description.indexOf(word);
    if (index !== -1) {
      return description.slice(0, index).trim();
    }

    return description;
  };

  const description = cutDescription(game.description_raw, "Español");


  return (
    <>
      <View style={[mt.flexCol, mt.justify("center"), mt.gap(8), mt.p(4), mt.w("full")]}>
        <Animated.View
          style={[
            mt.flexCol,
            mt.gap(4),
            mt.justify("flex-start"),
            mt.items("flex-start"),
            mt.w("full"),
          ]}
        >
          <Title title={"Game Info"} color="yellow"></Title>
          <View style={[mt.border(2), mt.p(2)]}>
            <Text weight="bold">
              Release date: <Text>{game.released}</Text>
            </Text>
            <Text weight="bold">
              Developers: <Text>{dev}</Text>
            </Text>
            <Text weight="bold">
              Playtime: <Text>{game.playtime}h</Text>
            </Text>
          </View>
        </Animated.View>
        {/* rating view */}
        <Animated.View
          style={[mt.flexCol, mt.gap(4), mt.justify("flex-start"), mt.items("flex-start"), mt.w("full")]}
        >
          <Title title={"Ratings"} color="red"></Title>
          <GameRatings reviews={reviews}></GameRatings>
          
        </Animated.View>

        <Animated.View style={[mt.flexCol, mt.gap(4), mt.items("flex-start")]}>
          <Title title={"Screenshots"} color="blue"></Title>
          <ImageCarousel external_id={game.external_id}></ImageCarousel>
        </Animated.View>

        <Animated.View style={[mt.flexCol, mt.gap(4), mt.items("flex-start")]}>
          <Title title={"Platforms"} color="green"></Title>
          <View style={[mt.flexRow, mt.gap(2), mt.flexWrap]}>
            {game.platforms
              .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
              .map((platform) => (
                <PlatformChip
                  key={platform.platform.id}
                  id={platform.platform.id}
                />
              ))}
          </View>
        </Animated.View>

        <Animated.View
          style={[
            mt.flexCol,
            mt.gap(4),
            mt.justify("flex-start"),
            mt.items("flex-start"),
          ]}
        >
          <Title title={"Synopsis"} color="purple"></Title>
          <View style={[mt.border(2), mt.p(2)]}>
            <Text weight="bold">
              <Text>{description}</Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
}



function PlatformChip({ id }: { id: number }) {
  const platform = platforms.find((platform) => platform.id === id);
  if (!platform) {
    return null;
  }
  return (
    <View
      style={[
        mt.p(1),
        mt.px(2),
        mt.border(2),
        mt.backgroundColor("blue"),
        mt.flexRow,
        mt.gap(1),
        mt.items("center"),
        mt.justify("center"),
      ]}
    >
      <MCIcon name={platform.icon} size={20} color="black"></MCIcon>
      <Text size="md" weight="black" style={[mt.fontWeight("bold")]}>
        {platform?.name}
      </Text>
    </View>
  );
}

function ImageFrame({ image }: { image: string }) {
  return (
    <View style={[mt.w(80), mt.h(72), mt.border(4), mt.p(4), mt.backgroundColor("white")]}>
      <View style={[mt.w("full"), mt.h("full"), mt.border(4)]}>
        <Image source={{ uri: image }} style={[mt.w("full"), mt.h("full")]} />
      </View>
    </View>
  );
}

function ImageCarousel({ external_id: id }: { external_id: number }) {
  const width = Dimensions.get("window").width;
  const gameScreenshotsQuery = useQuery({
    queryKey: ["game", "screenshots", id],
    queryFn: () => GamesController.getGameScreenshots({ external_id: id }),
  });

  return (
    <Animated.View style={[mt.w("full"), mt.h(72), mt.overflow("visible")]}>
      {/* loading */}
      {gameScreenshotsQuery.isLoading && (
        <Animated.View
          style={[
            mt.w("full"),
            mt.h("full"),
            mt.flexCol,
            mt.justify("center"),
            mt.items("center"),
          ]}
          entering={SlideInLeft}
          exiting={SlideOutRight}
        >
          <Loader size="medium" />
        </Animated.View>
      )}

      {/* loaded */}
      {gameScreenshotsQuery.data?.results && (
        <Animated.View
          style={[mt.flex1]}
          entering={SlideInLeft}
          exiting={SlideOutRight}
        >
          <Carousel
            loop
            width={width - 32}
            height={s.pixels[72]}
            autoPlay={true}
            autoPlayInterval={4000}
            style={[mt.flex1, mt.w("full")]}
            data={gameScreenshotsQuery.data.results}
            scrollAnimationDuration={1000}
            mode="horizontal-stack"
            modeConfig={{
              snapDirection: "left",
              stackInterval: 10,
            }}
            customConfig={() => ({ type: "positive", viewCount: 3 })}
            renderItem={({ item }) => <ImageFrame image={item.image} />}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

function GameRatings({
  reviews,
}: {
  reviews: UseQueryResult<GetReviewsResponse>;
}) {

    const calculatedRatings = useMemo(() => {
      const result = {
        userTotal: 0,
        userAverage: 0,
        criticTotal: 0,
        criticAverage: 0,
      };
      // calculate the average rating from the reviews
      if (!reviews.data) return result;

      const userReviews = reviews.data.filter(
        (review) => review.reviewType === "user"
      );
      const criticReviews = reviews.data.filter(
        (review) => review.reviewType === "critic"
      );

      result.userTotal = userReviews.length;
      result.criticTotal = criticReviews.length;

      result.userAverage =
        userReviews.reduce((acc, review) => acc + review.rating, 0) /
        result.userTotal;
      result.criticAverage = result.criticTotal === 0 ? 0 :
        criticReviews.reduce((acc, review) => acc + review.rating, 0) /
        result.criticTotal;

      return result;
    }, [reviews.data]);


  return (
    <View style={[mt.flexRow, mt.gap(2), mt.w("full")]}>

      <View style={[mt.flexCol, mt.gap(2), mt.items("flex-start"), mt.flex1]}>
        
        <Text 
          style={[mt.fontWeight("bold")]}
        >User Score</Text>

        <Text
          size="3xl"
          style={[mt.fontWeight("bold")]}
        >{calculatedRatings.userAverage.toFixed(1)}</Text>

        <GameRatingDisplay size={27} rating={calculatedRatings.userAverage}></GameRatingDisplay>

        <Text>{calculatedRatings.userTotal} Reviews</Text>
      </View>

      {/* divider */}
      <View style={[mt.border(2), mt.backgroundColor("black")]}></View>

      <View style={[mt.flexCol, mt.gap(2), mt.items("flex-end"), mt.flex1]}>
        <Text
          style={[mt.fontWeight("bold")]}

        >Critic Score </Text>

        <Text
          size="3xl"
          style={[mt.fontWeight("bold")]}
        >{calculatedRatings.criticAverage.toFixed(1)}</Text>

        <GameRatingDisplay size={27} rating={calculatedRatings.criticAverage}></GameRatingDisplay>
        <Text>{calculatedRatings.criticTotal} Reviews</Text>
      </View>

      
    </View>
  );
}
