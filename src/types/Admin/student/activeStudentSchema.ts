// *********Admin************
/* 
activeStudent Detail Page
*/

import { z } from "zod"

export const activeStudentPersonalDetailSchema = z.object({
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

/* activeStudent Detail Page */

/* Parents Detail Page */
export const activeStudentParentDetailSchema = z.object({
  parentEmail: z
    .string({ required_error: "Parent's Email is required" })
    .email({ message: "Invalid email address" }),
  parentContact: z
    .string({ required_error: "Parent'sMobile number is required" })
    .regex(/^0\d{9}$/, "Please provide a valid Number!"),
})
/* Parents Detail Page */

/* Emergency/health Detail Page */
export const activeStudentHealthDetailSchema = z.object({
  medicareNumber: z.string().optional(),
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
// export const activeStudentSubjectDetailSchema = z.object({
//   subjects: z.array(z.string()).refine((subjects) => subjects.length > 0, {
//     message: "Please select at least one subject",
//   }),
//   subjectRelated: z
//     .array(z.string())
//     .refine((subjectRelated) => subjectRelated.length > 0, {
//       message: "Please select at least one option",
//     }),
// })



export const activeStudentSubjectDetailSchema =z.object({
    activeSubjects: z
      .array(
        z
          .string()
          .min(1, { message: "Please choose at least one subject to enroll" })
      )
      .min(1, { message: "Please choose at least one subject to enroll" }),
  })

// *********Admin************
