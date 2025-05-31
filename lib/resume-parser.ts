import { ResumeData } from "./types";

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function parsePDF(file: File): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new Error('File must be a PDF');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/parse-pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to parse PDF');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

export async function getAISuggestions(resumeText: string, targetRole: string): Promise<{
  summary: string;
  experience: string[];
  skills: string[];
}> {
  if (!OPENROUTER_API_KEY) {
    console.warn('OpenRouter API key not found. AI suggestions will be disabled.');
    return {
      summary: '',
      experience: [],
      skills: []
    };
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-opus:beta",
        messages: [
          {
            role: "system",
            content: "You are an expert resume reviewer and career coach. Analyze the resume and provide specific suggestions for improvement."
          },
          {
            role: "user",
            content: `Please analyze this resume for a ${targetRole} position and provide suggestions for:
            1. A compelling professional summary
            2. Improved experience descriptions
            3. Additional relevant skills to add
            
            Resume:
            ${resumeText}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('OpenRouter API error:', errorData);
      throw new Error(errorData.error || 'Failed to get AI suggestions');
    }

    const data = await response.json();
    const suggestions = data.choices[0].message.content;

    // Parse the AI response into structured data
    const parsedSuggestions = parseAISuggestions(suggestions);
    return parsedSuggestions;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    // Return empty suggestions instead of throwing
    return {
      summary: '',
      experience: [],
      skills: []
    };
  }
}

function parseAISuggestions(text: string): {
  summary: string;
  experience: string[];
  skills: string[];
} {
  // Basic parsing logic - you might want to make this more robust
  const sections = text.split('\n\n');
  
  return {
    summary: sections.find(s => s.toLowerCase().includes('summary')) || '',
    experience: sections
      .filter(s => s.toLowerCase().includes('experience'))
      .map(s => s.replace(/^.*?experience:/i, '').trim()),
    skills: sections
      .find(s => s.toLowerCase().includes('skills'))
      ?.split('\n')
      .filter(s => s.trim() && !s.toLowerCase().includes('skills'))
      .map(s => s.replace(/^[-•*]\s*/, '').trim()) || []
  };
}

export function extractResumeData(text: string): Partial<ResumeData> {
  // Basic extraction logic - you might want to make this more robust
  const lines = text.split('\n');
  
  const personalInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    location: ''
  };

  const experience: any[] = [];
  const education: any[] = [];
  const skills: { [domain: string]: string[] } = {};
  const projects: any[] = [];
  const certifications: any[] = [];

  let currentSection = '';
  let currentDomain: string | null = null; // Track the current skill domain
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Detect sections
    if (line.toUpperCase() === 'EXPERIENCE') {
      currentSection = 'experience';
      currentDomain = null; // Reset currentDomain when section changes
      return;
    } else if (line.toUpperCase() === 'EDUCATION') {
      currentSection = 'education';
      currentDomain = null; // Reset currentDomain when section changes
      return;
    } else if (line.toUpperCase() === 'SKILLS') {
      currentSection = 'skills';
      currentDomain = null; // Reset currentDomain when section changes
      return;
    } else if (line.toUpperCase() === 'PROJECTS') {
      currentSection = 'projects';
      currentDomain = null; // Reset currentDomain when section changes
      return;
    } else if (line.toUpperCase() === 'CERTIFICATIONS') {
      currentSection = 'certifications';
      currentDomain = null; // Reset currentDomain when section changes
      return;
    }

    // Parse content based on current section
    switch (currentSection) {
      case 'experience':
        // Add experience parsing logic
        break;
      case 'education':
        // Add education parsing logic
        break;
      case 'skills':
        // Check if the line follows the 'Domain: Skill1, Skill2' pattern
        const skillMatch = line.match(/^([^:]+):\s*(.+)$/);
        if (skillMatch) {
          const domain = skillMatch[1].trim();
          const skillsString = skillMatch[2].trim();
          const skillList = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill !== ''); // Split and filter empty skills
          skills[domain] = skillList;
          currentDomain = domain; // Set current domain
        } else if (currentDomain !== null) {
          // If not a domain line but within a domain section, add skills to current domain
          const skillList = line.split(',').map(skill => skill.trim()).filter(skill => skill !== ''); // Split and filter empty skills
           if (skills[currentDomain]) {
              skills[currentDomain].push(...skillList);
           } else {
              // Handle case where currentDomain is set but skills[currentDomain] doesn't exist (shouldn't happen with current logic, but for safety)
              skills[currentDomain] = skillList;
           }
        }
        // Ignore lines in skills section that don't match domain pattern and are not after a domain line
        break;
      case 'projects':
        // Add projects parsing logic
        break;
      case 'certifications':
        // Add certifications parsing logic
        break;
      default:
        // Try to extract personal info
        if (line.includes('@') && !personalInfo.email) {
          personalInfo.email = line;
        } else if (line.match(/^\+?[\d\s-()]+$/) && !personalInfo.phone) {
          personalInfo.phone = line;
        } else if (line.includes('linkedin.com') && !personalInfo.linkedin) {
          personalInfo.linkedin = line;
        } else if (line.includes('http') && !personalInfo.website) {
          personalInfo.website = line;
        }
    }
  });

  // Clean up empty skill domains
  for (const domain in skills) {
    if (skills[domain].length === 0) {
      delete skills[domain];
    }
  }

  // Flatten skills object into array
  const flattenedSkills = Object.values(skills).flat();

  return {
    personalInfo,
    experience,
    education,
    skills: flattenedSkills,
    projects,
    certifications
  };
} 