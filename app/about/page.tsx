"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { Award, Users, Eye, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const values = [
  { icon: Eye, title: "Vision", desc: "We see the potential in every space and bring it to life with creativity and precision." },
  { icon: Heart, title: "Passion", desc: "Design is our calling. Every project receives our full dedication and creative energy." },
  { icon: Award, title: "Excellence", desc: "We never settle for ordinary. Quality craftsmanship is in every detail we touch." },
  { icon: Users, title: "Collaboration", desc: "Your input drives our design. We believe the best spaces are co-created." },
];

const Counter = ({ endValue, color }: any) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 1 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: any;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: any) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, endValue]);

  return <span ref={counterRef}>{count}</span>;
};


export default function AboutPage() {
  useSeoMeta("about");
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Who We Are" title="About Us" description="We are a passionate team of designers transforming spaces into experiences since 2009." />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-narrow grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/images/about-team.jpg" alt="Our design team" className="object-cover" fill />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2009, LuxeInterior began with a simple belief: every space has a story waiting to be told. What started as a small studio has grown into an award-winning firm with a portfolio spanning residential, commercial, and hospitality projects.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our team of 25+ talented designers, architects, and project managers works collaboratively to deliver spaces that are both aesthetically stunning and deeply functional. We don&apos;t just design rooms — we craft experiences.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-heading font-bold text-primary"><Counter endValue={parseInt(`250`)}/>+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary"><Counter endValue={parseInt(`15`)} />+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary"><Counter endValue={parseInt(`25`)}/>+</div>
                <div className="text-sm text-muted-foreground">Designers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Our Philosophy" title="Core Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h4 className="font-heading text-lg font-semibold mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
