"use client";

import { v4 as uuidv4 } from "uuid";
import { useResumeContext } from "@/components/resume/resume-context";
import { ProjectItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ProjectsForm() {
  const { resumeData, setResumeData } = useResumeContext();
  const { toast } = useToast();
  
  const addProject = () => {
    const newProject: ProjectItem = {
      id: uuidv4(),
      title: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
    };
    
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };
  
  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };
  
  const removeProject = (index: number) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };
  
  const addTechnology = (index: number, tech: string) => {
    if (!tech.trim()) return;
    
    const project = resumeData.projects[index];
    
    if (project.technologies.includes(tech.trim())) {
      toast({
        title: "Technology already added",
        description: "This technology is already in the list.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index].technologies = [...project.technologies, tech.trim()];
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
    
    // Clear the input field
    const input = document.getElementById(`tech-input-${index}`) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };
  
  const removeTechnology = (projectIndex: number, tech: string) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].technologies = updatedProjects[projectIndex].technologies.filter(
      (t) => t !== tech
    );
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };
  
  const handleTechKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      addTechnology(index, target.value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-muted-foreground">
          Add relevant projects that demonstrate your skills and experience.
        </p>
      </div>
      
      <div className="space-y-4">
        {resumeData.projects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No projects added yet.</p>
              <Button onClick={addProject}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Accordion type="multiple" defaultValue={[`proj-0`]} className="w-full">
              {resumeData.projects.map((project, index) => (
                <AccordionItem key={project.id} value={`proj-${index}`}>
                  <AccordionTrigger className="hover:no-underline px-4 py-2 bg-card border rounded-t-lg">
                    <div className="flex-1 text-left flex items-center">
                      {project.title ? (
                        <span>{project.title}</span>
                      ) : (
                        <span className="text-muted-foreground">Untitled Project</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border border-t-0 rounded-b-lg p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Project Title</Label>
                        <Input
                          id={`title-${index}`}
                          value={project.title}
                          onChange={(e) => updateProject(index, "title", e.target.value)}
                          placeholder="e.g., E-commerce Website"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={project.description}
                          onChange={(e) => updateProject(index, "description", e.target.value)}
                          placeholder="Describe what the project does and your role in it"
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`link-${index}`}>Project Link (Optional)</Label>
                        <Input
                          id={`link-${index}`}
                          value={project.link || ""}
                          onChange={(e) => updateProject(index, "link", e.target.value)}
                          placeholder="e.g., github.com/username/project"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`tech-input-${index}`}>Technologies Used</Label>
                        <div className="flex space-x-2 mb-2">
                          <Input
                            id={`tech-input-${index}`}
                            placeholder="e.g., React"
                            onKeyDown={(e) => handleTechKeyDown(e, index)}
                          />
                          <Button 
                            onClick={() => {
                              const input = document.getElementById(`tech-input-${index}`) as HTMLInputElement;
                              if (input) {
                                addTechnology(index, input.value);
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="secondary"
                              className="px-3 py-1.5 text-sm flex items-center"
                            >
                              {tech}
                              <button
                                className="ml-2 text-muted-foreground hover:text-foreground"
                                onClick={() => removeTechnology(index, tech)}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {tech}</span>
                              </button>
                            </Badge>
                          ))}
                          
                          {project.technologies.length === 0 && (
                            <span className="text-sm text-muted-foreground">
                              No technologies added yet
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date (Optional)</Label>
                          <Input
                            id={`startDate-${index}`}
                            type="month"
                            value={project.startDate || ""}
                            onChange={(e) => updateProject(index, "startDate", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>End Date (Optional)</Label>
                          <Input
                            id={`endDate-${index}`}
                            type="month"
                            value={project.endDate || ""}
                            onChange={(e) => updateProject(index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Project
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Button 
              variant="outline" 
              onClick={addProject}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Project
            </Button>
          </>
        )}
      </div>
    </div>
  );
}