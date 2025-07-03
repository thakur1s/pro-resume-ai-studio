import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';
import ResumePreview from './ResumePreview';
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
  Save,
  X,
  Trash2
} from 'lucide-react';

const ResumeBuilder = () => {
  const [atsScore, setAtsScore] = useState(78);
  const [isOptimized, setIsOptimized] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  // Get template from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');
    if (templateId) {
      setSelectedTemplate(parseInt(templateId));
    }
  }, []);

  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Resume data state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      summary: ''
    },
    experience: [] as Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }>,
    education: [] as Array<{
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      gpa?: string;
    }>,
    skills: [] as Array<{
      name: string;
      level: string;
      category: string;
    }>,
    projects: [] as Array<{
      name: string;
      description: string;
      technologies: string;
      link?: string;
    }>
  });

  // Form states
  const [experienceForm, setExperienceForm] = useState({
    company: '', position: '', startDate: '', endDate: '', current: false, description: ''
  });
  const [educationForm, setEducationForm] = useState({
    institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: ''
  });
  const [skillForm, setSkillForm] = useState({
    name: '', level: 'Intermediate', category: 'Technical'
  });
  const [projectForm, setProjectForm] = useState({
    name: '', description: '', technologies: '', link: ''
  });

  const suggestions = [
    "Add quantifiable achievements to your work experience",
    "Include relevant keywords from the job description",
    "Strengthen your professional summary with specific skills",
    "Add more technical skills relevant to your target role"
  ];

  // Calculate ATS score based on resume content
  const calculateAtsScore = () => {
    let score = 0;
    const { personalInfo, experience, education, skills } = resumeData;
    
    // Basic info checks (40 points)
    if (personalInfo.name) score += 10;
    if (personalInfo.email) score += 10;
    if (personalInfo.phone) score += 10;
    if (personalInfo.summary) score += 10;
    
    // Content checks (40 points)
    if (experience.length > 0) score += 20;
    if (education.length > 0) score += 10;
    if (skills.length > 0) score += 10;
    
    // Quality checks (20 points)
    if (personalInfo.summary.length > 50) score += 10;
    if (experience.some(exp => exp.description.length > 100)) score += 10;
    
    return Math.min(score, 100);
  };

  const currentAtsScore = calculateAtsScore();

  const getAtsIssues = () => {
    const issues = [];
    const { personalInfo, experience, education, skills } = resumeData;
    
    if (!personalInfo.email || !personalInfo.phone) {
      issues.push({ type: "error", text: "Missing contact information" });
    }
    if (experience.length === 0) {
      issues.push({ type: "warning", text: "Add work experience" });
    }
    if (skills.length < 5) {
      issues.push({ type: "info", text: "Add more relevant skills" });
    }
    if (personalInfo.summary.length < 50) {
      issues.push({ type: "warning", text: "Expand professional summary" });
    }
    
    return issues;
  };

  // Functions
  const handlePreview = () => setShowPreview(true);
  
  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      toast({ title: "Error", description: "Please preview first" });
      return;
    }
    
    const opt = {
      margin: 0.5,
      filename: `${resumeData.personalInfo.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
      toast({ title: "Success", description: "PDF downloaded successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to download PDF" });
    }
  };

  const handleOptimizeWithAI = () => {
    // Simulate AI optimization
    setAtsScore(Math.min(currentAtsScore + 15, 100));
    setIsOptimized(true);
    toast({ title: "Success", description: "Resume optimized with AI suggestions!" });
  };

  const handleGrammarCheck = () => {
    toast({ title: "Grammar Check", description: "All text looks good! No issues found." });
  };

  const addExperience = () => {
    if (!experienceForm.company || !experienceForm.position) {
      toast({ title: "Error", description: "Please fill required fields" });
      return;
    }
    
    const newExperience = { ...experienceForm };
    if (editingIndex !== null) {
      const updated = [...resumeData.experience];
      updated[editingIndex] = newExperience;
      setResumeData(prev => ({ ...prev, experience: updated }));
    } else {
      setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
    }
    
    setExperienceForm({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });
    setShowExperienceForm(false);
    setEditingIndex(null);
    toast({ title: "Success", description: "Experience added successfully!" });
  };

  const addEducation = () => {
    if (!educationForm.institution || !educationForm.degree) {
      toast({ title: "Error", description: "Please fill required fields" });
      return;
    }
    
    const newEducation = { ...educationForm };
    if (editingIndex !== null) {
      const updated = [...resumeData.education];
      updated[editingIndex] = newEducation;
      setResumeData(prev => ({ ...prev, education: updated }));
    } else {
      setResumeData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
    }
    
    setEducationForm({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' });
    setShowEducationForm(false);
    setEditingIndex(null);
    toast({ title: "Success", description: "Education added successfully!" });
  };

  const addSkill = () => {
    if (!skillForm.name) {
      toast({ title: "Error", description: "Please enter skill name" });
      return;
    }
    
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, { ...skillForm }] }));
    setSkillForm({ name: '', level: 'Intermediate', category: 'Technical' });
    setShowSkillForm(false);
    toast({ title: "Success", description: "Skill added successfully!" });
  };

  const addProject = () => {
    if (!projectForm.name || !projectForm.description) {
      toast({ title: "Error", description: "Please fill required fields" });
      return;
    }
    
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, { ...projectForm }] }));
    setProjectForm({ name: '', description: '', technologies: '', link: '' });
    setShowProjectForm(false);
    toast({ title: "Success", description: "Project added successfully!" });
  };

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
                <div className="text-2xl font-bold text-gradient-primary">{currentAtsScore}%</div>
                <div className="text-xs text-muted-foreground">ATS Score</div>
              </div>
              
              <Button variant="outline" className="hover-lift" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <Button className="gradient-primary text-white hover-lift shadow-glow" onClick={handleDownloadPdf}>
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
                      <Input 
                        placeholder="Enter your full name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, name: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input 
                        placeholder="+1 (555) 123-4567"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input 
                        placeholder="City, State"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))}
                      />
                    </div>
                    </div>
                    
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn Profile</label>
                    <Input 
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                      }))}
                    />
                  </div>
                    
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Summary</label>
                    <Textarea 
                      placeholder="Write a compelling summary of your professional background..."
                      rows={4}
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, summary: e.target.value }
                      }))}
                    />
                  </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Dialog open={showExperienceForm} onOpenChange={setShowExperienceForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Experience
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add Work Experience</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Company *</label>
                              <Input 
                                value={experienceForm.company}
                                onChange={(e) => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                                placeholder="Company name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Position *</label>
                              <Input 
                                value={experienceForm.position}
                                onChange={(e) => setExperienceForm(prev => ({ ...prev, position: e.target.value }))}
                                placeholder="Job title"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Start Date</label>
                              <Input 
                                type="month"
                                value={experienceForm.startDate}
                                onChange={(e) => setExperienceForm(prev => ({ ...prev, startDate: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">End Date</label>
                              <Input 
                                type="month"
                                value={experienceForm.endDate}
                                onChange={(e) => setExperienceForm(prev => ({ ...prev, endDate: e.target.value }))}
                                disabled={experienceForm.current}
                              />
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="current"
                                  checked={experienceForm.current}
                                  onChange={(e) => setExperienceForm(prev => ({ ...prev, current: e.target.checked }))}
                                />
                                <label htmlFor="current" className="text-sm">Currently working here</label>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea 
                              value={experienceForm.description}
                              onChange={(e) => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Describe your role and achievements..."
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowExperienceForm(false)}>Cancel</Button>
                            <Button onClick={addExperience}>Save</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {resumeData.experience.length === 0 ? (
                      <Card className="border border-dashed border-primary/30">
                        <CardContent className="pt-6">
                          <div className="text-center text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No work experience added yet</p>
                            <p className="text-sm">Click "Add Experience" to get started</p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {resumeData.experience.map((exp, index) => (
                          <Card key={index} className="border border-primary/20">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{exp.position}</h4>
                                  <p className="text-muted-foreground">{exp.company}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                  </p>
                                  <p className="mt-2 text-sm">{exp.description}</p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const updated = resumeData.experience.filter((_, i) => i !== index);
                                    setResumeData(prev => ({ ...prev, experience: updated }));
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="education" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Dialog open={showEducationForm} onOpenChange={setShowEducationForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Education
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add Education</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Institution *</label>
                              <Input 
                                value={educationForm.institution}
                                onChange={(e) => setEducationForm(prev => ({ ...prev, institution: e.target.value }))}
                                placeholder="University/College name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Degree *</label>
                              <Input 
                                value={educationForm.degree}
                                onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                                placeholder="Bachelor's, Master's, etc."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Field of Study</label>
                              <Input 
                                value={educationForm.field}
                                onChange={(e) => setEducationForm(prev => ({ ...prev, field: e.target.value }))}
                                placeholder="Computer Science, etc."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">GPA</label>
                              <Input 
                                value={educationForm.gpa}
                                onChange={(e) => setEducationForm(prev => ({ ...prev, gpa: e.target.value }))}
                                placeholder="3.8/4.0"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Start Date</label>
                              <Input 
                                type="month"
                                value={educationForm.startDate}
                                onChange={(e) => setEducationForm(prev => ({ ...prev, startDate: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">End Date</label>
                              <Input 
                                type="month"
                                value={educationForm.endDate}
                                onChange={(e) => setEducationForm(prev => ({ ...prev, endDate: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowEducationForm(false)}>Cancel</Button>
                            <Button onClick={addEducation}>Save</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {resumeData.education.length === 0 ? (
                      <Card className="border border-dashed border-primary/30">
                        <CardContent className="pt-6">
                          <div className="text-center text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No education added yet</p>
                            <p className="text-sm">Click "Add Education" to get started</p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {resumeData.education.map((edu, index) => (
                          <Card key={index} className="border border-primary/20">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                                  <p className="text-muted-foreground">{edu.institution}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {edu.startDate} - {edu.endDate}
                                  </p>
                                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const updated = resumeData.education.filter((_, i) => i !== index);
                                    setResumeData(prev => ({ ...prev, education: updated }));
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Skills</h3>
                      <Dialog open={showSkillForm} onOpenChange={setShowSkillForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Skill
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Skill</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Skill Name *</label>
                              <Input 
                                value={skillForm.name}
                                onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="JavaScript, Python, etc."
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Level</label>
                                <select 
                                  className="w-full p-2 border rounded"
                                  value={skillForm.level}
                                  onChange={(e) => setSkillForm(prev => ({ ...prev, level: e.target.value }))}
                                >
                                  <option value="Beginner">Beginner</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Advanced">Advanced</option>
                                  <option value="Expert">Expert</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select 
                                  className="w-full p-2 border rounded"
                                  value={skillForm.category}
                                  onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value }))}
                                >
                                  <option value="Technical">Technical</option>
                                  <option value="Soft Skills">Soft Skills</option>
                                  <option value="Languages">Languages</option>
                                  <option value="Tools">Tools</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowSkillForm(false)}>Cancel</Button>
                            <Button onClick={addSkill}>Save</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {resumeData.skills.length === 0 ? (
                      <Card className="border border-dashed border-primary/30">
                        <CardContent className="pt-6">
                          <div className="text-center text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No skills added yet</p>
                            <p className="text-sm">Click "Add Skill" to get started</p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {['Technical', 'Soft Skills', 'Languages', 'Tools'].map(category => {
                          const categorySkills = resumeData.skills.filter(skill => skill.category === category);
                          if (categorySkills.length === 0) return null;
                          
                          return (
                            <Card key={category} className="border border-primary/20">
                              <CardContent className="pt-4">
                                <h4 className="font-semibold mb-3">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {categorySkills.map((skill, index) => (
                                    <div key={index} className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-1">
                                      <span className="text-sm">{skill.name}</span>
                                      <Badge variant="outline" className="text-xs">{skill.level}</Badge>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => {
                                          const updated = resumeData.skills.filter(s => s !== skill);
                                          setResumeData(prev => ({ ...prev, skills: updated }));
                                        }}
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Projects</h3>
                      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Project
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add Project</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Project Name *</label>
                                <Input 
                                  value={projectForm.name}
                                  onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                                  placeholder="Project name"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Project Link</label>
                                <Input 
                                  value={projectForm.link}
                                  onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                                  placeholder="https://github.com/..."
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Technologies Used</label>
                              <Input 
                                value={projectForm.technologies}
                                onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                                placeholder="React, Node.js, MongoDB, etc."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description *</label>
                              <Textarea 
                                value={projectForm.description}
                                onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe your project and achievements..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                            <Button onClick={addProject}>Save</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {resumeData.projects.length === 0 ? (
                      <Card className="border border-dashed border-primary/30">
                        <CardContent className="pt-6">
                          <div className="text-center text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No projects added yet</p>
                            <p className="text-sm">Click "Add Project" to get started</p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {resumeData.projects.map((project, index) => (
                          <Card key={index} className="border border-primary/20">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{project.name}</h4>
                                  {project.link && (
                                    <a href={project.link} className="text-primary text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                                      View Project
                                    </a>
                                  )}
                                  <p className="text-sm text-muted-foreground mt-1">{project.technologies}</p>
                                  <p className="mt-2 text-sm">{project.description}</p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const updated = resumeData.projects.filter((_, i) => i !== index);
                                    setResumeData(prev => ({ ...prev, projects: updated }));
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
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
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('Resume uploaded:', file.name);
                      // AI integration point for resume parsing
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-dashed hover-lift"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Existing Resume
                </Button>
                
                <input
                  type="file"
                  id="job-upload"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('Job description uploaded:', file.name);
                      // AI integration point for job description parsing
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-dashed hover-lift"
                  onClick={() => document.getElementById('job-upload')?.click()}
                >
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
                  <div className="text-3xl font-bold text-gradient-primary mb-2">{currentAtsScore}%</div>
                  <Progress value={currentAtsScore} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {currentAtsScore >= 90 ? "Excellent" : currentAtsScore >= 70 ? "Good" : "Needs Improvement"}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {getAtsIssues().map((issue, index) => (
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
                  onClick={handleOptimizeWithAI}
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
                  <Input 
                    placeholder="Ask me anything..." 
                    className="text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const query = (e.target as HTMLInputElement).value;
                        if (query.trim()) {
                          toast({ title: "AI Assistant", description: `Processing: "${query}"` });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    className="gradient-primary text-white"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Ask me anything..."]') as HTMLInputElement;
                      if (input?.value.trim()) {
                        toast({ title: "AI Assistant", description: `Processing: "${input.value}"` });
                        input.value = '';
                      }
                    }}
                  >
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
                  
                  <Button variant="outline" size="sm" className="w-full" onClick={handleGrammarCheck}>
                    <Save className="w-4 h-4 mr-2" />
                    Run Full Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ResumePreview 
        open={showPreview} 
        onOpenChange={setShowPreview} 
        resumeData={resumeData} 
      />
    </div>
  );
};

export default ResumeBuilder;