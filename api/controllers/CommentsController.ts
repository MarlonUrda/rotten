import { CreateCommentRequest, CreateCommentResponse, CreateCommentResponseSchema, DeleteCommentResponse, DeleteCommentResponseSchema, getComments, GetCommentsResponse, GetCommentsResponseSchema, UpdateCommentRequest, UpdateCommentResponse, UpdateCommentResponseSchema } from "@/types/api/Comments";
import { superFetch, SuperFetchError } from "./superFetch";

export class CommentController {
  static async getComments(gameId: number): Promise<GetCommentsResponse> {
    try {
      const result = await superFetch<undefined, GetCommentsResponse, "comments">({
        options: {
          method: "GET"
        },
        route: "comments",
        routeParams: [gameId],
        responseSchema: GetCommentsResponseSchema
      })
      console.log(result)

      return result;
    } catch (error) {
      console.log("error")
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching comments");
    }
  }

  static async createComment(payload: CreateCommentRequest, gameId: number): Promise<CreateCommentResponse> {
    try {
      const result = await superFetch<CreateCommentRequest, CreateCommentResponse, "comments">({
        options: {
          method: "POST"
        },
        route: "comments",
        routeParams: [payload.gameId],
        responseSchema: CreateCommentResponseSchema,
        payload: payload
      })

      return result;
    } catch (error) {
      console.log("error")
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error adding comment to db.");
    }
  }

  static async updateComment(payload: UpdateCommentRequest, gameId:number) {
    try {
      const result = await superFetch<UpdateCommentRequest, UpdateCommentResponse, "comments/:id">({
        options: {
          method: "PUT"
        },
        route: "comments/:id",
        routeParams: [gameId, payload._id],
        responseSchema: UpdateCommentResponseSchema,
        payload: payload
      })

      console.log(result)

      return result;
    } catch (error) {
      console.log("error")
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error updating comment.");
    }
  }

  static async deleteComment(id: string, gameId:number) {
    try {
      const result = await superFetch<undefined, DeleteCommentResponse, "comments/:id">({
        options: {
          method: "DELETE"
        },
        route: "comments/:id",
        routeParams: [gameId, id],
        responseSchema: DeleteCommentResponseSchema
      })
      console.log(result)

      return result;
    } catch (error) {
      console.log("error")
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error deleting comment in db.");
    }
  }
}