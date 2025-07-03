import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, CheckCircle, Zap, Target, Award } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const features = [
    { icon: Zap, text: "AI-Powered Optimization" },
    { icon: Target, text: "ATS Score Analysis" },
    { icon: Award, text: "Professional Templates" }
  ];

  const stats = [
    { value: "50K+", label: "Resumes Created" },
    { value: "95%", label: "ATS Pass Rate" },
    { value: "4.9★", label: "User Rating" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/20 text-primary">
                <Star className="w-3 h-3 mr-1 fill-current" />
                #1 AI Resume Builder
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Build Your
                <span className="text-gradient-primary block">
                  Perfect Resume
                </span>
                with AI Power
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Create professional, ATS-optimized resumes in minutes. Our AI analyzes job descriptions 
                and provides personalized suggestions to maximize your chances of landing interviews.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/10"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-primary text-white hover-lift shadow-glow group"
                asChild
              >
                <Link href="/builder">
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-lift border-primary/20 hover:border-primary/40"
                asChild
              >
                <a href="#templates">View Templates</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gradient-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative lg:order-last animate-fade-in">
            <div className="relative">
              <img
                src={heroImage}
                alt="AI Resume Builder Interface"
                className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-border animate-float">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">ATS Optimized</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-border animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;