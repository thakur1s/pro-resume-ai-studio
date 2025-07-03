import OpenAI from "openai";
import { ATSAnalysis, ResumeData } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class ATSAnalyzer {
  async analyzeResume(resumeData: ResumeData, jobDescription?: string): Promise<ATSAnalysis> {
    const resumeText = this.convertResumeToText(resumeData);
    
    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume and provide a comprehensive ATS compatibility score.

Resume Content:
${resumeText}

${jobDescription ? `Job Description for Analysis:
${jobDescription}` : ''}

Please analyze the resume based on these ATS criteria:
1. Keyword optimization and industry relevance
2. Format compatibility (headers, sections, formatting)
3. Content quality and quantifiable achievements
4. Readability and structure
5. Missing critical elements

Provide a detailed analysis with specific scores and actionable recommendations. Focus on real ATS requirements used by major companies.

Respond with JSON in this exact format:
{
  "overallScore": number (0-100),
  "keywordScore": number (0-100),
  "formatScore": number (0-100),
  "contentScore": number (0-100),
  "readabilityScore": number (0-100),
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["weakness1", "weakness2", ...],
  "recommendations": ["recommendation1", "recommendation2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...],
  "presentKeywords": ["keyword1", "keyword2", ...],
  "formatIssues": ["issue1", "issue2", ...],
  "contentIssues": ["issue1", "issue2", ...],
  "industryAlignment": "industry assessment",
  "experienceLevel": "junior/mid/senior level assessment",
  "improvementPriority": [
    {
      "category": "category name",
      "issue": "specific issue",
      "impact": "high/medium/low",
      "suggestion": "specific suggestion"
    }
  ]
}
`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert ATS analyzer with deep knowledge of modern applicant tracking systems used by Fortune 500 companies. Provide accurate, actionable analysis based on real ATS requirements."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
      });

      const analysisResult = JSON.parse(response.choices[0].message.content || '{}');
      
      // Validate the response structure
      return this.validateAndCleanAnalysis(analysisResult);
      
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume: ' + (error as Error).message);
    }
  }

  private convertResumeToText(resumeData: ResumeData): string {
    const { personalInfo, experience, education, skills, projects } = resumeData;
    
    let text = `Name: ${personalInfo.name}\n`;
    text += `Email: ${personalInfo.email}\n`;
    text += `Phone: ${personalInfo.phone}\n`;
    text += `Location: ${personalInfo.location}\n`;
    text += `LinkedIn: ${personalInfo.linkedin}\n\n`;
    
    if (personalInfo.summary) {
      text += `PROFESSIONAL SUMMARY:\n${personalInfo.summary}\n\n`;
    }
    
    if (experience.length > 0) {
      text += `WORK EXPERIENCE:\n`;
      experience.forEach(exp => {
        text += `${exp.position} at ${exp.company}\n`;
        text += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
        text += `${exp.description}\n\n`;
      });
    }
    
    if (education.length > 0) {
      text += `EDUCATION:\n`;
      education.forEach(edu => {
        text += `${edu.degree} in ${edu.field}\n`;
        text += `${edu.institution}\n`;
        text += `${edu.startDate} - ${edu.endDate}\n`;
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
        text += `\n`;
      });
    }
    
    if (skills.length > 0) {
      text += `SKILLS:\n`;
      const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(`${skill.name} (${skill.level})`);
        return acc;
      }, {} as Record<string, string[]>);
      
      Object.entries(skillsByCategory).forEach(([category, skillList]) => {
        text += `${category}: ${skillList.join(', ')}\n`;
      });
      text += `\n`;
    }
    
    if (projects.length > 0) {
      text += `PROJECTS:\n`;
      projects.forEach(project => {
        text += `${project.name}\n`;
        text += `${project.description}\n`;
        text += `Technologies: ${project.technologies}\n`;
        if (project.link) text += `Link: ${project.link}\n`;
        text += `\n`;
      });
    }
    
    return text;
  }

  private validateAndCleanAnalysis(analysis: any): ATSAnalysis {
    // Ensure all required fields are present with defaults
    return {
      overallScore: Math.max(0, Math.min(100, analysis.overallScore || 0)),
      keywordScore: Math.max(0, Math.min(100, analysis.keywordScore || 0)),
      formatScore: Math.max(0, Math.min(100, analysis.formatScore || 0)),
      contentScore: Math.max(0, Math.min(100, analysis.contentScore || 0)),
      readabilityScore: Math.max(0, Math.min(100, analysis.readabilityScore || 0)),
      
      strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
      weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses : [],
      recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations : [],
      
      missingKeywords: Array.isArray(analysis.missingKeywords) ? analysis.missingKeywords : [],
      presentKeywords: Array.isArray(analysis.presentKeywords) ? analysis.presentKeywords : [],
      
      formatIssues: Array.isArray(analysis.formatIssues) ? analysis.formatIssues : [],
      contentIssues: Array.isArray(analysis.contentIssues) ? analysis.contentIssues : [],
      
      industryAlignment: analysis.industryAlignment || 'Unable to determine',
      experienceLevel: analysis.experienceLevel || 'Unable to determine',
      
      improvementPriority: Array.isArray(analysis.improvementPriority) ? analysis.improvementPriority.map((item: any) => ({
        category: item.category || 'General',
        issue: item.issue || 'Unknown issue',
        impact: ['high', 'medium', 'low'].includes(item.impact) ? item.impact : 'medium',
        suggestion: item.suggestion || 'No suggestion provided'
      })) : []
    };
  }
}

export const atsAnalyzer = new ATSAnalyzer();