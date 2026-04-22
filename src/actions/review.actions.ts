'use server'

import { reviewServices } from "@/services/review.services";
import { ICreateReviewInput } from "@/types/review.interface";

export const createReview = async (value:ICreateReviewInput) => {
  const result = await reviewServices.createReview(value)
  return await result
}
export const getReviewByRoomId = async (id:string) => {
  const result = await reviewServices.getReviewByRoomId(id)
  return await result
}