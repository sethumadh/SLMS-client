import { PURGE } from "redux-persist"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { z } from "zod"
export const createTermSchema = z.object({
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

export type CreateTermSchema = z.infer<typeof createTermSchema>
const initialState: CreateTermSchema = {
  termName: "",
  startDate: Date.now().toString(),
  endDate: Date.now().toString(),
  groupSubjects: [
    {
      groupName: "",
      fee: "",
      feeInterval: "TERM",
      subjects: [
        {
          subjectName: "",
          levels: [],
        },
      ],
    },
  ],
}

const termSlice = createSlice({
  name: "term",
  initialState,
  reducers: {
    setTermData: (state, action: PayloadAction<CreateTermSchema>) => {
      state.endDate = action.payload.endDate
      state.startDate = action.payload.startDate
      state.termName = action.payload.termName
      state.groupSubjects = action.payload.groupSubjects
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  },
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line react-refresh/only-export-components
export const { setTermData } = termSlice.actions

export default termSlice
