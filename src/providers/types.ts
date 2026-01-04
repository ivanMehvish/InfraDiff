export type Impact = {
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  downtime: "NO" | "POSSIBLE" | "YES";
  reason: string;
};

export interface CloudProvider {
  name: string;

  supports(resourceType: string): boolean;

  assessImpact(action: string): Impact;
}
