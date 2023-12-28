/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useEnrollStudentToCurrentTermMutation = (
  loadingToastId: string | null
) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const {
    mutateAsync: enrollStudentToCurrentTerm,
    isPending: enrollStudentToCurrentTermPending,
  } = useMutation({
    mutationFn:
      api.students.enrolledStudent.enrollEnrolledStudentToCurrentTerm.mutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.students.activeStudent.findAllActiveStudents.querykey],
      })
      if (loadingToastId) toast.dismiss(loadingToastId)
      toast.success(`Student enrolled to current term successfully 👌`)
      dispatch(
        setOpenModal({
          isOpen: false,
          type: "",
        })
      )
      navigate("/admin/students/enrolled-students")
    },
    onError: (error: unknown) => {
      if (loadingToastId) toast.dismiss(loadingToastId)
      handleAxiosError(error)
    },
  })
  return { enrollStudentToCurrentTerm, enrollStudentToCurrentTermPending }
}
