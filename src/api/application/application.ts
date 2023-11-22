import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

const levelSchema = z.object({
  name: z.string(),
});

const feeSchema = z.object({
  amount: z.number(),
  paymentType: z.enum(["MONTHLY", "TERM"]),
});

const subjectSchema = z.object({
  name: z.string(),
  isActive: z.boolean(),
  id: z.number(),
});

const termSubjectSchema = z.object({
  subject: subjectSchema,
  level: z.array(levelSchema),
  fee: feeSchema,
});


export const getCurentTermSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(), // or use z.date() if you want to validate actual Date objects
  endDate: z.string(), // or use z.date()
  createdAt: z.string(), // or use z.date()
  updatedAt: z.string(),
  termSubject: z.array(termSubjectSchema),
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
