import { CloudProvider } from "./types.js";
import { assessVultrInstanceImpact } from "../rules/vultureRules.js";

export const VultrProvider: CloudProvider = {
  name: "vultr",

  supports(resourceType: string): boolean {
    return resourceType === "vultr_instance";
  },

  assessImpact(action: string) {
    return assessVultrInstanceImpact(action);
  },
};
