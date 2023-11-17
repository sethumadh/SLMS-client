import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

export const changeCurrentTermNameSchema = z.object({
  name: z.string().min(4, { message: "Minimum four characters is required" }),
})
export const extendCurrentTermSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
})

export const term = {
  changeCurrentTermName: {
    schema: changeCurrentTermNameSchema,
    mutation: async ({ id, name }: { id: number; name: string }) => {
      const response = await axios.patch(
        `${route.admin.changeCurrentTermName}/${id}`,
        { name }
      )
      return changeCurrentTermNameSchema.parse(response.data)
    },
  },
  extendCurrentTerm: {
    schema: changeCurrentTermNameSchema,
    mutation: async ({ id, eDate }: { id: number; eDate: Date }) => {
      const date = eDate.toString()
      const response = await axios.patch(
        `${route.admin.extendCurrentTerm}/${id}`,
        { date }
      )
      const newDate = new Date(response.data)
      return extendCurrentTermSchema.parse({ date: newDate })
    },
  },
}
