/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"
import axios from "axios"
import { route } from "../route/route"
import { CreateClassData } from "@/pages/Admin/Administration/ManageClass/CreateClass/CreateClass"

const groupSchema = z.object({
  groupName: z.string(),
  isActive: z.boolean(),
  id: z.number(),
})

const levelSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  name: z.string(),
})

// Common Subject Schema
const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean().optional(),
})

// TermSubject Schema (Combining both versions)
const termSubjectSchema = z.object({
  id: z.number(),
  subject: subjectSchema,
  level: z.array(levelSchema),
})

// Common SubjectGroup Schema
const subjectGroupSchema = z.object({
  groupName: z.string(),
})

// Common Fee Schema
const feeSchema = z.object({
  amount: z.number(),
  paymentType: z.enum(["MONTHLY", "TERM"]),
})

// TermSubjectGroup Schema (Combining both versions)
const termSubjectGroupSchema = z.object({
  subjectGroup: subjectGroupSchema,
  fee: feeSchema,
  subject: z.array(subjectSchema).optional(), // Making the subject array optional
})

// Main Term Schema (Combining both versions)
export const termSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentTerm: z.boolean(),
  isPublish: z.boolean(),
  startDate: z.string(), // Use z.date() if working with Date objects
  endDate: z.string(), // Same as above
  createdAt: z.string(), // Same as above
  updatedAt: z.string(), // Same as above
  termSubject: z.array(termSubjectSchema),
  termSubjectGroup: z.array(termSubjectGroupSchema),
})
export type TermSchema = z.infer<typeof termSchema>

export const createTermWithSubjectSchema = z.object({
  termName: z.string().min(4, { message: "Minimum 4 characters required" }),
  startDate: z.string(),
  endDate: z.string(),
  groupSubjects: z.array(
    z.object({
      groupName: z
        .string()
        .min(4, { message: "Minimum 4 characters required" }),
      fee: z
        .string({ required_error: "fee is required" })
        .regex(/^\d+$/, { message: "Please enter a valid amount" })
        .min(1, { message: "Please enter a fee" }),
      feeInterval: z.string().default("TERM"),
      subjects: z.array(
        z.object({
          subjectName: z
            .string()
            .min(4, { message: "Minimum 4 characters required" }),
          levels: z
            .array(z.string())
            .min(1, { message: "Minimum 4 characters required" }),
        })
      ),
    })
  ),
})
export type CreateTermWithSubjectSchema = z.infer<
  typeof createTermWithSubjectSchema
>

/*Terms*/

const changeCurrentTermNameSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(), // Use z.date() if you prefer to work with Date objects
  endDate: z.string(), // Same as above
  createdAt: z.string(), // Same as above
  updatedAt: z.string(), // Same as above
})

export type changeCurrentTermNameSchema = z.infer<
  typeof changeCurrentTermNameSchema
>
const extendCurrentTermSchema = changeCurrentTermNameSchema
export type ExtendCurrentTermSchema = z.infer<typeof extendCurrentTermSchema>

/* Get Current Active Term*/
const getCurentTermSchema = termSchema
export type GetCurentTermSchema = z.infer<typeof getCurentTermSchema>
export const term = {
  changeCurrentTermName: {
    schema: termSchema,
    mutation: async ({
      id,
      updatedTerm,
    }: {
      id: number
      updatedTerm: changeCurrentTermNameSchema
    }) => {
      const response = await axios.put(
        `${route.admin.changeCurrentTermName}/${id}`,
        { updatedTerm }
      )

      return termSchema.parse(response.data)
    },
  },
  publishedTerm: {
    findPublishedTermAdministration: {
      queryKey: "findPublishedTermAdministration",
      schema: getCurentTermSchema,
      query: async () => {
        const response = await axios.get(`${route.admin.findPublishedTerm}`)
        console.log(response.data)
        return getCurentTermSchema.parse(response.data)
      },
    },
  },
  currentTerm: {
    findCurrentTermAdministration: {
      queryKey: "findCurrentTermAdministration",
      schema: getCurentTermSchema,
      query: async () => {
        const response = await axios.get(`${route.admin.findCurrentTerm}`)
        return getCurentTermSchema.parse(response.data)
      },
    },
  },
  extendCurrentTerm: {
    schema: termSchema,
    mutation: async ({
      id,
      updatedTerm,
    }: {
      id: number
      updatedTerm: ExtendCurrentTermSchema
    }) => {
      const response = await axios.put(
        `${route.admin.extendCurrentTerm}/${id}`,
        { updatedTerm }
      )

      return termSchema.parse(response.data)
    },
  },
  createTermWithSubjectsSetup: {
    schema: createTermWithSubjectSchema,
    mutation: async (termData: CreateTermWithSubjectSchema) => {
      if (createTermWithSubjectSchema.safeParse(termData)) {
        const response = await axios.post(
          route.admin.createTermWithSubjectsSetup,
          termData
        )

        return z
          .object({
            id: z.number(),
            currentTerm: z.boolean(),
            isPublish: z.boolean(),
            name: z.string(),
          })
          .parse(response.data)
      } else {
        console.log("validation error at axios")
      }
    },
  },
  makeCurrentTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.patch(`${route.admin.makeCurrentTerm}/${id}`)
    },
  },
  makePublishTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.patch(`${route.admin.makePublishTerm}/${id}`)
    },
  },
  deleteTerm: {
    mutation: async ({ id }: { id: number }) => {
      await axios.delete(`${route.admin.deleteTerm}/${id}`)
    },
  },

  findAllTerms: {
    queryKey: "getAllTerms",
    schema: z.array(termSchema),
    query: async () => {
      try {
        const response = await axios.get(route.admin.findAllTerms)
        return z.array(termSchema).parse(response.data)
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
  findUniqueTerm: {
    queryKey: "getUniqueTerm",
    schema: termSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(`${route.admin.findUniqueTerm}/${id}`)
        return termSchema.parse(response.data)
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
  findStudentListInATerm: {
    queryKey: "findStudentListInATerm",
    schema: termSchema,
    query: async (id: string) => {
      try {
        const response = await axios.get(
          `${route.admin.studentListInATerm}/${id}`
        )
        // return termSchema.parse(response.data)
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
/*Groups*/

export const groups = {
  findAllGroups: {
    querykey: "getAllGroups",
    schema: z.array(groupSchema),
    query: async () => {
      const response = await axios.get(route.admin.groups.findAllGroups)
      return z.array(groupSchema).parse(response.data)
    },
  },
}

/*Subjects*/
export const subjects = {
  findAllSubjects: {
    querykey: "getAllSubjects",
    schema: z.array(subjectSchema),
    query: async () => {
      const response = await axios.get(route.admin.subject.findAllSubjects)
      return z.array(subjectSchema).parse(response.data)
    },
  },
}

/*Levels*/
export const levels = {
  findAllLevels: {
    querykey: "getAllLevels",
    schema: z.array(levelSchema),
    query: async () => {
      const response = await axios.get(route.admin.level.findAllLevels)
      return z.array(levelSchema).parse(response.data)
    },
  },
}

/*class*/
const subjectForManageClassSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
})

const termSubjectGroupForManageClassSchema = z.object({
  id: z.number(),
  termId: z.number(),
  feeId: z.number(),
  subjectGroupId: z.number(),
})

const termSubjectForManageClassSchema = z.array(
  z.object({
    id: z.number(),
    subject: subjectForManageClassSchema,
    level: z.array(
      z.object({
        id: z.number(),
        isActive: z.boolean(),
        name: z.string(),
      })
    ),
    termSubjectGroup: termSubjectGroupForManageClassSchema,
  })
)

const termToEnrollSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  termSubject: termSubjectForManageClassSchema,
})

/* classes */

const sectionAllClassSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const levelAllClassSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  name: z.string(),
})

const subjectAllClassSchema = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
})

const termSubjectLevelAllClassSchema = z.object({
  id: z.number(),
  subject: subjectAllClassSchema,
  level: levelAllClassSchema,
  sections: z.array(sectionAllClassSchema),
})

const termAllClassDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPublish: z.boolean(),
  currentTerm: z.boolean(),
  startDate: z.string(), // or use z.date() if you want to parse it as a Date object
  endDate: z.string(), // or use z.date()
  createdAt: z.string(), // or use z.date()
  updatedAt: z.string(), // or use z.date()
  termSubjectLevel: z.array(termSubjectLevelAllClassSchema),
})

const sectionsToManageClassSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
)
export const classes = {
  findCurrentTermForManageClass: {
    querykey: "findCurrentTermForManageClass",
    schema: termToEnrollSchema,
    query: async () => {
      const response = await axios.get(
        route.admin.class.findCurrentTermForManageClass
      )
      return termToEnrollSchema.parse(response.data)
    },
  },
  findCurrentTermAllClass: {
    querykey: "findCurrentTermAllClass",
    schema: termAllClassDataSchema,
    query: async () => {
      const response = await axios.get(route.admin.class.findCurrentTermClass)
      return termAllClassDataSchema.parse(response.data)
    },
  },
  findPublishTermForManageClass: {
    querykey: "findPublishTermForManageClass",
    schema: termToEnrollSchema,
    query: async () => {
      const response = await axios.get(
        route.admin.class.findPublishTermForManageClass
      )
      return termToEnrollSchema.parse(response.data)
    },
  },

  findSectionsForManageClass: {
    querykey: "findSectionsForManageClass",
    schema: sectionsToManageClassSchema,
    query: async () => {
      const response = await axios.get(
        route.admin.class.findSectionsForManageClass
      )

      return sectionsToManageClassSchema.parse(response.data)
    },
  },
  createClass: {
    querykey: "createClass",
    mutation: async (creatClassData: { createClassData: CreateClassData }) => {
      const response = await axios.post(
        route.admin.class.createClass,
        creatClassData
      )
      console.log(response.data)
      return z
        .object({
          message: z.string(),
        })
        .parse(response.data)
    },
  },
}
