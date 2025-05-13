import { z } from "zod";

export const DeleteConfirmationSchema = z
  .object({
    confirmation: z.union([z.literal("Delete"), z.literal("")], {
      errorMap: () => ({
        message: "Please type 'Delete' to confirm",
      }),
    }),
  })
  .refine((data) => data.confirmation === "Delete", {
    message: "Please type 'Delete' to confirm",
    path: ["confirmation"],
  });

export type DeleteConfirmationValues = z.infer<typeof DeleteConfirmationSchema>;
