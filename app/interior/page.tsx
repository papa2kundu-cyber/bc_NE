"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const services = [
  {
    title: "Office or Your Very Own Home—Just Name It",
    desc: "Every home and workplace owns different vibe. Some people love a calm & cosy bedroom, others want an office where they can motivate themselves. This is why hiring luxury interior designers in Kolkata becomes important. Whether it's a home upgrade or just simply an office makeover; we are highly professional with it.",
    img: "/images/interior-office.jpg",
  },
  {
    title: "Interior Design for Apartments — Small Space, Big Impact",
    desc: "These days, living in an apartment means adjustment with space. The most common statement of the people living there is ‘We don't have enough space’, which is relatable. But serving the right plan can switch even a tiny room into your favourite spot. Our luxury interior designers in Kolkata do exactly that. They make the most of your space to make a dream corner happen.",
    img: "/images/hero-living.jpg",
  },
  {
    title: "Kitchen Interior — Designing The Heart of Your Home",
    desc: "Being the heart of a home, kitchen is the area that takes most of your hours in a day. So, it should be a place you use out of love, not only necessity. Be it more storage, better lights, or extra access to appliances, our interior designs are based on your requirements. Being the top interior decorators in Kolkata, we keep your kitchen clutter-free, as it should be more functional than aesthetic.",
    img: "/images/interior-kitchen.jpg",
  },
  {
    title: "Bathroom Interior— A Personal Retreat You Dream of",
    desc: "While the concept of bathroom interior is usually overlooked, it becomes important. Doesn't matter if you own a compact bathroom or a spacious one; luxury interior designers in Kolkata work on both. From nice patterns to correct alignments of lights and tiles, we keep things simple here for your convenience. We believe your self-care hours should be relaxing, but with easy-to-maintain features.",
    img: "/images/interior-bathroom.jpg",
  },
];

const features = [
  {
    title: "Get Luxury in Your Pocket",
    desc: "Now, you must be thinking about the expense for all these, which is absolutely normal. Yes, we do plan premium designs, but not by overshadowing your budget. We will show you designs that don't cross your financial range. After all, this is why cheap and best interior designers in Kolkata are for. Isn't it?",
  },
  {
    title: "We Value Your Timeline",
    desc: "In this fast-paced generation, each second counts, and we truly understand that. That’s why we keep updating you through the entire process. From selecting materials to final execution, our team ensures everything runs smoothly. Our approach is so simple & transparent that clients can't help but return to our luxury Interior designers in Kolkata for more projects ahead.",
  },
  {
    title: "Success Joined Our Projects",
    desc: "Over the years, we’ve had the privilege to design apartments, villas, offices, & more. Moreover, we’ve grown and learnt from each project; consequently, this has built our experience graph. Additionally, our successful portfolio has earned us the spot of the top interior decorators in Kolkata.",
  },
];

export default function InteriorPage() {
  useSeoMeta("interior");
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Interior Services"
            title="Your Decor Needs an Upgrade? We're in!"
            description="In a generation where tradition walks with modernity, interior design isn't about furniture or colours anymore. So here we are, as luxury interior designers in Kolkata, who create beyond the same-old conception. We fascinate our customers by creating their personal space, radiant with warmth and aesthetic to their eyes."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow space-y-20">
          {services.map((cat, i) => (
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
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow text-center">
          <SectionHeading
            title="Where To Find Us?"
            description="If you’ve been searching for luxury interior designers in Kolkata or even exploring options like cheap and best interior designers in Kolkata, then you're in the right spot."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <div className="flex items-center gap-3 bg-muted/50 px-6 py-4 rounded-full text-left">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">Call Us Today</p>
                <p className="font-semibold whitespace-nowrap">74391-33325 / 9875426319</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-muted/50 px-6 py-4 rounded-full text-left">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="max-w-[200px] sm:max-w-none">
                <p className="text-sm text-muted-foreground">Visit Us At</p>
                <p className="font-semibold text-sm sm:text-base leading-tight mt-0.5">11no. Rail gate, Duckbunglow more, Barasat</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
