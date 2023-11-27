import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

/* Get Current Active Term*/
const levelSchema = z.object({
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

export const getCurentTermSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(), // or use z.date() if you want to validate actual Date objects
  endDate: z.string(), // or use z.date()
  createdAt: z.string(), // or use z.date()
  updatedAt: z.string(),
  termSubject: z.array(termSubjectSchema),
})

export const currentTerm = {
  getTermSubjects: {
    queryKey: "getTermSubjects",
    schema: getCurentTermSchema,
    query: async () => {
      const response = await axios.get(`${route.application.getCurrentTerm}`)
      return getCurentTermSchema.parse(response.data)
    },
  },
}

/* CRUD Applicants*/

/*create applicant*/
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
  medicareNumber: z
    .string({ required_error: "Post code is required" })
    .min(10, { message: "Medicare number is minimum 10 digits" })
    .max(10, { message: "Medicare number is maximum 10 digits" }),
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
    query: async ({ applicantData }: { applicantData: NewApplicantSchema }) => {
      await axios.post(
        route.admin.applicant.createApplicant,
        applicantData
      )
    },
  },
}
