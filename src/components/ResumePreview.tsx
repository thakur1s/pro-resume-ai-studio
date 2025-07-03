import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
}

interface ResumePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
}

const ResumePreview = ({ open, onOpenChange, resumeData }: ResumePreviewProps) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Resume Preview</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div id="resume-preview" className="bg-white text-black p-8 font-serif max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-3xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
            <div className="text-sm space-x-4">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>•</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>•</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
            {personalInfo.linkedin && (
              <div className="mt-1 text-sm text-blue-600">{personalInfo.linkedin}</div>
            )}
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-gray-300">PROFESSIONAL SUMMARY</h2>
              <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="font-semibold text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-gray-300">EDUCATION</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-gray-300">TECHNICAL SKILLS</h2>
              {['Technical', 'Tools', 'Languages', 'Soft Skills'].map(category => {
                const categorySkills = skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="mb-2">
                    <span className="font-semibold text-sm">{category}: </span>
                    <span className="text-sm">
                      {categorySkills.map(skill => skill.name).join(', ')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-gray-300">PROJECTS</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreview;