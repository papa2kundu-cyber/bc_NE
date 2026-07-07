import { api } from "../lib/api";

interface Image {
  id: number;
  title: string;
  url: string;
}

export const getImages = async (): Promise<Image[]> => {
  const response = await api.get("/get-all-photo");

  return response.data.data.map((photo: any) => ({
    id: photo.id,
    title: photo.title,
    url: photo.images[0]?.image_url ?? "",
  }));
};