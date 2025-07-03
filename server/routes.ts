import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { atsAnalyzer } from "./ats-analyzer";
import { ResumeDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // ATS Analysis endpoint
  app.post("/api/analyze-resume", async (req, res) => {
    try {
      const { resumeData, jobDescription } = req.body;
      
      // Validate resume data
      const validatedResumeData = ResumeDataSchema.parse(resumeData);
      
      // Analyze the resume
      const analysis = await atsAnalyzer.analyzeResume(validatedResumeData, jobDescription);
      
      res.json({ success: true, analysis });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to analyze resume' 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
