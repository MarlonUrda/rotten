import { Comments } from "@/types/Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentController } from "@/api/controllers/CommentsController";
import myToast from "@/components/toast";
import { CreateCommentRequest } from "@/types/api/Comments";

export function createComment(
  comment: Comments,
  setComment: (comment: Comments) => void,
  gameId: number
) {
  const clientQuery = useQueryClient()

  const createComment = useMutation({
    mutationFn: (payload: CreateCommentRequest) => CommentController.createComment(payload, gameId),
    onSuccess: () => {
      myToast({ type: "success", message: "Comment added!" })

      clientQuery.invalidateQueries({ queryKey: ["comments"] })
    },
    onError: (error) => {
      myToast({ type:"info", message:error.message})
    }
  })
}