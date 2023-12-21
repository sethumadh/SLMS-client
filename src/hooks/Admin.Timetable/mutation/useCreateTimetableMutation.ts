// useCreateTimetableMutation

/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useCreateTimetableMutation = (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { mutateAsync: createTimetable, isPending: createTimetablePending } =
    useMutation({
      mutationFn: api.timetable.timetable.createActiveTimetable.mutation,
      onSuccess: () => {
        //invalidate qury of all classes
        queryClient.invalidateQueries({
          queryKey: [api.timetable.timetable.findActiveTimetable.querykey],
        })
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`created timetable successfully 👌`)
        dispatch(
          setOpenModal({
            isOpen: false,
            type: "",
          })
        )

      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { createTimetable, createTimetablePending }
}
