import { Review } from "@/types/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReviewController } from "@/api/controllers/ReviewController";
import myToast from "@/components/toast";
import { CreateReviewRequest, UpdateReviewRequest } from "@/types/api/Reviews";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { SheetManager } from "react-native-actions-sheet";

export function useReviewEditor({
  setComment,
  reviewId,
}: {
  setComment: (comment: string) => void;
  reviewId?: string;
}) {
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);

  const createCommentMutation = useMutation({
    mutationFn: (payload: CreateReviewRequest) =>
      ReviewController.createReview(payload),
    onMutate(payload) {
      SheetManager.hide("reviewInputSheet");
      const oldReviews = queryClient.getQueryData<Review[]>(["comments"]) || [];
      if (!user) return { oldReviews };
      const newReview: Review = {
        ...payload,
        _id: "temp",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user._id,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        reviewType: "user",
      };

      queryClient.setQueryData<Review[]>(
        ["comments"],
        [newReview, ...oldReviews]
      );

      return {
        oldReviews,
      };
    },
    onSuccess: () => {
      myToast({ type: "success", message: "Comment added!" });
      setComment("");
    },
    onError: (error, _, context) => {
      myToast({ type: "info", message: error.message });
      if (context) {
        queryClient.setQueryData<Review[]>(["comments"], context.oldReviews);
      }
    },
    onSettled: (_data, _error, vars) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["game", vars.gameId] });
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: (payload: Omit<UpdateReviewRequest, "_id">) => {
      if (!reviewId) {
        throw new Error("No comment id provided");
      }
      return ReviewController.updateReview({
        ...payload,
        _id: reviewId,
      });
    },

    onMutate(payload) {
      setTimeout(() => {
        SheetManager.hide("reviewInputSheet");
      }, 500);

      const oldReviews = queryClient.getQueryData<Review[]>(["comments"]) || [];

      const toUpdate = oldReviews.find((r) => r._id === reviewId);

      if (!toUpdate) {
        return { oldReviews };
      }

      const updatedReview: Review = {
        ...toUpdate,
        ...payload,
        updatedAt: new Date(),
      };

      const updatedReviews = oldReviews.map((r) =>
        r._id === reviewId ? updatedReview : r
      );

      queryClient.setQueryData<Review[]>(["comments"], updatedReviews);

      return {
        oldReviews,
      };
    },

    onSuccess: () => {
      myToast({ type: "success", message: "Comment edited!" });
      setComment("");
    },
    onError: (error, _, context) => {
      myToast({ type: "info", message: error.message });

      if (context) {
        queryClient.setQueryData<Review[]>(["comments"], context.oldReviews);
      }
    },
    onSettled: (_data, _error, variable, _context) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["game", variable.gameId] });
    },
  });

  const reviewMutation = reviewId ? editCommentMutation : createCommentMutation;

  return {
    reviewMutation,
  };
}

export function useDeleteReview(id: string, gameId: string) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => ReviewController.deleteReview(id, gameId),
    onMutate() {
      const oldReviews = queryClient.getQueryData<Review[]>(["comments"]) || [];
      const updatedReviews = oldReviews.filter((r) => r._id !== id);
      queryClient.setQueryData<Review[]>(["comments"], updatedReviews);
      return { oldReviews };
    },
    onSuccess: () => {
      myToast({ type: "success", message: "Comment deleted!" });
    },
    onError: (error, _, context) => {
      myToast({ type: "info", message: error.message });
      if (context) {
        queryClient.setQueryData<Review[]>(["comments"], context.oldReviews);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });

  return deleteMutation;
}
