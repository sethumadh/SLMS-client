import axios from "axios"
import { route } from "../route/route"
import { z } from "zod"

const roomSchema = z.object({
  subjectName: z.string(),
  teacherName: z.string(),
})

// Schema for each time slot in the timetable
const timeSlotSchema = z.object({
  name: z.string(),
  rooms: z.array(roomSchema),
})

// Schema for the entire timetable data
const timetableDataSchema = z.array(timeSlotSchema)

// Schema for the entire timetable array
const fullTimetableSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  termId: z.number(),
  isActive: z.boolean(),
  data: timetableDataSchema,
  updatedAt: z.string(),
  createdAt: z.string(),
})
type FullTimetableSchema = z.infer<typeof fullTimetableSchema>
// find unique timetable
export const timetable = {
  findActiveTimetable: {
    querykey: "findActiveTimetable",
    schema: fullTimetableSchema,
    query: async () => {
      const response = await axios.get(
        `${route.admin.timetable.findActiveTimetable}`
      )

      return fullTimetableSchema.parse(response.data)
    },
  },
  updateActiveTimetable: {
    querykey: "updateActiveTimetable",
    schema: fullTimetableSchema,
    mutation: async ({
      id,
      timetable,
    }: {
      id: string
      timetable: FullTimetableSchema["data"]
    }) => {
      await axios.put(
        `${route.admin.timetable.updateTimetable}/${id}`,
        timetable
      )
    },
  },
  createActiveTimetable: {
    querykey: "createActiveTimetable",
    schema: fullTimetableSchema,
    mutation: async ({
      timetable,
    }: {
      timetable: FullTimetableSchema["data"]
    }) => {
      await axios.post(`${route.admin.timetable.createTimetable}`, timetable)
    },
  },
}
