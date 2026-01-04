#!/usr/bin/env node
import { Command } from "commander";
import { parseTerraformPlan } from "./parser/terraform.js";
import { analyzeChange } from "./analyzer/impactEngine.js";

const program = new Command();

program
  .name("infradiff")
  .description("Explain the real-world impact of Terraform changes")
  .version("1.0.0");

program
  .command("analyze")
  .argument("<planPath>", "Path to Terraform plan.json file")
  .description("Analyze a Terraform plan and explain infrastructure impact")
  .action(async (planPath: string) => {
    const changes = parseTerraformPlan(planPath);

    if (changes.length === 0) {
      console.log("No relevant infrastructure changes found.");
      return;
    }

    console.log("\n🔍 InfraDiff Analysis\n");

    for (const change of changes) {
      const result = await analyzeChange(change);

      console.log(`🚨 ${result.risk} RISK`);
      console.log(`Resource: ${result.resourceType}.${result.name}`);
      console.log(`Action: ${result.action}`);
      console.log(`Downtime: ${result.downtime}`);
      console.log(`Reason: ${result.reason}`);

      if (result.explanation) {
        console.log("\n🧠 Explanation:");
        console.log(result.explanation.trim());
      }

      console.log("—".repeat(50));
    }
  });

program.parse(process.argv);
