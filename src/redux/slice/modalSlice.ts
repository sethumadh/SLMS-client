/* eslint-disable @typescript-eslint/no-explicit-any */
import { PURGE } from "redux-persist"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

type initialStateProps = {
  isOpen: boolean
  type:
    | ""
    | "termName"
    | "termExtend"
    | "isCurrentTerm"
    | "deleteTerm"
    | "submitApplicant"
    | "isPublishTerm"|"enrollStudent"
    | "enrollApplicant"|"deEnrollApplicant"
    | "enrollApllicantToStudent"
    | "createClass"
    | "updateTimetable"
    | "createTimetable"
  data?: {
    id?: number
    value?: any
  }
}
const initialState: initialStateProps = {
  isOpen: false,
  type: "",
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<initialStateProps>) => {
      state.isOpen = action.payload.isOpen
      state.type = action.payload.type
      state.data = action.payload.data || {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  },
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line react-refresh/only-export-components
export const { setOpenModal } = modalSlice.actions

export default modalSlice
