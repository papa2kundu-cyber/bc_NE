import { api } from "../lib/api";

export type Post = {
  slug: string;
  img: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  content: string;
};

export const getBlogs = async (): Promise<Post[]> => {
  const response = await api.get("/get-blogs");

  return response.data.data.map((blog: any) => ({
    slug: blog.slug,
    img: blog.image_url || "/images/blog-placeholder.jpg",
    title: blog.title,
    excerpt: blog.description,
    author: blog.username,
    date: new Date(blog.publish_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    category: blog.category.name,
    content: blog.description,
  }));
};