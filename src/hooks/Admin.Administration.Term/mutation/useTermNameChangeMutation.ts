/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useTermNameChangeMutation = (loadingToastId: string | null) => {
  const queryClient = useQueryClient()
  const {
    mutateAsync: termNameChangeMutation,
    isPending: termNameChangeIsPending,
  } = useMutation({
    mutationFn: api.admin.term.changeCurrentTermName.mutation,
    onSuccess: (data) => {
      console.log("Mutation onSuccess called", data)
      console.log("Invalidating queries with key:", data)
      queryClient.invalidateQueries({
        queryKey: [
          api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [
          api.admin.term.publishedTerm.findPublishedTermAdministration.queryKey,
        ],
      })

      if (loadingToastId) toast.dismiss(loadingToastId)
      toast.success(`Term Name updated to ${data.name} 👌`)
    },
    onError: (error: unknown) => {
      if (loadingToastId) toast.dismiss(loadingToastId)
      handleAxiosError(error)
    },
  })
  return { termNameChangeMutation, termNameChangeIsPending }
}
