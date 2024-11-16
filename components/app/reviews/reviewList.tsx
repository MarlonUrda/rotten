import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-actions-sheet";
import mt from "@/styles/mtWind";
import { ReviewContainer } from "./reviewContainer";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import type { Review } from "@/types/Review";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

interface ListProps {
  comments: Review[];
}

export default function ReviewList({ comments }: ListProps) {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutRight}
      // w full
      style={[mt.w("full"), mt.p(4)]}
    >
      <FlatList
        data={comments.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[mt.p(2), mt.rounded("base")]}>
            <Shadow {...s.shadow.mdNoRound}>
              <ReviewContainer review={item} />
            </Shadow>
          </View>
        )}
        contentContainerStyle={[mt.w("full")]}
      />
    </Animated.View>
  );
}
