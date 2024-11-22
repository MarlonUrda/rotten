import { Button, FlatButton } from "../ui/button";
import { Text } from "../ui/text";
import { View } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { Image } from "react-native-elements";
import mt from "@/styles/mtWind";
import { Shadow } from "react-native-shadow-2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMemo } from "react";
import { router } from "expo-router";
import type { GamePreview } from "@/types/api/games/gamePreview";
import s from "@/styles/styleValues";
import { ESRBChip } from "./ESRBChip";
import { HoldItem } from "react-native-hold-menu";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlaylistController } from "@/api/controllers/PlaylistController";
import myToast from "../toast";
import { GamesController } from "@/api/controllers/GamesController";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface GamePreviewProps {
  title: string;
  game: GamePreview;
  isListed?: boolean;
  direction?: "row" | "column";
}

const colStyle = [mt.w(56), mt.h(96), mt.flexCol];
const rowStyle = [mt.w("full"), mt.h(56), mt.flexRow];

export function GamePreview({
  title,
  game,
  isListed,
  direction = "column",
}: GamePreviewProps) {
  const [currentUser] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const addToPlaylistMutation = useMutation({
    mutationFn: async (gameId: string) =>
      await PlaylistController.addToPlaylist({ gameId: gameId }),
    onSuccess: () => {
      myToast({ type: "success", message: "Game added successfully!" });
    },
    onError: (error) => {
      myToast({ type: "error", message: error.message });
    },
  });

  const gameName = useMemo(() => {
    return (game.name.length > 22 ? game.name.slice(0, 20) + "..." : game.name)
      .toUpperCase()
      .replace(/-/g, " ");
  }, [game.name]);

  const getGameQuery = useQuery({
    queryKey: ["game", game._id],
    queryFn: () => GamesController.getGame({ id: game.external_id }),
  });
  const handleAdd = () => {
    if (getGameQuery.isLoading) {
      myToast({ type: "info", message: "Agregando el juego..." });
    }

    if (getGameQuery.data) {
      addToPlaylistMutation.mutate(getGameQuery.data._id);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (gameId: string) => {
      if (!currentUser?._id) {
        throw new Error("User ID is undefined");
      }
      await PlaylistController.removeFromPlaylist(currentUser._id, gameId);
    },
    onSuccess: () => {
      myToast({ type: "success", message: "Juego eliminado de la lista!" });
      queryClient.invalidateQueries({
        queryKey: ["playlist", currentUser?._id],
      });
    },
    onError: (error) => {
      myToast({ type: "error", message: error.message });
    },
  });

  const handleDelete = () => {
    if (getGameQuery.data?._id) {
      deleteMutation.mutate(getGameQuery.data._id);
    }
  };
  return (
    <Shadow {...mt.shadow.md}>
      <Animated.View entering={ZoomIn} exiting={ZoomOut}
        style={[mt.position("relative")]}
      >
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/games/${game._id !== "temp" ? game._id : game.external_id}`
            )
          }
          style={[mt.w("full")]}
        >
          <View
            style={[
              direction === "column" ? colStyle : rowStyle,
              mt.gap(4),
              mt.rounded("base"),
              mt.border(4),
              mt.backgroundColor("white"),
              mt.p(2),
              mt.backgroundColor("yellow"),
            ]}
          >
            <View
              style={[
                direction === "row" ? mt.flexColReverse : mt.flexCol,
                ,
                mt.gap(2),
                direction === "row" && mt.w("sixty"),
              ]}
            >
              <View
                style={[
                  mt.flexRow,
                  mt.gap(2),
                  mt.items("center"),
                  mt.justify("center"),
                ]}
              >
                <Text
                  size="md"
                  weight="black"
                  style={[mt.fontWeight("black"), mt.flex1, mt.maxW(56)]}
                >
                  {gameName}
                </Text>

                <View
                  style={[
                    mt.justify("center"),
                    mt.items("center"),
                    mt.flex,
                    // mt.rotate(7),
                  ]}
                >
                  <ESRBChip
                    rating={game.esrb_rating}
                    style={[mt.h(14), mt.w(10)]}
                  />
                </View>
              </View>
              <View style={[direction === "row" && mt.flex1]}>
                <Image
                  source={{ uri: game.background_image }}
                  style={[
                    mt.h(direction === "column" ? 36 : 36),
                    mt.w("full"),
                    mt.border(4),
                  ]}
                />
              </View>
            </View>
            <View
              style={[
                mt.flexCol,
                mt.gap(4),
                mt.justify("center"),
                mt.items("center"),
              ]}
            >
              <ReleaseDate released={game.released} direction={direction} />

              <Scores
                score={{
                  audience: game.mt_rating_user ?? 0,
                  critic: game.mt_rating_critic ?? 0,
                }}
                direction={direction}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[
            mt.position("absolute"),
            // mt.right(direction === "column" ? "-2" : 0),
            direction === "column" ? mt.right("-1") : mt.left("-1"),
            direction === "column" ? mt.bottom("-1") : mt.top("-1"),
            mt.flexRow,
            mt.rotate(direction === "column" ? 10: -10)
          ]}
        >

          {!isListed ? (
            <FlatButton onPress={handleAdd}
            >
              <MaterialCommunityIcons name="plus" size={24} color="black" />
            </FlatButton>
          ) : (
            <Button variant="error" onPress={handleDelete}>
              <MaterialCommunityIcons name="minus" size={24} color="black" />
            </Button>
          )}
        </View>
      </Animated.View>
    </Shadow>
  );
}
function ReleaseDate({ released, direction = "column" }: { released: string, direction?: "row" | "column" }) {
  return (
    <View
      style={[
        direction === "row" ? mt.flexCol : mt.flexRow,
        mt.items("center"),
        mt.justify("center"),
      ]}
    >
      <View
        style={[
          mt.border(2),
          mt.p(1),
          mt.rotate(-3),
          mt.backgroundColor("white"),
        ]}
      >
        <Text size="sm" style={[mt.fontWeight("bold")]}>
          RELEASED
        </Text>
      </View>
      <View
        style={[
          mt.border(2),
          mt.p(1),
          mt.rotate(3),
          mt.backgroundColor("white"),
        ]}
      >
        <Text size="lg" weight="black" style={[mt.fontWeight("black")]}>
          {released}
        </Text>
      </View>
    </View>
  );
}

const getColor = (score: number): "red" | "orange" | "green" => {
  if (score < 2.5) return "red";
  if (score < 3.5) return "orange";
  return "green";
};

function Scores({
  score,
  direction = "column",
}: {
  score: {
    audience: number;
    critic: number;
  };
  direction?: "row" | "column";
}) {
  return (
    <View
      style={[mt.flexCol, mt.gap(2), mt.items("center"), mt.justify("center")]}
    >
      {direction === "row" && (
        <View style={[mt.border(2), mt.p(1), mt.backgroundColor("white")]}>
          <Text size="sm" style={[mt.fontWeight("bold")]}>
            SCORES
          </Text>
        </View>
      )}
      <View
        style={[
          mt.flexRow,
          mt.items("center"),
          mt.justify("center"),
          mt.gap(2),
        ]}
      >
        <View
          style={[
            mt.flexCol,
            mt.gap(1),
            mt.items("flex-start"),
            mt.justify("center"),
          ]}
        >
          <View
            style={[
              mt.border(2),
              mt.p(1),
              mt.rotate(-3),
              mt.backgroundColor("white"),
            ]}
          >
            <Text size="sm" style={[mt.fontWeight("bold")]}>
              USER {direction === "column" && "SCORE"}
            </Text>
          </View>
          <View
            style={[
              mt.border(2),
              mt.p(2),
              mt.backgroundColor(getColor(score.audience)),
              mt.w(14),
              mt.h(14),
              mt.flexCol,
              mt.items("center"),
              mt.justify("center"),
            ]}
          >
            <Text size="lg" weight="black" style={[mt.fontWeight("black")]}>
              {score.audience.toFixed(1)}
            </Text>
          </View>
        </View>

        <View
          style={[
            mt.flexCol,
            mt.gap(1),
            mt.items("flex-start"),
            mt.justify("center"),
          ]}
        >
          <View
            style={[
              mt.border(2),
              mt.p(1),
              mt.rotate(3),
              mt.backgroundColor("white"),
            ]}
          >
            <Text size="sm" style={[mt.fontWeight("bold")]}>
              CRITIC {direction === "column" && "SCORE"}
            </Text>
          </View>

          <View
            style={[
              mt.border(2),
              mt.p(2),
              mt.backgroundColor(getColor(score.critic)),
              mt.w(14),
              mt.h(14),
              mt.flexCol,
              mt.items("center"),
              mt.justify("center"),
            ]}
          >
            <Text size="lg" weight="black" style={[mt.fontWeight("black")]}>
              {score.critic.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const MenuItems = [
  { text: "Actions", icon: "home", isTitle: true, onPress: () => {} },
  { text: "Action 1", icon: "edit", onPress: () => {} },
  { text: "Action 2", icon: "map-pin", withSeparator: true, onPress: () => {} },
  { text: "Action 3", icon: "trash", isDestructive: true, onPress: () => {} },
];

export function HoldGamePreview({ title, game }: GamePreviewProps) {
  return (
    <HoldItem items={MenuItems}>
      <GamePreview title={title} game={game} />
    </HoldItem>
  );
}
