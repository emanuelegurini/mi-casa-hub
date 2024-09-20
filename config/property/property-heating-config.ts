interface HeatingType {
  id: string;
  title: string;
  slug: string;
}

export const propertyHeatingTypeConfig: HeatingType[] = [
  {
    id: "4ced4bd5-8c97-4022-9a10-d301f08ab1a0",
    title: "Autonormo",
    slug: "autonomo",
  },
  {
    id: "81a4d488-51a1-463d-8088-c21297ff81ff",
    title: "Centralizzato",
    slug: "centralizzato",
  },
];

export default propertyHeatingTypeConfig;
