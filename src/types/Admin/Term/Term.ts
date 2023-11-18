import { z } from "zod"

export const changeCurrentTermNameSchema = z.object({
  name: z.string().min(4, { message: "Minimum four characters is required" }),
})
export const extendCurrentTermSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
})
