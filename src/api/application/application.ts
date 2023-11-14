import { z } from "zod"
import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL
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
  TermSubject: z.array(termSubjectSchema),
})
export const getCurrentSchema = z.object({})

export const currentTerm = {
  getTermSubjects: {
    queryKey: "getTermSubjects",
    schema: getCurentTermSchema,
    query: async () => {
      const response = await axios.get(
        `${baseURL}/api/v1/application/find-current-term`
      )
      return getCurentTermSchema.parse(response.data)
    },
  },
}
