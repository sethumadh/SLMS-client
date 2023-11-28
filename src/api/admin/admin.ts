import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

const levelSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
})

const feeSchema = z.object({
  amount: z.number(),
  paymentType: z.enum(["MONTHLY", "TERM"]),
})

const subjectSchema = z.object({
  name: z.string(),
  isActive: z.boolean(),
  id: z.number(),
})

const termSubjectSchema = z.object({
  subject: subjectSchema,
  level: z.array(levelSchema),
  fee: feeSchema,
})
const termSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  currentTerm: z.boolean(),
  startDate: z.string(), // or use z.date() if you want to validate actual Date objects
  endDate: z.string(), // or use z.date()
  createdAt: z.string(), // or use z.date()
  updatedAt: z.string(), // or use z.date()
  termSubject: z.array(termSubjectSchema),
})
export type TermSchema = z.infer<typeof termSchema>

export const createTermWithSubjectSchema = z.object({
  termName: z.string().min(4, { message: "Minimum 4 characters required" }),
  startDate: z.string(),
  endDate: z.string(),
  subjects: z.array(
    z.object({
      subject: z.string().min(4, { message: "Minimum 4 characters required" }),
      fee: z.string({ required_error: "fee is required" }),
      feeInterval: z.enum(["MONTHLY", "TERM"]),
      levels: z
        .array(z.string())
        .min(1, { message: "Minimum 1 level required" }),
    })
  ),
})
export type CreateTermWithSubjectSchema = z.infer<
  typeof createTermWithSubjectSchema
>

/*Terms*/

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
  createTermWithSubjectsSetup: {
    schema: termSchema,
    mutation: async (termData: CreateTermWithSubjectSchema) => {
      const response = await axios.post(
        route.admin.createTermWithSubjectsSetup,
        termData
      )
      console.log(response.data)
      return z
        .object({
          id: z.number(),
          name: z.string(),
        })
        .parse(response.data.createdTerm)
    },
  },
  makeCurrentTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.patch(`${route.admin.makeCurrentTerm}/${id}`)
    },
  },
  deleteTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.delete(`${route.admin.deleteTerm}/${id}`)
    },
  },

  findAllTerms: {
    queryKey: "getAllTerms",
    schema: z.array(termSchema),
    query: async () => {
      try {
        const response = await axios.get(route.admin.findAllTerms)
        return z.array(termSchema).parse(response.data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Handle Zod validation error
          console.error("Zod validation error:", error.issues)
        } else {
          // Handle other types of errors (e.g., network errors)
          console.error("Error:", error)
        }
        throw error // Re-throw the error if you want to propagate it
      }
    },
  },
  findUniqueTerm: {
    queryKey: "getUniqueTerm",
    schema: termSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(`${route.admin.findUniqueTerm}/${id}`)
        console.log("Response Data:", response.data)
        return termSchema.parse(response.data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Handle Zod validation error
          console.error("Zod validation error:", error.issues)
        } else {
          // Handle other types of errors (e.g., network errors)
          console.error("Error:", error)
        }
        throw error // Re-throw the error if you want to propagate it
      }
    },
  },
}
/*Subjects*/
export const subjects = {
  findAllSubjects: {
    querykey: "getAllSubjects",
    schema: z.array(subjectSchema),
    query: async () => {
      const response = await axios.get(route.admin.subject.findAllSubjects)
      return z.array(subjectSchema).parse(response.data)
    },
  },
}

/*Levels*/
export const levels = {
  findAllLevels: {
    querykey: "getAllLevels",
    schema: z.array(levelSchema),
    query: async () => {
      const response = await axios.get(route.admin.level.findAllLevels)
      return z.array(levelSchema).parse(response.data)
    },
  },
}

/*Students*/
export const students = {
  findAllStudents: {
    querykey: "getAllStudents",
    // schema: z.array(levelSchema),
    query: async () => {
      const response = await axios.get(route.admin.level.findAllLevels)
      return z.array(levelSchema).parse(response.data)
    },
  },
}

/*enrollment*/
//applicant schema
const PersonalDetailsSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  DOB: z.string(),
  gender: z.string(),
  email: z.string().email(),
  contact: z.string(),
  address: z.string(),
  suburb: z.string(),
  state: z.string(),
  country: z.string(),
  postcode: z.string(),
  image: z.string().optional(),
})

const ParentsDetailsSchema = z.object({
  id: z.number(),
  fatherName: z.string(),
  motherName: z.string(),
  parentEmail: z.string().email(),
  parentContact: z.string(),
})

const EmergencyContactSchema = z.object({
  id: z.number(),
  contactPerson: z.string(),
  contactNumber: z.string(),
  relationship: z.string(),
})

const HealthInformationSchema = z.object({
  id: z.number(),
  medicareNumber: z.string().optional(),
  ambulanceMembershipNumber: z.string(),
  medicalCondition: z.string(),
  allergy: z.string(),
})

const OtherInformationSchema = z.object({
  id: z.number(),
  otherInfo: z.string(),
  declaration: z.array(z.string()),
})

const ApplicantSchema = z.object({
  id: z.number(),
  role: z.literal("APPLICANT"),
  personalDetails: PersonalDetailsSchema,
  parentsDetails: ParentsDetailsSchema,
  emergencyContact: EmergencyContactSchema,
  healthInformation: HealthInformationSchema,
  subjectRelated: z.array(z.string()),
  subjectsChosen: z.array(z.string()),
  otherInformation: OtherInformationSchema,
  createdAt: z.string(),
})

const ApplicantsDataSchema = z.object({
  applicants: z.array(ApplicantSchema),
  count: z.object({
    _count: z.object({
      id: z.number(),
    }),
  }),
})

export const enrollment = {
  findAllApplicants: {
    querykey: "getAllApplicants",
    schema: ApplicantsDataSchema,
    query: async (page = 0) => {
      const response = await axios.get(
        route.admin.enrollment.getAllApplicants,
        { params: { page } }
      )

      return ApplicantsDataSchema.parse(response.data)
    },
  },
  searchApplicants: {
    querykey: "searchApplicants",
    schema: ApplicantsDataSchema,
    query: async (search = "", page = 0) => {
      const response = await axios.get(
        route.admin.enrollment.searchApplicants,
        { params: { search, page } }
      )

      return ApplicantsDataSchema.parse(response.data)
    },
  },
  findApplicantById: {
    querykey: "findApplicantById",
    schema: ApplicantSchema,
    query: async (id: string) => {
      const response = await axios.get(
        `${route.admin.enrollment.findApplicantById}/${id}`
      )

      return ApplicantSchema.parse(response.data)
    },
  },
}
