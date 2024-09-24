interface ConditionType {
  id: string;
  title: string;
  slug: string;
}

export const propertyConditionTypeConfig: ConditionType[] = [
  {
    id: "/",
    title: "/",
    slug: "",
  },
  {
    id: "932a6641-14c7-4c2a-8e4a-6ef997e68c94",
    title: "Buono / Abitabile",
    slug: "buono-abitabile",
  },
  {
    id: "35680820-b961-4519-85a5-1dcfc464c922",
    title: "Nuovo / In costruzione",
    slug: "nuovo-in-costruzione",
  },
  {
    id: "4ebff0c1-3c2b-4d43-9fc3-2f53168325b0",
    title: "Da ristrutturare",
    slug: "da-ristrutturare",
  },
];

export default propertyConditionTypeConfig;
