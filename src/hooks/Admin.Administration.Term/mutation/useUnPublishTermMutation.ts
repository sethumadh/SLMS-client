/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Params, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
type useUnPublishTermMutationProps = {
  loadingToastId: string | null
  params: Readonly<Params<string>>
}

export const useUnPublishTermMutation = ({
  loadingToastId,
  params,
}: useUnPublishTermMutationProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: unPublish, isPending: unPublishPending } = useMutation({
    mutationFn: api.admin.term.unPublishTerm.mutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
        ],
      })
      queryClient.invalidateQueries()
      queryClient.invalidateQueries({
        queryKey: [
          api.admin.term.publishedTerm.findPublishedTermAdministration.queryKey,
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [api.application.publishedTerm.getPublishedTerm.queryKey],
      })
      queryClient.invalidateQueries({
        queryKey: [api.admin.subjects.findAllSubjects.querykey],
      })
      queryClient.invalidateQueries({
        queryKey: [
          api.admin.term.findUniqueTerm.queryKey,
          `termDetail${params.id}`,
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [api.admin.term.findAllTerms.queryKey],
      })

      if (loadingToastId) toast.dismiss(loadingToastId)
      toast.success(`Term un-published successfully 👌`)
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
  return { unPublish, unPublishPending }
}
