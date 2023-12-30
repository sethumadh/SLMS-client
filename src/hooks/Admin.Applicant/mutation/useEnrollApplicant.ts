/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const useEnrollApplicant = (loadingToastId: string | null) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { mutateAsync: enrollApplicant, isPending: enrollApplicantPending } =
    useMutation({
      mutationFn: api.enrollment.applicantEnrollment.enrollApplicant.mutation,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            api.enrollment.applicantEnrollment.getApplicantEnrolledSubjects
              .queryKey,
          ],
        })
        queryClient.invalidateQueries({
          queryKey: [
            api.students.lateEnrolledStudent
              .findLateEnrolledStudentEnrolledSubjects.queryKey,
          ],
        })
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`Applicant enrolled successfully 👌`)
        dispatch(
          setOpenModal({
            isOpen: false,
            type: "",
          })
        )
        navigate("/admin/enrollment")
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { enrollApplicant, enrollApplicantPending }
}
