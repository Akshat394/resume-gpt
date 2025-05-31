"use client";

import { useState } from "react";
import { useResumeContext } from "./resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2 } from "lucide-react";
import { parsePDF, extractResumeData, getAISuggestions } from "@/lib/resume-parser";
import { toast } from "sonner";

export function ResumeUpload() {
  const { setResumeData, setAISuggestions } = useResumeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [targetRole, setTargetRole] = useState("");

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
        skills: extractedData.skills || {},
        projects: extractedData.projects || [],
        certifications: extractedData.certifications || [],
        targetRole: '',
        experienceLevel: 'entry'
      });

      // Get AI suggestions if target role is provided
      if (targetRole) {
        const suggestions = await getAISuggestions(text, targetRole);
        setAISuggestions(suggestions);
        toast.success("AI suggestions generated!", {
          description: "Check the suggestions panel for improvements.",
        });
      }

      toast.success("Resume uploaded successfully!");
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
          Upload your existing resume to get started.
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
                Enter your target role to get AI-powered suggestions for improvement.
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
    </div>
  );
} 