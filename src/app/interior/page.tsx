"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const categories = [
  {
    title: "Living Rooms",
    desc: "Open, inviting spaces where comfort meets elegance.",
    img: "/images/hero-living.jpg",
  },
  {
    title: "Bedrooms",
    desc: "Tranquil retreats designed for rest and relaxation.",
    img: "/images/interior-bedroom.jpg",
  },
  {
    title: "Kitchens",
    desc: "Functional beauty where culinary magic happens.",
    img: "/images/interior-kitchen.jpg",
  },
  {
    title: "Bathrooms",
    desc: "Spa-inspired sanctuaries for daily renewal.",
    img: "/images/interior-bathroom.jpg",
  },
  {
    title: "Home Offices",
    desc: "Productive spaces that inspire creative thinking.",
    img: "/images/interior-office.jpg",
  },
];

export default function InteriorPage() {
  useSeoMeta("interior");
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Explore" title="Interior Design" description="Discover our specialized expertise across every room in your home." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow space-y-20">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              style={{ direction: i % 2 !== 0 ? "rtl" : "ltr" }}
            >
              <div className="overflow-hidden rounded-lg relative aspect-[4/3]" style={{ direction: "ltr" }}>
                <Image src={cat.img} alt={cat.title} className="object-cover hover:scale-105 transition-transform duration-500" fill />
              </div>
              <div style={{ direction: "ltr" }}>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{cat.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our approach combines timeless aesthetics with modern functionality. We carefully select materials, colors, and textures that create a harmonious environment tailored to your lifestyle and preferences.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
