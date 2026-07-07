import { api } from './../lib/api';
interface VideoApi {
  id: number;
  title: string;
  description: string;
  video_url: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  urlThumb: string;
}
const getYoutubeThumbnail = (url: string) => {
  const parsed = new URL(url);

  let id = "";

  if (parsed.hostname === "youtu.be") {
    id = parsed.pathname.slice(1);
  } else {
    id = parsed.searchParams.get("v") || "";
  }

  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

export const getAllVideos = async (): Promise<Video[]> => {
  const response = await api.get("/get-video-gallery");
    // console.log("jghuhjg")
  return response.data.data.map((video: VideoApi) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    url: video.video_url,
    urlThumb: getYoutubeThumbnail(video.video_url),
  }));
};