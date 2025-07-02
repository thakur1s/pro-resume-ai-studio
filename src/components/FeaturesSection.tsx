import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Target, 
  FileUp, 
  Zap, 
  MessageSquare, 
  CheckCircle,
  BarChart3,
  Edit3,
  Download,
  Sparkles,
  Clock,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI Resume Assistant",
    description: "Conversational AI that guides you through building your resume based on your role, experience, and target industry.",
    color: "primary",
    benefits: ["Personalized guidance", "Industry-specific tips", "Real-time suggestions"]
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description: "Advanced ATS analysis with before/after scoring to ensure your resume passes applicant tracking systems.",
    color: "success",
    benefits: ["ATS score analysis", "Keyword optimization", "Format validation"]
  },
  {
    icon: FileUp,
    title: "Smart Upload & Parse",
    description: "Upload existing resumes and job descriptions. Our AI extracts and analyzes key information automatically.",
    color: "accent",
    benefits: ["PDF & DOCX support", "Auto data extraction", "JD comparison"]
  },
  {
    icon: MessageSquare,
    title: "Copilot Editor",
    description: "Live editing with AI suggestions. Get help rewriting bullet points, adding achievements, and improving content.",
    color: "primary",
    benefits: ["Real-time editing", "Content suggestions", "Grammar check"]
  },
  {
    icon: CheckCircle,
    title: "Grammar & Style Check",
    description: "Professional writing analysis for grammar, tone, clarity, and consistency across your entire resume.",
    color: "warning",
    benefits: ["Grammar correction", "Tone analysis", "Style consistency"]
  },
  {
    icon: Download,
    title: "Multiple Export Options",
    description: "Download your resume in various formats optimized for different platforms and applications.",
    color: "success",
    benefits: ["PDF export", "Print ready", "Multiple formats"]
  }
];

const stats = [
  { icon: BarChart3, value: "98%", label: "ATS Pass Rate", color: "success" },
  { icon: Clock, value: "5 min", label: "Average Build Time", color: "primary" },
  { icon: Sparkles, value: "50K+", label: "Resumes Created", color: "accent" },
  { icon: Shield, value: "100%", label: "Data Security", color: "warning" }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/20 text-primary mb-4">
            <Sparkles className="w-3 h-3 mr-1 fill-current" />
            Powered by AI
          </Badge>
          
          <h2 className="text-3xl lg:text-5xl font-bold">
            Everything You Need to
            <span className="text-gradient-primary block lg:inline"> Land Your Dream Job</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools ensures your resume stands out to both 
            ATS systems and hiring managers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-lift bg-white/50 backdrop-blur-sm border-primary/10">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg gradient-${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gradient-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-primary/10 bg-white/50 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg gradient-${feature.color} flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Assistant Showcase */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Badge className="gradient-primary text-white">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Assistant Preview
                    </Badge>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold">
                      Your Personal Resume
                      <span className="text-gradient-accent block">Writing Assistant</span>
                    </h3>
                    
                    <p className="text-muted-foreground">
                      Chat with our AI to get personalized recommendations, content suggestions, 
                      and optimization tips tailored to your specific career goals.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Zap className="w-4 h-4 text-accent" />
                      <span>Instant feedback and suggestions</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Edit3 className="w-4 h-4 text-primary" />
                      <span>Real-time content optimization</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Target className="w-4 h-4 text-success" />
                      <span>Industry-specific guidance</span>
                    </div>
                  </div>
                </div>

                {/* AI Assistant UI Mockup */}
                <div className="relative">
                  <div className="bg-white rounded-xl shadow-xl p-4 border border-primary/10">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-border">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">AI Resume Assistant</div>
                          <div className="text-xs text-muted-foreground">Online • Ready to help</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="bg-primary/10 rounded-lg p-3">
                          <p>I notice you're applying for a Software Engineer role. Would you like me to optimize your technical skills section?</p>
                        </div>
                        
                        <div className="bg-muted rounded-lg p-3 ml-8">
                          <p>Yes, please help me improve it!</p>
                        </div>
                        
                        <div className="bg-primary/10 rounded-lg p-3">
                          <p>Great! I've added relevant keywords and reorganized your skills by proficiency. Your ATS score improved from 78% to 94%! ✨</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating notification */}
                  <div className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    +16% ATS Score
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;