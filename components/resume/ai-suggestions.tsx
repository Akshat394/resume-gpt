"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useResumeContext } from "./resume-context";

interface AISuggestionsProps {
  suggestions: {
    summary: string;
    experience: string[];
    skills: string[];
  } | null;
}

export function AISuggestions({ suggestions }: AISuggestionsProps) {
  const { resumeData, setResumeData } = useResumeContext();
  const [appliedSuggestions, setAppliedSuggestions] = useState<{
    summary: boolean;
    experience: boolean[];
    skills: boolean[];
  }>({
    summary: false,
    experience: new Array(suggestions?.experience.length || 0).fill(false),
    skills: new Array(suggestions?.skills.length || 0).fill(false),
  });

  if (!suggestions) {
    return null;
  }

  const applySuggestion = (type: 'summary' | 'experience' | 'skills', index?: number) => {
    if (type === 'summary') {
      setResumeData({
        ...resumeData,
        summary: suggestions.summary,
      });
      setAppliedSuggestions({
        ...appliedSuggestions,
        summary: true,
      });
    } else if (type === 'experience' && index !== undefined) {
      const newExperience = [...resumeData.experience];
      newExperience[index] = {
        ...newExperience[index],
        description: suggestions.experience[index],
      };
      setResumeData({
        ...resumeData,
        experience: newExperience,
      });
      setAppliedSuggestions({
        ...appliedSuggestions,
        experience: appliedSuggestions.experience.map((applied, i) =>
          i === index ? true : applied
        ),
      });
    } else if (type === 'skills' && index !== undefined) {
      const newSkills = [...resumeData.skills];
      if (!newSkills.includes(suggestions.skills[index])) {
        newSkills.push(suggestions.skills[index]);
        setResumeData({
          ...resumeData,
          skills: newSkills,
        });
        setAppliedSuggestions({
          ...appliedSuggestions,
          skills: appliedSuggestions.skills.map((applied, i) =>
            i === index ? true : applied
          ),
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {suggestions.summary && !appliedSuggestions.summary && (
          <div className="space-y-2">
            <h3 className="font-semibold">Professional Summary</h3>
            <p className="text-sm text-muted-foreground">{suggestions.summary}</p>
            <Button
              size="sm"
              onClick={() => applySuggestion('summary')}
              className="mt-2"
            >
              <Check className="mr-2 h-4 w-4" />
              Apply Suggestion
            </Button>
          </div>
        )}

        {suggestions.experience.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Experience Improvements</h3>
            {suggestions.experience.map((exp, index) => (
              !appliedSuggestions.experience[index] && (
                <div key={index} className="space-y-2">
                  <p className="text-sm text-muted-foreground">{exp}</p>
                  <Button
                    size="sm"
                    onClick={() => applySuggestion('experience', index)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Apply Suggestion
                  </Button>
                </div>
              )
            ))}
          </div>
        )}

        {suggestions.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Additional Skills</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.skills.map((skill, index) => (
                !appliedSuggestions.skills[index] && (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{skill}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => applySuggestion('skills', index)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 