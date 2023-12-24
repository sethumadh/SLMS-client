import { z } from "zod"

export const changePublishedTermNameSchema = z.object({
  name: z.string().min(4, { message: "Minimum four characters is required" }),
})
export const extendPublishedTermSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
})