import { api } from "@/api/api"
import LoadingSpinner from "@/components/Loadingspinner"
import UpdateAmountPaidModal from "@/components/Modal/UpdateAmountPaidModal"
import Icons from "@/constants/icons"
import { formatDate } from "@/helpers/dateFormatter"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { dueAmountModifySchema } from "@/types/Admin/student/FeePayment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { z } from "zod"

export type DueAmountModifySchema = z.infer<typeof dueAmountModifySchema>
function ManageFee() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)

  const { data: feePaymentById, isLoading: feePaymentByIdIsLoading } = useQuery(
    {
      queryKey: [api.students.activeStudent.findFeePaymentById.querykey],
      queryFn: () => {
        if (params.feePaymentId && params.id)
          return api.students.activeStudent.findFeePaymentById.query(
            params.feePaymentId
          )
      },
      enabled: !!params.id && !!params.feePaymentId,
    }
  )
  //   console.log(feePaymentById)
  const dueAmountModifyMethods = useForm<DueAmountModifySchema>({
    mode: "onSubmit",
    resolver: zodResolver(dueAmountModifySchema),
    defaultValues: {
      fee: "",
      remarks: "",
    },
  })
  const onSubmit: SubmitHandler<DueAmountModifySchema> = (value) => {
    console.log(value)
    if (params.feePaymentId) {
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "updateAmountPaid",
          data: {
            id: +params?.feePaymentId,
            value: value,
          },
        })
      )
    }
  }
  const { register, formState } = dueAmountModifyMethods
  console.log(formState.errors)

  return (
    <div className="">
      {feePaymentByIdIsLoading ? (
        <>
          <div className="h-[600px] flex justify-center items-center">
            <LoadingSpinner className="w-24 h-24" />
          </div>
        </>
      ) : (
        feePaymentById && (
          <div className="space-y-12 mt-2 sm:px-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    View and Manage Fee
                  </h2>
                  <Link
                    to={`/admin/students/student-detail/${params.id}/view-fee-details`}
                    className="text-blue-300 italic text-sm flex justify-center items-center"
                  >
                    <span>
                      <Icons.ArrowBigLeft className="w-4 h-4" />
                    </span>
                    <p className="hidden sm:block sm:text-sm">Go Back</p>
                  </Link>
                </div>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  You can manage the fee amount due by the student in this
                  section.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fee
                  </label>
                  <div className="mt-2">
                    <div
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {feePaymentById?.feeAmount}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Due Amount
                  </label>
                  <div className="mt-2">
                    <div
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {feePaymentById?.dueAmount}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Due Date
                  </label>
                  <div className="mt-2">
                    <div
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {formatDate(feePaymentById?.dueDate)}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Credit Amount
                  </label>
                  <div className="mt-2">
                    <div
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {feePaymentById.creditAmount}
                    </div>
                  </div>
                </div>

                {/*  */}
                <FormProvider {...dueAmountModifyMethods}>
                  <form
                    className="sm:col-span-3"
                    onSubmit={dueAmountModifyMethods.handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="sm:col-start-1 mt-4">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Enter amount paid
                      </label>
                      <div className="mt-2">
                        <input
                          disabled={!isEdit}
                          type="text"
                          {...register("fee")}
                          placeholder="enter a value"
                          className="disabled:bg-slate-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="h-4">
                          {formState.errors.fee?.message && isEdit && (
                            <span className="text-xs text-red-400">
                              *{formState.errors.fee?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-start-1">
                      <div className="mt-2">
                        <div>
                          <label
                            htmlFor="comment"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Add your comment
                          </label>
                          <div className="mt-2">
                            <textarea
                              {...register("remarks")}
                              rows={4}
                              disabled={!isEdit}
                              placeholder="Enter your remarks"
                              className="disabled:bg-slate-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                            />
                            <div className="h-4">
                              {formState.errors.remarks?.message && isEdit && (
                                <span className="text-xs text-red-400">
                                  *{formState.errors.remarks?.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-12 mt-8 justify-center">
                      {!isEdit ? (
                        <button
                          onClick={() => setIsEdit(true)}
                          className="inline-flex items-center gap-x-1.5 rounded-md border  px-4 py-1.5 text-sm font-semibold text-slate-500 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                        >
                          {"Edit"}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsEdit(false)
                            setTimeout(() => {
                              dueAmountModifyMethods.clearErrors()
                            }, 0)
                            dueAmountModifyMethods.reset({
                              fee: "",
                              remarks: "",
                            })
                          }}
                          className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          {"Cancel"}
                        </button>
                      )}

                      <button
                        disabled={!isEdit}
                        type="submit"
                        className="disabled:bg-slate-200 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </FormProvider>

                {/*  */}
              </div>
            </div>
          </div>
        )
      )}
      <UpdateAmountPaidModal />
    </div>
  )
}

export default ManageFee
