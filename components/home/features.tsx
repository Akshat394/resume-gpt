"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  FileText, 
  Zap, 
  FileUp, 
  CheckCircle, 
  LayoutTemplate, 
  Download, 
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Summaries",
    description: "Generate professional career summaries tailored to your target role and experience."
  },
  {
    icon: CheckCircle,
    title: "ATS-Friendly Format",
    description: "Ensure your resume passes through Applicant Tracking Systems with optimized formatting."
  },
  {
    icon: FileUp,
    title: "Resume Parsing",
    description: "Upload your existing resume (PDF/DOCX) and get instant AI-powered improvement suggestions."
  },
  {
    icon: Zap,
    title: "One-Click Improvements",
    description: "Accept or reject AI-generated enhancements for each section of your resume."
  },
  {
    icon: RefreshCw,
    title: "Role-Specific Tailoring",
    description: "Customize your resume for specific job roles with targeted AI suggestions."
  },
  {
    icon: LayoutTemplate,
    title: "Modern Templates",
    description: "Choose from a variety of professional, clean templates designed to impress recruiters."
  },
  {
    icon: FileText,
    title: "Step-by-Step Builder",
    description: "Create your resume from scratch with our guided, intuitive builder process."
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Download your polished resume as a professional PDF document in seconds."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Powered by AI, Built for Success
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines the latest AI technology with proven resume techniques to maximize your chances of landing interviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}