/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { formatDate } from "@/helpers/dateFormatter"
import { handleAxiosError } from "@/helpers/errorhandler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useTermExtendmutation = (loadingToastId: string | null) => {
  const queryClient = useQueryClient()
  const { mutateAsync: termExtendMutation, isPending: termExtendIsPending } =
    useMutation({
      mutationFn: api.admin.term.extendCurrentTerm.mutation,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [
            api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
          ],
        })
        queryClient.invalidateQueries({
          queryKey: [
            api.admin.term.publishedTerm.findPublishedTermAdministration
              .queryKey,
          ],
        })
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(
          `Term is extended to ${formatDate(data.endDate.toString())} 👌`
        )
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { termExtendMutation, termExtendIsPending }
}
