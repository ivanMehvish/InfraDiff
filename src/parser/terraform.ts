import * as fs from "fs";

export type InfraChange = {
  resourceType: string;
  name: string;
  action: "CREATE" | "UPDATE" | "REPLACE" | "DESTROY";
};

function mapActions(actions: string[]): InfraChange["action"] {
  if (actions.includes("delete") && actions.includes("create")) {
    return "REPLACE";
  }
  if (actions.includes("create")) {
    return "CREATE";
  }
  if (actions.includes("update")) {
    return "UPDATE";
  }
  if (actions.includes("delete")) {
    return "DESTROY";
  }
  return "UPDATE";
}

export function parseTerraformPlan(planPath: string): InfraChange[] {
  const raw = fs.readFileSync(planPath, "utf-8");
  const plan = JSON.parse(raw);

  const changes: InfraChange[] = [];

  const resourceChanges = plan.resource_changes || [];

  for (const rc of resourceChanges) {
    if (rc.type !== "vultr_instance") continue;

    const actions = rc.change?.actions;
    if (!actions) continue;

    changes.push({
      resourceType: rc.type,
      name: rc.name,
      action: mapActions(actions),
    });
  }

  return changes;
}
