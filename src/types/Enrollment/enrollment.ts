import { z } from "zod"

export const enrollStudentToTermSchema = z.object({
  enrolledSubjects: z
    .array(
      z
        .string()
        .min(1, { message: "Please choose at least one subject to enroll" })
    )
    .min(1, { message: "Please choose at least one subject to enroll" }),
})
