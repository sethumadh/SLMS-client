import { z } from "zod"

export const dueAmountModifySchema = z.object({
  fee: z
    .string()
    .regex(/^\d+$/, { message: "Please enter a valid amount" })
    .min(1, { message: "Please enter a fee" }),
  remarks: z.string().min(1, { message: "Minimum 1 characters required" }),
})
