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
    groupSubjects: z
      .array(
        z.object({
          groupName: z
            .string()
            .min(4, { message: "Minimum 4 characters required" }),
          fee: z
            .string()
            .regex(/^\d+$/, { message: "Please enter a valid amount" })
            .min(1, { message: "Please enter a fee" }),
          feeInterval: z.string().default("TERM"),

          subjects: z
            .array(
              z.object({
                subjectName: z
                  .string()
                  .min(4, { message: "Minimum 4 characters required" }),
                levels: z
                  .array(z.string())
                  .min(1, { message: "Minimum 1 level required" }),
              })
            )
            .refine(
              (subjects) => {
                // Custom validation to check for unique subject names within a group
                const subjectNames = subjects.map(
                  (subject) => subject.subjectName
                )
                const uniqueSubjectNames = new Set(subjectNames)

                return uniqueSubjectNames.size === subjectNames.length
              },
              { message: "Subject names must be unique within a group" }
            ),
        })
      )
      .refine(
        (groups) => {
          // Custom validation to check for unique group names within a term
          const groupNames = groups.map((group) => group.groupName)
          const uniqueGroupNames = new Set(groupNames)

          return uniqueGroupNames.size === groupNames.length
        },
        { message: "Group names must be unique within a term" }
      )
      .refine(
        (groups) => {
          // Custom validation to check for unique subject names within a group
          const groupSubjectsNames = groups
            .map((g) => g.subjects.map((s) => s.subjectName))
            .flat()
          const uniqueSubjectsName = new Set(groupSubjectsNames)

          return uniqueSubjectsName.size === groupSubjectsNames.length
        },
        { message: "Subject names must be unique within a term" }
      ),
  })
  .refine(
    (data) => data.startDate && data.endDate && data.startDate < data.endDate,
    {
      message: "End date must be after the start date",
      path: ["endDate"],
    }
  )
