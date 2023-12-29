import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
// import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import Icons from "@/constants/icons"
import { toast } from "react-toastify"
import { useMakeCurrentTermMutation } from "@/hooks/Admin.Administration.Term/mutation/useMakeCurrentTermMutation"
import Toggle from "../Toggle"

const MakeCurrentTermModal = () => {
  const [currentEnabled, setCurrentEnabled] = useState(false)
  const [studentsEnabled, setStudentsEnabled] = useState(false)
  const [alumniEnabled, setAlumniEnabled] = useState(false)

  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isOpen, type, data } = useAppSelector((state) => state.modal)
  const cancelButtonRef = useRef(null)
  const IsModalOpen = isOpen && type === "makeCurrentTerm"

  const handleCurrentEnabled = (bool: boolean) => {
    setCurrentEnabled(bool)
  }
  const handleStudentsEnabled = (bool: boolean) => {
    setStudentsEnabled(bool)
  }
  const handleAlumniEnabled = (bool: boolean) => {
    setAlumniEnabled(bool)
  }
  const { makeCurrent, makeCurrentPending } =
    useMakeCurrentTermMutation(loadingToastId)
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300/50">
                    <Icons.ShieldAlert
                      className="h-10 w-10 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5 flex flex-col items-start">
                    <Dialog.Title
                      as="h3"
                      className="text-xs leading-6 text-gray-900 "
                    >
                      This Action will perform following changes, Please
                      confirm.
                    </Dialog.Title>
                    <div className="mt-2 flex w-full justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800 flex flex-col items-start">
                        <span className="flex items-center justify-center">
                          <span className="text-red-600">*</span>
                          <span>Do you want to make this term current ?</span>
                        </span>
                        <p className="text-xs font-light">
                          <span className="text-slate-600">*</span>
                          This will replace the existing current term with
                          published term.
                        </p>
                      </p>
                      <div className="w-12">
                        <Toggle
                          enabled={currentEnabled}
                          handleEnabled={handleCurrentEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-3 sm:mt-5 flex flex-col items-start">
                    <div className="mt-2 flex w-full justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        <span className="text-red-600">*</span> Make all
                        Enrolled students to Active Students?
                      </p>
                      <div className="w-12">
                        <Toggle
                          enabled={studentsEnabled}
                          handleEnabled={handleStudentsEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-3 sm:mt-5 flex flex-col items-start">
                    <div className="mt-2 w-full flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        <span className="text-red-600">*</span> Make all Active
                        students to Alumni?
                      </p>
                      <div className="w-12">
                        <Toggle
                          enabled={alumniEnabled}
                          handleEnabled={handleAlumniEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    disabled={
                      !currentEnabled || !studentsEnabled || !alumniEnabled
                    }
                    className="disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-slate-200 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
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
                        await makeCurrent({ id: data?.id })
                      }
                    }}
                  >
                    {makeCurrentPending ? "...Please wait" : "Confirm Actions"}
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
                    }}
                    ref={cancelButtonRef}
                  >
                    cancel
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
export default MakeCurrentTermModal