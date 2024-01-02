import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least three characters long."),
  description: z
    .string()
    .min(3, "Title must be at least three characters")
    .max(
      400,
      "The description has to be less than 400 characters long. You're going a little too far. No one is going to read that much."
    ),
  location: z
    .string()
    .min(3, "Location must be at least three characters long")
    .max(400, "The description has to be less than 400 characters long."),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
