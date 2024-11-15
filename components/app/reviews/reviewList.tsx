import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-actions-sheet";
import mt from "@/styles/mtWind";
import { ReviewContainer } from "./reviewContainer";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import type { Review } from "@/types/Review";

interface ListProps {
  comments: Review[] | [];
}

export default function ReviewList({ comments }: ListProps) {
  return (
    <FlatList
      data={comments}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={[mt.p(2), mt.rounded("base")]}>
          <Shadow {...s.shadow.md}>
            <ReviewContainer review={item} />
          </Shadow>
        </View>
      )}
      contentContainerStyle={[
        mt.backgroundColor("blueOpacity", 200, 0.3),
        mt.gap(4),
        mt.p(2),
        mt.mb(20),
        mt.pb(7),
        mt.h("full"),
      ]}
    />
  );
}
