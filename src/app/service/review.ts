import { api } from "../lib/api";
interface Review {
  id: number;
  name: string;
  description: string;
  rating: number;
}

export const getVerifiedReviews = async (): Promise<Review[]> => {
   console.log("getReviews called");
  const response = await api.get("/get-home");
  console.log(response.data);

  return response.data.ratings;
};