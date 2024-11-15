import { Review } from "@/types/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReviewController } from "@/api/controllers/ReviewController";
import myToast from "@/components/toast";
import { CreateReviewRequest } from "@/types/api/Reviews";

export function useCreateReview({
  setComment,
}: {
  setComment: (comment: string) => void;
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

  return {
    createCommentMutation,
  };
}
