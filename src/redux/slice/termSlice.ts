import { PURGE } from "redux-persist"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { z } from "zod"
export const createTermSchema = z.object({
  termName: z.string().min(4, { message: "Minimum 4 characters required" }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  subjects: z.array(
    z.object({
      subject: z.string().min(4, { message: "Minimum 4 characters required" }),
      fee: z.string({ required_error: "fee is required" }),
      feeInterval: z.enum(["MONTHLY", "TERM"]),
      levels: z
        .array(z.string())
        .min(1, { message: "Minimum 1 level required" }),
    })
  ),
})
export type CreateTermSchema = z.infer<typeof createTermSchema>
const initialState: CreateTermSchema = {
  termName: "",
  startDate: Date.now().toString(),
  endDate: Date.now().toString(),
  subjects: [
    {
      subject: "",
      fee: "",
      feeInterval: "MONTHLY",
      levels: [""],
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
      state.subjects = action.payload.subjects
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
