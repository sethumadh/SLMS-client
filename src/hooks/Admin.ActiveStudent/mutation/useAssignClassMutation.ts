// useAssignClassMutation
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useAssignClassMutation = (loadingToastId: string | null) => {
  const queryClient = useQueryClient()
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { mutateAsync: assignClass, isPending: assignClassPending } =
    useMutation({
      mutationFn: api.students.activeStudent.assignClassToStudent.mutation,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            api.students.activeStudent.findUniqueStudentClassDetails.querykey,
          ],
        })

        dispatch(
          setOpenModal({
            isOpen: false,
            type: "",
          })
        )
        // add inavlidate for getting all terms
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`Assign class successful 👌`)
        // navigate("/admin/students/student-detail/42/view-fee-details")
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { assignClass, assignClassPending }
}
