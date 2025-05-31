"use client";

import { useState } from "react";
import { useResumeContext } from "@/components/resume/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, Printer } from "lucide-react";
import { formatDate } from "@/lib/utils";
import html2pdf from "html2pdf.js";
import { useToast } from "@/components/ui/use-toast";

interface ExperienceItem {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  duration: string;
}

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
}

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export function ResumePreview() {
  const { resumeData } = useResumeContext();
  const [template, setTemplate] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const getFullName = () => {
    return `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`.trim() || "Full Name";
  };
  
  const getContactInfo = () => {
    const parts = [];
    
    if (resumeData.personalInfo.location) {
      parts.push(resumeData.personalInfo.location);
    }
    
    if (resumeData.personalInfo.phone) {
      parts.push(resumeData.personalInfo.phone);
    }
    
    if (resumeData.personalInfo.email) {
      parts.push(resumeData.personalInfo.email);
    }
    
    if (resumeData.personalInfo.linkedin) {
      parts.push(resumeData.personalInfo.linkedin);
    }
    
    return parts.join(" | ") || "Location | Phone | Email | LinkedIn";
  };

  const handleDownloadPDF = async () => {
    console.log("handleDownloadPDF started");
    try {
      console.log("Getting resume element...");
      setIsGenerating(true);
      const element = document.getElementById('resume-content');
      if (!element) {
        console.error('Resume content not found');
        throw new Error('Resume content not found');
      }
      console.log("Cloning element...");
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      console.log("Removing buttons...");
      const buttons = clonedElement.getElementsByTagName('button');
      while (buttons.length > 0) {
        buttons[0].remove();
      }
      console.log("Setting PDF options...");
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${getFullName().toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait'
        }
      };

      console.log("Generating and saving PDF...");
      await html2pdf()
        .set(opt)
        .from(clonedElement)
        .save();

      console.log("PDF generation complete.");
      toast({
        title: "Success",
        description: "Resume downloaded successfully!",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log("handleDownloadPDF finished");
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resume Preview</h2>
          <p className="text-muted-foreground">
            Review your resume and export it as a PDF.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          
          <Button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
          >
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          <div id="resume-content" className="bg-white p-8 shadow-sm">
            {/* Resume content */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-1">{getFullName()}</h1>
              <p className="text-muted-foreground">{getContactInfo()}</p>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm">{resumeData.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">PROFESSIONAL EXPERIENCE</h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                    <ul className="list-disc list-inside text-sm mt-2">
                      {exp.bullets.map((bullet: string, i: number) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">EDUCATION</h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">PROJECTS</h2>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">CERTIFICATIONS</h2>
                <ul className="list-disc list-inside text-sm">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index}>{cert.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}