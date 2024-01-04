// useUpdateAmountPaidMutation
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch} from "@/redux/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useUpdateAmountPaidMutation = (loadingToastId: string | null) => {
  const queryClient = useQueryClient()

  const dispatch = useAppDispatch()
  const { mutateAsync: updateAmountPaid, isPending: updateAmountPaidPending } =
    useMutation({
      mutationFn: api.students.activeStudent.updateAmountPaid.mutation,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [api.students.activeStudent.findFeePaymentById.querykey],
        })
        queryClient.invalidateQueries({
          queryKey: [
            api.students.activeStudent.findActiveStudentFeeDetailsById.querykey,
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
        toast.success(`Amount Paid is updated 👌`)

      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })
  return { updateAmountPaid, updateAmountPaidPending }
}
