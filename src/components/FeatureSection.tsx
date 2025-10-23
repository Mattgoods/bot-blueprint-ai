import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, FileText, CheckCircle2, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Describe your workflow in plain English and let AI create the flow diagram",
  },
  {
    icon: Zap,
    title: "700+ Connectors",
    description: "Support for all major Power Automate connectors including SharePoint, Teams, and Outlook",
  },
  {
    icon: FileText,
    title: "Clear Visual Diagrams",
    description: "Beautiful, easy-to-follow flow diagrams that match Power Automate's interface",
  },
  {
    icon: CheckCircle2,
    title: "Export Ready",
    description: "Export detailed specifications and step-by-step setup instructions",
  },
  {
    icon: Lightbulb,
    title: "Best Practices",
    description: "Get AI-generated recommendations and warnings about common pitfalls",
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Flow Generator?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your automation ideas into actionable workflows in minutes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.slice(0, 3).map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {features.slice(3).map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
