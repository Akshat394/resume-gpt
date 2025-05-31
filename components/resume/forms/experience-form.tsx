"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResumeContext } from "@/components/resume/resume-context";
import { ExperienceItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Trash2, 
  CalendarIcon, 
  Sparkles, 
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export function ExperienceForm() {
  const { resumeData, setResumeData } = useResumeContext();
  const { toast } = useToast();
  
  const addExperience = () => {
    const newExperience: ExperienceItem = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      bullets: [""],
    };
    
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };
  
  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const removeExperience = (index: number) => {
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const addBullet = (experienceIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[experienceIndex].bullets.push("");
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const updateBullet = (experienceIndex: number, bulletIndex: number, value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[experienceIndex].bullets[bulletIndex] = value;
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const removeBullet = (experienceIndex: number, bulletIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[experienceIndex].bullets = updatedExperience[experienceIndex].bullets.filter((_, i) => i !== bulletIndex);
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const moveBulletUp = (experienceIndex: number, bulletIndex: number) => {
    if (bulletIndex === 0) return;
    
    const updatedExperience = [...resumeData.experience];
    const bullets = [...updatedExperience[experienceIndex].bullets];
    
    [bullets[bulletIndex], bullets[bulletIndex - 1]] = [bullets[bulletIndex - 1], bullets[bulletIndex]];
    
    updatedExperience[experienceIndex].bullets = bullets;
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const moveBulletDown = (experienceIndex: number, bulletIndex: number) => {
    const bullets = resumeData.experience[experienceIndex].bullets;
    if (bulletIndex === bullets.length - 1) return;
    
    const updatedExperience = [...resumeData.experience];
    const updatedBullets = [...updatedExperience[experienceIndex].bullets];
    
    [updatedBullets[bulletIndex], updatedBullets[bulletIndex + 1]] = [updatedBullets[bulletIndex + 1], updatedBullets[bulletIndex]];
    
    updatedExperience[experienceIndex].bullets = updatedBullets;
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const enhanceBullet = async (experienceIndex: number, bulletIndex: number) => {
    const bullet = resumeData.experience[experienceIndex].bullets[bulletIndex];
    
    if (!bullet.trim()) {
      toast({
        title: "Empty bullet point",
        description: "Please enter some content before enhancing.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would call an API to enhance the bullet
    // For this demo, we'll simulate the API call with a timeout
    toast({
      title: "Enhancing bullet point",
      description: "This may take a few seconds...",
    });
    
    setTimeout(() => {
      const enhancedBullet = `Increased team productivity by 30% through the implementation of ${bullet.toLowerCase().includes('automation') ? 'improved automation workflows' : 'streamlined processes'} and ${bullet.toLowerCase().includes('tool') ? 'custom tooling enhancements' : 'cross-functional collaboration initiatives'}`;
      
      updateBullet(experienceIndex, bulletIndex, enhancedBullet);
      
      toast({
        title: "Bullet point enhanced",
        description: "The AI has improved your bullet point with more impactful language.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <p className="text-muted-foreground">
          Add your relevant work experience, starting with the most recent position.
        </p>
      </div>
      
      <div className="space-y-4">
        {resumeData.experience.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No work experience added yet.</p>
              <Button onClick={addExperience}>
                <Plus className="mr-2 h-4 w-4" />
                Add Work Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Accordion type="multiple" defaultValue={[`exp-0`]} className="w-full">
              {resumeData.experience.map((exp, index) => (
                <AccordionItem key={exp.id} value={`exp-${index}`}>
                  <AccordionTrigger className="hover:no-underline px-4 py-2 bg-card border rounded-t-lg">
                    <div className="flex-1 text-left flex items-center">
                      {exp.position || exp.company ? (
                        <span>
                          {exp.position} {exp.company && `at ${exp.company}`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Untitled Position</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border border-t-0 rounded-b-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`position-${index}`}>Job Title</Label>
                        <Input
                          id={`position-${index}`}
                          value={exp.position}
                          onChange={(e) => updateExperience(index, "position", e.target.value)}
                          placeholder="e.g., Software Engineer"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="e.g., Google"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={exp.location}
                          onChange={(e) => updateExperience(index, "location", e.target.value)}
                          placeholder="e.g., San Francisco, CA"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Time Period</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={exp.current}
                              onCheckedChange={(checked) => updateExperience(index, "current", checked)}
                              id={`current-${index}`}
                            />
                            <Label htmlFor={`current-${index}`} className="text-sm">
                              Current Position
                            </Label>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                              placeholder="Start Date"
                            />
                          </div>
                          
                          <div>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                              placeholder="End Date"
                              disabled={exp.current}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`description-${index}`}>Job Description (Optional)</Label>
                      <Textarea
                        id={`description-${index}`}
                        value={exp.description}
                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                        placeholder="Brief overview of your role and responsibilities"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Key Achievements & Responsibilities</Label>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => addBullet(index)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Bullet
                        </Button>
                      </div>
                      
                      {exp.bullets.length === 0 ? (
                        <div className="text-center py-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">
                            No bullet points added yet.
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => addBullet(index)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Bullet Point
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-start gap-2">
                              <div className="flex-1">
                                <div className="flex">
                                  <span className="mt-2 mr-2">•</span>
                                  <Input
                                    value={bullet}
                                    onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                                    placeholder="Describe an achievement or responsibility"
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => enhanceBullet(index, bulletIndex)}
                                  className="h-9 w-9"
                                >
                                  <Sparkles className="h-4 w-4" />
                                  <span className="sr-only">Enhance</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveBulletUp(index, bulletIndex)}
                                  disabled={bulletIndex === 0}
                                  className="h-9 w-9"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                  <span className="sr-only">Move up</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveBulletDown(index, bulletIndex)}
                                  disabled={bulletIndex === exp.bullets.length - 1}
                                  className="h-9 w-9"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                  <span className="sr-only">Move down</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeBullet(index, bulletIndex)}
                                  className="h-9 w-9 text-destructive hover:text-destructive/90"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Experience
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Button 
              variant="outline" 
              onClick={addExperience}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Position
            </Button>
          </>
        )}
      </div>
    </div>
  );
}