"use client";

import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../service/faq";


type Faq = {
  q: string;
  a: string;
};

interface Faqs extends Array<Faq> {}

export default function FAQPage() {
  
  useSeoMeta("faq");
  const { data: faqs = [] } = useQuery<Faqs>({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });
  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <h1 className="container-narrow">
          <SectionHeading subtitle="Questions" title="Frequently Asked Questions" description="Find answers to the most common questions about our services." />
        </h1>
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
