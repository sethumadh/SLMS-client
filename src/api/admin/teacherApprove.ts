import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

export const teacherPersonalDetailsSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  DOB: z.string(),
  gender: z.string(),
  email: z.string(),
  contact: z.string(),
  address: z.string(),
  suburb: z.string(),
  state: z.string(),
  country: z.string(),
  postcode: z.string(),
  image: z.string().optional(),
})

export const teacherEmergencyContactSchema = z.object({
  id: z.number(),
  contactPerson: z.string(),
  contactNumber: z.string(),
  relationship: z.string(),
})

export const teacherHealthInformationSchema = z.object({
  id: z.number(),
  medicareNumber: z.string(),
  medicalCondition: z.string(),
  childrenCheckCardNumber: z.string(),
  workingwithChildrenCheckCardPhotoImage: z.string().optional(),
  workingWithChildrenCheckExpiry: z.string(),
})

export const teacherWorkRightsSchema = z.object({
  immigrationStatus: z.string(),
  workRights: z.boolean(),
})

export const teacherQualificationAvailabilitySchema = z.object({
  experience: z.string(),
  qualification: z.string(),
  subjectsChosen: z.array(z.string()),
  timeSlotsChosen: z.array(z.string()),
})

export const teacherBankDetailsSchema = z.object({
  ABN: z.string(),
  accountNumber: z.string(),
  bankAccountName: z.string(),
  BSB: z.string(),
})

export const teacherOtherInformationSchema = z.object({
  id: z.number(),
  otherInfo: z.string(),
})

export const teacherApplicantSchema = z.object({
  id: z.number(),
  role: z.enum(["APPLICANT"]),
  createdAt: z.string(),
  teacherPersonalDetails: teacherPersonalDetailsSchema,
  teacherEmergencyContact: teacherEmergencyContactSchema,
  teacherWWCHealthInformation: teacherHealthInformationSchema,
  teacherWorkRights: teacherWorkRightsSchema,
  teacherQualificationAvailability: teacherQualificationAvailabilitySchema,
  teacherBankDetails: teacherBankDetailsSchema,
  teacherOtherInformation: teacherOtherInformationSchema,
})

const allTeachersSchema = z.object({
  applicants: z.array(teacherApplicantSchema),
  count: z.number(),
})
export const teacherApprove = {
  findAllTeacherApplicants: {
    querykey: "findAllTeacherApplicants",
    schema: allTeachersSchema,
    query: async (page = 0) => {
      try {
        const response = await axios.get(
          route.admin.teacher.findAllTeacherApplicants,
          {
            params: { page },
          }
        )
        return allTeachersSchema.parse(response.data)
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
  searchTeacherApplication: {
    querykey: "searchTeacherApplication",
    schema: allTeachersSchema,
    query: async (search = "", page = 0) => {
      try {
        const response = await axios.get(
          route.admin.teacher.searchTeacherApplicants,
          {
            params: { search, page },
          }
        )

        return allTeachersSchema.parse(response.data)
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
  findTeacherApplicantById: {
    querykey: "findTeacherApplicantById",
    schema: "",
    query: async (id: string) => {
      const response = await axios.get(
        `${route.admin.teacher.findTeacherApplicantById}/${id}`
      )

      return teacherApplicantSchema.parse(response.data)
    },
  },
}
