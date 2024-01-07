/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSubmitApplicantMutation = (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync: createApplicant, isPending: createApplicantPending } =
  useMutation({
    mutationFn: api.application.create.createApplicant.mutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          api.students.enrolledStudent.findAllEnrolledStudents.querykey,
          api.enrollment.applicantEnrollment.findApplicantById.querykey,
        ],
      })
      if (loadingToastId) toast.dismiss(loadingToastId)
      toast.success(`Application successfully submitted 👌`)
      dispatch(
        setOpenModal({
          isOpen: false,
          type: "",
        })
      )
      navigate("/application-submit")
    },
    onError: (error: unknown) => {
      if (loadingToastId) toast.dismiss(loadingToastId)
      handleAxiosError(error)
    },
  })
  return { createApplicant,createApplicantPending  }
}
