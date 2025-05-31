import { ResumeData } from "./types";

export const initialResumeState: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    location: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  targetRole: "",
  experienceLevel: "mid",
};

export const sampleResumeData: ResumeData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    location: "San Francisco, CA",
  },
  summary: "Results-driven software engineer with 5+ years of experience in full-stack development. Skilled in React, Node.js, and cloud architecture. Passionate about creating scalable solutions and optimizing performance.",
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "",
      current: true,
      description: "Lead developer for enterprise SaaS application",
      bullets: [
        "Architected and implemented scalable microservices using Node.js and Kubernetes",
        "Reduced API response time by 40% through performance optimizations",
        "Mentored junior developers and led code reviews for team of 8 engineers",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    },
    {
      id: "exp2",
      company: "WebDev Startup",
      position: "Frontend Developer",
      location: "Oakland, CA",
      startDate: "2018-03",
      endDate: "2020-05",
      current: false,
      description: "Developed responsive web applications",
      bullets: [
        "Built interactive user interfaces using React and Redux",
        "Implemented responsive designs using SASS and CSS Grid",
        "Integrated third-party APIs and services",
        "Collaborated with design team to implement UI/UX improvements"
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2014-09",
      endDate: "2018-05",
      current: false,
      gpa: "3.8",
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", 
    "PostgreSQL", "AWS", "Docker", "Kubernetes", "CI/CD", "Git"
  ],
  projects: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      link: "github.com/johndoe/ecommerce"
    },
    {
      id: "proj2",
      title: "Real-time Chat Application",
      description: "Developed a real-time chat application with Socket.io and React",
      technologies: ["React", "Socket.io", "Express", "Redis"],
      link: "github.com/johndoe/chat-app"
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021-05",
      expires: "2024-05",
      link: "verify.aws/12345"
    }
  ],
  targetRole: "Full Stack Developer",
  experienceLevel: "mid",
};