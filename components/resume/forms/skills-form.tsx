"use client";

import { useState } from "react";
import { useResumeContext } from "@/components/resume/resume-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Sparkles, X, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Common skill suggestions by category
const skillSuggestions = {
  "Software Development": [
    "JavaScript", "TypeScript", "React", "Angular", "Vue.js", 
    "Node.js", "Python", "Java", "C#", "REST APIs", 
    "GraphQL", "SQL", "NoSQL", "Git", "CI/CD"
  ],
  "Data Science": [
    "Python", "R", "SQL", "Machine Learning", "Deep Learning", 
    "TensorFlow", "PyTorch", "Data Visualization", "Statistics", 
    "Pandas", "NumPy", "Jupyter", "Tableau", "Power BI"
  ],
  "Product Management": [
    "Product Strategy", "User Research", "A/B Testing", "Roadmapping", 
    "Agile", "Scrum", "Jira", "Market Analysis", "User Stories", 
    "Competitive Analysis", "Wireframing", "Prioritization"
  ],
  "Design": [
    "UI/UX Design", "Figma", "Adobe XD", "Sketch", "Prototyping", 
    "User Research", "Wireframing", "Visual Design", "Interaction Design", 
    "Responsive Design", "Accessibility", "Design Systems"
  ],
  "Marketing": [
    "SEO", "Content Marketing", "Social Media Marketing", "Email Marketing", 
    "Google Analytics", "Facebook Ads", "Google Ads", "Marketing Automation", 
    "Copywriting", "Brand Strategy", "Growth Hacking", "CRM"
  ]
};

export function SkillsForm() {
  const { resumeData, setResumeData } = useResumeContext();
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Software Development");
  const { toast } = useToast();
  
  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    if (resumeData.skills.includes(newSkill.trim())) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your list.",
        variant: "destructive",
      });
      return;
    }
    
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill.trim()],
    });
    
    setNewSkill("");
  };
  
  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    });
  };
  
  const addSuggestedSkill = (skill: string) => {
    if (resumeData.skills.includes(skill)) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your list.",
        variant: "destructive",
      });
      return;
    }
    
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill],
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };
  
  const generateAISkills = () => {
    if (!resumeData.targetRole) {
      toast({
        title: "Missing target role",
        description: "Please set your target role first to get relevant skill suggestions.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Generating skills...",
      description: "Analyzing your target role to suggest relevant skills.",
    });
    
    // Simulate AI-generated skills based on the target role
    setTimeout(() => {
      let aiSkills: string[] = [];
      
      if (resumeData.targetRole.toLowerCase().includes("software") || 
          resumeData.targetRole.toLowerCase().includes("developer") ||
          resumeData.targetRole.toLowerCase().includes("engineer")) {
        aiSkills = skillSuggestions["Software Development"];
      } 
      else if (resumeData.targetRole.toLowerCase().includes("data")) {
        aiSkills = skillSuggestions["Data Science"];
      }
      else if (resumeData.targetRole.toLowerCase().includes("product")) {
        aiSkills = skillSuggestions["Product Management"];
      }
      else if (resumeData.targetRole.toLowerCase().includes("design")) {
        aiSkills = skillSuggestions["Design"];
      }
      else if (resumeData.targetRole.toLowerCase().includes("marketing")) {
        aiSkills = skillSuggestions["Marketing"];
      }
      else {
        // Default to software if we can't determine
        aiSkills = skillSuggestions["Software Development"];
      }
      
      // Shuffle and take first 10
      aiSkills = aiSkills.sort(() => 0.5 - Math.random()).slice(0, 10);
      
      // Add skills that aren't already in the list
      const newSkills = aiSkills.filter(skill => !resumeData.skills.includes(skill));
      
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, ...newSkills],
      });
      
      toast({
        title: "Skills generated",
        description: `Added ${newSkills.length} relevant skills for ${resumeData.targetRole}`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-muted-foreground">
          Add relevant skills for your target role. These will be formatted for ATS compatibility.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="new-skill">Your Skills</Label>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={generateAISkills}
                  className="gap-1"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Skills
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="new-skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., JavaScript"
                  />
                </div>
                <Button onClick={addSkill} disabled={!newSkill.trim()}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
            
            {resumeData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center"
                  >
                    {skill}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  No skills added yet. Add skills individually or generate them with AI.
                </p>
              </div>
            )}
            
            <div className="space-y-3 border-t pt-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Suggested Skills</h3>
                <div className="flex flex-wrap space-x-2 gap-y-2">
                  {Object.keys(skillSuggestions).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skillSuggestions[selectedCategory as keyof typeof skillSuggestions]
                  .filter(skill => !resumeData.skills.includes(skill))
                  .map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-3 py-1.5 text-sm"
                      onClick={() => addSuggestedSkill(skill)}
                    >
                      + {skill}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}