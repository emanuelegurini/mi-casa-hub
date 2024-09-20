interface ListingType {
  id: string;
  title: string;
  slug: string;
}

export const propertyListingTypeConfig: ListingType[] = [
  {
    id: "c1b74742-345b-4708-b62b-0551b7294f71",
    title: "Affitto",
    slug: "affitto",
  },
  {
    id: "dbddef14-812a-4c9f-a5b9-b52d7f104cbe",
    title: "Vendita",
    slug: "vendita",
  },
];

export default propertyListingTypeConfig;
