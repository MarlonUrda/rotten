import { View } from "react-native";
import { Button } from "../../ui/button";
import { SendHorizontal } from "lucide-react-native";
import mt from "@/styles/mtWind";
import { SimpleInput } from "../../forms/formsUtils/SimpleInput";
import { ReviewController } from "@/api/controllers/ReviewController";
import { useState } from "react";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateReviewRequest } from "@/types/api/Reviews";
import myToast from "../../toast";
import { GameRating } from "../gameRating";
import { KeyboardAvoidingView } from "react-native";
import { useCreateReview } from "@/hooks/app/useReview";

interface CommentInputProps {
  gameId: string;
}

export function ReviewInput({ gameId }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const onChange = (value: string) => {
    setComment(value);
  };

  const { createCommentMutation } = useCreateReview({ setComment });
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
    createCommentMutation.mutate(payload);
  };

  return (
    <KeyboardAvoidingView style={[mt.flexCol, mt.gap(4), mt.w("full")]}>
      <View style={[mt.flexRow, mt.gap(4), mt.items("center")]}>
        <SimpleInput
          placeholder="Agrega tu reseña..."
          inputStyle={[mt.w(72), mt.h(11)]}
          multiline
          onChangeText={onChange}
          value={comment}
        />
        <Button
          variant="primary"
          onPress={submitComment}
          loading={createCommentMutation.isPending}
        >
          <SendHorizontal size={24} color="#000" />
        </Button>
      </View>
      <GameRating
        rating={rating}
        onChange={(rating) => setRating(Math.round(rating))}
      />
    </KeyboardAvoidingView>
  );
}
