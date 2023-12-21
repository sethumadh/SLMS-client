/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useCreateTermMutation = (loadingToastId: string | null) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { mutateAsync: createTermSetup, isPending: createTermPending } =
    useMutation({
      mutationFn: api.admin.term.createTermWithSubjectsSetup.mutation,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [
            api.application.currentTerm.getTermSubjects.queryKey,
            api.admin.term.findAllTerms.queryKey,
          ],
        })
        // add inavlidate for getting all terms
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`new term is created 👌`)
        dispatch(
          setOpenModal({
            isOpen: true,
            type: "isPublishTerm",
            data: {
              id: data?.id,
              value: data?.name,
            },
          })
        )
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { createTermSetup, createTermPending }
}
