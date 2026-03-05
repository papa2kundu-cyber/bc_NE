"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const categories = ["All", "Residential", "Commercial", "Luxury"];

const works = [
  { img: "/images/hero-living.jpg", title: "Modern Living Room", category: "Residential" },
  { img: "/images/interior-kitchen.jpg", title: "Gourmet Kitchen", category: "Residential" },
  { img: "/images/interior-bedroom.jpg", title: "Master Suite", category: "Luxury" },
  { img: "/images/interior-bathroom.jpg", title: "Spa Bathroom", category: "Luxury" },
  { img: "/images/interior-office.jpg", title: "Executive Office", category: "Commercial" },
  { img: "/images/interior-kitchen.jpg", title: "Restaurant Interior", category: "Commercial" },
];

export default function WorksPage() {
  useSeoMeta("works");
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? works : works.filter((w) => w.category === filter);

  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Portfolio" title="Our Works" description="Explore our curated collection of transformative interior designs." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex flex-wrap justify-start gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((w, i) => (
              <motion.div
                key={w.title + i}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <Image src={w.img} alt={w.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-primary text-xs uppercase tracking-widest">{w.category}</span>
                  <h3 className="font-heading text-lg font-semibold text-background">{w.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
