export type Impact = {
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  downtime: "NO" | "POSSIBLE" | "YES";
  reason: string;
};

export function assessVultrInstanceImpact(action: string): Impact {
  switch (action) {
    case "CREATE":
      return {
        risk: "LOW",
        downtime: "NO",
        reason: "New virtual machine creation",
      };

    case "UPDATE":
      return {
        risk: "MEDIUM",
        downtime: "POSSIBLE",
        reason: "VM resize or configuration change may require reboot",
      };

    case "REPLACE":
      return {
        risk: "HIGH",
        downtime: "YES",
        reason: "Virtual machine will be destroyed and recreated",
      };

    case "DESTROY":
      return {
        risk: "HIGH",
        downtime: "YES",
        reason: "Virtual machine will be permanently removed",
      };

    default:
      return {
        risk: "LOW",
        downtime: "NO",
        reason: "No significant impact detected",
      };
  }
}
