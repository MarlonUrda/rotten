import { esrbRating } from "@/types/api/games/gamePreview";
import { z } from "zod";
import { Image, ImageStyle, StyleProp } from "react-native";
import mt from "@/styles/mtWind";
import { View } from "react-native";
import { Text } from "../ui/text";

type ESRBRating = z.infer<typeof esrbRating>;

const styles = {
  mature: [mt.backgroundColor("red"), mt.color("white")],
  teen: [mt.backgroundColor("orange"), mt.color("black")],
  everyone: [mt.backgroundColor("green"), mt.color("black")],
  "everyone-10-plus": [mt.backgroundColor("green"), mt.color("black")],
  "adults-only": [mt.backgroundColor("black"), mt.color("white")],
  "rating-pending": [mt.backgroundColor("gray"), mt.color("black")],
};

const letters = {
  mature: "M",
  teen: "T",
  everyone: "E",
  "everyone-10-plus": "E10+",
  "adults-only": "AO",
  "rating-pending": "RP",
};

export const ESRBChip = ({
  rating,
}: {
  rating: ESRBRating;
  style?: StyleProp<ImageStyle>;
}) => {
  return (
    <View style={[mt.border(2), mt.p(1), mt.px(2), ...styles[rating.slug]]}>
      <Text style={styles[rating.slug]}>{letters[rating.slug]}</Text>
    </View>
  );
};
