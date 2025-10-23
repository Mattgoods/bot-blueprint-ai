import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExamplePrompts } from "@/components/ExamplePrompts";
import { FeatureSection } from "@/components/FeatureSection";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { generateFlowFromPrompt } from "@/utils/generateFlow";
import { toast } from "sonner";
import heroImage from "@/assets/hero-automation.jpg";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prompt, setPrompt] = useState(location.state?.previousPrompt || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your workflow");
      return;
    }

    setIsGenerating(true);
    try {
      const flowData = await generateFlowFromPrompt(prompt);
      navigate("/flow", { state: { flowData, prompt } });
    } catch (error) {
      toast.error("Failed to generate flow. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 animate-slide-up">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Automation Builder</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Transform Your Workflow Ideas into{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Power Automate Flows</span>{" "}
              Instantly
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Describe your automation in plain English. Get a visual flow diagram you can recreate in Power
              Automate. No technical expertise required.
            </p>

            {/* Input Section */}
            <div className="max-w-3xl mx-auto mb-8 animate-slide-up">
              <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your automation workflow... 

Example: Send me an email notification when a new item is added to my SharePoint list"
                  className="min-h-[150px] text-base resize-none border-border focus:border-primary transition-colors"
                  disabled={isGenerating}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                    <span>AI will analyze and generate your flow</span>
                  </div>
                  <Button
                    size="xl"
                    variant="hero"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="min-w-[180px]"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Flow
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
              {[
                { value: "500+", label: "Flows Generated" },
                { value: "45 min", label: "Avg. Time Saved" },
                { value: "95%", label: "Accuracy Rate" },
                { value: "700+", label: "Connectors Supported" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Prompts */}
      <section className="container mx-auto px-4 pb-16">
        <ExamplePrompts onSelectPrompt={handleExampleClick} />
      </section>

      {/* Features */}
      <FeatureSection />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Power Automate Flow Generator - Transform ideas into automation workflows
            </p>
            <p className="mt-2">Built with AI to simplify workflow creation</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
