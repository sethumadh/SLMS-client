/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useMakeCurrentTermMutation = (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: makeCurrent, isPending: makeCurrentPending } =
    useMutation({
      mutationFn: api.admin.term.makeCurrentTerm.mutation,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
          ],
        })
        queryClient.invalidateQueries({
          queryKey: [api.application.publishedTerm.getPublishedTerm.queryKey],
        })
        queryClient.invalidateQueries({
          queryKey: [api.admin.subjects.findAllSubjects.querykey],
        })

        queryClient.invalidateQueries({
          queryKey: [api.admin.term.findAllTerms.queryKey],
        })
        // add inavlidate for getting all terms
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`Making current action is successful 👌`)
        dispatch(
          setOpenModal({
            isOpen: false,
            type: "",
          })
        )
        navigate("/admin/administration/manage-term")
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { makeCurrent, makeCurrentPending }
}
