"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ResumeBuilder } from "@/components/resume/resume-builder";
import { ResumeContext } from "@/components/resume/resume-context";
import { initialResumeState } from "@/lib/resume-data";

export default function CreateResumePage() {
  const [resumeData, setResumeData] = useState(initialResumeState);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-10">
          <ResumeBuilder />
        </main>
        <Footer />
      </div>
    </ResumeContext.Provider>
  );
}