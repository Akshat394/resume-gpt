import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumePreviewProps {
  resume: {
    professionalSummary: string;
    keySkills: string[];
    professionalExperience: Array<{
      title: string;
      company: string;
      duration: string;
      achievements: string[];
    }>;
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
    certifications: string[];
    additionalSkills: string[];
  };
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log("Downloading resume...");
  };

  return (
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Generated Resume</h2>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <div className="space-y-6">
        {/* Professional Summary */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
          <p className="text-gray-700">{resume.professionalSummary}</p>
        </section>

        {/* Key Skills */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resume.keySkills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Professional Experience</h3>
          <div className="space-y-4">
            {resume.professionalExperience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium">{exp.title}</h4>
                <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-green-500 pl-4">
                <h4 className="font-medium">{project.name}</h4>
                <p className="text-gray-700 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-2">Certifications</h3>
            <ul className="list-disc list-inside space-y-1">
              {resume.certifications.map((cert, index) => (
                <li key={index} className="text-gray-700">{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Additional Skills */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Additional Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resume.additionalSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
} 