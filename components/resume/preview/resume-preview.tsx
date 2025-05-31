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

export function ResumePreview() {
  const { resumeData } = useResumeContext();
  const [template, setTemplate] = useState("modern");
  
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
          
          <Button onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <div id="resume-preview" className="border rounded-md p-8 bg-white shadow-sm min-h-[800px]">
        {/* Resume content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1">{getFullName()}</h1>
          <p className="text-muted-foreground">{getContactInfo()}</p>
        </div>
        
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">SUMMARY</h2>
            <p className="text-sm">{resumeData.summary}</p>
          </div>
        )}
        
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">EXPERIENCE</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </p>
                </div>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
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
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">PROJECTS</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.technologies.join(', ')}</p>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {resumeData.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">CERTIFICATIONS</h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(cert.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}