"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, Post } from "../service/blog";
// import { getBlogs,Post } from "../api/route";

export default function BlogPage() {
  useSeoMeta("blog");
const { data: posts = [], isLoading, error } = useQuery<Post[]>({
  queryKey: ["blogs"],
  queryFn: getBlogs,
});
if (isLoading) {
  return (
    <Layout>
      <div className="container py-20">Loading...</div>
    </Layout>
  );
}

if (error) {
  return (
    <Layout>
      <div className="container py-20">
        Failed to load blogs.
      </div>
    </Layout>
  );
}
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Insights"
            title="Our Blog"
            description="Design inspiration, trends, and expert tips from our team."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
  <Link key={post.slug} href={`/blog/${post.slug}`}>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="overflow-hidden aspect-[3/2] relative">
        <Image
          src={post.img}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <span className="text-primary text-xs font-medium uppercase tracking-widest">
          {post.category}
        </span>

        <h3 className="font-heading text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User size={12} />
            {post.author}
          </span>

          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
        </div>
      </div>
    </motion.article>
  </Link>
))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
