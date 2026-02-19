"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    img: "/images/interior-bedroom.jpg",
    title: "10 Bedroom Trends That Will Define 2026",
    excerpt: "Discover the latest bedroom design trends from warm earth tones to organic shapes that are reshaping modern bedrooms.",
    author: "Sarah Mitchell",
    date: "Feb 10, 2026",
    category: "Trends",
  },
  {
    img: "/images/interior-kitchen.jpg",
    title: "The Art of Kitchen Lighting Design",
    excerpt: "How strategic lighting can transform your kitchen from a functional workspace into the heart of your home.",
    author: "James Chen",
    date: "Feb 5, 2026",
    category: "Tips",
  },
  {
    img: "/images/interior-bathroom.jpg",
    title: "Creating a Spa-Like Bathroom at Home",
    excerpt: "Expert tips on materials, layouts, and accessories that bring the luxury spa experience into your daily routine.",
    author: "Emma Ross",
    date: "Jan 28, 2026",
    category: "Guide",
  },
];

export default function BlogPage() {
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Insights" title="Our Blog" description="Design inspiration, trends, and expert tips from our team." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="overflow-hidden aspect-[3/2] relative">
                  <Image src={post.img} alt={post.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill />
                </div>
                <div className="p-6">
                  <span className="text-primary text-xs font-medium uppercase tracking-widest">{post.category}</span>
                  <h3 className="font-heading text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
