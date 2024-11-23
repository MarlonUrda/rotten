import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "../ui/text";
import { Cat } from "lucide-react-native";
import { Shadow } from "react-native-shadow-2";
import AntDesign from "@expo/vector-icons/AntDesign";
import mt from "@/styles/mtWind";
import s from "@/styles/styleValues";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { UseQueryResult } from "@tanstack/react-query";
import { Image } from "react-native";

const smiley3 = require("../../assets/images/smiley/3.png");

interface EmptyCommentsSplashProps {
  commentsQuery: UseQueryResult<any>;
}

export function EmptySplash(
  { title, subtitle} : { title: string, subtitle: string}
) {
  return (
    <View style={[mt.rotate(7)]}>
      <Shadow {...s.shadow.mdNoRound}>
        <View
          style={[
            mt.h(48),
            mt.w(60),
            mt.backgroundColor("yellow"),
            mt.items("center"),
            mt.justify("center"),
            mt.gap(2),
            mt.border(2),
          ]}
        >
          <Image source={smiley3} style={[mt.w(20), mt.h(20)]}></Image>
          <Text size="lg" weight="bold">
            {title}
          </Text>
          <Text
            size="md"
            weight="normal"
            style={[mt.align("center"), mt.w("full")]}
          >
            {subtitle}
          </Text>
        </View>
      </Shadow>
    </View>
  );
}

export function EmptyCommentsSplash({
  commentsQuery,
}: EmptyCommentsSplashProps) {
  return (
    <Animated.View
      style={[
        mt.flexCol,
        mt.items("center"),
        mt.justify("center"),
        mt.gap(4),
        mt.h("full"),
      ]}
      entering={SlideInLeft}
      exiting={SlideOutRight}
    >
      <ScrollView
        contentContainerStyle={[
          mt.flexCol,
          mt.justify("center"),
          mt.items("center"),
          mt.h("full"),
          mt.w("full"),
          mt.p(4),
        ]}
        refreshControl={
          <RefreshControl
            refreshing={commentsQuery.isFetching}
            onRefresh={() => commentsQuery.refetch()}
          />
        }
      >
        <EmptySplash title="No reviews yet!" subtitle="Be the first to review this game!" />
      </ScrollView>
    </Animated.View>
  );
}
