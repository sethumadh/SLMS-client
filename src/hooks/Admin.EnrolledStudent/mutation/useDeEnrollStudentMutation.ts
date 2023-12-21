/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useDeEnrollStudentMutation= (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { mutateAsync: deEnrollStudent, isPending: deEnrollStudentPending } =
    useMutation({
      mutationFn: api.students.enrolledStudent.deEnrollEnrolledStudent.mutation,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            api.students.enrolledStudent.findEnrolledStudentEnrolledSubjects
            .queryKey,
          ],
        })
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`Student De-enrolled successfully 👌`)
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
  return {deEnrollStudent, deEnrollStudentPending }
}
