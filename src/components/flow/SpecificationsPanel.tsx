import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Layers, AlertTriangle, Lightbulb } from "lucide-react";
import { FlowData } from "@/types/flow";

interface SpecificationsPanelProps {
  flowData: FlowData;
}

export const SpecificationsPanel = ({ flowData }: SpecificationsPanelProps) => {
  return (
    <div className="space-y-4">
      {/* Flow Info Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Flow Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Type:</span>
            <Badge variant="secondary">{flowData.flowType}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Complexity:</span>
            <Badge
              variant={
                flowData.complexity === "Simple"
                  ? "default"
                  : flowData.complexity === "Moderate"
                  ? "secondary"
                  : "destructive"
              }
            >
              {flowData.complexity}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Setup Time:
            </span>
            <span className="text-sm font-medium text-foreground">{flowData.estimatedSetupTime} min</span>
          </div>
        </CardContent>
      </Card>

      {/* Connectors Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Connectors Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {flowData.connectorsUsed.map((connector, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {connector}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {flowData.bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{practice}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Common Pitfalls Card */}
      <Card className="bg-card border-border border-destructive/20">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Common Pitfalls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {flowData.commonPitfalls.map((pitfall, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{pitfall}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
