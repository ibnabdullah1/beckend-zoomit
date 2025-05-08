import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

//@ need to fix
const createReview = async (payload: IReview, user: JwtPayload) => {
  try {
    console.log("payload", payload);
  } catch (err) {
    console.error("Error creating review:", err);
  }
};

const getAllReviews = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(
    Review.find().populate("product user"),
    query
  )
    .search(["review"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await brandQuery.modelQuery;
  const meta = await brandQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const ReviewServices = {
  createReview,
  getAllReviews,
};
