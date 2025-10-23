import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlowNodeProps {
  title: string;
  connector: string;
  description: string;
  type?: "trigger" | "action" | "condition";
  configuration?: string[];
  isExpanded?: boolean;
}

export const FlowNode = ({
  title,
  connector,
  description,
  type = "action",
  configuration = [],
  isExpanded = false,
}: FlowNodeProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const getNodeStyles = () => {
    switch (type) {
      case "trigger":
        return "border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-card";
      case "condition":
        return "border-l-4 border-l-accent bg-gradient-to-r from-accent/5 to-card";
      default:
        return "border-l-4 border-l-muted-foreground/30 bg-card";
    }
  };

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md animate-slide-up", getNodeStyles())}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={type === "trigger" ? "default" : "secondary"} className="text-xs">
                {connector}
              </Badge>
              {type === "trigger" && (
                <Badge variant="outline" className="text-xs">
                  Trigger
                </Badge>
              )}
            </div>
            <CardTitle className="text-base text-card-foreground">{title}</CardTitle>
          </div>
          {configuration.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      {expanded && configuration.length > 0 && (
        <CardContent className="pt-0">
          <div className="bg-muted/30 rounded-md p-3 space-y-2">
            <p className="text-xs font-semibold text-foreground mb-2">Configuration:</p>
            {configuration.map((config, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{config}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
