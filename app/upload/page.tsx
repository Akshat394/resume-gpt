"use client";

import { ResumeUpload } from "@/components/resume/upload";
import { AISuggestions } from "@/components/resume/ai-suggestions";
import { useResumeContext } from "@/components/resume/resume-context";

export default function UploadPage() {
  const { aiSuggestions } = useResumeContext();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <ResumeUpload />
      {aiSuggestions && <AISuggestions suggestions={aiSuggestions} />}
    </div>
  );
}