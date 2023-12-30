/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const useEnrollToActiveStudentMutation = (
  loadingToastId: string | null
) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    mutateAsync: enrollToActiveStudent,
    isPending: enrollToActiveStudentPending,
  } = useMutation({
    mutationFn: ({ id, termId }: { id: string; termId: number }) =>
      api.students.lateEnrolledStudent.enrollLateEnrolledStudentToCurrentTerm.mutation(
        { id, termId }
      ),
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          api.students.enrolledStudent.findAllEnrolledStudents.querykey,
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [
          api.enrollment.applicantEnrollment.findApplicantById.querykey,
        ],
      })
      if (loadingToastId) toast.dismiss(loadingToastId)
      toast.success(`Applicant enrolled student successfully 👌`)
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
  return { enrollToActiveStudent, enrollToActiveStudentPending }
}
