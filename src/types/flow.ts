export type FlowType = "Automated" | "Instant" | "Scheduled" | "Desktop";
export type Complexity = "Simple" | "Moderate" | "Complex";

export interface FlowTrigger {
  connector: string;
  type: string;
  description: string;
  configuration: string[];
}

export interface ConditionalBranch {
  condition: string;
  truePath: FlowAction[];
  falsePath: FlowAction[];
}

export interface FlowAction {
  id: string;
  connector: string;
  actionType: string;
  description: string;
  parameters: Record<string, unknown>;
  conditionalBranch?: ConditionalBranch | null;
}

export interface FlowData {
  flowName: string;
  flowType: FlowType;
  complexity: Complexity;
  estimatedSetupTime: number;
  trigger: FlowTrigger;
  actions: FlowAction[];
  connectorsUsed: string[];
  bestPractices: string[];
  commonPitfalls: string[];
}
