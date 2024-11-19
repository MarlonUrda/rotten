import { Review } from "@/types/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReviewController } from "@/api/controllers/ReviewController";
import myToast from "@/components/toast";
import { CreateReviewRequest, UpdateReviewRequest } from "@/types/api/Reviews";

export function useReviewEditor({
  setComment,
  reviewId,
}: {
  setComment: (comment: string) => void;
  reviewId?: string;
}) {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: (payload: CreateReviewRequest) =>
      ReviewController.createReview(payload),
    onSuccess: () => {
      myToast({ type: "success", message: "Comment added!" });
      setComment("");
    },
    onError: (error) => {
      myToast({ type: "info", message: error.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: (payload: Omit<UpdateReviewRequest, "reviewId">) => {
      if (!reviewId) {
        throw new Error("No comment id provided");
      }
      return ReviewController.updateReview({
        ...payload,
        reviewId: reviewId,
      });
    },
    onSuccess: () => {
      myToast({ type: "success", message: "Comment edited!" });
      setComment("");
    },
    onError: (error) => {
      myToast({ type: "info", message: error.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const reviewMutation = reviewId ? editCommentMutation : createCommentMutation;

  return {
    reviewMutation
  };
}
