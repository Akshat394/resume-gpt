"use client";

import { useState } from "react";
import { useResumeContext } from "@/components/resume/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function SummaryGenerator() {
  const { resumeData, setResumeData } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);
  const { toast } = useToast();

  const generateSummary = async () => {
    if (!resumeData.targetRole) {
      toast({
        title: "Missing information",
        description: "Please select a target role first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // In a real implementation, this would call an API to generate summaries
      // For this demo, we'll simulate the API call with a timeout
      setTimeout(() => {
        // Mock generated summaries
        const mockSummaries = [
          `Results-driven ${resumeData.targetRole} with ${
            resumeData.experienceLevel === "entry" ? "entry-level experience" :
            resumeData.experienceLevel === "mid" ? "5+ years of experience" : 
            "10+ years of experience"
          } in developing and implementing innovative solutions. Adept at collaborating with cross-functional teams to deliver high-quality products that meet business objectives and enhance user experience.`,
          
          `Detail-oriented ${resumeData.targetRole} with a proven track record of ${
            resumeData.experienceLevel === "entry" ? "successfully completing projects" :
            resumeData.experienceLevel === "mid" ? "leading successful projects" : 
            "spearheading transformative initiatives"
          } in fast-paced environments. Combines technical expertise with strong communication skills to drive efficiency and deliver exceptional results.`
        ];
        
        setGeneratedSummaries(mockSummaries);
        setIsGenerating(false);
        
        toast({
          title: "Summaries Generated",
          description: "Choose the summary that best represents you, or edit it to your liking.",
        });
      }, 2000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation failed",
        description: "There was an error generating summaries. Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectSummary = (summary: string) => {
    setResumeData({
      ...resumeData,
      summary,
    });
    
    toast({
      title: "Summary Selected",
      description: "You can still edit it in the text area below.",
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Professional Summary</h2>
        <p className="text-muted-foreground">
          A compelling summary is crucial for grabbing attention. Let our AI help you create one.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="summary">Your Professional Summary</Label>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={generateSummary}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="summary"
                placeholder="Write a brief summary of your professional background, skills, and career goals..."
                rows={5}
                value={resumeData.summary}
                onChange={handleSummaryChange}
                className="resize-none"
              />
            </div>
            
            {generatedSummaries.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">AI-Generated Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Select one of these AI-generated summaries or use them as inspiration.
                </p>
                
                <div className="space-y-4">
                  {generatedSummaries.map((summary, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex">
                          <div className="flex-1">
                            <p className="text-sm">{summary}</p>
                          </div>
                          <div className="flex flex-col ml-4 space-y-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={() => selectSummary(summary)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span className="sr-only">Use this summary</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium text-sm mb-2">Tips for a Great Summary</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Keep it concise (3-5 sentences)</li>
                <li>Highlight your most relevant skills and experiences</li>
                <li>Tailor it to your target role</li>
                <li>Include measurable achievements if possible</li>
                <li>Avoid generic statements and clichés</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}