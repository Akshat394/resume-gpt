"use client";

import { createContext, useContext } from "react";
import { ResumeData } from "@/lib/types";
import { initialResumeState } from "@/lib/resume-data";
import { useState, ReactNode } from "react";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  aiSuggestions: {
    summary: string;
    experience: string[];
    skills: string[];
  } | null;
  setAISuggestions: (suggestions: {
    summary: string;
    experience: string[];
    skills: string[];
  } | null) => void;
}

export const ResumeContext = createContext<ResumeContextType>({
  resumeData: initialResumeState,
  setResumeData: () => {},
  aiSuggestions: null,
  setAISuggestions: () => {},
});

export const useResumeContext = () => useContext(ResumeContext);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [aiSuggestions, setAISuggestions] = useState<{
    summary: string;
    experience: string[];
    skills: string[];
  } | null>(null);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        aiSuggestions,
        setAISuggestions,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}