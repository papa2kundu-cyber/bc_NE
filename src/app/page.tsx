"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Palette, Sofa, Lightbulb, Star } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const services = [
  { icon: Palette, title: "Color Consultation", desc: "Expert guidance on palettes that transform your space." },
  { icon: Sofa, title: "Furniture Selection", desc: "Curated pieces that blend comfort with sophistication." },
  { icon: Lightbulb, title: "Lighting Design", desc: "Atmosphere-defining lighting for every mood." },
  { icon: Star, title: "Space Planning", desc: "Optimized layouts for flow and functionality." },
];

const projects = [
  { img: "/images/interior-bedroom.jpg", title: "Serene Bedroom Suite", category: "Residential" },
  { img: "/images/interior-kitchen.jpg", title: "Modern Kitchen", category: "Residential" },
  { img: "/images/interior-bathroom.jpg", title: "Spa Bathroom", category: "Luxury" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-living.jpg" alt="Luxurious modern interior" className="w-full h-full object-cover" fill />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 container-narrow px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              Interior Design Studio
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight">
              Where Vision <br />
              Meets <span className="text-primary">Design</span>
            </h1>
            <p className="mt-6 text-background/80 text-lg md:text-xl max-w-lg leading-relaxed">
              We craft timeless interiors that tell your story. Every space deserves to be extraordinary.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 border border-background/30 text-background px-6 py-3 rounded-md font-medium hover:bg-background/10 transition-colors"
              >
                View Our Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading
            subtitle="What We Do"
            title="Our Services"
            description="From concept to completion, we provide comprehensive design solutions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg border border-border hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Portfolio"
            title="Featured Projects"
            description="A glimpse into our most beloved transformations."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg aspect-[3/4]"
              >
                <Image src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" fill />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary text-xs uppercase tracking-widest font-medium">{p.category}</span>
                  <h3 className="font-heading text-xl font-semibold text-background mt-1">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground text-background section-padding">
        <div className="container-narrow grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "250+", label: "Projects Completed" },
            { num: "15+", label: "Years Experience" },
            { num: "120+", label: "Happy Clients" },
            { num: "18", label: "Design Awards" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary">{stat.num}</div>
              <div className="text-background/70 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-narrow max-w-2xl">
          <SectionHeading
            subtitle="Ready to Transform?"
            title="Let's Create Something Beautiful"
            description="Book a free consultation and let us bring your vision to life."
          />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors text-lg"
          >
            Book Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
