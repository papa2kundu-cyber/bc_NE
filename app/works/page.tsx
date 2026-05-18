"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import { photoService } from "@/services/photoService";

export default function WorksPage() {
  useSeoMeta("works");

  const [filter, setFilter] = useState<string | number>("all");

  // ✅ Fetch Categories
  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
  });

  // ✅ Fetch Photos
  const { data: photos = [], isLoading: photoLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: photoService.getAllPhotos, // must return res.data.data
  });

  // ✅ Combine "All" + API categories
  const categoryTabs = [
    { id: "all", name: "All" },
    ...categories,
  ];

  // ✅ Filter Logic
  const filtered =
    filter === "all"
      ? photos
      : photos.filter((p: any) => p.category_id === filter);

  const isLoading = catLoading || photoLoading;

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Portfolio"
            title="Our Works"
            description="Explore our curated collection of transformative interior designs."
          />
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-narrow">

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categoryTabs.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Loader */}
          {isLoading ? (
            <div className="text-center py-20 text-muted-foreground">
              Loading works...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No works found.
            </div>
          ) : (
            /* Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item: any) => {
                const image = item.images?.[0]?.image_url;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3]"
                  >
                    {/* Image */}
                    {image ? (
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                        No Image
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-primary text-xs uppercase tracking-widest">
                        {item.category?.name}
                      </span>
                      <h3 className="font-heading text-lg font-semibold text-background">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}