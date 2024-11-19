import { View } from "react-native";
import { Button } from "../../ui/button";
import { SendHorizontal } from "lucide-react-native";
import mt from "@/styles/mtWind";
import {
  SimpleInput,
  DummySimpleInput,
} from "../../forms/formsUtils/SimpleInput";
import { useState } from "react";
import { GameRating, GameRatingDisplay } from "../gameRating";
import { useReviewEditor } from "@/hooks/app/useReview";

interface CommentInputProps {
  gameId: string;
  reviewId?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  oldContent?: string;
  oldRating?: number;
}

export function ReviewInput({
  gameId,
  reviewId,
  onFocus,
  onBlur,
  oldContent = "",
  oldRating = 1,
}: CommentInputProps) {
  const [comment, setComment] = useState(oldContent);
  const [rating, setRating] = useState(oldRating);

  const onChange = (value: string) => {
    setComment(value);
  };

  const { reviewMutation } = useReviewEditor({
    setComment,
    reviewId
  });
  const submitComment = () => {
    if (comment.trim() === "") {
      return;
    }
    console.log(rating);
    const payload = {
      content: comment,
      rating: rating,
      gameId,
    };
    reviewMutation.mutate(payload);
  };

  return (
    <View style={[mt.flexCol, mt.gap(2), mt.w("full"), mt.mb(4), mt.p(2)]}>
      <GameRating
        rating={rating}
        onChange={(rating) => setRating(Math.round(rating))}
      />
      <View style={[mt.flexRow, mt.gap(4), mt.items("center")]}>
        <SimpleInput
          placeholder="Add your review..."
          inputStyle={[mt.w(72), mt.maxH(32)]}
          multiline
          onChangeText={onChange}
          value={comment}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus
          maxLength={500}
          
        />
        <Button
          variant="primary"
          onPress={submitComment}
          loading={reviewMutation.isPending}
        >
          <SendHorizontal size={24} color="#000" />
        </Button>
      </View>
    </View>
  );
}

export function DummyReviewInput() {
  return (
    <View style={[mt.flexCol, mt.gap(2), mt.w("full"), mt.mb(4), mt.p(2)]}>
      <GameRatingDisplay rating={1}></GameRatingDisplay>
      <View style={[mt.flexRow, mt.gap(4), mt.items("center")]}>
        <DummySimpleInput inputStyle={[mt.w(72), mt.h(11)]} />
        <Button variant="primary" onPress={() => {}}>
          <SendHorizontal size={24} color="#000" />
        </Button>
      </View>
    </View>
  );
}
