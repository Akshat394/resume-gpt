"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Create or Upload",
    description: "Start fresh with our guided builder or upload your existing resume for enhancement."
  },
  {
    number: "02",
    icon: Upload,
    title: "Select Your Role",
    description: "Tell us your target job role and experience level for tailored improvements."
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Review AI Suggestions",
    description: "Get AI-powered suggestions to enhance each section of your resume."
  },
  {
    number: "04",
    icon: Download,
    title: "Export and Apply",
    description: "Download your polished, ATS-friendly resume and start applying with confidence."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our simple four-step process takes your resume from good to exceptional in minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-6xl font-bold text-primary/10 mb-4">{step.number}</div>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 right-0 w-1/2 h-[2px] bg-muted-foreground/20 translate-x-1/2">
                  <div className="absolute -right-2 top-1/2 w-4 h-4 rounded-full border-2 border-muted-foreground/20 bg-background -translate-y-1/2"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}