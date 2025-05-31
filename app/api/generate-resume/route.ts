import { NextResponse } from "next/server";

const AWAN_API_KEY = process.env.AWAN_API_KEY;
const AWAN_API_URL = "https://api.awanllm.com/v1/chat/completions";
const MODEL_NAME = "Meta-Llama-3.1-70B-Instruct";

export async function POST(req: Request) {
  try {
    if (!AWAN_API_KEY) {
      throw new Error("Awan API key is not configured");
    }

    const { name, email, linkedin, education, jobDescription } = await req.json();

    // First, analyze the job description to extract key requirements
    const jobAnalysisPrompt = `
      Analyze the following job description and extract:
      1. Key technical skills required
      2. Soft skills needed
      3. Required experience level
      4. Industry-specific requirements
      5. Key responsibilities
      
      Job Description:
      ${jobDescription}
    `;

    console.log("Sending job analysis request to Awan...");
    const jobAnalysisResponse = await fetch(AWAN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AWAN_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: "You are a helpful assistant that analyzes job descriptions." },
          { role: "user", content: jobAnalysisPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!jobAnalysisResponse.ok) {
      const errorData = await jobAnalysisResponse.text();
      console.error("Awan API error:", errorData);
      throw new Error(`Failed to analyze job description: ${errorData}`);
    }

    const jobAnalysisData = await jobAnalysisResponse.json();
    console.log("Job analysis response:", jobAnalysisData);
    
    if (!jobAnalysisData.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from Awan");
    }

    const jobAnalysis = jobAnalysisData.choices[0].message.content;

    // Generate optimized resume content
    const resumePrompt = `
      Create a highly optimized and tailored resume for the following candidate targeting this specific role based on the provided job analysis.
      The resume MUST be tailored to maximize ATS (Applicant Tracking System) compatibility and strongly highlight relevant experience and skills directly from the job description.
      
      Candidate Information:
      Name: ${name}
      Email: ${email}
      LinkedIn: ${linkedin}
      Education: ${education}
      
      Job Analysis (Key Requirements Extracted):
      ${jobAnalysis}
      
      IMPORTANT: You must respond with ONLY a valid JSON object, no other text, comments, or explanation.
      The JSON must follow this exact structure:
      {
        "professionalSummary": "A compelling summary tailored SPECIFICALLY to the target role, incorporating keywords from the job analysis.",
        "keySkills": ["List ONLY the key technical and soft skills explicitly mentioned or strongly implied as essential in the job analysis. Prioritize those."],
        "professionalExperience": [
          {
            "title": "Your relevant Job Title",
            "company": "Company Name",
            "duration": "Duration (e.g., 2020 - Present)",
            "achievements": ["Quantifiable achievement 1 directly related to job requirements (e.g., Increased X by Y%)", "Quantifiable achievement 2 related to job requirements"]
          }
          // Include multiple experience items if relevant to the job
        ],
        "projects": [
          {
            "name": "Relevant Project Name",
            "description": "Concise description highlighting impact and technologies",
            "technologies": ["Technologies used, focusing on those in job analysis"]
          }
          // Include projects most relevant to the job requirements
        ],
        "certifications": ["List certifications relevant to the job description"],
        "additionalSkills": ["Any other relevant skills not listed in keySkills"]
      }

      Make sure to:
      1. Return ONLY the JSON object, nothing else.
      2. Use double quotes for all strings and proper JSON formatting.
      3. Ensure all arrays and objects are properly closed.
      4. **Crucially, tailor ALL content (summary, experience bullets, projects, skills) to explicitly match and use language from the provided Job Analysis and the likely original job description.**
      5. For experience points (achievements), focus on quantifiable results and use action verbs relevant to the role.
      6. Prioritize experience, projects, and skills that directly align with the job analysis.
      7. Ensure the professional summary is a strong hook that immediately tells the employer why you are a good fit based on the job requirements.
      8. Assume the candidate has the experience/skills mentioned in the provided education and potentially implied by the job analysis for crafting achievements and selecting relevant projects/skills.
      9. DO NOT include placeholder text like "Job Title" or "Company Name". Use relevant details based on the job analysis and candidate info.
    `;

    console.log("Sending resume generation request to Awan...");
    const resumeResponse = await fetch(AWAN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AWAN_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { 
            role: "system", 
            content: "You are a helpful assistant that generates optimized resumes. You must always respond with valid JSON only, no other text or explanation." 
          },
          { role: "user", content: resumePrompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!resumeResponse.ok) {
      const errorData = await resumeResponse.text();
      console.error("Awan API error:", errorData);
      throw new Error(`Failed to generate resume: ${errorData}`);
    }

    const resumeData = await resumeResponse.json();
    console.log("Resume generation response:", resumeData);

    if (!resumeData.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from Awan");
    }

    let resumeContent;
    try {
      // Try to parse the content directly
      resumeContent = JSON.parse(resumeData.choices[0].message.content);
    } catch (error) {
      console.error("Failed to parse resume content:", error);
      console.log("Raw content:", resumeData.choices[0].message.content);
      
      // Try to extract JSON from the response if it's wrapped in other text
      const content = resumeData.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          resumeContent = JSON.parse(jsonMatch[0]);
        } catch (secondError) {
          console.error("Failed to parse extracted JSON:", secondError);
          throw new Error("Failed to parse generated resume content");
        }
      } else {
        throw new Error("No valid JSON found in the response");
      }
    }

    // Validate the resume content structure
    if (!resumeContent.professionalSummary || !Array.isArray(resumeContent.keySkills)) {
      throw new Error("Invalid resume content structure");
    }

    return NextResponse.json({
      success: true,
      resume: resumeContent,
      jobAnalysis: jobAnalysis,
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to generate resume",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 