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

// current term to assign class to students
const subjectAssignToClassSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
})

const levelAssignToClassSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  name: z.string(),
})

const termSubjectGroupAssignToClassSchema = z.object({
  id: z.number(),
  termId: z.number(),
  feeId: z.number(),
  subjectGroupId: z.number(),
})

const termSubjectAssignToClassSchema = z.object({
  id: z.number(),
  subject: subjectAssignToClassSchema,
  level: z.array(levelAssignToClassSchema),
  termSubjectGroup: termSubjectGroupAssignToClassSchema,
})

const sectionAssignToClassSchema = z.object({
  name: z.string(),
})

const termSubjectLevelAssignToClassSchema = z.object({
  id: z.number(),
  termId: z.number(),
  subjectId: z.number(),
  levelId: z.number(),
  sections: z.array(sectionAssignToClassSchema),
  level: z.object({
    name: z.string(),
  }),
  subject: z.object({
    name: z.string(),
  }),
})

const termAssignToClassSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(), // Assuming ISO date string format
  endDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  termSubject: z.array(termSubjectAssignToClassSchema),
  termSubjectLevel: z.array(termSubjectLevelAssignToClassSchema),
})

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
  feeAmount: z.number(),
  creditAmount: z.number(),
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

// find subject enrolled by student
const enrolledSubjectSchema = z.object({
  subjectId: z.number(),
  subjectName: z.string(),
})

// Schema for the array of objects
const subjectsArraySchema = z.array(enrolledSubjectSchema)
// find subject enrolled by student
export type EnrollDataSchema = z.infer<typeof enrollDataSchema>

/****** assigned classes for student**/
const subjectAssignedClassSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
})

const levelAssignedClassSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  name: z.string(),
})

const termSubjectLevelAssignedClassSchema = z.object({
  id: z.number(),
  termId: z.number(),
  subjectId: z.number(),
  levelId: z.number(),
  subject: subjectSchema,
  level: levelAssignedClassSchema,
})

const sectionAssignedClassSchema = z.object({
  name: z.string(),
})

const studentClassHistorySchema = z.object({
  id: z.number(),
  enrollmentId: z.number(),
  studentId: z.number(),
  termSubjectLevelId: z.number(),
  sectionId: z.number(),
  isCurrentlyAssigned: z.boolean(),
  changeDate: z.string(), // Assuming ISO date string format
  note: z.string().nullable(),
  termSubjectLevel: termSubjectLevelAssignedClassSchema,
  section: sectionAssignedClassSchema,
})

const studentClassHistoriesSchema = z.array(studentClassHistorySchema)

/****** assigned classes for student**/

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
  findActiveStudentEnrolledSubjects: {
    querykey: "findActiveStudentEnrolledSubjects",
    schema: subjectsArraySchema,
    query: async (studentId: string, termId: number) => {
      try {
        const response = await axios.get(
          `${route.activeStudents.findActiveStudentEnrolledSubjects}/${studentId}/${termId}`
        )
        return subjectsArraySchema.parse(response.data)
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
  findFeePaymentById: {
    querykey: "findFeePaymentById",
    schema: feePaymentSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.activeStudents.findFeePaymentById}/${id}`
        )

        return feePaymentSchema.parse(response.data)
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
  updateAmountPaid: {
    querykey: "updateAmountPaid",
    schema: feePaymentSchema,
    mutation: async ({
      id,
      amountPaid,
      remarks,
    }: {
      id: string
      amountPaid: string
      remarks: string
    }) => {
      try {
        const response = await axios.patch(
          `${route.activeStudents.updateAmountPaid}/${id}`,
          { remarks },
          {
            params: {
              amountPaid,
            },
          }
        )
        return feePaymentSchema.parse(response.data)
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
  findCurrentTermToAssignClassClass: {
    querykey: "findCurrentTermToAssignClassClass",
    schema: termAssignToClassSchema,
    query: async () => {
      const response = await axios.get(
        route.activeStudents.findCurrentTermToAssignClass
      )

      return termAssignToClassSchema.parse(response.data)
    },
  },
  assignClassToStudent: {
    querykey: "assignClassToStudent",
    schema: "",
    mutation: async ({
      studentId,
      termId,
      subjectName,
      levelName,
      sectionName,
    }: {
      studentId: string
      termId: string
      subjectName: string
      levelName: string
      sectionName: string
    }) => {
      const response = await axios.post(
        `
        ${route.activeStudents.assignClassToStudent}/${studentId}/${termId}
        `,
        { subjectName, levelName, sectionName }
      )

      return response.data
    },
  },
  findUniqueStudentClassDetails: {
    querykey: "findUniqueStudentClassDetails",
    schema: feePaymentSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.activeStudents.findUniqueStudentClassDetails}/${id}`
        )
        console.log(response.data)
        return studentClassHistoriesSchema.parse(response.data)
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
  manageClasses: {
    querykey: "manageClasses",
    schema: "",
    query: async (id: string) => {
      try {
        const response = await axios.patch(
          `${route.activeStudents.manageClasses}/${id}`
        )
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
}
// findUniqueStudentClassDetails
