import { ArrowDown } from "lucide-react";

interface FlowConnectorProps {
  label?: string;
}

export const FlowConnector = ({ label }: FlowConnectorProps) => {
  return (
    <div className="flex flex-col items-center py-2 animate-fade-in">
      <div className="flex flex-col items-center gap-1">
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/20" />
        <ArrowDown className="w-5 h-5 text-primary animate-pulse" />
        {label && (
          <span className="text-xs text-muted-foreground font-medium mt-1">{label}</span>
        )}
      </div>
    </div>
  );
};
