"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Star, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { appendReview } from "@/lib/reviewStore";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useSeoMeta } from "@/hooks/useSeoMeta";

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            size={36}
            style={{
              color: star <= (hovered || value) ? "#dd7139" : "#dd7139", // #d1d5db is text-gray-300
              fill: star <= (hovered || value) ? "#dd7139" : "none"
            }}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm text-muted-foreground font-medium">
          {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][value]}
        </span>
      )}
    </div>
  );
}

function RateForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    setForm((f) => ({ ...f, name, email }));
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    appendReview({
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: "",
      rating: form.rating,
      description: form.description,
      images: [],
      allowed: false, // pending admin approval
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-4 text-center"
      >
        <CheckCircle size={64} className="text-green-500" />
        <h2 className="text-2xl font-bold text-foreground">Thank You, {form.name}!</h2>
        <p className="text-muted-foreground max-w-sm">
          Your {form.rating}-star review has been submitted. We truly appreciate your feedback!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-6 max-w-lg mx-auto"
    >
      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Your Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Enter your name"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Email Address</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Star Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Your Rating <span className="text-destructive">*</span>
        </label>
        <StarRatingInput
          value={form.rating}
          onChange={(v) => setForm((f) => ({ ...f, rating: v }))}
        />
      </div>

      {/* Review Text */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Your Review</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Share your experience with us..."
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
      >
        <Send size={16} />
        Submit Review
      </button>
    </motion.form>
  );
}

export default function RatePage() {
  useSeoMeta("rate");
  return (
    <Layout>
      <section className="pb-8 px-4">
        <div className="w-full flex justify-center pb-6">
          <Image src={logo} alt="logo" width={1920} height={1080} className="w-64 h-auto" />
        </div>
        <div className="container mx-auto max-w-2xl">
          <SectionHeading
            title={<span>Share Your <span className="text-primary">Experience</span></span>}
          // subtitle="We'd love to hear what you think about our services. Your feedback helps us grow!"
          />
          <div className="mt-8">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
              <RateForm />
            </Suspense>
          </div>
        </div>
      </section>
    </Layout>
  );
}
