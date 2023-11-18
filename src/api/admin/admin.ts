import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

const levelSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const subjectLevelSchema = z.object({
  level: levelSchema,
})

const feeSchema = z.object({
  id: z.number(),
  amount: z.number(),
  subjectId: z.number(),
  paymentType: z.enum(["MONTHLY", "TERM"]),
})

const subjectSchema = z.object({
  name: z.string(),
  fee: feeSchema,
  isActive: z.boolean(),
  id: z.number(),
  SubjectLevel: z.array(subjectLevelSchema),
})

const termSubjectSchema = z.object({
  subject: subjectSchema,
})

const termSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentTerm: z.boolean(),
  startDate: z.string(), // or use z.date() if you want to validate actual Date objects
  endDate: z.string(), // or use z.date()
  createdAt: z.string(), // or use z.date()
  updatedAt: z.string(), // or use z.date()
  TermSubject: z.array(termSubjectSchema),
})
export type TermSchema = z.infer<typeof termSchema>

export const term = {
  changeCurrentTermName: {
    schema: termSchema,
    mutation: async ({
      id,
      updatedTerm,
    }: {
      id: number
      updatedTerm: TermSchema
    }) => {
      const response = await axios.put(
        `${route.admin.changeCurrentTermName}/${id}`,
        { updatedTerm }
      )
      return termSchema.parse(response.data)
    },
  },
  extendCurrentTerm: {
    schema: termSchema,
    mutation: async ({
      id,
      updatedTerm,
    }: {
      id: number
      updatedTerm: TermSchema
    }) => {
      const response = await axios.put(
        `${route.admin.extendCurrentTerm}/${id}`,
        { updatedTerm }
      )

      return termSchema.parse(response.data)
    },
  },
}
