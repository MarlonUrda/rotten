import { TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition, FadeIn, FadeOut } from "react-native-reanimated";
import { Text } from "../ui/text";
import mt from "@/styles/mtWind";
import { CommentMenu } from "./commentMenu";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";

interface CommentProps {
  writer: string;
  date: string;
  content: string;
}

export function Comment({ writer, date, content }: CommentProps) {
  return (
    <Animated.View style={[mt.w("full"), mt.flexCol, mt.gap(4), mt.p(4), mt.backgroundColor("background"), mt.rounded("base")]} layout={LinearTransition} entering={FadeIn} exiting={FadeOut}>
      <View style={[mt.flexRow, mt.justify("space-between"), mt.p(4)]}>
        <View style={[mt.flexCol, mt.gap(2)]}>
          <Text size="md" weight="bold">
            {writer}
          </Text>
          <Text size="sm">
            {date}
          </Text>
        </View>
        {/* <Shadow {...s.shadow.md}>
          <TouchableOpacity style={[mt.w(6), mt.h(6), mt.backgroundColor("purple"), mt.rounded("base")]}>
            <CommentMenu />
          </TouchableOpacity>
        </Shadow> */}
      </View>
      <View style={[mt.pl(4), mt.pr(2)]}>
        <Text size="md" weight="normal">
          {content}
        </Text>
      </View>
    </Animated.View>
  )
}