"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Play } from "lucide-react";
import Image from "next/image";

const videos = [
  { thumb: "/images/hero-living.jpg", title: "Modern Living Room Transformation", duration: "4:32" },
  { thumb: "/images/interior-kitchen.jpg", title: "Kitchen Renovation Timelapse", duration: "6:15" },
  { thumb: "/images/interior-bedroom.jpg", title: "Bedroom Design Walkthrough", duration: "3:48" },
  { thumb: "/images/interior-bathroom.jpg", title: "Luxury Bathroom Reveal", duration: "5:20" },
  { thumb: "/images/interior-office.jpg", title: "Office Space Makeover", duration: "7:10" },
  { thumb: "/images/hero-living.jpg", title: "Behind the Scenes: Design Process", duration: "8:45" },
];

export default function VideoGalleryPage() {
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Watch" title="Video Gallery" description="Step inside our projects through immersive video walkthroughs." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <Image src={v.thumb} alt={v.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
                    {v.duration}
                  </div>
                </div>
                <h3 className="font-heading text-base font-semibold mt-3 group-hover:text-primary transition-colors">{v.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
