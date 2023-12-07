/*enrollment*/

import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

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
  createdAt: z.string(),
  personalDetails: PersonalDetailsSchema,
  parentsDetails: ParentsDetailsSchema,
  emergencyContact: EmergencyContactSchema,
  healthInformation: HealthInformationSchema,
  subjectRelated: z.array(z.string()),
  subjectsChosen: z.array(z.string()),
  otherInformation: OtherInformationSchema,
})

const applicantsDataSchema = z.object({
  applicants: z.array(ApplicantSchema),
  count: z.object({
    _count: z.object({
      id: z.number(),
    }),
  }),
})

/* term to enroll schema*/
const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
})

const termSubjectGroupSchema = z.object({
  id: z.number(),
  termId: z.number(),
  feeId: z.number(),
  subjectGroupId: z.number(),
})

const termSubjectSchema = z.array(
  z.object({
    id: z.number(),
    subject: subjectSchema,
    termSubjectGroup: termSubjectGroupSchema,
  })
)

const termToEnrollSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  termSubject: termSubjectSchema,
})

export type TermToEnrollSchema = z.infer<typeof termToEnrollSchema>
/* term to enroll schema*/

const enrollDataSchema = z.object({
  applicantId: z.number(),
  enrollData: z.array(
    z.object({
      subject: z.string(),
      termSubjectGroupId: z.number(),
      subjectGroupId: z.number(),
      termId: z.number(),
      feeId: z.number(),
      termSubjectId: z.number(),
    })
  ),
})
export type EnrollDataSchema = z.infer<typeof enrollDataSchema>

/*get enrolled subjects for applicant*/
const enrolledSubjectSchema = z.object({
  subjectId: z.number(),
  subjectName: z.string(),
})

const enrolledSubjectsSchema = z.array(enrolledSubjectSchema)

export const enrollment = {
  findAllApplicants: {
    querykey: "getAllApplicants",
    schema: applicantsDataSchema,
    query: async (page = 0) => {
      try {
        const response = await axios.get(route.enrollment.getAllApplicants, {
          params: { page },
        })
        console.log(response.data)

        return applicantsDataSchema.parse(response.data)
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
  searchApplicants: {
    querykey: "searchApplicants",
    schema: applicantsDataSchema,
    query: async (search = "", page = 0) => {
      const response = await axios.get(route.enrollment.searchApplicants, {
        params: { search, page },
      })

      return applicantsDataSchema.parse(response.data)
    },
  },
  findApplicantById: {
    querykey: "findApplicantById",
    schema: ApplicantSchema,
    query: async (id: string) => {
      const response = await axios.get(
        `${route.enrollment.findApplicantById}/${id}`
      )

      return ApplicantSchema.parse(response.data)
    },
  },
  getTermToEnroll: {
    queryKey: "getTermToEnroll",
    schema: termToEnrollSchema,
    query: async () => {
      try {
        const response = await axios.get(`${route.enrollment.findTermToEnroll}`)
        return termToEnrollSchema.parse(response.data)
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
  enrollApplicant: {
    queryKey: "enrollApplicant",
    schema: enrollDataSchema,
    query: async (enrollData: EnrollDataSchema) => {
      try {
        const response = await axios.post(
          `${route.enrollment.enrollApplicant}`,
          enrollData
        )
        // return termToEnrollSchema.parse(response.data)
        console.log(response.data)
        return response.data
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
  getApplicantEnrolledSubjects: {
    queryKey: "getApplicantEnrolledSubjects",
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.enrollment.findApplicantEnrolledSubjects}/${id}`
        )

        return enrolledSubjectsSchema.parse(response.data)
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
  enrollApplicantToStudent: {
    queryKey: "enrollApplicantToStudent",
    query: async (id: string) => {
      try {
        const response = await axios.post(
          `${route.enrollment.enrollApplicantToStudent}/${id}`
        )
        // return termToEnrollSchema.parse(response.data)

        return response.data
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
