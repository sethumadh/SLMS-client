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
    startDate: z.date(),
    endDate: z.date(),
    subjects: z.array(
      z.object({
        subject: z
          .string()
          .min(4, { message: "Minimum 4 characters required" }),
        fee: z
          .string({ required_error: "fee is required" })
          .min(1, { message: "Please enter a fee" }),
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
  .refine(
    (data) => {
      const subjectNames = data.subjects.map((subject) =>
        subject.subject.toLowerCase()
      )
      const uniqueSubjectNames = new Set(subjectNames)
      return uniqueSubjectNames.size === subjectNames.length
    },
    {
      message: "Subject names must be unique",
      path: ["subjects"],
    }
  )
