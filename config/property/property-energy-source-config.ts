interface EnergySourceType {
  id: string;
  title: string;
  slug: string;
}

export const propertyEnergySourceTypeConfig: EnergySourceType[] = [
  {
    id: "/",
    title: "/",
    slug: "",
  },
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
  {
    id: "11365f60-d950-4b2b-a4df-8b389bb72ce4",
    title: "Pompa di calore",
    slug: "pompa-di-calore",
  },
];

export default propertyEnergySourceTypeConfig;
