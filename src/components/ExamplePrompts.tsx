import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const examples = [
  "Send me an email notification when a new item is added to my SharePoint list",
  "Create an approval workflow for expense reports that routes to managers and sends confirmation emails",
  "Schedule a weekly report that pulls data from Excel and posts to Teams",
  "Automatically save email attachments from specific senders to OneDrive",
];

export const ExamplePrompts = ({ onSelectPrompt }: ExamplePromptsProps) => {
  return (
    <div className="mt-12 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Try these examples:</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {examples.map((example, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-[1.02] hover:border-primary/50 bg-card"
            onClick={() => onSelectPrompt(example)}
          >
            <p className="text-sm text-card-foreground">{example}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
