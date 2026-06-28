import { api } from "../lib/api";

export type Post = {
  id:string,
  slug: string;
  img: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: {
    // id: string;
    name: string;
  };
  content: string;
};

export const getBlogs = async (): Promise<Post[]> => {
  const response = await api.get("/get-blogs");

  return response.data.data.map((blog: any) => ({
    id:blog.id,
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
export const getBlogById = async (id: string): Promise<Post | null> => {
  const response = await api.get(`/blog/${id}`);

  if (!response.data.data) {
    return null;
  }

  const blog = response.data.data;

  return {
    id:blog.id,
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
  };
};