import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

/* enrolled Students*/

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

const lateEnrolledStudentSchema = z.object({
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

const lateEnrolledStudentsDataSchema = z.object({
  lateEnrolledStudents: z.array(lateEnrolledStudentSchema),
  count: z.number(),
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

export const lateEnrolledStudent = {
  findAllLateEnrolledStudents: {
    querykey: "findAllLateEnrolledStudents",
    schema: lateEnrolledStudentsDataSchema,
    query: async (page = 0, termId: number) => {
      try {
        const response = await axios.get(
          route.lateEnrolledStudents.getAllLateEnrolledStudents,
          {
            params: { page, termId },
          }
        )

        return lateEnrolledStudentsDataSchema.parse(response.data)
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
  searchLateEnrolledStudents: {
    querykey: "searchlateEnrolledStudents",
    schema: lateEnrolledStudentsDataSchema,
    query: async (search = "", page = 0, termId: number) => {
      try {
        const response = await axios.get(
          route.lateEnrolledStudents.searchLateEnrolledStudents,
          {
            params: { search, page, termId },
          }
        )

        return lateEnrolledStudentsDataSchema.parse(response.data)
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
  findLateEnrolledStudentById: {
    querykey: "findlateEnrolledStudentById",
    schema: lateEnrolledStudentSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.lateEnrolledStudents.findLateEnrolledStudentById}/${id}`
        )

        return lateEnrolledStudentSchema.parse(response.data)
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
  findTermToEnrollLateEnrolledStudent: {
    queryKey: "findTermToEnrollLateEnrolledStudent",
    schema: termToEnrollSchema,
    query: async () => {
      try {
        const response = await axios.get(
          `${route.lateEnrolledStudents.findTermToEnrollLateEnrolledStudent}`
        )
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
  findLateEnrolledStudentEnrolledSubjects: {
    queryKey: "findLateEnrolledStudentEnrolledSubjects",
    query: async (id: string, termId: number) => {
      try {
        const response = await axios.get(
          `${route.lateEnrolledStudents.findLateEnrolledStudentEnrolledSubjects}/${id}/${termId}`
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
  enrollLateEnrolledStudent: {
    queryKey: "enrollLateEnrolledStudent",
    schema: enrollDataSchema,
    mutation: async (enrollData: EnrollDataSchema) => {
      try {
        const response = await axios.post(
          `${route.lateEnrolledStudents.enrollLateEnrolledStudent}`,
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
  deEnrollLateEnrolledStudent: {
    queryKey: "deEnrollLateEnrolledStudent",
    schema: enrollDataSchema,
    mutation: async (enrollData: EnrollDataSchema) => {
      try {
        const response = await axios.post(
          `${route.lateEnrolledStudents.deEnrollLateEnrolledStudent}`,
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
  enrollLateEnrolledStudentToCurrentTerm: {
    queryKey: "enrollLateEnrolledStudentToCurrentTerm",
    mutation: async ({ id, termId }: { id: string; termId: number }) => {
      console.log(id, termId)
      try {
        const response = await axios.post(
          `${route.lateEnrolledStudents.enrollLateStudentToActive}`,
          {},
          {
            params: {
              id,
              termId,
            },
          }
        )
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
//enrollLateStudentToActive
