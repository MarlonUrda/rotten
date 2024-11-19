import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from "react-native-actions-sheet";
import { View, Dimensions, Pressable } from "react-native";
import ReviewList from "./reviewList";
import mt from "@/styles/mtWind";
import { Button } from "../../ui/button";
import { X } from "lucide-react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RefObject, useEffect, useRef } from "react";
import { EmptyCommentsSplash } from "../emptyComentariesSplash";
import { Title } from "../../ui/Title";
import Loader from "../../ui/loader";
import { GetReviewsResponse } from "@/types/api/Reviews";
import s from "@/styles/styleValues";
import { ReviewInput, DummyReviewInput } from "./reviewInput";
import { TextInput } from "react-native-gesture-handler";
import { Text } from "@/components/ui/text";
import { GameRatingDisplay } from "../gameRating";

interface Payload {
  gameId: string;
}

interface ReviewSheetProps {
  payload: Payload;
  ref: RefObject<ActionSheetRef>;
}

export function ReviewSheet({ payload, ref }: ReviewSheetProps) {
  const { height } = Dimensions.get("window");
  const { gameId } = payload;
  const inputRef = useRef<ActionSheetRef>(null);

  const commentQueryResult = useQuery<GetReviewsResponse>({
    queryKey: ["comments", gameId],
    enabled: false,
  });

  const closeSheet = () => {
    SheetManager.hide("commentSheet");
  };

  return (
    <ActionSheet
      backgroundInteractionEnabled
      isModal={false}
      keyboardHandlerEnabled={false}
      ref={ref}
      onClose={() => SheetManager.hide("reviewInputSheet")}
      zIndex={9990}
      containerStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: s.borderWidth[4],
      }}
      indicatorStyle={{ borderRadius: 0, backgroundColor: "#000" }}
    >
      <View
        style={[
          mt.flexCol,
          mt.justify("flex-start"),
          mt.items("center"),
          mt.pxh(height - 50),
          mt.w("full"),
          // mt.p(4),
        ]}
      >
        <View
          style={[
            mt.flexRow,
            mt.justify("space-between"),
            mt.items("center"),
            mt.p(4),
            mt.w("full"),
          ]}
        >
          <Title title="Reviews" color="red" size="2xl" shadow />

          <Button onPress={closeSheet} variant="error">
            <X size={24} color="#000" />
          </Button>
        </View>
        <View style={[mt.flexCol, mt.flex1, mt.w("full")]}>
          {commentQueryResult.isLoading && <Loader />}
          {commentQueryResult.data && commentQueryResult.data.length > 0 ? (
            <ReviewList comments={commentQueryResult.data} />
          ) : (
            <EmptyCommentsSplash />
          )}
        </View>
        <DummyReviewInputSheet
          onPress={() => {
            SheetManager.show("reviewInputSheet", {
              payload: {
                gameId,
              },
            });
          }}
        />

      </View>
    </ActionSheet>
  );
}

interface InputPayload {
  gameId: string;
  reviewId?: string;
  oldContent?: string;
  oldRating?: number;
}

interface ReviewInputSheetProps {
  payload: InputPayload;
  sheetRef: RefObject<ActionSheetRef>;
}

export function ReviewInputSheet({
  payload,
  sheetRef: ref,
}: ReviewInputSheetProps) {
  const { gameId, reviewId, oldContent, oldRating } = payload;
  return (
    <ActionSheet
      ref={ref}
      zIndex={9999}
      containerStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: s.borderWidth[4],
      }}
    >
      <Text>
        {reviewId ? "Edit your review" : "Leave a review"}
      </Text>
      <ReviewInput
        onFocus={() => {}}
        gameId={gameId}
        reviewId={reviewId}
        oldContent={oldContent}
        oldRating={oldRating}
      />
    </ActionSheet>
  );
}

export function DummyReviewInputSheet({ onPress }: { onPress?: () => void }) {
  //  pressable to open the review input sheet, looks like the review input sheet is not opening
  return (
    <Pressable
      style={[mt.pxh(100), mt.w("full"), mt.borderTop(4)]}
      onPress={onPress}
    >
      <DummyReviewInput />
    </Pressable>
  );
}
