"use client";

import { useState } from "react";
import { useResumeContext } from "./resume-context";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { RoleSelector } from "./forms/role-selector";
import { SummaryGenerator } from "./forms/summary-generator";
import { ExperienceForm } from "./forms/experience-form";
import { EducationForm } from "./forms/education-form";
import { SkillsForm } from "./forms/skills-form";
import { ProjectsForm } from "./forms/projects-form";
import { CertificationsForm } from "./forms/certifications-form";
import { ResumePreview } from "./preview/resume-preview";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  User, 
  Briefcase, 
  GraduationCap,
  Code, 
  FolderKanban,
  Award,
  FileText
} from "lucide-react";

const steps = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "role", label: "Target Role", icon: Briefcase },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "preview", label: "Preview", icon: FileText },
];

export function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const { resumeData } = useResumeContext();
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleDownloadPDF = () => {
    // Get the resume preview element
    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Add the resume content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${resumeElement.innerHTML}
        </body>
      </html>
    `);

    // Wait for content to load
    printWindow.document.close();
    printWindow.onload = () => {
      // Print the window
      printWindow.print();
      // Close the window after printing
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };
  
  const isStepValid = () => {
    // Basic validation logic for each step
    const step = steps[activeStep].id;
    
    if (step === "personal") {
      return resumeData.personalInfo.firstName && 
             resumeData.personalInfo.lastName && 
             resumeData.personalInfo.email;
    }
    
    if (step === "role") {
      return resumeData.targetRole && resumeData.experienceLevel;
    }
    
    // Other steps are optional or get populated by AI
    return true;
  };
  
  const renderStepContent = () => {
    const step = steps[activeStep].id;
    
    switch (step) {
      case "personal":
        return <PersonalInfoForm />;
      case "role":
        return <RoleSelector />;
      case "summary":
        return <SummaryGenerator />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "preview":
        return <ResumePreview />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create Your Resume</h1>
        
        <div className="hidden md:flex">
          <Tabs 
            value={steps[activeStep].id} 
            onValueChange={(value) => {
              const index = steps.findIndex(step => step.id === value);
              setActiveStep(index);
            }}
          >
            <TabsList className="grid grid-cols-9">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex items-center gap-1">
                  <step.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{step.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">
            Step {activeStep + 1} of {steps.length}
          </p>
          <p className="text-sm font-medium">{steps[activeStep].label}</p>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        {renderStepContent()}
      </div>
      
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={activeStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-3">
          {activeStep === steps.length - 1 && (
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          )}
          
          {activeStep < steps.length - 1 && (
            <Button 
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}