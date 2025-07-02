import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Download, Star, Zap } from 'lucide-react';

// Import template images
import template1 from '@/assets/template-1.jpg';
import template2 from '@/assets/template-2.jpg';
import template3 from '@/assets/template-3.jpg';
import template4 from '@/assets/template-4.jpg';
import template5 from '@/assets/template-5.jpg';
import template6 from '@/assets/template-6.jpg';
import template7 from '@/assets/template-7.jpg';
import template8 from '@/assets/template-8.jpg';
import template9 from '@/assets/template-9.jpg';
import template10 from '@/assets/template-10.jpg';
import template11 from '@/assets/template-11.jpg';

const templates = [
  {
    id: 1,
    name: "Modern Classic",
    category: "Professional",
    image: template1,
    popular: true,
    atsScore: 98,
    description: "Clean, minimalist design perfect for any industry"
  },
  {
    id: 2,
    name: "Executive Pro",
    category: "Executive",
    image: template2,
    popular: false,
    atsScore: 95,
    description: "Two-column layout ideal for senior positions"
  },
  {
    id: 3,
    name: "Corporate Elite",
    category: "Business",
    image: template3,
    popular: true,
    atsScore: 97,
    description: "Sophisticated design for corporate roles"
  },
  {
    id: 4,
    name: "Creative Edge",
    category: "Creative",
    image: template4,
    popular: false,
    atsScore: 92,
    description: "Stand out design for creative professionals"
  },
  {
    id: 5,
    name: "Tech Focus",
    category: "Technology",
    image: template5,
    popular: true,
    atsScore: 96,
    description: "Modern tech-inspired layout for developers"
  },
  {
    id: 6,
    name: "Finance Pro",
    category: "Finance",
    image: template6,
    popular: false,
    atsScore: 99,
    description: "Traditional elegance for finance sector"
  },
  {
    id: 7,
    name: "Healthcare Plus",
    category: "Healthcare",
    image: template7,
    popular: false,
    atsScore: 94,
    description: "Clean medical professional format"
  },
  {
    id: 8,
    name: "Academic Scholar",
    category: "Academic",
    image: template8,
    popular: false,
    atsScore: 93,
    description: "Research-focused academic layout"
  },
  {
    id: 9,
    name: "Marketing Star",
    category: "Marketing",
    image: template9,
    popular: true,
    atsScore: 91,
    description: "Creative marketing professional design"
  },
  {
    id: 10,
    name: "Global Executive",
    category: "International",
    image: template10,
    popular: false,
    atsScore: 96,
    description: "International business standard"
  },
  {
    id: 11,
    name: "LaTeX Academic",
    category: "Academic",
    image: template11,
    popular: true,
    atsScore: 97,
    description: "Clean LaTeX-style academic format"
  }
];

const categories = ["All", "Professional", "Executive", "Creative", "Technology", "Business", "Academic"];

const TemplateShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <section id="templates" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/20 text-primary mb-4">
            <Star className="w-3 h-3 mr-1 fill-current" />
            10+ Professional Templates
          </Badge>
          
          <h2 className="text-3xl lg:text-5xl font-bold">
            Choose Your
            <span className="text-gradient-primary"> Perfect Template</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-optimized templates are designed by professionals and tested for maximum ATS compatibility. 
            Each template is fully customizable and mobile-responsive.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "gradient-primary text-white shadow-glow" 
                : "hover-lift border-primary/20 hover:border-primary/40"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="interactive-card group overflow-hidden bg-white/50 backdrop-blur-sm border-primary/10"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <CardContent className="p-0">
                {/* Template Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center space-x-3">
                      <Button size="sm" variant="secondary" className="bg-white text-black hover:bg-white/90">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="gradient-primary text-white" asChild>
                        <a href={`/builder?template=${template.id}`}>
                          <Download className="w-4 h-4 mr-1" />
                          Use
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Popular Badge */}
                  {template.popular && (
                    <Badge className="absolute top-3 left-3 gradient-accent text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}

                  {/* ATS Score */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-xs font-medium">{template.atsScore}% ATS</span>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="gradient-primary text-white hover-lift shadow-glow" asChild>
            <a href="/builder">Start Creating Your Resume</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;