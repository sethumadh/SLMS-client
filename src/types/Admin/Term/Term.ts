import { z } from "zod"

export const changeCurrentTermNameSchema = z.object({
  name: z.string().min(4, { message: "Minimum four characters is required" }),
})
export const extendCurrentTermSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
})

export const createTermWithSubjectSchema = z
  .object({
    termName: z.string().min(4, { message: "Minimum 4 characters required" }),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    subjects: z.array(
      z.object({
        subject: z
          .string()
          .min(4, { message: "Minimum 4 characters required" }),
        fee: z.string({ required_error: "fee is required" }),
        feeInterval: z.enum(["MONTHLY", "TERM"]),
        levels: z
          .array(z.string())
          .min(1, { message: "Minimum 1 level required" }),
      })
    ),
  })
  .refine(
    (data) => data.startDate && data.endDate && data.startDate < data.endDate,
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
