import { z } from "zod"

export const studentSetupWizardSchema = z.object({
  personalDetails: z.object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(3, { message: "Name should be minimum 3 Characters" }),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(3, { message: "Last Name should be minimum 3 Characters" }),
    DOB: z
      .date({ required_error: "Please select a date " })
      .min(new Date("2005-01-01"), { message: "Age cannot be more than 18" })
      .max(new Date("2013-01-01"), { message: "Age should below 10" }),
    gender: z.string({ required_error: "Gender is required" }),
    email: z
      .string({ required_error: "Gender is required" })
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
    state: z.string({ required_error: "State is required" }),
    postcode: z
      .string({ required_error: "Post code is required" })
      .min(6, { message: "Post code is minimum 6 digits" }),
  }),
})

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
    .min(6, { message: "Post code is minimum 6 digits" })
    .max(6, { message: "Post code is maximum 6 digits" }),
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
