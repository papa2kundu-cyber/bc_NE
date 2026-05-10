"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import {
  ArrowRight,
  // Play,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle,
  Award,
  Users,
  Clock,
  Layers,
  Eye,
  PenTool,
  Home,
  Star,
  Quote,
  X,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { ratingService } from "@/services";
import { seedReviews } from "@/lib/adminStore";
// import { metadataMap } from "./layout";
const lineGrow = "/images/lineGrow.svg";

const discovery = "/images/aboutIcon/discovery.svg";
const concept = "/images/aboutIcon/conceptDesign.svg";
const material = "/images/aboutIcon/materialSelection.svg";
const implementation = "/images/aboutIcon/implementation.svg";
const reveal = "/images/aboutIcon/revealHandover.svg";

const space = "/images/wynis/space.svg";
const aethetics = "/images/wynis/aethetics.svg";
const wellbeing = "/images/wynis/wellbeing.svg";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

// ─── Data ────────────────────────────────────────────────────────────────────

const personalizedDesigns = [
  {
    img: "/images/interior-bedroom.jpg",
    title: "Bedroom Retreat",
    desc: "Serene, bespoke bedroom designs tailored to your personal style.",
  },
  {
    img: "/images/interior-kitchen.jpg",
    title: "Kitchen Elegance",
    desc: "Functional kitchens that blend aesthetics with everyday living.",
  },
  {
    img: "/images/interior-bathroom.jpg",
    title: "Spa Bathroom",
    desc: "Luxurious bathroom spaces that feel like a private sanctuary.",
  },
  {
    img: "/images/interior-office.jpg",
    title: "Home Office",
    desc: "Productive, inspiring workspaces designed around your needs.",
  },
];

const expertiseItems = [
  {
    icon: Home,
    title: "Residential Design",
    desc: "Complete home transformations — from single rooms to entire properties.",
  },
  {
    icon: Layers,
    title: "Space Planning",
    desc: "Intelligent layouts that maximise flow, comfort, and functionality.",
  },
  {
    icon: PenTool,
    title: "Custom Furniture",
    desc: "Bespoke pieces crafted to fit your space and aesthetic perfectly.",
  },
  {
    icon: Eye,
    title: "Visual Concepts",
    desc: "Photorealistic renders so you can see your space before we build it.",
  },
  {
    icon: Award,
    title: "Award-Winning Style",
    desc: "Recognised design excellence across residential and commercial projects.",
  },
  {
    icon: Users,
    title: "Client-Centred Process",
    desc: "Every decision is guided by your preferences, lifestyle, and budget.",
  },
];

const whyChooseUs = [
  { num: "250+", label: "Projects Completed" },
  { num: "15+", label: "Years Experience" },
  { num: "120+", label: "Happy Clients" },
  { num: "18", label: "Design Awards" },
];

const whyChooseReasons = [
  {
    icon: CheckCircle,
    title: "Tailored to You",
    desc: "Every design is created exclusively for you — no templates, no shortcuts.",
  },
  {
    icon: Clock,
    title: "On Time, On Budget",
    desc: "We respect your time and money, delivering projects as promised.",
  },
  {
    icon: Star,
    title: "Quality Craftsmanship",
    desc: "Premium materials and skilled artisans ensure lasting beauty.",
  },
  {
    icon: Award,
    title: "Award-Winning Team",
    desc: "Our designers are industry-recognised with decades of combined experience.",
  },
];

const galleryImages = [
  { img: "/images/interior-bedroom.jpg", title: "Serene Bedroom Suite" },
  { img: "/images/interior-kitchen.jpg", title: "Modern Kitchen" },
  { img: "/images/interior-bathroom.jpg", title: "Spa Bathroom" },
  { img: "/images/hero-living.jpg", title: "Open Living Space" },
  { img: "/images/interior-office.jpg", title: "Home Office" },
  { img: "/images/about-team.jpg", title: "Design Studio" },
];

const workProcess = [
  {
    step: "01",
    imag: discovery,
    title: "Discovery",
    desc: "We listen to your vision, lifestyle, and goals through an in-depth consultation.",
  },
  {
    step: "02",
    imag: concept,
    title: "Concept Design",
    desc: "Our team develops mood boards, space plans, and visual concepts for your approval.",
  },
  {
    step: "03",
    imag: material,
    title: "Material Selection",
    desc: "We source premium materials, furniture, and finishes that match your style.",
  },
  {
    step: "04",
    imag: implementation,
    title: "Implementation",
    desc: "Our skilled team brings the design to life with precision and care.",
  },
  {
    step: "05",
    imag: reveal,
    title: "Reveal & Handover",
    desc: "We walk you through your transformed space and ensure your complete satisfaction.",
  },
];

const interiorBenefits = [
  {
    icon: Home,
    title: "Increased Property Value",
    desc: "A professionally designed interior can boost your property's market value significantly.",
  },
  {
    icon: space,
    title: "Better Use of Space",
    desc: "Expert planning ensures every square metre is utilised to its full potential.",
  },
  {
    icon: wellbeing,
    title: "Improved Wellbeing",
    desc: "Thoughtfully designed spaces reduce stress and enhance your daily quality of life.",
  },
  {
    icon: aethetics,
    title: "Cohesive Aesthetic",
    desc: "Professional designers create harmonious spaces that feel intentional and polished.",
  },
];

// let successMilestones = [
//   { year: "2008", title: "Founded", desc: "Brightocity Interior was established with a vision to transform living spaces." },
//   { year: "2012", title: "First Award", desc: "Won our first regional design excellence award for a luxury residential project." },
//   { year: "2016", title: "100 Projects", desc: "Celebrated 100 completed projects across residential and commercial sectors." },
//   { year: "2019", title: "National Recognition", desc: "Featured in leading interior design publications across the country." },
//   { year: "2022", title: "International Projects", desc: "Expanded our services internationally with projects across three continents." },
//   { year: "2024", title: "250+ Projects", desc: "Reached a milestone of 250+ completed projects with a 98% client satisfaction rate." },
// ];

const faqs = [
  {
    q: "How long does an interior design project take?",
    a: "Timelines vary by project scope. A single room typically takes 4-6 weeks, while full home projects can take 3-6 months, including planning, sourcing, and implementation.",
  },
  {
    q: "How much does interior design cost?",
    a: "Costs depend on the scope, size, and materials selected. We offer a free initial consultation and provide a detailed quote tailored to your budget and requirements.",
  },
  {
    q: "Do you work with existing furniture?",
    a: "Absolutely. We can incorporate your existing pieces into the new design, ensuring a cohesive look while respecting your investment.",
  },
  // {
  //   q: "Can you work within a tight budget?",
  //   a: "Yes. We are experienced in maximising impact within any budget. We'll prioritise the changes that deliver the most value for your investment.",
  // },
  // {
  //   q: "Do you manage contractors and suppliers?",
  //   a: "Yes, we offer full project management — coordinating all tradespeople, suppliers, and deliveries so you don't have to.",
  // },
  // {
  //   q: "Do you offer 3D visualisations before work starts?",
  //   a: "Yes. We provide photorealistic 3D renders so you can see and approve the design before any physical work begins.",
  // },
];

// ─── Components ───────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section className="relative overflow-hidden md:aspect-[16/7.5] aspect-[16/10] shadow-2xl">
      <video
        src="/video/Interior_Website_Intro_Video_Generation.MP4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f3f4f4] via-[#ffffffc8]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none">
        <span className="text-foreground/80 text-[10px] sm:text-xs tracking-[0.3em] font-medium uppercase drop-shadow-md">
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent"
        />
      </div>
    </section>
  );
}

function GallerySlider() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? galleryImages.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === galleryImages.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  });

  return (
    <section className="py-24 bg-foreground relative overflow-hidden text-background">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="container-narrow relative z-10">
        <SectionHeading
          subtitle="Our Portfolio"
          title="Gallery"
          description="A curated collection of our finest interior transformations."
          classNameT="!text-background"
          classNameDe="!text-background/80"
        />

        <div className="relative mt-16 mx-auto max-w-5xl rounded-3xl p-2 md:p-3 border border-background/20 bg-background/5 backdrop-blur-sm">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/10] lg:aspect-[16/7] shadow-2xl bg-muted z-10 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[current].img}
                  alt={galleryImages[current].title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-px bg-primary/80" />
                      <span className="text-primary font-medium tracking-widest text-xs uppercase">
                        Project {String(current + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md">
                      {galleryImages[current].title}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-white/20 w-2 hover:bg-white/40"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 relative bg-background">
      <div className="container-narrow max-w-3xl relative z-10">
        <SectionHeading
          subtitle="Questions Answered"
          title="FAQs"
          description="Everything you need to know before starting your design journey."
        />
        <div className="space-y-4 mt-12">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`rounded-2xl transition-all duration-300 border ${open === i ? 'bg-card border-primary/30 shadow-lg shadow-primary/5' : 'bg-transparent border-border hover:border-primary/30'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 text-left group"
              >
                <span className={`font-semibold text-base md:text-lg transition-colors ${open === i ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${open === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                  {open === i ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetInTouchPopup() {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.1 && !dismissed) setShown(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const close = () => {
    setShown(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 bg-card border border-border rounded-2xl shadow-2xl p-6 w-80 max-w-[calc(100vw-3rem)]"
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <h3 className="font-heading text-lg font-bold mb-1">Get in Touch</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Ready to transform your space? Let&apos;s start a conversation.
          </p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={14} className="text-primary" />
              <Link href={`tel:7439133325`}>+91 7439133325</Link>
              <Link href={`tel:9875426319`}>+91 9875426319</Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={14} className="text-primary" />
              <Link href={`mailto:brightocityinterior@gmail.com`}>
                brightocityinterior@gmail.com
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              <span>11 no. Rail gate, Hridaypur, Barasat, Kolkata: 700127</span>
            </div>
          </div>
          <Link
            href="/contact"
            onClick={close}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            Book Free Consultation <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

// ─── Reviews Carousel ─────────────────────────────────────────────────────────

function ReviewsCarousel() {
  const { data: apiReviews } = useQuery({
    queryKey: ["approved-ratings"],
    queryFn: ratingService.getAllApprovedRatings,
    staleTime: 5 * 60 * 1000,
  });

  const reviews = (
    apiReviews && apiReviews.length > 0
      ? apiReviews
      : seedReviews.filter((r) => r.allowed)
  ) as Array<{ id: string | number; name: string; rating?: number; description?: string }>;

  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (reviews.length <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  });

  if (!reviews.length) return null;

  const review = reviews[current];

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-narrow relative z-10">
        <SectionHeading
          subtitle="Client Reviews"
          title="What Our Clients Say"
          description="Real stories from the people who live in the spaces we've created."
        />

        <div className="relative max-w-4xl mx-auto mt-12 px-10 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-card/80 backdrop-blur border border-border/60 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative"
            >
              <Quote
                size={80}
                className="absolute top-8 left-8 text-primary/10 rotate-180 pointer-events-none"
              />
              <Quote
                size={80}
                className="absolute bottom-8 right-8 text-primary/10 pointer-events-none"
              />

              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="flex justify-center gap-1.5 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < (review.rating ?? 5)
                          ? "text-[#DD7139] fill-[#DD7139]"
                          : "text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>

                <p className="text-foreground text-xl md:text-2xl font-heading leading-relaxed mb-10 text-balance">
                  &ldquo;{review.description ?? "Great service and design!"}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary/10">
                    {review.name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                  <div className="text-left text-sm">
                    <p className="font-bold text-foreground flex items-center gap-1.5 text-base">
                      {review.name}
                      <BadgeCheck className="text-blue-500 w-4 h-4" />
                    </p>
                    <p className="text-muted-foreground mt-0.5 tracking-wide uppercase text-[10px] font-bold">
                      Verified Client
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {reviews.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous review"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-xl group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-xl group"
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                    ? "bg-primary w-8"
                    : "bg-primary/20 w-1.5 hover:bg-primary/40"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container-narrow">
        <SectionHeading
          subtitle="Our Commitment"
          title="Why Choose Us"
          classNameT="!text-white"
          description="We combine creativity with discipline to deliver design experiences that exceed expectations."
        />
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          {whyChooseUs.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-4xl font-heading font-bold text-primary">
                {/* {s.num} */}
                <Counter endValue={parseInt(s.num)} />+
              </div>
              <div className="text-background/70 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
        {/* Reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseReasons.map((r, i) => (
            <motion.div
              key={r.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-background/5 border border-background/10 rounded-xl p-6 hover:bg-background/10 transition-colors"
            >
              <r.icon size={28} className="text-primary mb-3" />
              <h3 className="font-heading text-lg font-semibold mb-2">
                {r.title}
              </h3>
              <p className="text-background/70 text-sm leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkProcess() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          subtitle="How We Work"
          title="Work Process"
          description="A transparent, collaborative process from first conversation to final reveal."
        />
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-border z-0" />
          <motion.div
            className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
            animate={{ x: ["0%", "22%"] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          >
            <Image src={lineGrow} width={100} height={100} alt="lineGrow" className="h-0.5 w-auto" />
          </motion.div>

          <motion.div
            className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
            animate={{ x: ["20%", "44%"] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          >
            <Image src={lineGrow} width={100} height={100} alt="lineGrow" className="h-0.5 w-auto" />
          </motion.div>

          <motion.div
            className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
            animate={{ x: ["42%", "64%"] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          >
            <Image src={lineGrow} width={100} height={100} alt="lineGrow" className="h-0.5 w-auto" />
          </motion.div>

          <motion.div
            className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
            animate={{ x: ["63%", "84%"] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          >
            <Image src={lineGrow} width={100} height={100} alt="lineGrow" className="h-0.5 w-auto" />
          </motion.div>
          <div className="hidden lg:block absolute top-5 right-0 w-24 h-10 bg-white z-1" />
          <div className="hidden lg:block absolute top-5 left-0 w-24 h-10 bg-white z-1" />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {workProcess.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}

                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg">
                  {/* <span className="text-white font-heading font-bold text-lg">
                      {step.step}
                    </span> */}
                  <Image src={step.imag} width={100} height={100} alt="step" className="w-8 h-8" />

                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const pdfSections = [
  {
    title: "Welcome to Brightocity Interior",
    desc: "Welcome to Brightocity Interior, where we turn your everyday corner into something truly aesthetic. Being the best interior designers in Kolkata, we customise your comfort zone in a way that reflects your personality while hugging luxury design elements. Each of our projects has its own story towards perfection blended with class, style, and practicality.",
    img: "/images/about-team.jpg"
  },
  {
    title: "Why Should Interiors Be Well-designed?",
    desc: "Your choice in Interiors defines your lifestyle. A space covered with suitable interiors brings positivity and peace to the environment. Applying suitable shades, lights, and layout lightens your mood, reduces stress levels, and mirrors your personal choice. Overall, it manages your home or workspace both functionally and emotionally for family & guests.",
    img: "/images/interior-bedroom.jpg"
  },
  {
    title: "Your Dream Decor Deserves The Best Interior Designers in Kolkata",
    desc: "The best interior designers in Kolkata are fully aware of coordinating furniture and decor with technical knowledge to advance usability & safety. We are the leading interior design company in Kolkata, who believe every space deserves proper attention.",
    img: "/images/hero-living.jpg"
  },
  {
    title: "How We Approach Interior Design To You",
    desc: "Our approach starts with noting down your requirements and ends with making it a reality through inspiring & functional enough interiors. Each task is done by the best interior designers in Kolkata. Hence, the results are not just visually stunning but also thoughtfully made.",
    img: "/images/interior-kitchen.jpg"
  },
  {
    title: "Service for Both Residential & Commercial Projects",
    desc: "Be it a residential design or a commercial one, our team will take the lead so that you don't worry about a thing. As one of the best interior decorators in Kolkata, we pick the correct textures, colours, and materials for a warm, sophisticated space. That way, it lasts long even after having premium finish.",
    img: "/images/interior-office.jpg"
  },
  {
    title: "Process That Is Client-centric and Hassle-free",
    desc: "Partnering with the best interior designers in Kolkata covers a smooth process with the final setup. We schedule meetups with our clients to make sure their expectations meet our capabilities. As trusted interior designers & decorators in Kolkata, we know how to balance between innovation and functionality for the best outcome possible.",
    img: "/images/interior-bathroom.jpg"
  },
  {
    title: "Where Experiences Talk",
    desc: "The expertise we have handles numerous projects on modern apartments and premium corporate spaces. Our interior design company in Kolkata guarantees a meticulously planned delivery & execution, which eventually gained the trust of millions. This consistency is the reason behind our reputation as one of the best interior designers in Kolkata till now.",
    img: "/images/hero-living.jpg"
  },
  {
    title: "Meticulous Finish",
    desc: "Our determination for a result you can't turn your head from has earned us the title of luxury interior designers in Kolkata. Moreover, luxury isn't just a word for us. It lives in the details, and our team makes sure to prove it through refinement in every sense. As a result, we’ve become the best interior designers in Kolkata for our clients, who never compromise on quality.",
    img: "/images/interior-bedroom.jpg"
  },
  {
    title: "A Blend of Convenience & Trend",
    desc: "We always keep convenience in mind while showing off class in each interior we design for you. It is our greatest pleasure to be counted among the best interior decorators in Kolkata for designing aesthetic and easy-to-live-in spaces. Dedicated interior designers & decorators in Kolkata, give every project its own unique character while keeping everything to your choice.",
    img: "/images/interior-kitchen.jpg"
  },
  {
    title: "Invest in Good Hands",
    desc: "Once you pick the best interior designers in Kolkata, you invest in only the best quality and creativity. Our work is our identity which reflects on how we decorate your personal space. So, let us design you such interiors that can both inspire & impress you.\n\nIf you're ready to live in a space you'll want to keep looking back to, then let us know. We're just a call away.",
    img: "/images/about-team.jpg"
  }
];

function PDFSectionsRenderer() {
  return (
    <div className="flex flex-col gap-24 pb-24 bg-background relative overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block -translate-x-1/2" />

      {/* 2) ABOUT US */}
      <div className="relative bg-[url('/images/reBg.png')] bg-repeat bg-center">
        <div className="w-full h-full bg-[#ffffffc8] absolute" />
        <section className="section-padding bg-muted/30 relative z-10">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="hidden md:block relative rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src="/images/about-team.jpg"
                  alt="About Brightocity Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-primary text-white rounded-xl px-5 py-3 shadow-lg">
                  <div className="text-3xl font-bold font-heading">15+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-primary font-medium text-sm uppercase tracking-widest mb-3 block md:text-left text-center">
                  Who We Are
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 md:text-left text-center flex flex-col md:flex-row gap-0 md:gap-2">
                  <strong className="text-[32px] md:text-[38px]">About</strong>
                  <span className="text-primary">Brightocity Interior</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At Brightocity Interior, we believe that great design is the
                  art of bringing harmony to a space. Founded in 2008, we have
                  spent over 15 years creating homes and commercial environments
                  that inspire, comfort, and endure.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our multidisciplinary team of designers, architects, and
                  craftspeople collaborate closely with each client to deliver
                  spaces that are as functional as they are beautiful. We are
                  passionate about every detail — from the perfect shade of
                  paint to the precise placement of furniture.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { num: "250+", label: "Projects Done" },
                    { num: "120+", label: "Happy Clients" },
                    { num: "18", label: "Awards Won" },
                    { num: "15+", label: "Years Experience" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-card border border-border rounded-lg p-4 text-center"
                    >
                      <div className="text-2xl font-bold font-heading text-primary">
                        <Counter endValue={parseInt(s.num)} />+
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Learn More About Us{" "}
                  <ArrowRight
                    size={18}
                    className="duration-300 -rotate-45 group-hover:rotate-0"
                  />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="md:hidden block relative rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src="/images/about-team.jpg"
                  alt="About Brightocity Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-primary text-white rounded-xl px-5 py-3 shadow-lg">
                  <div className="text-3xl font-bold font-heading">15+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <div className="container-narrow relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <SectionHeading
            subtitle="Our Approach"
            title="Premium Design Solutions"
            description="Crafting personalized spaces combining luxury with deep comfort."
          />
        </div>

        <div className="flex flex-col gap-28 md:gap-40 mt-12">
          {pdfSections.map((sec, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative group`}>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`lg:col-span-7 relative ${i % 2 !== 0 ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1'}`}
              >
                <div className={`absolute inset-0 border border-primary/30 rounded-2xl transition-transform duration-700 -z-10 bg-transparent ${i % 2 !== 0 ? '-translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6' : 'translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6'}`} />

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-2xl z-10 bg-muted">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                  <Image
                    src={sec.img}
                    alt={sec.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: i % 2 !== 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className={`lg:col-span-5 relative z-20 ${i % 2 !== 0 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}
              >
                <div className={`absolute -top-16 lg:-top-24 ${i % 2 !== 0 ? 'right-0 lg:right-auto lg:left-0' : 'left-0 lg:left-auto lg:-right-8'} text-[8rem] lg:text-[12rem] font-heading font-black text-primary/5 select-none pointer-events-none leading-none -z-10`}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 p-2 sm:p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-8 lg:w-16 h-px bg-primary/60" />
                    <span className="text-primary font-medium tracking-widest uppercase text-xs lg:text-sm">
                      Phase {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground leading-[1.15]">
                    {sec.title}
                  </h2>
                  <p className="text-muted-foreground/90 leading-relaxed whitespace-pre-line text-[15px] lg:text-[17px] font-body">
                    {sec.desc}
                  </p>

                  {i === pdfSections.length - 1 && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-10 lg:mt-12 inline-block"
                    >
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/30"
                      >
                        Start Your Project
                        <ArrowRight size={18} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // useSeoMeta("home");
  // metadataMap?.home
  return (
    <Layout>
      <VideoSection />
      <PDFSectionsRenderer />
      <GallerySlider />
      <ReviewsCarousel />
      <WhyChooseUs />
      <WorkProcess />
      <FAQSection />
      <GetInTouchPopup />
    </Layout>
  );
}
