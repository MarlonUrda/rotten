import { View } from "react-native";
import { Text } from "../ui/text";
import { Cat } from "lucide-react-native";
import { Shadow } from "react-native-shadow-2";
import AntDesign from "@expo/vector-icons/AntDesign";
import mt from "@/styles/mtWind";
import s from "@/styles/styleValues";

export function EmptyCommentsSplash(){
  return (
    <View
      style={[
        mt.flexCol,
        mt.items("center"),
        mt.justify("center"),
        mt.gap(4),
        mt.h("full"),
        mt.rotate(7),
      ]}
    >
      <Shadow {...s.shadow.mdNoRound}>
        <View
          style={[
            mt.h(44),
            mt.w(60),
            mt.backgroundColor("yellow"),
            mt.items("center"),
            mt.justify("center"),
            mt.gap(2),
            mt.border(2),
          ]}
        >
          <AntDesign name="meh" size={64} color="black" />
          <Text size="lg" weight="bold">
            No reviews yet!
          </Text>
          <Text size="md" weight="normal"
            style={[mt.align("center"), mt.w("full")]}
          >
            Be the first to review this game!
          </Text>
        </View>
      </Shadow>
    </View>
  );
}