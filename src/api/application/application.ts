import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

const feeSchema = z.object({
  id: z.number(),
  amount: z.number(),
  subjectId: z.number(),
  paymentType: z.enum(["MONTHLY", "TERM"]),
})

const levelSchema = z.object({
  id: z.number(),
  name: z.string(),
})
const subjectLevelSchema = z.object({
  level: levelSchema,
})
const subjectSchema = z.object({
  name: z.string(),
  fee: feeSchema,
  isActive: z.boolean(),
  id: z.number(),
  SubjectLevel: z.array(subjectLevelSchema), // Adding SubjectLevel array
})
const termSubjectSchema = z.object({
  subject: subjectSchema,
})
export const getCurentTermSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentTerm: z.boolean(),
  startDate: z.string(), // or use z.date() if you want to validate actual Date objects
  endDate: z.string(), // or use z.date()
  createdAt: z.string(), // or use z.date()
  updatedAt: z.string(),
  TermSubject: z.array(termSubjectSchema),
})

export const currentTerm = {
  getTermSubjects: {
    queryKey: "getTermSubjects",
    schema: getCurentTermSchema,
    query: async () => {
      const response = await axios.get(`${route.application.getCurrentTerm}`)
      return getCurentTermSchema.parse(response.data)
    },
  },
}
