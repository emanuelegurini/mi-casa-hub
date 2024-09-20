interface EnergySourceType {
  id: string;
  title: string;
  slug: string;
}

export const propertyEnergySourceTypeConfig: EnergySourceType[] = [
  {
    id: "9face134-3efd-4a9a-a7f4-2da469f4c428",
    title: "Gas",
    slug: "gas",
  },
  {
    id: "bbd3e400-1f48-4eb5-8606-0e80ee732d75",
    title: "Metano",
    slug: "metano",
  },
];

export default propertyEnergySourceTypeConfig;
