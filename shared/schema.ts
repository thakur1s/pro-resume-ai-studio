import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ATS Analysis Schema
export const ATSAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  keywordScore: z.number().min(0).max(100),
  formatScore: z.number().min(0).max(100),
  contentScore: z.number().min(0).max(100),
  readabilityScore: z.number().min(0).max(100),
  
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  recommendations: z.array(z.string()),
  
  missingKeywords: z.array(z.string()),
  presentKeywords: z.array(z.string()),
  
  formatIssues: z.array(z.string()),
  contentIssues: z.array(z.string()),
  
  industryAlignment: z.string(),
  experienceLevel: z.string(),
  
  improvementPriority: z.array(z.object({
    category: z.string(),
    issue: z.string(),
    impact: z.enum(['high', 'medium', 'low']),
    suggestion: z.string()
  }))
});

export type ATSAnalysis = z.infer<typeof ATSAnalysisSchema>;

// Resume Data Schema
export const ResumeDataSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string(),
    summary: z.string(),
  }),
  experience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    current: z.boolean(),
    description: z.string(),
  })),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    gpa: z.string().optional(),
  })),
  skills: z.array(z.object({
    name: z.string(),
    level: z.string(),
    category: z.string(),
  })),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.string(),
    link: z.string().optional(),
  })),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
