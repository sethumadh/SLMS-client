/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useUpdateTimetableMutation = (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { mutateAsync: updateTimetable, isPending: updateTimetablePending } =
    useMutation({
      mutationFn: api.timetable.timetable.updateActiveTimetable.mutation,
      onSuccess: () => {
        //invalidate qury of all classes
        queryClient.invalidateQueries({
          queryKey: [api.timetable.timetable.findActiveTimetable.querykey],
        })
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`updated timetable successfully 👌`)
        dispatch(
          setOpenModal({
            isOpen: false,
            type: "",
          })
        )
        // navigate("/application-submit")
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { updateTimetable, updateTimetablePending }
}
