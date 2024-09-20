import z from "zod";

export const EstateFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().uuid({
    message: "City must be a valid UUID.",
  }),
  price: z
    .string()
    .min(0, {
      message: "Price must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  condo_fees: z
    .string()
    .min(1, {
      message: "Condo fees must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  floor: z
    .string()
    .min(-1, {
      message: "Floor must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  floor_type: z.string().uuid({
    message: "Floor type must be a valid UUID.",
  }),
  has_elevator: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),

  surface_area: z
    .string()
    .min(1, {
      message: "Surface area must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  rooms: z
    .string()
    .min(1, {
      message: "Rooms must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  bedrooms: z
    .string()
    .min(1, {
      message: "Bedrooms must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  bathrooms: z
    .string()
    .min(1, {
      message: "Bathrooms must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  terrace_area: z
    .string()
    .min(1, {
      message: "Terrace area must be at least 1.",
    })
    .transform(Number)
    .nullable(),
  heating_id: z.string().uuid({
    message: "Heating ID must be a valid UUID.",
  }),
  energy_source_id: z.string().uuid({
    message: "Energy source ID must be a valid UUID.",
  }),
  year_built: z
    .string()
    .min(1, {
      message: "Year built must be at least 1.",
    })
    .transform(Number)
    .nullable(),

  condition_type_id: z.string().uuid({
    message: "Condition type ID must be a valid UUID.",
  }),

  listing_type_id: z.string().uuid({
    message: "Listing type ID must be a valid UUID.",
  }),
  has_garage: z.enum(["true", "false"]).transform((value) => value === "true"),

  has_fireplace: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),
});
