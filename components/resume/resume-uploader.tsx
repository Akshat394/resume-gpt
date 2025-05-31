"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeUploaderProps {
  setUploadedFile: (file: File | null) => void;
  setParsedContent: (content: string | null) => void;
}

export function ResumeUploader({ setUploadedFile, setParsedContent }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };
  
  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
    setUploadedFile(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    setUploadedFile(null);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would send the file to the server for parsing
      // For this demo, we'll simulate parsing with a timeout
      setTimeout(() => {
        // Mock parsed content
        const mockParsedContent = `
          John Doe
          Software Engineer
          San Francisco, CA | (123) 456-7890 | john.doe@example.com
          
          SUMMARY
          Experienced software engineer with 5+ years of experience in full-stack development.
          
          EXPERIENCE
          Senior Software Engineer | Tech Company Inc. | Jan 2020 - Present
          - Developed and maintained web applications using React and Node.js
          - Implemented CI/CD pipelines using GitHub Actions
          
          EDUCATION
          Bachelor of Science in Computer Science | University of California, Berkeley | 2016-2020
          
          SKILLS
          JavaScript, TypeScript, React, Node.js, Docker, AWS
        `;
        
        setParsedContent(mockParsedContent);
        setIsLoading(false);
        
        toast({
          title: "Resume uploaded successfully",
          description: "Your resume has been parsed and is ready for AI enhancement.",
        });
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Upload Your Resume</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Upload your existing resume to get AI-powered suggestions for improvement tailored to your target role.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upload Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            } transition-colors duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
            
            {!file ? (
              <div>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Drag & drop your resume here</h3>
                <p className="text-muted-foreground mb-4">Supported formats: PDF, DOCX</p>
                <Button asChild variant="outline" className="mt-2">
                  <label htmlFor="resume-upload">Browse Files</label>
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded mr-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}