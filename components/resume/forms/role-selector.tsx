"use client";

import { useResumeContext } from "@/components/resume/resume-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase } from "lucide-react";

const popularRoles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
  "Marketing Manager",
  "Financial Analyst",
];

export function RoleSelector() {
  const { resumeData, setResumeData } = useResumeContext();
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({
      ...resumeData,
      targetRole: e.target.value,
    });
  };
  
  const handleExperienceChange = (value: string) => {
    setResumeData({
      ...resumeData,
      experienceLevel: value as "entry" | "mid" | "senior",
    });
  };
  
  const selectPopularRole = (role: string) => {
    setResumeData({
      ...resumeData,
      targetRole: role,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Target Role</h2>
        <p className="text-muted-foreground">
          The AI will tailor your resume for this specific role and experience level.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="targetRole">
                What job role are you targeting?
              </Label>
              <Input
                id="targetRole"
                placeholder="e.g., Software Engineer, Product Manager"
                value={resumeData.targetRole}
                onChange={handleRoleChange}
              />
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Popular roles:</p>
                <div className="flex flex-wrap gap-2">
                  {popularRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        resumeData.targetRole === role
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                      onClick={() => selectPopularRole(role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>
                What is your experience level?
              </Label>
              <RadioGroup
                value={resumeData.experienceLevel}
                onValueChange={handleExperienceChange}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  resumeData.experienceLevel === "entry" ? "border-primary bg-primary/5" : ""
                }`}>
                  <RadioGroupItem
                    value="entry"
                    id="entry"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="entry"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="h-8 w-8" />
                    <span className="font-medium">Entry Level</span>
                    <span className="text-sm text-muted-foreground">0-2 years experience</span>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  resumeData.experienceLevel === "mid" ? "border-primary bg-primary/5" : ""
                }`}>
                  <RadioGroupItem
                    value="mid"
                    id="mid"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="mid"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="h-8 w-8" />
                    <span className="font-medium">Mid Level</span>
                    <span className="text-sm text-muted-foreground">3-5 years experience</span>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  resumeData.experienceLevel === "senior" ? "border-primary bg-primary/5" : ""
                }`}>
                  <RadioGroupItem
                    value="senior"
                    id="senior"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="senior"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="h-8 w-8" />
                    <span className="font-medium">Senior Level</span>
                    <span className="text-sm text-muted-foreground">6+ years experience</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}