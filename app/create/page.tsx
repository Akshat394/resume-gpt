"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JobSpecificBuilder } from "@/components/resume/job-specific-builder";

export default function CreateResumePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-10">
        <JobSpecificBuilder />
      </main>
      <Footer />
    </div>
  );
}