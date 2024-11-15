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
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-native-reanimated-carousel";
import Loader from "../ui/loader";
import { useEffect } from "react";
import s from "@/styles/styleValues";

interface GameInfoProps {
  game: GameDetails;
}

export function GameInfo({ game }: GameInfoProps) {
  const dev = game.developers.map((dev) => dev.name).join(", ");
  const genres = game.genres.map((genre) => genre.name).join(", ");

  const cutDescription = (description: string, word: string) => {
    const index = description.indexOf(word);
    if (index !== -1) {
      return description.slice(index + word.length).trim();
    }

    return description;
  };

  const description = cutDescription(game.description_raw, "Español");

  return (
    <>
      <View style={[mt.flexCol, mt.justify("center"), mt.gap(8), mt.p(4)]}>
        <Animated.View
          style={[
            mt.flexCol,
            mt.gap(4),
            mt.justify("flex-start"),
            mt.items("flex-start"),
            mt.w("full"),
          ]}
        >
          <Title title={"Informacion del juego"} color="yellow"></Title>
          <View style={[mt.border(2), mt.p(2)]}>
            <Text weight="bold">
              Fecha de lanzamiento: <Text>{game.released}</Text>
            </Text>
            <Text weight="bold">
              Desarrollador: <Text>{dev}</Text>
            </Text>
            {/* <Text weight="bold">
              Generos: <Text>{genres}</Text>
            </Text> */}
            <Text weight="bold">
              Tiempo de juego: <Text>{game.playtime}h</Text>
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[mt.flexCol, mt.gap(4), mt.items("flex-start")]}>
          <Title title={"Capturas"} color="blue"></Title>
          <ImageCarousel id={game.id}></ImageCarousel>
        </Animated.View>

        <Animated.View style={[mt.flexCol, mt.gap(4), mt.items("flex-start")]}>
          <Title title={"Plataformas"} color="green"></Title>
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
          <Title title={"Sinopsis"} color="red"></Title>
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

function Title({ title, color }: { title: string; color: MTTypes["Color"] }) {
  return (
    <View
      style={[
        mt.p(1),
        mt.px(2),
        mt.border(2),
        mt.backgroundColor(color),
        mt.rotate(-3),
      ]}
    >
      <Text size="lg" weight="black" style={[mt.fontWeight("bold")]}>
        {title}
      </Text>
    </View>
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

function ImageCarousel({ id }: { id: number }) {
  const width = Dimensions.get("window").width;
  const gameScreenshotsQuery = useQuery({
    queryKey: ["game", "screenshots", id],
    queryFn: () => GamesController.getGameScreenshots({ id }),
  });
  // console.log(gameScreenshotsQuery.data);

  useEffect(() => {
    console.log(gameScreenshotsQuery.data);
  }, [gameScreenshotsQuery]);

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
