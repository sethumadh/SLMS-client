/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

const groupSchema = z.object({
  groupName: z.string(),
  isActive: z.boolean(),
  id: z.number(),
})

const levelSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  name: z.string(),
})

// Common Subject Schema
const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean().optional(),
})

// TermSubject Schema (Combining both versions)
const termSubjectSchema = z.object({
  id: z.number(),
  subject: subjectSchema,
  level: z.array(levelSchema),
})

// Common SubjectGroup Schema
const subjectGroupSchema = z.object({
  groupName: z.string(),
})

// Common Fee Schema
const feeSchema = z.object({
  amount: z.number(),
  paymentType: z.enum(["MONTHLY", "TERM"]),
})

// TermSubjectGroup Schema (Combining both versions)
const termSubjectGroupSchema = z.object({
  subjectGroup: subjectGroupSchema,
  fee: feeSchema,
  subject: z.array(subjectSchema).optional(), // Making the subject array optional
})

// Main Term Schema (Combining both versions)
export const termSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentTerm: z.boolean(),
  isPublish: z.boolean(),
  startDate: z.string(), // Use z.date() if working with Date objects
  endDate: z.string(), // Same as above
  createdAt: z.string(), // Same as above
  updatedAt: z.string(), // Same as above
  termSubject: z.array(termSubjectSchema),
  termSubjectGroup: z.array(termSubjectGroupSchema),
})
export type TermSchema = z.infer<typeof termSchema>

export const createTermWithSubjectSchema = z.object({
  termName: z.string().min(4, { message: "Minimum 4 characters required" }),
  startDate: z.string(),
  endDate: z.string(),
  groupSubjects: z.array(
    z.object({
      groupName: z
        .string()
        .min(4, { message: "Minimum 4 characters required" }),
      fee: z
        .string({ required_error: "fee is required" })
        .regex(/^\d+$/, { message: "Please enter a valid amount" })
        .min(1, { message: "Please enter a fee" }),
      feeInterval: z.string().default("TERM"),
      subjects: z.array(
        z.object({
          subjectName: z
            .string()
            .min(4, { message: "Minimum 4 characters required" }),
          levels: z
            .array(z.string())
            .min(1, { message: "Minimum 4 characters required" }),
        })
      ),
    })
  ),
})
export type CreateTermWithSubjectSchema = z.infer<
  typeof createTermWithSubjectSchema
>

/*Terms*/

const changeCurrentTermNameSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(), // Use z.date() if you prefer to work with Date objects
  endDate: z.string(), // Same as above
  createdAt: z.string(), // Same as above
  updatedAt: z.string(), // Same as above
})

export type changeCurrentTermNameSchema = z.infer<
  typeof changeCurrentTermNameSchema
>
const extendCurrentTermSchema = changeCurrentTermNameSchema
export type ExtendCurrentTermSchema = z.infer<typeof extendCurrentTermSchema>

export const term = {
  changeCurrentTermName: {
    schema: termSchema,
    mutation: async ({
      id,
      updatedTerm,
    }: {
      id: number
      updatedTerm: changeCurrentTermNameSchema
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
      updatedTerm: ExtendCurrentTermSchema
    }) => {
      const response = await axios.put(
        `${route.admin.extendCurrentTerm}/${id}`,
        { updatedTerm }
      )

      return termSchema.parse(response.data)
    },
  },
  createTermWithSubjectsSetup: {
    schema: createTermWithSubjectSchema,
    mutation: async (termData: CreateTermWithSubjectSchema) => {
      if (createTermWithSubjectSchema.safeParse(termData)) {
        const response = await axios.post(
          route.admin.createTermWithSubjectsSetup,
          termData
        )

        return z
          .object({
            id: z.number(),
            currentTerm: z.boolean(),
            isPublish: z.boolean(),
            name: z.string(),
          })
          .parse(response.data)
      } else {
        console.log("validation error at axios")
      }
    },
  },
  makeCurrentTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.patch(`${route.admin.makeCurrentTerm}/${id}`)
    },
  },
  makePublishTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.patch(`${route.admin.makePublishTerm}/${id}`)
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
/*Groups*/

export const groups = {
  findAllGroups: {
    querykey: "getAllGroups",
    schema: z.array(groupSchema),
    query: async () => {
      const response = await axios.get(route.admin.groups.findAllGroups)
      return z.array(groupSchema).parse(response.data)
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
