"use client";

import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const faqs = [
  { q: "What is your design process?", a: "Our process begins with a consultation to understand your vision, followed by concept development, design presentation, and finally execution. We keep you involved at every stage to ensure the result exceeds expectations." },
  { q: "How long does a typical project take?", a: "Timelines vary based on scope. A single room redesign may take 4-6 weeks, while a full home renovation can take 3-6 months. We provide a detailed timeline during our initial consultation." },
  { q: "Do you work within a specific budget range?", a: "We work with a wide range of budgets. During our initial meeting, we discuss your budget to create a design plan that maximizes value while achieving your aesthetic goals." },
  { q: "Can I be involved in the design decisions?", a: "Absolutely! We encourage collaboration. You'll be presented with options at every stage, from color palettes to furniture selections, ensuring the final design reflects your personal style." },
  { q: "Do you offer virtual consultations?", a: "Yes, we offer virtual consultations via video call. This is a great option for clients who are out of town or prefer the convenience of remote meetings." },
  { q: "What areas do you serve?", a: "We primarily serve the tri-state area, but we've completed projects nationwide and internationally. Don't hesitate to reach out regardless of your location." },
  { q: "Do you handle renovations as well?", a: "Yes, we offer full-service renovation management, coordinating with contractors, architects, and tradespeople to bring the design to life seamlessly." },
];

export default function FAQPage() {
  useSeoMeta("faq");
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <SectionHeading subtitle="Questions" title="Frequently Asked Questions" description="Find answers to the most common questions about our services." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-heading text-base md:text-lg font-semibold hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
