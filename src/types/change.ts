export type InfraChange = {
  resourceType: string;
  name: string;
  action: "CREATE" | "UPDATE" | "REPLACE" | "DESTROY";
};
