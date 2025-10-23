import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileDown, Copy, RefreshCw } from "lucide-react";
import { FlowNode } from "@/components/flow/FlowNode";
import { FlowConnector } from "@/components/flow/FlowConnector";
import { SpecificationsPanel } from "@/components/flow/SpecificationsPanel";
import { FlowData } from "@/types/flow";
import { toast } from "sonner";

const FlowGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flowData = location.state?.flowData as FlowData | undefined;

  if (!flowData) {
    navigate("/");
    return null;
  }

  const handleExportPDF = () => {
    toast.success("PDF export feature coming soon!");
  };

  const handleCopyInstructions = () => {
    const instructions = `
Flow Name: ${flowData.flowName}
Type: ${flowData.flowType}
Complexity: ${flowData.complexity}
Estimated Setup Time: ${flowData.estimatedSetupTime} minutes

TRIGGER:
- Connector: ${flowData.trigger.connector}
- Type: ${flowData.trigger.type}
- Description: ${flowData.trigger.description}
Configuration Steps:
${flowData.trigger.configuration.map((step, i) => `${i + 1}. ${step}`).join("\n")}

ACTIONS:
${flowData.actions.map((action, i) => `${i + 1}. ${action.actionType} (${action.connector})\n   ${action.description}`).join("\n\n")}

BEST PRACTICES:
${flowData.bestPractices.map((practice, i) => `${i + 1}. ${practice}`).join("\n")}

COMMON PITFALLS:
${flowData.commonPitfalls.map((pitfall, i) => `${i + 1}. ${pitfall}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(instructions);
    toast.success("Setup instructions copied to clipboard!");
  };

  const handleRefine = () => {
    navigate("/", { state: { previousPrompt: location.state?.prompt } });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Generator
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleRefine} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refine Flow
              </Button>
              <Button variant="outline" onClick={handleCopyInstructions} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy Instructions
              </Button>
              <Button variant="hero" onClick={handleExportPDF} className="gap-2">
                <FileDown className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Flow Diagram */}
          <div className="lg:col-span-2 space-y-4">
            {/* Flow Header */}
            <Card className="p-6 bg-card border-border animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">
                {flowData.flowName}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {flowData.flowType}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    flowData.complexity === "Simple"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : flowData.complexity === "Moderate"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {flowData.complexity}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                  ~{flowData.estimatedSetupTime} min setup
                </span>
              </div>
            </Card>

            {/* Flow Diagram */}
            <div className="space-y-0">
              {/* Trigger */}
              <FlowNode
                title={flowData.trigger.type}
                connector={flowData.trigger.connector}
                description={flowData.trigger.description}
                type="trigger"
                configuration={flowData.trigger.configuration}
                isExpanded={true}
              />

              <FlowConnector />

              {/* Actions */}
              {flowData.actions.map((action, index) => (
                <div key={action.id}>
                  {action.conditionalBranch ? (
                    // Conditional Branch
                    <>
                      <FlowNode
                        title="Condition"
                        connector="Control"
                        description={action.conditionalBranch.condition}
                        type="condition"
                      />
                      <div className="grid grid-cols-2 gap-4 my-4">
                        {/* True Path */}
                        <div>
                          <FlowConnector label="Yes" />
                          {action.conditionalBranch.truePath.map((branchAction) => (
                            <div key={branchAction.id} className="mb-4">
                              <FlowNode
                                title={branchAction.actionType}
                                connector={branchAction.connector}
                                description={branchAction.description}
                              />
                            </div>
                          ))}
                        </div>
                        {/* False Path */}
                        <div>
                          <FlowConnector label="No" />
                          {action.conditionalBranch.falsePath.length > 0 ? (
                            action.conditionalBranch.falsePath.map((branchAction) => (
                              <div key={branchAction.id} className="mb-4">
                                <FlowNode
                                  title={branchAction.actionType}
                                  connector={branchAction.connector}
                                  description={branchAction.description}
                                />
                              </div>
                            ))
                          ) : (
                            <Card className="p-4 bg-muted/30 border-dashed">
                              <p className="text-sm text-muted-foreground text-center">No actions</p>
                            </Card>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Regular Action
                    <>
                      <FlowNode
                        title={action.actionType}
                        connector={action.connector}
                        description={action.description}
                      />
                      {index < flowData.actions.length - 1 && <FlowConnector />}
                    </>
                  )}
                </div>
              ))}

              {/* Success indicator */}
              <FlowConnector />
              <Card className="p-6 bg-gradient-to-r from-green-50 to-card dark:from-green-900/10 border-green-200 dark:border-green-800 text-center animate-fade-in">
                <p className="text-lg font-semibold text-green-700 dark:text-green-400">Flow Complete</p>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  All actions executed successfully
                </p>
              </Card>
            </div>
          </div>

          {/* Specifications Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <SpecificationsPanel flowData={flowData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowGenerator;
