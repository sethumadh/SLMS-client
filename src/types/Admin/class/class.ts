import { z } from "zod"

export const createClassWithSectionsSchema = z.object({
  sectionName: z
    .array(z.string())
    .min(1, {
      message: "Please choose or create a Section to create a class",
    })
    .refine(
      (sectionNames) => {
        const lowerCaseSectionNames = sectionNames.map((name) =>
          name.toLowerCase()
        )
        const uniqueSectionNames = new Set(lowerCaseSectionNames)
        return uniqueSectionNames.size === lowerCaseSectionNames.length
      },
      {
        message: "Section names must be unique (case-insensitive)",
      }
    ),
})
export const assignClassSchema = z.object({
  sectionName: z.string().min(1, { message: "Select one Section" }),
})
