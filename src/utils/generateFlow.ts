import { FlowData } from "@/types/flow";

// Mock AI flow generation - in production this would call an AI API
export const generateFlowFromPrompt = async (prompt: string): Promise<FlowData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simple keyword-based flow generation for demo
  const lowerPrompt = prompt.toLowerCase();

  // Detect flow type
  let flowType: FlowData["flowType"] = "Automated";
  if (lowerPrompt.includes("schedule") || lowerPrompt.includes("weekly") || lowerPrompt.includes("daily")) {
    flowType = "Scheduled";
  } else if (lowerPrompt.includes("button") || lowerPrompt.includes("manually")) {
    flowType = "Instant";
  }

  // Detect connectors
  const connectorsUsed: string[] = [];
  if (lowerPrompt.includes("email") || lowerPrompt.includes("outlook")) {
    connectorsUsed.push("Outlook");
  }
  if (lowerPrompt.includes("sharepoint") || lowerPrompt.includes("list")) {
    connectorsUsed.push("SharePoint");
  }
  if (lowerPrompt.includes("teams")) {
    connectorsUsed.push("Microsoft Teams");
  }
  if (lowerPrompt.includes("excel")) {
    connectorsUsed.push("Excel Online");
  }
  if (lowerPrompt.includes("onedrive")) {
    connectorsUsed.push("OneDrive");
  }
  if (lowerPrompt.includes("approval")) {
    connectorsUsed.push("Approvals");
  }
  if (lowerPrompt.includes("forms")) {
    connectorsUsed.push("Microsoft Forms");
  }

  // Generate flow based on common patterns
  let flowData: FlowData;

  if (lowerPrompt.includes("sharepoint") && lowerPrompt.includes("email")) {
    flowData = {
      flowName: "SharePoint to Email Notification",
      flowType,
      complexity: "Simple",
      estimatedSetupTime: 10,
      trigger: {
        connector: "SharePoint",
        type: "When an item is created",
        description: "Triggers when a new item is added to a SharePoint list",
        configuration: [
          "Select your SharePoint site",
          "Choose the target list",
          "Configure trigger conditions if needed",
        ],
      },
      actions: [
        {
          id: "1",
          connector: "Outlook",
          actionType: "Send an email",
          description: "Send email notification with item details",
          parameters: {
            to: "Your email address",
            subject: "New item added to SharePoint",
            body: "Item details from SharePoint",
          },
        },
      ],
      connectorsUsed: ["SharePoint", "Outlook"],
      bestPractices: [
        "Use dynamic content from SharePoint to personalize emails",
        "Add error handling with 'Configure run after' settings",
        "Test with a small list before deploying to production",
        "Consider using HTML formatting for better email appearance",
      ],
      commonPitfalls: [
        "Forgetting to grant permissions to the SharePoint list",
        "Not handling null values in dynamic content",
        "Sending too many emails if trigger fires frequently",
        "Missing proper email formatting causing display issues",
      ],
    };
  } else if (lowerPrompt.includes("approval")) {
    flowData = {
      flowName: "Approval Workflow",
      flowType: "Automated",
      complexity: "Moderate",
      estimatedSetupTime: 20,
      trigger: {
        connector: lowerPrompt.includes("forms") ? "Microsoft Forms" : "SharePoint",
        type: lowerPrompt.includes("forms") ? "When a new response is submitted" : "When an item is created",
        description: "Triggers when a new request is submitted",
        configuration: [
          "Connect to your data source",
          "Select the form or list",
          "Map required fields",
        ],
      },
      actions: [
        {
          id: "1",
          connector: "Approvals",
          actionType: "Start and wait for an approval",
          description: "Send approval request to designated approver",
          parameters: {
            approvalType: "Approve/Reject - First to respond",
            title: "Approval Required",
            assignedTo: "Manager email",
          },
        },
        {
          id: "2",
          connector: "Condition",
          actionType: "Condition",
          description: "Check if request was approved or rejected",
          parameters: {},
          conditionalBranch: {
            condition: "Approval outcome is 'Approve'",
            truePath: [
              {
                id: "3",
                connector: "Outlook",
                actionType: "Send an email",
                description: "Send approval confirmation",
                parameters: {},
              },
            ],
            falsePath: [
              {
                id: "4",
                connector: "Outlook",
                actionType: "Send an email",
                description: "Send rejection notification",
                parameters: {},
              },
            ],
          },
        },
      ],
      connectorsUsed: connectorsUsed.length > 0 ? connectorsUsed : ["SharePoint", "Approvals", "Outlook"],
      bestPractices: [
        "Set appropriate timeout values for approvals",
        "Include relevant information in approval request",
        "Add parallel approval for multiple approvers if needed",
        "Store approval history in SharePoint or database",
      ],
      commonPitfalls: [
        "Not handling approval timeout scenarios",
        "Missing email notifications for all outcomes",
        "Inadequate information for approver to make decision",
        "Not updating source data after approval",
      ],
    };
  } else if (lowerPrompt.includes("teams") && (lowerPrompt.includes("report") || lowerPrompt.includes("post"))) {
    flowData = {
      flowName: "Automated Teams Report",
      flowType: flowType === "Scheduled" ? "Scheduled" : "Automated",
      complexity: "Moderate",
      estimatedSetupTime: 15,
      trigger: {
        connector: "Recurrence",
        type: "Schedule",
        description: "Runs on a scheduled interval",
        configuration: [
          "Set frequency (daily, weekly, monthly)",
          "Choose specific time",
          "Configure timezone",
        ],
      },
      actions: [
        {
          id: "1",
          connector: lowerPrompt.includes("excel") ? "Excel Online" : "SharePoint",
          actionType: lowerPrompt.includes("excel") ? "List rows present in table" : "Get items",
          description: "Fetch data from source",
          parameters: {},
        },
        {
          id: "2",
          connector: "Data Operations",
          actionType: "Select",
          description: "Transform and format data",
          parameters: {},
        },
        {
          id: "3",
          connector: "Microsoft Teams",
          actionType: "Post message in a chat or channel",
          description: "Post formatted report to Teams channel",
          parameters: {
            team: "Your team",
            channel: "Target channel",
          },
        },
      ],
      connectorsUsed: lowerPrompt.includes("excel")
        ? ["Recurrence", "Excel Online", "Microsoft Teams"]
        : ["Recurrence", "SharePoint", "Microsoft Teams"],
      bestPractices: [
        "Format data using adaptive cards for better presentation",
        "Add error handling for data source unavailability",
        "Include summary statistics in the report",
        "Test schedule outside business hours first",
      ],
      commonPitfalls: [
        "Not handling empty data sets gracefully",
        "Posting too much data causing message truncation",
        "Schedule conflicts with system maintenance windows",
        "Missing proper data formatting for readability",
      ],
    };
  } else if (lowerPrompt.includes("attachment") && lowerPrompt.includes("onedrive")) {
    flowData = {
      flowName: "Save Email Attachments to OneDrive",
      flowType: "Automated",
      complexity: "Simple",
      estimatedSetupTime: 12,
      trigger: {
        connector: "Outlook",
        type: "When a new email arrives",
        description: "Triggers when email with attachments arrives",
        configuration: [
          "Set up email filter (optional)",
          "Configure folder to monitor",
          "Add sender filter if needed",
        ],
      },
      actions: [
        {
          id: "1",
          connector: "Control",
          actionType: "Condition",
          description: "Check if email has attachments",
          parameters: {},
          conditionalBranch: {
            condition: "Number of attachments is greater than 0",
            truePath: [
              {
                id: "2",
                connector: "Control",
                actionType: "Apply to each",
                description: "Loop through each attachment",
                parameters: {},
              },
              {
                id: "3",
                connector: "OneDrive",
                actionType: "Create file",
                description: "Save attachment to OneDrive folder",
                parameters: {
                  folder: "Email Attachments",
                },
              },
            ],
            falsePath: [],
          },
        },
      ],
      connectorsUsed: ["Outlook", "OneDrive"],
      bestPractices: [
        "Create a dedicated folder structure for attachments",
        "Add file naming convention with timestamp",
        "Consider file size limits (30MB for standard connectors)",
        "Use subfolder organization by sender or date",
      ],
      commonPitfalls: [
        "Not handling duplicate file names",
        "Exceeding OneDrive storage limits",
        "Missing error handling for unsupported file types",
        "Not considering security/compliance requirements",
      ],
    };
  } else {
    // Generic flow
    flowData = {
      flowName: "Custom Automation Flow",
      flowType,
      complexity: "Moderate",
      estimatedSetupTime: 15,
      trigger: {
        connector: connectorsUsed[0] || "Manual",
        type: flowType === "Scheduled" ? "Recurrence" : "Manual trigger",
        description: "Initiates the workflow",
        configuration: ["Configure your trigger settings", "Set appropriate parameters"],
      },
      actions: [
        {
          id: "1",
          connector: connectorsUsed[1] || "Data Operations",
          actionType: "Get data",
          description: "Retrieve necessary information",
          parameters: {},
        },
        {
          id: "2",
          connector: connectorsUsed[2] || "Outlook",
          actionType: "Send notification",
          description: "Notify relevant parties",
          parameters: {},
        },
      ],
      connectorsUsed: connectorsUsed.length > 0 ? connectorsUsed : ["Manual", "Data Operations", "Outlook"],
      bestPractices: [
        "Test thoroughly with sample data",
        "Add error handling and notifications",
        "Document your flow configuration",
        "Use naming conventions for clarity",
      ],
      commonPitfalls: [
        "Not handling edge cases",
        "Missing proper error notifications",
        "Inadequate testing before deployment",
        "Poor documentation for maintenance",
      ],
    };
  }

  return flowData;
};
