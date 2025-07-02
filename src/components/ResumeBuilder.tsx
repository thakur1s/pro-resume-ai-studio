import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Brain, 
  Target, 
  Download, 
  Eye,
  Zap,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Edit3,
  Save
} from 'lucide-react';

const ResumeBuilder = () => {
  const [atsScore, setAtsScore] = useState(78);
  const [isOptimized, setIsOptimized] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Mock data for demonstration
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const suggestions = [
    "Add quantifiable achievements to your work experience",
    "Include relevant keywords from the job description",
    "Strengthen your professional summary with specific skills",
    "Add more technical skills relevant to your target role"
  ];

  const atsIssues = [
    { type: "warning", text: "Missing contact information" },
    { type: "error", text: "Use standard section headings" },
    { type: "info", text: "Add more industry keywords" }
  ];

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Resume Builder</h1>
              <p className="text-muted-foreground">
                Create your professional resume with AI-powered suggestions and optimization
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient-primary">{atsScore}%</div>
                <div className="text-xs text-muted-foreground">ATS Score</div>
              </div>
              
              <Button variant="outline" className="hover-lift">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <Button className="gradient-primary text-white hover-lift shadow-glow">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-8">
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Resume Editor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="your.email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input placeholder="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input placeholder="City, State" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LinkedIn Profile</label>
                      <Input placeholder="https://linkedin.com/in/yourprofile" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Professional Summary</label>
                      <Textarea 
                        placeholder="Write a compelling summary of your professional background..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    
                    <Card className="border border-dashed border-primary/30">
                      <CardContent className="pt-6">
                        <div className="text-center text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No work experience added yet</p>
                          <p className="text-sm">Click "Add Experience" to get started</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                    
                    <Card className="border border-dashed border-primary/30">
                      <CardContent className="pt-6">
                        <div className="text-center text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No education added yet</p>
                          <p className="text-sm">Click "Add Education" to get started</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Skills</h3>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                    
                    <Card className="border border-dashed border-primary/30">
                      <CardContent className="pt-6">
                        <div className="text-center text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No skills added yet</p>
                          <p className="text-sm">Click "Add Skill" to get started</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Projects</h3>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                    
                    <Card className="border border-dashed border-primary/30">
                      <CardContent className="pt-6">
                        <div className="text-center text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No projects added yet</p>
                          <p className="text-sm">Click "Add Project" to get started</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upload Section */}
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Quick Start</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full h-12 border-dashed hover-lift">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Existing Resume
                </Button>
                
                <Button variant="outline" className="w-full h-12 border-dashed hover-lift">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Job Description
                </Button>
                
                <div className="text-center text-xs text-muted-foreground">
                  Supports PDF, DOCX formats
                </div>
              </CardContent>
            </Card>

            {/* ATS Score */}
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>ATS Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">{atsScore}%</div>
                  <Progress value={atsScore} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {atsScore >= 90 ? "Excellent" : atsScore >= 70 ? "Good" : "Needs Improvement"}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {atsIssues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      {issue.type === "error" && <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />}
                      {issue.type === "warning" && <AlertCircle className="w-4 h-4 text-warning mt-0.5" />}
                      {issue.type === "info" && <CheckCircle className="w-4 h-4 text-primary mt-0.5" />}
                      <span className="text-muted-foreground">{issue.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full gradient-primary text-white hover-lift shadow-glow"
                  onClick={() => {
                    setAtsScore(94);
                    setIsOptimized(true);
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize with AI
                </Button>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI Assistant</span>
                  <Badge className="gradient-accent text-white">
                    Ready
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm">
                    💡 I'm here to help! Try asking me:
                  </p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• "Improve my summary"</li>
                    <li>• "Add keywords for software engineer role"</li>
                    <li>• "Rewrite this bullet point"</li>
                  </ul>
                </div>
                
                <div className="flex space-x-2">
                  <Input placeholder="Ask me anything..." className="text-sm" />
                  <Button size="sm" className="gradient-primary text-white">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Suggestions:</div>
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="text-xs bg-white rounded p-2 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                      {suggestion}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grammar Check */}
            <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5" />
                  <span>Grammar Check</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-success mx-auto" />
                  <div className="text-sm">
                    <div className="font-medium">Looking good!</div>
                    <div className="text-muted-foreground">No grammar issues found</div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Run Full Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;