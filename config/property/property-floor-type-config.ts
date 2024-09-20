interface FloorType {
  id: string;
  title: string;
  slug: string;
}

export const propertyFloorTypeConfig: FloorType[] = [
  {
    id: "2eba542c-7771-4c9f-8435-2ab4c535bad6",
    title: "Sopraelevato",
    slug: "sopraelevato",
  },
  {
    id: "3ec524f0-29c6-47c7-9977-374ac828b950",
    title: "Mansarda",
    slug: "mansarda",
  },
  {
    id: "6d34f1cf-c666-428f-a2f1-9db24ed19dd4",
    title: "Interrato",
    slug: "interrato",
  },
  {
    id: "8328aac3-4012-483e-8c58-fefda3f75e53",
    title: "Mezzanino",
    slug: "mezzanino",
  },
  {
    id: "9d911421-0cf5-436f-b8cf-1e6edf528c8b",
    title: "Pian Terreno",
    slug: "pian-terreno",
  },
];

export default propertyFloorTypeConfig;
