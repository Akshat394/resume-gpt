"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Check, X, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { ResumeData, AIEnhancement } from "@/lib/types";
import { motion } from "framer-motion";

interface AIEnhancerProps {
  parsedContent: string;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function AIEnhancer({ 
  parsedContent, 
  resumeData, 
  setResumeData 
}: AIEnhancerProps) {
  const [step, setStep] = useState<"role" | "suggestions" | "preview">("role");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<"entry" | "mid" | "senior">("mid");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AIEnhancement[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const generateSuggestions = async () => {
    if (!targetRole) {
      toast({
        title: "Error",
        description: "Please enter a target role",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // In a real implementation, this would call an API to generate suggestions
      // For this demo, we'll simulate the API call with a timeout
      setTimeout(() => {
        // Mock AI suggestions
        const mockSuggestions: AIEnhancement[] = [
          {
            section: "summary",
            original: "Experienced software engineer with 5+ years of experience in full-stack development.",
            suggested: "Results-driven software engineer with 5+ years of experience building scalable full-stack applications. Specialized in React, Node.js, and cloud architecture with a proven track record of delivering high-performance solutions in fast-paced environments.",
            accepted: false
          },
          {
            section: "experience",
            original: "Developed and maintained web applications using React and Node.js",
            suggested: "Architected and developed high-performance web applications using React and Node.js that served 100K+ monthly users, resulting in a 30% increase in user engagement",
            accepted: false
          },
          {
            section: "skills",
            original: "JavaScript, TypeScript, React, Node.js, Docker, AWS",
            suggested: "JavaScript, TypeScript, React, Redux, Node.js, Express, RESTful APIs, GraphQL, Docker, Kubernetes, AWS (EC2, S3, Lambda), CI/CD, Jest, Cypress",
            accepted: false
          }
        ];
        
        setAiSuggestions(mockSuggestions);
        setIsGenerating(false);
        setStep("suggestions");
        
        toast({
          title: "Suggestions Generated",
          description: "AI-powered resume enhancements are ready for your review.",
        });
      }, 3000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation failed",
        description: "There was an error generating suggestions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAcceptSuggestion = (index: number) => {
    setAiSuggestions((prev) => {
      const updated = [...prev];
      updated[index].accepted = true;
      return updated;
    });
  };

  const handleRejectSuggestion = (index: number) => {
    setAiSuggestions((prev) => {
      const updated = [...prev];
      updated[index].accepted = false;
      return updated;
    });
  };

  const handleFinalize = () => {
    // Apply accepted suggestions to resume data
    // In a real implementation, this would update the resumeData state
    // and then navigate to a preview page
    
    toast({
      title: "Resume Updated",
      description: "Your enhanced resume is ready to download.",
    });
    
    setStep("preview");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Enhance Your Resume with AI</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our AI will analyze your resume and suggest improvements tailored to your target role.
        </p>
      </div>
      
      {step === "role" && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetRole">Target Job Role</Label>
                  <input
                    id="targetRole"
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Software Engineer, Product Manager"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select 
                    value={experienceLevel}
                    onValueChange={(value) => setExperienceLevel(value as "entry" | "mid" | "senior")}
                  >
                    <SelectTrigger className="w-full" id="experienceLevel">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Parsed Resume Content</h3>
                <div className="text-sm text-muted-foreground h-[300px] overflow-y-auto whitespace-pre-line border border-border rounded-md p-3 bg-card">
                  {parsedContent}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                onClick={generateSuggestions}
                disabled={isGenerating || !targetRole}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Suggestions
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {step === "suggestions" && (
        <>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Suggestions</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              
              <Button onClick={handleFinalize}>
                Finalize Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <TabsContent value="all">
              <div className="space-y-6">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`border-l-4 ${
                      suggestion.accepted 
                        ? "border-l-green-500" 
                        : "border-l-blue-500"
                    }`}>
                      <CardContent className="pt-6">
                        <div className="mb-2">
                          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                            {suggestion.section}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="p-3 bg-muted rounded-md">
                            <h3 className="font-medium text-sm mb-2 text-muted-foreground">Original</h3>
                            <p className="text-sm">{suggestion.original}</p>
                          </div>
                          
                          <div className="p-3 bg-primary/5 rounded-md">
                            <h3 className="font-medium text-sm mb-2 text-primary">AI Suggestion</h3>
                            <p className="text-sm">{suggestion.suggested}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          {!suggestion.accepted ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectSuggestion(index)}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleAcceptSuggestion(index)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Accept
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectSuggestion(index)}
                            >
                              Undo
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="space-y-6">
                {aiSuggestions
                  .filter(s => s.section === "summary")
                  .map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`border-l-4 ${
                        suggestion.accepted 
                          ? "border-l-green-500" 
                          : "border-l-blue-500"
                      }`}>
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-muted rounded-md">
                              <h3 className="font-medium text-sm mb-2 text-muted-foreground">Original</h3>
                              <p className="text-sm">{suggestion.original}</p>
                            </div>
                            
                            <div className="p-3 bg-primary/5 rounded-md">
                              <h3 className="font-medium text-sm mb-2 text-primary">AI Suggestion</h3>
                              <p className="text-sm">{suggestion.suggested}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            {!suggestion.accepted ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectSuggestion(index)}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptSuggestion(index)}
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Accept
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectSuggestion(index)}
                              >
                                Undo
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="experience">
              <div className="space-y-6">
                {aiSuggestions
                  .filter(s => s.section === "experience")
                  .map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`border-l-4 ${
                        suggestion.accepted 
                          ? "border-l-green-500" 
                          : "border-l-blue-500"
                      }`}>
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-muted rounded-md">
                              <h3 className="font-medium text-sm mb-2 text-muted-foreground">Original</h3>
                              <p className="text-sm">{suggestion.original}</p>
                            </div>
                            
                            <div className="p-3 bg-primary/5 rounded-md">
                              <h3 className="font-medium text-sm mb-2 text-primary">AI Suggestion</h3>
                              <p className="text-sm">{suggestion.suggested}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            {!suggestion.accepted ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectSuggestion(index)}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptSuggestion(index)}
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Accept
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectSuggestion(index)}
                              >
                                Undo
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="skills">
              <div className="space-y-6">
                {aiSuggestions
                  .filter(s => s.section === "skills")
                  .map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`border-l-4 ${
                        suggestion.accepted 
                          ? "border-l-green-500" 
                          : "border-l-blue-500"
                      }`}>
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-muted rounded-md">
                              <h3 className="font-medium text-sm mb-2 text-muted-foreground">Original</h3>
                              <p className="text-sm">{suggestion.original}</p>
                            </div>
                            
                            <div className="p-3 bg-primary/5 rounded-md">
                              <h3 className="font-medium text-sm mb-2 text-primary">AI Suggestion</h3>
                              <p className="text-sm">{suggestion.suggested}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            {!suggestion.accepted ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectSuggestion(index)}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptSuggestion(index)}
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Accept
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectSuggestion(index)}
                              >
                                Undo
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
      
      {step === "preview" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Enhanced Resume</h2>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
              
              <div className="border rounded-md p-8 bg-white shadow-sm min-h-[800px]">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-1">John Doe</h1>
                  <p className="text-muted-foreground">
                    San Francisco, CA | (123) 456-7890 | john.doe@example.com | linkedin.com/in/johndoe
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">SUMMARY</h2>
                  <p className="text-sm">
                    Results-driven software engineer with 5+ years of experience building scalable full-stack applications. 
                    Specialized in React, Node.js, and cloud architecture with a proven track record of delivering 
                    high-performance solutions in fast-paced environments.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">EXPERIENCE</h2>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Senior Software Engineer</h3>
                      <span className="text-sm">Jan 2020 - Present</span>
                    </div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">Tech Solutions Inc.</h4>
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                    <ul className="list-disc list-outside ml-5 mt-2 text-sm space-y-1">
                      <li>Architected and developed high-performance web applications using React and Node.js that served 100K+ monthly users, resulting in a 30% increase in user engagement</li>
                      <li>Reduced API response time by 40% through performance optimizations</li>
                      <li>Mentored junior developers and led code reviews for team of 8 engineers</li>
                      <li>Implemented CI/CD pipeline reducing deployment time by 60%</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">EDUCATION</h2>
                  <div>
                    <div className="flex justify-between">
                      <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
                      <span className="text-sm">2016 - 2020</span>
                    </div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">University of California, Berkeley</h4>
                      <span className="text-sm">GPA: 3.8</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">SKILLS</h2>
                  <p className="text-sm">
                    JavaScript, TypeScript, React, Redux, Node.js, Express, RESTful APIs, GraphQL, 
                    Docker, Kubernetes, AWS (EC2, S3, Lambda), CI/CD, Jest, Cypress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setStep("suggestions")}
            >
              Back to Suggestions
            </Button>
            <Button onClick={() => router.push("/")}>
              Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}