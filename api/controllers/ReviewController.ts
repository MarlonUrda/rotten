import {
  CreateReviewRequest,
  CreateReviewResponse,
  CreateReviewResponseSchema,
  DeleteReviewResponse,
  DeleteReviewResponseSchema,
  GetReviews,
  GetReviewsResponse,
  getReviewsResponseSchema,
  UpdateReviewRequest,
  UpdateReviewResponse,
  UpdateReviewResponseSchema,
} from "@/types/api/Reviews";
import { superFetch, SuperFetchError } from "./superFetch";

export class ReviewController {
  static async getGameReviews(gameId: string): Promise<GetReviewsResponse> {
    try {
      const result = await superFetch<undefined, GetReviewsResponse, "reviews">(
        {
          options: {
            method: "GET",
            includeCredentials: true,
          },
          route: "reviews",
          routeParams: [gameId],
          responseSchema: getReviewsResponseSchema,
        }
      );
      console.log(result);

      return result;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error fetching reviews");
    }
  }

  static async createReview(
    payload: CreateReviewRequest
  ): Promise<CreateReviewResponse> {
    try {
      const result = await superFetch<
        CreateReviewRequest,
        CreateReviewResponse,
        "reviews"
      >({
        options: {
          method: "POST",
          includeCredentials: true,
        },
        route: "reviews",
        routeParams: [payload.gameId],
        responseSchema: CreateReviewResponseSchema,
        payload: payload,
      });

      return result;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error adding comment to db.");
    }
  }

  static async updateReview(payload: UpdateReviewRequest) {
    try {
      const result = await superFetch<
        UpdateReviewRequest,
        UpdateReviewResponse,
        "reviews/:id"
      >({
        options: {
          method: "PUT",
        },
        route: "reviews/:id",
        routeParams: [payload.gameId, payload.reviewId],
        responseSchema: UpdateReviewResponseSchema,
        payload: payload,
      });

      console.log(result);

      return result;
    } catch (error) {
      console.log("error");
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      throw new Error("Error updating comment.");
    }
  }

  static async deleteReview(id: string, gameId: number) {
    try {
      const result = await superFetch<
        undefined,
        DeleteReviewResponse,
        "reviews/:id"
      >({
        options: {
          method: "DELETE",
        },
        route: "reviews/:id",
        routeParams: [gameId, id],
        responseSchema: DeleteReviewResponseSchema,
      });
      console.log(result);

      return result;
    } catch (error) {
      const sfError = error as SuperFetchError;
      console.log(sfError.code, sfError.message);
      if (sfError.code === 400) {
        throw new Error("User already has a comment here.");
      }
    }
  }
}
