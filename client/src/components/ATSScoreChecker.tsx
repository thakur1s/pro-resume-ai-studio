import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Brain, 
  Target, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Zap,
  Eye,
  KeyRound,
  FileSearch,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { ATSAnalysis, ResumeData } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface ATSScoreCheckerProps {
  resumeData: ResumeData;
  onAnalysisComplete?: (analysis: ATSAnalysis) => void;
}

const ATSScoreChecker = ({ resumeData, onAnalysisComplete }: ATSScoreCheckerProps) => {
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const { toast } = useToast();

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          jobDescription: jobDescription.trim() || undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
        onAnalysisComplete?.(data.analysis);
        toast({
          title: "Analysis Complete",
          description: "Your resume has been analyzed for ATS compatibility.",
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          ATS Score Checker
        </h2>
        <p className="text-muted-foreground">
          Get your resume analyzed by AI for ATS compatibility and optimization
        </p>
      </div>

      {/* Job Description Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Job Description (Optional)
          </CardTitle>
          <CardDescription>
            Paste the job description to get targeted analysis and keyword recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description here for more targeted analysis..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Button */}
      <div className="flex justify-center">
        <Button 
          onClick={analyzeResume}
          disabled={isAnalyzing}
          size="lg"
          className="gradient-primary text-white hover-lift shadow-glow"
        >
          {isAnalyzing ? (
            <>
              <Zap className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              Analyze Resume
            </>
          )}
        </Button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">
                  {analysis.overallScore}
                </span>
              </div>
              <CardTitle className={`text-2xl ${getScoreColor(analysis.overallScore)}`}>
                {getScoreLabel(analysis.overallScore)}
              </CardTitle>
              <CardDescription>
                Overall ATS Compatibility Score
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Detailed Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Keywords', score: analysis.keywordScore, icon: KeyRound },
              { label: 'Format', score: analysis.formatScore, icon: FileText },
              { label: 'Content', score: analysis.contentScore, icon: FileSearch },
              { label: 'Readability', score: analysis.readabilityScore, icon: Eye },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="recommendations">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-600 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Industry Alignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{analysis.industryAlignment}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Experience Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{analysis.experienceLevel}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Present Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.presentKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Missing Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword, index) => (
                        <Badge key={index} variant="destructive">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-600 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Format Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.formatIssues.map((issue, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <FileSearch className="w-5 h-5" />
                      Content Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.contentIssues.map((issue, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Priority Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.improvementPriority.map((item, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{item.category}</h4>
                            <Badge variant={getImpactColor(item.impact)}>
                              {item.impact} impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.issue}</p>
                          <p className="text-sm font-medium text-primary">{item.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      General Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Info Alert */}
      {!analysis && (
        <Alert>
          <Brain className="h-4 w-4" />
          <AlertDescription>
            Our AI-powered ATS analyzer uses the latest standards from Fortune 500 companies to evaluate your resume. 
            The analysis includes keyword optimization, format compatibility, content quality, and specific improvement recommendations.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ATSScoreChecker;