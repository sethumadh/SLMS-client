import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

export const teacherApprove = {
  findAllTeacherApplicants: {
    querykey: "getAllApplicants",
    schema: "",
    query: async (page = 0) => {
      try {
        const response = await axios.get(
          route.applicantEnrollment.getAllApplicants,
          {
            params: { page },
          }
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
