import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

const personalDetailsSchema = z.object({
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

const emergencyContactSchema = z.object({
  id: z.number(),
  contactPerson: z.string(),
  contactNumber: z.string(),
  relationship: z.string(),
})

const healthInformationSchema = z.object({
  id: z.number(),
  medicareNumber: z.string(),
  medicalCondition: z.string(),
  childrenCheckCardNumber: z.string(),
  workingwithChildrenCheckCardPhotoImage: z.string().optional(),
  workingWithChildrenCheckExpiry: z.string(),
})

const workRightsSchema = z.object({
  immigrationStatus: z.string(),
  workRights: z.boolean(),
})

const qualificationAvailabilitySchema = z.object({
  experience: z.string(),
  qualification: z.string(),
  subjectsChosen: z.array(z.string()),
  timeSlotsChosen: z.array(z.string()),
})

const bankDetailsSchema = z.object({
  ABN: z.string(),
  accountNumber: z.string(),
  bankAccountName: z.string(),
  BSB: z.string(),
})

const otherInformationSchema = z.object({
  id: z.number(),
  otherInfo: z.string(),
})

const applicantSchema = z.object({
  id: z.number(),
  role: z.enum(["APPLICANT"]),
  createdAt: z.string(),
  teacherPersonalDetails: personalDetailsSchema,
  teacherEmergencyContact: emergencyContactSchema,
  teacherWWCHealthInformation: healthInformationSchema,
  teacherWorkRights: workRightsSchema,
  teacherQualificationAvailability: qualificationAvailabilitySchema,
  teacherBankDetails: bankDetailsSchema,
  teacherOtherInformation: otherInformationSchema,
})

const allTeachersSchema = z.object({
  applicants: z.array(applicantSchema),
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
        console.log(response.data)
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

      return response.data
    },
  },
}
