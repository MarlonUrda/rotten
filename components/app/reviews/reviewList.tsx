import React, { useMemo, useState } from "react";
import { View, RefreshControl } from "react-native";
import { FlatList, ScrollView } from "react-native-actions-sheet";
import mt from "@/styles/mtWind";
import { ReviewContainer } from "./reviewContainer";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import type { Review } from "@/types/Review";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import Loader from "@/components/ui/loader";
import { UseQueryResult } from "@tanstack/react-query";
import { GetReviewsResponse } from "@/types/api/Reviews";
import { CPushButton } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { EmptyCommentsSplash } from "../emptyComentariesSplash";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";

interface ListProps {
  comments: Review[];
  commentsQuery: UseQueryResult<GetReviewsResponse>;
}

export default function ReviewList({ comments, commentsQuery }: ListProps) {
  const [filter, setFilter] = useState<"user" | "critic" | "all">("all");
  const user = useAtomValue(userAtom);

  const processedReviews = useMemo(() => {
    const sorted = comments.sort((a, b) => {
      if (a.reviewType === "critic" && b.reviewType !== "critic") {
        return -1;
      }
      if (a.reviewType !== "critic" && b.reviewType === "critic") {
        return 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const filtered = filter === "all" ? sorted : sorted.filter((review) => review.reviewType === filter);

    const userReview = filtered.find((review) => review.user._id === user?._id);
    if (userReview) {
      return [userReview, ...filtered.filter((review) => review.user._id !== user?._id)];
    }

    return filtered;
  }, [comments, filter, user]);

  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      style={[mt.w("full"), mt.flex1]}
    >
      <View style={[mt.flexRow, mt.justify("flex-start"), mt.px(4), mt.gap(2)]}>
        <CPushButton
          isPushed={filter === "all"}
          onPress={() => setFilter("all")}
          variant={filter === "all" ? "secondary" : "primary"}
        >
          <Text>All</Text>
        </CPushButton>

        <CPushButton
          isPushed={filter === "user"}
          onPress={() => setFilter("user")}
          variant={filter === "user" ? "secondary" : "primary"}
        >
          <Text>User</Text>
        </CPushButton>

        <CPushButton
          isPushed={filter === "critic"}
          onPress={() => setFilter("critic")}
          variant={filter === "critic" ? "secondary" : "primary"}
        >
          <Text>Critic</Text>
        </CPushButton>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={commentsQuery.isFetching}
            onRefresh={() => commentsQuery.refetch()}
          />
        }
        contentContainerStyle={[
          mt.w("full"),
          mt.overflow("visible"),
          mt.p(4),
          mt.gap(4),
          mt.flex1,
          mt.overflow("visible"),
          mt.h("full"),
        ]}
      >
        {processedReviews.map((item, index) => (
          <Animated.View
            layout={LinearTransition}
            entering={SlideInLeft}
            exiting={SlideOutRight}
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
          </Animated.View>
        ))}
        {processedReviews.length === 0 && (
          <EmptyCommentsSplash commentsQuery={commentsQuery} />
        )}
      </ScrollView>
    </Animated.View>
  );
}
