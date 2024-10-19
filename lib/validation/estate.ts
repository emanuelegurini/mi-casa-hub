import { z } from "zod";

// Utility functions
const stringToNumber = (val: string | number) =>
  val === "" || val === null ? null : Number(val);
const stringToBoolean = (val: string | boolean) =>
  val === "true" || val === true;

// Base schemas
const uuidSchema = z.string().uuid("Must be a valid UUID");
const numberSchema = z
  .union([z.string(), z.number()])
  .transform(stringToNumber)
  .nullable();
const booleanSchema = z
  .union([z.string(), z.boolean()])
  .transform(stringToBoolean);

// Reusable field schemas
const minLengthString = (min: number) =>
  z.string().min(min, `Must be at least ${min} characters`);
const positiveNumber = numberSchema.refine((val) => val === null || val > 0, {
  message: "Must be greater than 0",
});

// Year built schema
const yearBuiltSchema = z
  .union([z.string(), z.number()])
  .transform((val) => (val === "" ? null : Number(val)))
  .nullable()
  .refine(
    (val) => val === null || (val >= 1000 && val <= new Date().getFullYear()),
    { message: "Year must be a valid 4-digit number" }
  )
  .describe("Year of construction");

// Common fields
const commonFields = {
  title: minLengthString(2).describe("Property title"),
  description: minLengthString(2).describe("Property description"),
  address: minLengthString(2).describe("Property address"),
  city_id: z
    .string()
    .uuid("City must not remain unselected.")
    .describe("City ID"),
  property_type_id: uuidSchema.describe("Property type ID"),
  price: positiveNumber.describe("Property price"),
  surface_area: positiveNumber.describe("Total surface area"),
  condition_type_id: uuidSchema.describe("Condition type ID"),
  listing_type_id: uuidSchema.describe("Listing type ID"),
};

// Optional fields
const optionalFields = {
  condo_fees: numberSchema.describe("Condominium fees"),
  floor: numberSchema.describe("Floor number"),
  floor_type_id: uuidSchema.nullable().describe("Floor type ID"),
  has_elevator: booleanSchema.describe("Has elevator"),
  rooms: positiveNumber.nullable().describe("Number of rooms"),
  bedrooms: positiveNumber.nullable().describe("Number of bedrooms"),
  bathrooms: positiveNumber.nullable().describe("Number of bathrooms"),
  terrace_area: positiveNumber.nullable().describe("Terrace area"),
  heating_id: uuidSchema.nullable().describe("Heating system ID"),
  energy_source_id: uuidSchema.nullable().describe("Energy source ID"),
  year_built: yearBuiltSchema,
  has_garage: booleanSchema.describe("Has garage"),
  has_fireplace: booleanSchema.describe("Has fireplace"),
  videoId: z.union([z.string(), z.null()]).describe("Property address"),
  mapFrame: z.union([z.string(), z.null()]).describe("Property address"),
};

// Main schema
export const estateFormSchema = z.object({
  ...commonFields,
  ...optionalFields,
});

// Update schema
export const estateUpdateSchema = z.object({
  ...commonFields,
  ...Object.entries(optionalFields).reduce(
    (acc, [key, schema]) => ({
      ...acc,
      [key]: schema.optional(),
    }),
    {}
  ),
});
