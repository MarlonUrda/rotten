import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from "react-native-actions-sheet";
import { View, Dimensions } from "react-native";
import ReviewList from "./reviewList";
import mt from "@/styles/mtWind";
import { Button } from "../../ui/button";
import { X } from "lucide-react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RefObject } from "react";
import { EmptyCommentsSplash } from "../emptyComentariesSplash";
import { Title } from "../../ui/Title";
import Loader from "../../ui/loader";
import { GetReviewsResponse } from "@/types/api/Reviews";
import s from "@/styles/styleValues";
import { ReviewInput } from "./reviewInput";

interface Payload {
  commentQueryResult: UseQueryResult<GetReviewsResponse>;
  gameId: string;
}

interface ReviewSheetProps {
  payload: Payload;
  ref: RefObject<ActionSheetRef>;
}

export function ReviewSheet({ payload, ref }: ReviewSheetProps) {
  const { height } = Dimensions.get("window");
  const { gameId } = payload;

  const commentQueryResult = useQuery<GetReviewsResponse>({
    queryKey: ["comments", gameId],
    enabled: false,
  });

  const closeSheet = () => {
    SheetManager.hide("commentSheet");
  };

  return (
    <ActionSheet
      gestureEnabled
      backgroundInteractionEnabled
      isModal={false}
      ref={ref}
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
        <View>
          <ReviewInput gameId={gameId} />
        </View>
      </View>
    </ActionSheet>
  );
}
