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
      style={[mt.w("full")]}
    >
      <FlatList
        data={comments.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[mt.p(2), mt.rounded("base")
            // rotate -3 even and 3 odd
            , mt.rotate(index % 2 === 0 ? 3 : -3) 

          ]}>
            <Shadow {...s.shadow.mdNoRound}>
              <ReviewContainer review={item} />
            </Shadow>
          </View>
        )}
        contentContainerStyle={[mt.w("full"), mt.overflow("visible"), mt.p(4)]}
      />
    </Animated.View>
  );
}
