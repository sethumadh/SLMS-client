import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

/*Students*/

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

const enrolledStudentSchema = z.object({
  id: z.number(),
  role: z.string(),
  isActive: z.boolean(),
  personalDetails: PersonalDetailsSchema,
  parentsDetails: ParentsDetailsSchema,
  emergencyContact: EmergencyContactSchema,
  healthInformation: HealthInformationSchema,
  subjectRelated: z.array(z.string()),
  subjectsChosen: z.array(z.string()),
  otherInformation: OtherInformationSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
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
const enrolledSubjectSchema = z.object({
  subjectId: z.number(),
  subjectName: z.string(),
})

const enrolledSubjectsSchema = z.array(enrolledSubjectSchema)

const enrolledStudentsDataSchema = z.object({
  enrolledStudents: z.array(enrolledStudentSchema),
  count: z.object({
    _count: z.object({
      id: z.number(),
    }),
  }),
})
const enrollDataSchema = z.object({
  enrolledStudentId: z.number(),
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

export const enrolledStudent = {
  findAllEnrolledStudents: {
    querykey: "getAllEnrolledStudents",
    schema: enrolledStudentsDataSchema,
    query: async (page = 0) => {
      try {
        const response = await axios.get(
          route.enrolledStudents.getAllEnrolledStudents,
          {
            params: { page },
          }
        )

        return enrolledStudentsDataSchema.parse(response.data)
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
  searchEnrolledStudents: {
    querykey: "searchEnrolledStudents",
    schema: enrolledStudentsDataSchema,
    query: async (search = "", page = 0) => {
      try {
        const response = await axios.get(
          route.enrolledStudents.searchEnrolledStudents,
          {
            params: { search, page },
          }
        )

        return enrolledStudentsDataSchema.parse(response.data)
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
  findEnrolledStudentById: {
    querykey: "findEnrolledStudentById",
    schema: enrolledStudentSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(`${route.enrolledStudents.findEnrolledStudentById}/${id}`)

        return enrolledStudentSchema.parse(response.data)
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
  findTermToEnrollEnrolledStudent: {
    queryKey: "findTermToEnrollEnrolledStudent",
    schema: termToEnrollSchema,
    query: async () => {
      try {
        const response = await axios.get(`${route.enrolledStudents.findTermToEnrollEnrolledStudent}`)
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
  findEnrolledStudentEnrolledSubjects: {
    queryKey: "findEnrolledStudentEnrolledSubjects",
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.enrolledStudents.findEnrolledStudentEnrolledSubjects}/${id}`
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
  enrollEnrolledStudent: {
    queryKey: "enrollEnrolledStudent",
    schema: enrollDataSchema,
    mutation: async (enrollData: EnrollDataSchema) => {
      try {
        const response = await axios.post(
          `${route.enrolledStudents.enrollEnrolledStudent}`,
          enrollData
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
  deEnrollEnrolledStudent: {
    queryKey: "deEnrollEnrolledStudent",
    schema: enrollDataSchema,
    mutation: async (enrollData: EnrollDataSchema) => {
      try {
        const response = await axios.post(
          `${route.enrolledStudents.deEnrollEnrolledStudent}`,
          enrollData
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
