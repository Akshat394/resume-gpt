"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Upload, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Create an <span className="text-primary">AI-Powered</span> Resume That Gets You Hired
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Build professional, ATS-friendly resumes tailored to your target roles with the help of advanced AI from Google Gemini.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 px-6">
              <Link href="/create">
                <FileText className="h-5 w-5" />
                Create My Resume
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2 px-6">
              <Link href="/upload">
                <Upload className="h-5 w-5" />
                Upload My Resume
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 md:mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
            <img 
              src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Resume Builder Screenshot" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6">
          <p className="text-muted-foreground text-sm font-medium">TRUSTED BY PROFESSIONALS FROM</p>
          <div className="w-full flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70">
            <span className="text-xl font-semibold">Google</span>
            <span className="text-xl font-semibold">Microsoft</span>
            <span className="text-xl font-semibold">Amazon</span>
            <span className="text-xl font-semibold">Apple</span>
            <span className="text-xl font-semibold">Meta</span>
          </div>
        </div>
      </div>
    </section>
  );
}