import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"
import { termSchema } from "../admin/admin"

export const getPublishedTermSchema = termSchema
export type GetPublishedTermSchema = z.infer<typeof getPublishedTermSchema>

export const publishedTerm = {
  getPublishedTerm: {
    queryKey: "getPublishedterm",
    schema: getPublishedTermSchema,
    query: async () => {
      const response = await axios.get(`${route.application.getPublishedTerm}`)

      return getPublishedTermSchema.parse(response.data)
    },
  },
}

/* CRUD Applicants*/

/*create applicant for student*/
export const PersonalSchema = z.object({
  id: z.number().optional(),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "Name should be minimum 3 Characters" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last Name should be minimum 3 Characters" }),
  // DOB: z.date({ required_error: 'Please select a date ' }).min(new Date('2005-01-01'), { message: 'Age cannot be more than 18' }).max(new Date('2013-01-01'), { message: 'Age should be more 10' }).optional(),
  DOB: z.string(),
  gender: z
    .string({ required_error: "Gender is required" })
    .min(1, { message: "Enter gender" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  contact: z
    .string({ required_error: "Mobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
  address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "minium 3 characters required" }),
  suburb: z
    .string({ required_error: "suburn is required" })
    .min(3, { message: "minium 3 characters required" }),
  state: z.string({ required_error: "State is required" }),
  country: z.string({ required_error: "State is required" }),
  postcode: z
    .string({ required_error: "Post code is required" })
    .min(4, { message: "Post code is minimum 4 digits" })
    .max(4, { message: "Post code is maximum 4 digits" }),
  image: z.string({}).optional(),
})

export const ParentsSchema = z.object({
  id: z.number().optional(),
  fatherName: z
    .string({ required_error: "Father's Name is required" })
    .min(3, { message: "Minimum 3 characters" }),
  motherName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3, { message: "Minimum 3 characters" }),
  parentEmail: z
    .string({ required_error: "Parent's Email is required" })
    .email({ message: "Invalid email address" }),
  parentContact: z
    .string({ required_error: "Parent'sMobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
})

export const EmergencyContactSchema = z.object({
  id: z.number().optional(),
  contactPerson: z
    .string({ required_error: "Contact person's name is required" })
    .min(3, { message: "Minimum 3 characters" }),
  contactNumber: z
    .string({ required_error: "Contact person's Mobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
  relationship: z
    .string({ required_error: "Relationship with children is required" })
    .min(3, { message: "Minimum 3 characters" }),
})
export const HealthInformationSchema = z.object({
  id: z.number().optional(),
  medicareNumber: z.string().optional(),
  ambulanceMembershipNumber: z.string().optional(),
  medicalCondition: z
    .string({ required_error: "Please give a valid answer" })
    .min(3, { message: "Mininum 3 characters" }),
  allergy: z
    .string({ required_error: "valid" })
    .min(3, { message: "Mininum 3 characters" }),
})

export const SubjectInterest = z.object({
  id: z.number().optional(),
  subjectsChosen: z
    .array(z.string())
    .refine((subjects) => subjects.length > 0, {
      message: "Please select at least one subject",
    }),
  subjectRelated: z
    .array(z.string())
    .refine((subjectRelated) => subjectRelated.length > 0, {
      message: "Please select at least one option",
    }),
})

export const OtherInformationSchema = z.object({
  id: z.number().optional(),
  otherInfo: z.string().optional(),
  declaration: z
    .array(z.string())
    .refine((subjectRelated) => subjectRelated.length > 0, {
      message: "Please give your declaration",
    }),
})
export const TermSchema = z.string()
// To create a new student at the application level
export const newApplicantSchema = z.object({
  personalDetails: PersonalSchema,
  parentsDetails: ParentsSchema,
  emergencyContact: EmergencyContactSchema,
  healthInformation: HealthInformationSchema,
  subjectInterest: SubjectInterest,
  otherInformation: OtherInformationSchema,
})

export type NewApplicantSchema = z.infer<typeof newApplicantSchema>

export const create = {
  createApplicant: {
    schema: newApplicantSchema,
    mutation: async ({
      applicantData,
    }: {
      applicantData: NewApplicantSchema
    }) => {
      await axios.post(route.application.createApplicant, applicantData)
    },
  },
}
/*****************Teacher****************/

const allSubjectSchema = z.object({
  name: z.string(),
  isActive: z.boolean(),
})

const allSubjectsArraySchema = z.array(allSubjectSchema)
export const allSubjects = {
  findAllSubjects: {
    queryKey: "allSubjects",
    schema: allSubjectsArraySchema,
    query: async () => {
      const response = await axios.get(
        `${route.application.teacher.allSubjects}`
      )

      return allSubjectsArraySchema.parse(response.data)
    },
  },
}
export const TeacherPersonalDetailsSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "Name should be minimum 3 Characters" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last Name should be minimum 3 Characters" }),
  DOB: z.string(),
  gender: z
    .string({ required_error: "Gender is required" })
    .min(1, { message: "Enter gender" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  contact: z
    .string({ required_error: "Mobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
  address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "minium 3 characters required" }),
  suburb: z
    .string({ required_error: "suburn is required" })
    .min(3, { message: "minium 3 characters required" }),
  state: z.string({ required_error: "State is required" }),
  country: z.string({ required_error: "State is required" }),
  postcode: z
    .string({ required_error: "Post code is required" })
    .min(4, { message: "Post code is minimum 4 digits" })
    .max(4, { message: "Post code is maximum 4 digits" }),
  image: z
    .any()
    .refine((file) => !file || file.size <= 400000, {
      message: "Max image size is 4MB.",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "Only .jpg, .jpeg and .png formats are supported.",
      }
    ),
})

export const TeacherEmergencyContactSchema = z.object({
  contactPerson: z
    .string({ required_error: "Contact person's name is required" })
    .min(3, { message: "Minimum 3 characters" }),
  contactNumber: z
    .string({ required_error: "Contact person's Mobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
  relationship: z
    .string({ required_error: "Relationship with children is required" })
    .min(3, { message: "Minimum 3 characters" }),
})
export const TeacherWWCHealthInformationSchema = z.object({
  medicareNumber: z.string().optional(),
  medicalCondition: z
    .string({ required_error: "Please give a valid answer" })
    .min(3, { message: "Mininum 3 characters" }),
  childrenCheckCardNumber: z
    .string()
    .min(3, { message: "Please enter valid value" }),
  workingWithChildrenCheckExpiry: z.string(),
  workingwithChildrenCheckCardPhotoImage: z
    .any()
    .refine((file) => !file || file.size <= 400000, {
      message: "Max image size is 4MB.",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "Only .jpg, .jpeg and .png formats are supported.",
      }
    ),
})
export const TeacherWorkRightsSchema = z.object({
  workRights: z.string().min(3, { message: "must choose and option" }),
  immigrationStatus: z.string().min(3, { message: "must choose and option" }),
})

export const TeacherQualificationAvailability = z.object({
  subjectsChosen: z
    .array(z.string())
    .refine((subjects) => subjects.length > 0, {
      message: "Please select at least one subject",
    }),
  timeSlotsChosen: z
    .array(z.string())
    .refine((subjectRelated) => subjectRelated.length > 0, {
      message: "Please select at least one option",
    }),
  qualification: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "minimum 3 Characters required" }),
  experience: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "minimum 3 Characters required" }),
})

export const TeacherOtherInformationSchema = z.object({
  otherInfo: z.string().optional(),
})

export const TeacherBankDetailsSchema = z.object({
  bankAccountName: z.string(),
  BSB: z.string(),
  accountNumber: z.string(),
  ABN: z.string().optional(),
})

export const teacherApplicantSchema = z.object({
  teacherPersonalDetails: TeacherPersonalDetailsSchema,
  teacherEmergencyContact: TeacherEmergencyContactSchema,
  teacherWWCHealthInformation: TeacherWWCHealthInformationSchema,
  teacherQualificationAvailability: TeacherQualificationAvailability,
  teacherWorkRights: TeacherWorkRightsSchema,
  teacherBankDetails: TeacherBankDetailsSchema,
  teacherOtherInformation: TeacherOtherInformationSchema,
})
export type TeacherApplicantSchema = z.infer<typeof teacherApplicantSchema>
export const createTeacher = {
  createApplicant: {
    schema: teacherApplicantSchema,
    mutation: async ({
      applicantData,
    }: {
      applicantData: TeacherApplicantSchema
    }) => {
      await axios.post(route.application.teacher.createApplicant, applicantData)
    },
  },
}

/*****************Teacher****************/
