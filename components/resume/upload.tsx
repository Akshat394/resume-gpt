"use client";

import { useState } from "react";
import { useResumeContext } from "./resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2, Sparkles } from "lucide-react";
import { parsePDF, extractResumeData, getAISuggestions } from "@/lib/resume-parser";
import { toast } from "sonner";
import { AISuggestions } from "./ai-suggestions";

export function ResumeUpload() {
  const { setResumeData, setAISuggestions, aiSuggestions } = useResumeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      // Parse PDF
      const text = await parsePDF(file);
      
      // Extract resume data
      const extractedData = extractResumeData(text);
      setResumeData({
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          linkedin: '',
          website: '',
          location: '',
          ...extractedData.personalInfo
        },
        summary: extractedData.summary || '',
        experience: extractedData.experience || [],
        education: extractedData.education || [],
        skills: extractedData.skills || [],
        projects: extractedData.projects || [],
        certifications: extractedData.certifications || [],
        targetRole: targetRole || '',
        experienceLevel: 'entry'
      });

      // Get AI suggestions
      const suggestions = await getAISuggestions(text, targetRole || 'Software Engineer');
      setAISuggestions(suggestions);
      setShowSuggestions(true);
      
      toast.success("Resume uploaded and analyzed successfully!", {
        description: "Check the AI suggestions below for improvements.",
      });
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Upload Resume</h2>
        <p className="text-muted-foreground">
          Upload your existing resume to get started and receive AI-powered suggestions.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target-role">Target Role (Optional)</Label>
              <Input
                id="target-role"
                placeholder="e.g., Senior Software Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter your target role to get more relevant AI-powered suggestions.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume (PDF)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                />
                {isLoading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your resume in PDF format to get started.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showSuggestions && aiSuggestions && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h3 className="text-xl font-semibold">AI Suggestions</h3>
          </div>
          <AISuggestions suggestions={aiSuggestions} />
        </div>
      )}
    </div>
  );
} 