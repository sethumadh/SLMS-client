import { z } from "zod"

export const PersonalSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "Name should be minimum 3 Characters" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last Name should be minimum 3 Characters" }),
  DOB: z
    .date({ required_error: "Please select a date " })
    .min(new Date("2005-01-01"), { message: "Age cannot be more than 18" })
    .max(new Date("2013-01-01"), { message: "Age should be more 10" }),
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

export const ParentsSchema = z.object({
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

export const SubjectSchema = z.object({
  subjects: z.array(z.string()).refine((subjects) => subjects.length > 0, {
    message: "Please select at least one subject",
  }),
  subjectRelated: z
    .array(z.string())
    .refine((subjectRelated) => subjectRelated.length > 0, {
      message: "Please select at least one option",
    }),
})

export const OtherInformationSchema = z.object({
  otherInfo: z.string().optional(),
  declaration: z
    .array(z.string())
    .refine((subjectRelated) => subjectRelated.length > 0, {
      message: "Please give your declaration",
    }),
})

export const applicantSetupWizardSchema = z.object({
  personalDetails: PersonalSchema,
  parentsDetails: ParentsSchema,
  emergencyContact: EmergencyContactSchema,
  healthInformation: HealthInformationSchema,
  subjects: SubjectSchema,
  otherInformation: OtherInformationSchema,
})
export const applicantSchema = applicantSetupWizardSchema

// *********Admin************
/* 
applicant Detail Page
*/

export const applicantPersonalDetailsSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  contact: z
    .string({ required_error: "Mobile number is required" })
    .regex(/^0\d{9}$/, "Invalid Number!"),
  address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "minium 3 characters required" }),
  suburb: z
    .string({ required_error: "suburn is required" })
    .min(3, { message: "minium 3 characters required" }),

  postcode: z
    .string({ required_error: "Post code is required" })
    .min(4, { message: "Invalid Post code" })
    .max(4, { message: "Invalid Post code" }),
})

/* applicant Detail Page */

/* Parents Detail Page */
export const applicantParentDetailsSchema = z.object({
  parentEmail: z
    .string({ required_error: "Parent's Email is required" })
    .email({ message: "Invalid email address" }),
  parentContact: z
    .string({ required_error: "Parent'sMobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
})
/* Parents Detail Page */

/* Emergency/health Detail Page */
export const applicantHealthDetailsSchema = z.object({
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
/* Emergency/health Detail Page */

/*Subject Details*/
export const applicantSubjectDetailsSchema = z.object({
  subjects: z.array(z.string()).refine((subjects) => subjects.length > 0, {
    message: "Please select at least one subject",
  }),
  subjectRelated: z
    .array(z.string())
    .refine((subjectRelated) => subjectRelated.length > 0, {
      message: "Please select at least one option",
    }),
})

/*Subject Details*/

// *********Admin************
