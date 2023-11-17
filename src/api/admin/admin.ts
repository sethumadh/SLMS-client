import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"

export const changeCurrentTermNameSchema = z.object({
  name: z.string().min(4, { message: "Minimum four characters is required" }),
})

export const term = {
  changeCurrentTermName: {
    schema: changeCurrentTermNameSchema,
    mutation: async ({ name, id }: { id: number; name: string }) => {
      const response = await axios.post(
        `${route.admin.changeCurrentTermName}/${id}`,
        { name }
      )
      return changeCurrentTermNameSchema.parse(response.data)
    },
  },
}
