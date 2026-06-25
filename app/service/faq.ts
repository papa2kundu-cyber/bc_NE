import { api } from "../lib/api";

export const getFaqs = async () => {
  const response = await api.get("/get-faqs");

  return response.data.data.map(
    (faq: { question: string; answer: string }) => ({
      q: faq.question,
      a: faq.answer,
    })
  );
};
