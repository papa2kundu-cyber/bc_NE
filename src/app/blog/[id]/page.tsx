import { notFound } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Calendar, User } from "lucide-react";
import { Metadata } from "next";
import { getBlogById, getBlogs } from "@/app/service/blog";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const post = await getBlogById(id);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.img],
    },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { id } = await params;

  const post = await getBlogById(id);
  console.log(post)
  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container-narrow max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-primary text-sm uppercase tracking-widest">
              {post.category }
            </span>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-4 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/9] mb-10 rounded-lg overflow-hidden">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <article
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>
      </section>
    </Layout>
  );
}