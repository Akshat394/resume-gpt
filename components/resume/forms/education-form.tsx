"use client";

import { v4 as uuidv4 } from "uuid";
import { useResumeContext } from "@/components/resume/resume-context";
import { EducationItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
  const { resumeData, setResumeData } = useResumeContext();
  
  const addEducation = () => {
    const newEducation: EducationItem = {
      id: uuidv4(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };
  
  const updateEducation = (index: number, field: string, value: any) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };
  
  const removeEducation = (index: number) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-muted-foreground">
          Add your educational background, starting with the most recent.
        </p>
      </div>
      
      <div className="space-y-4">
        {resumeData.education.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No education added yet.</p>
              <Button onClick={addEducation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Accordion type="multiple" defaultValue={[`edu-0`]} className="w-full">
              {resumeData.education.map((edu, index) => (
                <AccordionItem key={edu.id} value={`edu-${index}`}>
                  <AccordionTrigger className="hover:no-underline px-4 py-2 bg-card border rounded-t-lg">
                    <div className="flex-1 text-left flex items-center">
                      {edu.degree || edu.institution ? (
                        <span>
                          {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`} {edu.institution && `at ${edu.institution}`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Untitled Education</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border border-t-0 rounded-b-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="e.g., Harvard University"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="e.g., Bachelor of Science"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                        <Input
                          id={`fieldOfStudy-${index}`}
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={edu.location}
                          onChange={(e) => updateEducation(index, "location", e.target.value)}
                          placeholder="e.g., Cambridge, MA"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
                        <Input
                          id={`gpa-${index}`}
                          value={edu.gpa || ""}
                          onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                          placeholder="e.g., 3.8"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Time Period</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={edu.current}
                              onCheckedChange={(checked) => updateEducation(index, "current", checked)}
                              id={`current-edu-${index}`}
                            />
                            <Label htmlFor={`current-edu-${index}`} className="text-sm">
                              Current Student
                            </Label>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                              placeholder="Start Date"
                            />
                          </div>
                          
                          <div>
                            <Input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                              placeholder="End Date"
                              disabled={edu.current}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                      <Textarea
                        id={`description-${index}`}
                        value={edu.description || ""}
                        onChange={(e) => updateEducation(index, "description", e.target.value)}
                        placeholder="Relevant coursework, honors, activities, etc."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeEducation(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Education
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Button 
              variant="outline" 
              onClick={addEducation}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Education
            </Button>
          </>
        )}
      </div>
    </div>
  );
}