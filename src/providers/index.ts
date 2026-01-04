import { CloudProvider } from "./types.js";
import { VultrProvider } from "./vultrProvider.js";

const providers: CloudProvider[] = [
  VultrProvider,
  // AwsProvider,
  // GcpProvider,
];

export function getProvider(resourceType: string): CloudProvider | undefined {
  return providers.find(p => p.supports(resourceType));
}
