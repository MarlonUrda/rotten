import React from "react";
import { View, RefreshControl } from "react-native";
import { FlatList, ScrollView } from "react-native-actions-sheet";
import mt from "@/styles/mtWind";
import { ReviewContainer } from "./reviewContainer";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import type { Review } from "@/types/Review";
import Animated, {
  SlideInLeft,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import Loader from "@/components/ui/loader";
import { UseQueryResult } from "@tanstack/react-query";
import { GetReviewsResponse } from "@/types/api/Reviews";

interface ListProps {
  comments: Review[];
  commentsQuery: UseQueryResult<GetReviewsResponse>;
}

export default function ReviewList({ comments, commentsQuery }: ListProps) {
  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut} style={[mt.w("full"), mt.flex]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={commentsQuery.isFetching}
            onRefresh={() => commentsQuery.refetch()}
            
          />
        }
        contentContainerStyle={[mt.w("full"), mt.overflow("visible"), mt.p(4)]}
      >
        {comments
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((item, index) => (
            <View
              key={item.user._id}
              style={[
                mt.p(2),
                mt.rounded("base"),
                mt.rotate(index % 2 === 0 ? 3 : -3),
              ]}
            >
              <Shadow {...s.shadow.mdNoRound}>
                <ReviewContainer review={item} />
              </Shadow>
            </View>
          ))}
      </ScrollView>
    </Animated.View>
  );
}
