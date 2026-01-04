import type { InfraChange } from "../types/change.js";
import { getProvider } from "../providers/index.js";
import { explainImpact } from "../llm/gemini.js";

export async function analyzeChange(change: InfraChange) {
  const provider = getProvider(change.resourceType);

  if (!provider) {
    return {
      ...change,
      risk: "LOW",
      downtime: "NO",
      reason: "No provider rules defined",
      explanation: "No explanation available",
    };
  }

  const impact = provider.assessImpact(change.action);

  let explanation = "Explanation unavailable.";

  try {
    explanation = await explainImpact({
      resource: `${change.resourceType}.${change.name}`,
      action: change.action,
      risk: impact.risk,
      downtime: impact.downtime,
      reason: impact.reason,
    });
  } catch (err) {
    console.error("Error generating explanation:", err);
  }

  return {
    ...change,
    ...impact,
    explanation,
    provider: provider.name,
  };
}
