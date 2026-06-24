import axios from "axios";

const api=axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


export const getFaqs = async () => {
  const response = await api.get("/get-faqs");

  return response.data.data.map(
    (faq: { question: string; answer: string }) => ({
      q: faq.question,
      a: faq.answer,
    })
  );
};

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