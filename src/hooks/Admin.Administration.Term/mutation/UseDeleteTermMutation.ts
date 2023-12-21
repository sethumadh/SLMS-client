/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useDeleteTermMutation = (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: deleteTerm, isPending: deleteTermPending } = useMutation(
    {
      mutationFn: api.admin.term.deleteTerm.mutation,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [api.admin.term.findAllTerms.queryKey],
        })
        // add inavlidate for getting all terms
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`Deleted Term Successsfully 👌`)
        dispatch(
          setOpenModal({
            isOpen: false,
            type: "",
          })
        )
        navigate("administration/manage-term/all-terms")
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    }
  )
  return { deleteTerm, deleteTermPending }
}
