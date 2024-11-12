import { CreateCommentRequest, CreateCommentResponse, CreateCommentResponseSchema, getComments, GetCommentsResponse, GetCommentsResponseSchema } from "@/types/api/Comments";
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
      console.log("result")

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
        routeParams: [gameId],
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
}