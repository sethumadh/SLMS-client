import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import Icons from "@/constants/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/api/api"
import { toast } from "react-toastify"
import { handleAxiosError } from "@/helpers/errorhandler"

const DeleteTermModal = () => {
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isOpen, type, data } = useAppSelector((state) => state.modal)

  const cancelButtonRef = useRef(null)
  const IsModalOpen = isOpen && type === "deleteTerm"
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Do you really want to delete this term?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        If you proceed , this will permanently delete the term
                        from the database and this action is irreversible.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                    onClick={async () => {
                      dispatch(
                        setOpenModal({
                          isOpen: false,
                          type: "",
                        })
                      )
                      const toastId = toast.loading(
                        `making term a current term, please wait`
                      )
                      setLoadingToastId(toastId.toString())
                      if (data?.id) {
                        await deleteTerm({ id: data?.id })
                      }
                    }}
                  >
                    {deleteTermPending ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                          opacity=".25"
                        />
                        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="0.75s"
                            values="0 12 12;360 12 12"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                    ) : (
                      <p>Delete Now</p>
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      dispatch(
                        setOpenModal({
                          isOpen: false,
                          type: "",
                        })
                      )
                      navigate("administration/manage-term/all-terms")
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
export default DeleteTermModal
