import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ResumePreview } from "./resume-preview";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  education: z.string().min(10, "Please provide your education details").optional().or(z.literal("")),
  jobDescription: z.string().min(50, "Please provide a detailed job description"),
});

type FormData = z.infer<typeof formSchema>;

export function JobSpecificBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [showForm, setShowForm] = useState(true);
  const [processingMessage, setProcessingMessage] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      linkedin: "",
      education: "",
      jobDescription: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      setProcessingMessage("Analyzing job description...");
      
      const payload = {
        name: data.name || "John Doe",
        email: data.email || "john.doe@example.com",
        linkedin: data.linkedin || "https://www.linkedin.com/in/johndoe",
        education: data.education || "Bachelor of Science in Computer Science from Anytown University",
        jobDescription: data.jobDescription,
      };
      
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate resume");
      }

      setProcessingMessage("Fetching tailored information...");
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to generate resume");
      }

      setProcessingMessage("Drafting your resume...");
      setGeneratedResume(result.resume);
      setShowForm(false);
      toast.success("Resume generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate resume");
    } finally {
      setIsGenerating(false);
      setProcessingMessage("");
    }
  };

  const handleRegenerate = () => {
    setShowForm(true);
    setGeneratedResume(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showForm ? (
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">AI-Powered Resume Generator</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  {...form.register("name")}
                  placeholder="John Doe"
                  className="w-full"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <Input
                  {...form.register("linkedin")}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="w-full"
                />
                {form.formState.errors.linkedin && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.linkedin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                <Textarea
                  {...form.register("education")}
                  placeholder="Enter your education details"
                  className="w-full"
                />
                {form.formState.errors.education && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.education.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <Textarea
                {...form.register("jobDescription")}
                placeholder="Paste the job description or URL here"
                className="w-full h-32"
              />
              {form.formState.errors.jobDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.jobDescription.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? processingMessage || "Generating Resume..." : "Generate Optimized Resume"}
            </Button>
          </form>
        </Card>
      ) : (
        <div className="space-y-4">
          <Button
            onClick={handleRegenerate}
            variant="outline"
            className="mb-4"
          >
            Generate New Resume
          </Button>
          {generatedResume && <ResumePreview resume={generatedResume} />}
        </div>
      )}
    </div>
  );
} 