/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

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

const activeStudentSchema = z.object({
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
// const subjectSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   isActive: z.boolean(),
// })

// const termSubjectGroupSchema = z.object({
//   id: z.number(),
//   termId: z.number(),
//   feeId: z.number(),
//   subjectGroupId: z.number(),
// })

// const termSubjectSchema = z.array(
//   z.object({
//     id: z.number(),
//     subject: subjectSchema,
//     termSubjectGroup: termSubjectGroupSchema,
//   })
// )
// const enrolledSubjectSchema = z.object({
//   subjectId: z.number(),
//   subjectName: z.string(),
// })

const activeStudentsDataSchema = z.object({
  activeStudents: z.array(activeStudentSchema),
  count: z.number(),
})
const enrollDataSchema = z.object({
  activeStudentId: z.number(),
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

// fee
const subjectEnrollmentSchema = z.object({
  id: z.number(),
  enrollmentId: z.number(),
  termSubjectId: z.number(),
  termSubject: z.object({
    subject: z.object({
      name: z.string(),
    }),
  }),
  // grade: z.string(),
  // attendance: z.array(z.any()) // or a more specific type if you know the structure of attendance
})

const enrollmentSchema = z.object({
  dueDate: z.string(), // or z.date() if you want to parse it as a Date object
  subjectEnrollment: subjectEnrollmentSchema,
})

const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
})

const subjectGroupSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  groupName: z.string(),
})

const feeSchema = z.object({
  id: z.number(),
  amount: z.number(),
  paymentType: z.string(), // you might want to use z.enum(["TERM", "MONTHLY"]) for stricter validation
})

const termSubjectGroupSchema = z.object({
  id: z.number(),
  termId: z.number(),
  feeId: z.number(),
  subjectGroupId: z.number(),
  fee: feeSchema,
  subjectGroup: subjectGroupSchema,
  subject: z.array(subjectSchema),
  enrollment: z.array(enrollmentSchema),
})

const feePaymentSchema = z.object({
  id: z.number(),
  feeId: z.number(),
  dueDate: z.string(), // or z.date()
  paidDate: z.string().nullable(), // or z.date().nullable()
  amountPaid: z.number(),
  dueAmount: z.number(),
  studentTermFeeId: z.number(),
  status: z.string(),
  method: z.string(),
})

const feeDetailSchema = z.object({
  id: z.number(),
  studentId: z.number(),
  termSubjectGroupId: z.number(),
  termId: z.number(),
  termSubjectGroup: termSubjectGroupSchema,
  feePayment: z.array(feePaymentSchema),
})

const feeDetailsArraySchema = z.array(feeDetailSchema)

// fee
// find subject enrolled by student per term subject group
const enrolledSubjectSchema = z.object({
  subjectId: z.number(),
  subjectName: z.string(),
})
// find subject enrolled by student per term subject group
export type EnrollDataSchema = z.infer<typeof enrollDataSchema>
export const activeStudent = {
  findAllActiveStudents: {
    querykey: "findAllActiveStudents",
    schema: activeStudentsDataSchema,
    query: async (page = 0, termId: number) => {
      try {
        const response = await axios.get(
          route.activeStudents.getAllActiveStudents,
          {
            params: { page, termId },
          }
        )

        return activeStudentsDataSchema.parse(response.data)
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
  searchActiveStudents: {
    querykey: "searchActiveStudents",
    schema: activeStudentsDataSchema,
    query: async (
      search = "",
      subjectOption = "",
      page = 0,
      termId: number
    ) => {
      console.log(subjectOption)
      try {
        const response = await axios.get(
          route.activeStudents.searchActiveStudents,
          {
            params: {
              search: search.length ? search : null,
              subjectOption: subjectOption.length ? subjectOption : null,
              page,
              termId,
            },
          }
        )

        return activeStudentsDataSchema.parse(response.data)
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
  findActiveStudentById: {
    querykey: "findActiveStudentById",
    schema: activeStudentSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.activeStudents.findActiveStudentById}/${id}`
        )
        console.log(response.data)
        return activeStudentSchema.parse(response.data)
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
  findActiveStudentFeeDetailsById: {
    querykey: "findActiveStudentFeeDetailsById",
    schema: feeDetailsArraySchema,
    query: async (studentId: string, termId: number) => {
      try {
        const response = await axios.get(
          `${route.activeStudents.findActiveStudentFeeDetailsById}/${studentId}`,
          { params: { termId } }
        )
        console.log(response.data)
        return feeDetailsArraySchema.parse(response.data)
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
  findTermSubjectGroupIdEnrolledSubjects: {
    querykey: "findTermSubjectGroupIdEnrolledSubjects",
    schema: enrolledSubjectSchema,
    query: async (id: string, termSubjectGroupId: number) => {
      try {
        const response = await axios.get(
          `${route.activeStudents.findTermSubjectGroupIdEnrolledSubjects}/${id}`,
          { params: { termSubjectGroupId } }
        )

        return enrolledSubjectSchema.parse(response.data)
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
