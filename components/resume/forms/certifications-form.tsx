"use client";

import { v4 as uuidv4 } from "uuid";
import { useResumeContext } from "@/components/resume/resume-context";
import { CertificationItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";

export function CertificationsForm() {
  const { resumeData, setResumeData } = useResumeContext();
  
  const addCertification = () => {
    const newCertification: CertificationItem = {
      id: uuidv4(),
      name: "",
      issuer: "",
      date: "",
      expires: "",
      link: "",
    };
    
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCertification],
    });
  };
  
  const updateCertification = (index: number, field: string, value: any) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };
  
  const removeCertification = (index: number) => {
    const updatedCertifications = resumeData.certifications.filter((_, i) => i !== index);
    
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <p className="text-muted-foreground">
          Add relevant certifications and professional credentials.
        </p>
      </div>
      
      <div className="space-y-4">
        {resumeData.certifications.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No certifications added yet.</p>
              <Button onClick={addCertification}>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Accordion type="multiple" defaultValue={[`cert-0`]} className="w-full">
              {resumeData.certifications.map((cert, index) => (
                <AccordionItem key={cert.id} value={`cert-${index}`}>
                  <AccordionTrigger className="hover:no-underline px-4 py-2 bg-card border rounded-t-lg">
                    <div className="flex-1 text-left flex items-center">
                      {cert.name || cert.issuer ? (
                        <span>
                          {cert.name} {cert.issuer && `by ${cert.issuer}`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Untitled Certification</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border border-t-0 rounded-b-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Certification Name</Label>
                        <Input
                          id={`name-${index}`}
                          value={cert.name}
                          onChange={(e) => updateCertification(index, "name", e.target.value)}
                          placeholder="e.g., AWS Certified Solutions Architect"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`issuer-${index}`}>Issuing Organization</Label>
                        <Input
                          id={`issuer-${index}`}
                          value={cert.issuer}
                          onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`date-${index}`}>Issue Date</Label>
                        <Input
                          id={`date-${index}`}
                          type="month"
                          value={cert.date}
                          onChange={(e) => updateCertification(index, "date", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`expires-${index}`}>Expiration Date (Optional)</Label>
                        <Input
                          id={`expires-${index}`}
                          type="month"
                          value={cert.expires || ""}
                          onChange={(e) => updateCertification(index, "expires", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`link-${index}`}>Credential URL (Optional)</Label>
                        <Input
                          id={`link-${index}`}
                          value={cert.link || ""}
                          onChange={(e) => updateCertification(index, "link", e.target.value)}
                          placeholder="e.g., verify.aws/credential/123"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCertification(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Certification
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Button 
              variant="outline" 
              onClick={addCertification}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Certification
            </Button>
          </>
        )}
      </div>
    </div>
  );
}