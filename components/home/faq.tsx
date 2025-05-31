"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does ResumeGPT improve my resume?",
    answer: "ResumeGPT uses advanced AI from Google Gemini to analyze your resume content and suggest improvements based on industry standards, ATS requirements, and your target role. It helps enhance your career summary, experience descriptions, skills section, and overall formatting."
  },
  {
    question: "What file formats can I upload?",
    answer: "Currently, ResumeGPT supports PDF and DOCX resume uploads. We extract the content while preserving the structure of your resume, then provide AI-powered suggestions for improvement."
  },
  {
    question: "Is my resume data secure?",
    answer: "Yes, we take data security seriously. Your resume data is encrypted and never shared with third parties. We only use it to provide you with improvement suggestions and create your enhanced resume."
  },
  {
    question: "How does the AI tailoring for specific roles work?",
    answer: "When you select your target job role and experience level, our AI analyzes industry requirements and best practices for that specific position. It then suggests targeted improvements to make your resume more appealing to recruiters and ATS systems in that field."
  },
  {
    question: "Can I edit the AI suggestions?",
    answer: "Absolutely! You have full control over your resume. For each AI suggestion, you can accept, reject, or modify it before applying the changes to your final resume."
  },
  {
    question: "What makes the resumes ATS-friendly?",
    answer: "Our templates and formatting follow ATS best practices, including proper section headings, clean formatting without tables or complex elements, appropriate keywords, and standard fonts. This helps ensure your resume gets through automated screening systems."
  },
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions about ResumeGPT.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}