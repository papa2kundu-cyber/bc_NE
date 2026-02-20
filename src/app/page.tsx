"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import lineGrow from "../../public/images/lineGrow.svg";

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
    title: "Discovery",
    desc: "We listen to your vision, lifestyle, and goals through an in-depth consultation.",
  },
  {
    step: "02",
    title: "Concept Design",
    desc: "Our team develops mood boards, space plans, and visual concepts for your approval.",
  },
  {
    step: "03",
    title: "Material Selection",
    desc: "We source premium materials, furniture, and finishes that match your style.",
  },
  {
    step: "04",
    title: "Implementation",
    desc: "Our skilled team brings the design to life with precision and care.",
  },
  {
    step: "05",
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
    icon: Eye,
    title: "Better Use of Space",
    desc: "Expert planning ensures every square metre is utilised to its full potential.",
  },
  {
    icon: Users,
    title: "Improved Wellbeing",
    desc: "Thoughtfully designed spaces reduce stress and enhance your daily quality of life.",
  },
  {
    icon: Award,
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
    <section className="md:px-0 md:py-0 px0 py-0 bg-foreground relative">
      {/* <div className=""> */}
      {/* <div className="absolute z-10 flex items-center justify-center w-full h-full">
          <SectionHeading
            subtitle="Watch Our Story"
            classNameT="!text-white"
            classNameDe="!text-white/80"
            title="See Design Come to Life"
            description="Experience how we transform ordinary spaces into extraordinary living environments."
          />
        </div> */}
      <div className="relative overflow-hidden md:aspect-[16/7.5] aspect-[16/10] shadow-2xl">
        {/* Dummy background image */}
        <video
          src="/video/Interior_Website_Intro_Video_Generation.MP4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* <Image
            src="/images/hero-living.jpg"
            alt="Interior design showcase"
            fill
            className="object-cover"
          /> */}
        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-foreground/60" /> */}

        {/* Decorative top-left label */}
        {/* <div className="absolute top-5 left-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-background/80 text-xs uppercase tracking-widest font-medium">
              Brightocity Interior
            </span>
          </div> */}

        {/* Centre play button — purely decorative / UI indicator */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <span className="cursor-pointer w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl ring-4 ring-primary/30">
                <Play size={36} className="text-white ml-1" />
              </span>
              <span className="text-background/80 text-sm font-medium tracking-wide">
                Watch Our Story
              </span>
            </div>
          </div> */}

        {/* Bottom info bar */}
        {/* <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-foreground/80 to-transparent flex items-center justify-between">
            <div>
              <p className="text-background font-heading font-semibold text-lg leading-tight">
                Transforming Spaces Since 2008
              </p>
              <p className="text-background/60 text-xs mt-0.5">
                Interior Design &amp; Styling
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                "/images/interior-bedroom.jpg",
                "/images/interior-kitchen.jpg",
                "/images/interior-bathroom.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-primary/60 hidden sm:block"
                >
                  <Image
                    src={src}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <span className="text-background/70 text-xs hidden sm:block">
                +247 Projects
              </span>
            </div>
          </div> */}
      </div>
      {/* </div> */}
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
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  });

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-narrow">
        <SectionHeading
          subtitle="Our Portfolio"
          title="Gallery"
          description="A curated collection of our finest interior transformations."
        />
        <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[16/9] lg:aspect-[16/6]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[current].img}
                alt={galleryImages[current].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <h3 className="font-heading text-2xl font-bold text-background">
                  {galleryImages[current].title}
                </h3>
                {/* <p className="text-background/70 text-sm mt-1">
                  {current + 1} / {galleryImages.length}
                </p> */}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 lg:bottom-4 right-4 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-background/60"}`}
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
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <SectionHeading
          subtitle="Questions Answered"
          title="FAQs"
          description="Everything you need to know before starting your design journey."
        />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-foreground hover:bg-muted/30 transition-colors"
              >
                <span>{faq.q}</span>
                {open === i ? (
                  <Minus size={18} className="text-primary shrink-0" />
                ) : (
                  <Plus size={18} className="text-primary shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">
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
      if (scrolled > 0.5 && !dismissed) setShown(true);
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
              <Link href={`tel:9903455451`}>+91 9903455451</Link>
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <Layout>
      {/* 1) VIDEO */}
      <VideoSection />

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
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 md:text-left text-center flex flex-col md:flex-row">
                  <strong className="text-[32px] md:text-[38px]">About</strong>
                  &nbsp;
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
                        {s.num}
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

      {/* 3) GALLERY (SLIDER TYPE) */}
      <GallerySlider />

      {/* 4) PERSONALIZED DESIGNS */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Made for You"
            title="Personalized Designs"
            description="Every space is unique. We craft interiors that reflect your personality, taste, and lifestyle."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalizedDesigns.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group overflow-hidden rounded-xl border border-border hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) OUR EXPERTISE */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            subtitle="What We Do Best"
            title="Our Expertise"
            description="Deep specialisation across every dimension of interior design."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseItems.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="hover:bg-primary/10 flex gap-4 p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-white group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                  <item.icon
                    size={22}
                    className="text-primary group-hover:text-white"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) WHY CHOOSE US */}
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

      {/* 7) WORK PROCESS */}
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
              <Image src={lineGrow} alt="lineGrow" className="h-0.5 w-auto" />
            </motion.div>
              <motion.div
              className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
              animate={{ x: ["20%", "44%"] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              >
              <Image src={lineGrow} alt="lineGrow" className="h-0.5 w-auto" />
            </motion.div>
             <motion.div
              className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
              animate={{ x: ["42%", "64%"] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
              <Image src={lineGrow} alt="lineGrow" className="h-0.5 w-auto" />
            </motion.div>
            <motion.div
              className="hidden lg:flex gap-1 absolute top-10 left-0 right-0 z-1"
              animate={{ x: ["63%", "84%"] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
              <Image src={lineGrow} alt="lineGrow" className="h-0.5 w-auto" />
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
                    <span className="text-white font-heading font-bold text-lg">
                      {step.step}
                    </span>
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

      {/* 8) WHY YOU NEED INTERIOR SERVICES */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-medium text-sm uppercase tracking-widest mb-3 block">
                The Value of Design
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Why You Need{" "}
                <span className="text-primary">Interior Services</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Professional interior design goes far beyond aesthetics. It
                shapes how you feel in your home every single day — boosting
                your mood, productivity, and overall quality of life.
              </p>
              <div className="space-y-5">
                {interiorBenefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <b.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{b.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/4]"
            >
              <Image
                src="/images/interior-bedroom.jpg"
                alt="Why you need interior services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9) OUR SUCCESS JOURNEY */}
      {/* use in sfuture */}
      {/* <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Our Story"
            title="Our Success Journey"
            description="From a small studio to an award-winning interior design firm — here's how we grew."
          />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-8 md:space-y-0">
              {successMilestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  <div className={`mb-4 md:mb-0 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <span className="inline-block text-primary font-heading text-2xl font-bold bg-primary/10 px-4 py-1 rounded-full mb-2">
                      {m.year}
                    </span>
                    <h3 className="font-heading text-xl font-semibold mb-2">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* 10) FAQs */}
      <FAQSection />

      {/* 11) GET IN TOUCH – half-scroll popup */}
      <GetInTouchPopup />

      {/* 12) FOOTER is rendered by Layout automatically */}
    </Layout>
  );
}
