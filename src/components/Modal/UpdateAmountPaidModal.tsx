import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

import { useAppDispatch, useAppSelector } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import Icons from "@/constants/icons"
import { toast } from "react-toastify"
import LoadingIcon from "../LoadingIcon"
import { useUpdateAmountPaidMutation } from "@/hooks/Admin.ActiveStudent/mutation/useUpdateAmountPaidMutation"
import { DueAmountModifySchema } from "@/pages/Admin/Students/ActiveStudentDetail/Fee/ManageFee"
import { useNavigate, useParams } from "react-router-dom"

const UpdateAmountPaidModal = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { isOpen, type, data } = useAppSelector((state) => state.modal)
  const cancelButtonRef = useRef(null)
  const IsModalOpen = isOpen && type === "updateAmountPaid"
  const amountPaid: DueAmountModifySchema["fee"] = data?.value?.fee ?? {}
  const remarks: DueAmountModifySchema["remarks"] = data?.value?.remarks ?? {}
  const id = data?.id?.toString()

  const { updateAmountPaid, updateAmountPaidPending } =
    useUpdateAmountPaidMutation(loadingToastId)

  return (
    <Transition.Root show={IsModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          dispatch(
            setOpenModal({
              isOpen: false,
              type: "",
            })
          )
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Icons.Check
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Confirm amount payment.
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please check all details are correct before submitting.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    // ref={saveRef}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={async () => {
                      dispatch(
                        setOpenModal({
                          isOpen: false,
                          type: "",
                        })
                      )
                      const toastId = toast.loading(`Updating, please wait...`)
                      setLoadingToastId(toastId.toString())
                      if (id && params.id)
                        await updateAmountPaid({ id, amountPaid, remarks })
                      navigate(
                        `/admin/students/student-detail/${params.id}/view-fee-details`
                      )
                    }}
                  >
                    {updateAmountPaidPending ? (
                      <>
                        <LoadingIcon />
                      </>
                    ) : (
                      <p>Update amount paid now</p>
                    )}
                  </button>
                  <button
                    disabled={updateAmountPaidPending}
                    type="button"
                    className="disabled:bg-slate-300 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      dispatch(
                        setOpenModal({
                          isOpen: false,
                          type: "",
                        })
                      )
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default UpdateAmountPaidModal
