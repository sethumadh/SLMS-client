/* trunk-ignore-all(prettier) */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"

import { api } from "@/api/api"
import Icons from "@/constants/icons"
import { formatDate } from "@/helpers/dateFormatter"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import LoadingSpinner from "@/components/Loadingspinner"

import TermDetails from "@/components/Administration/ManageTerm/TermDetails"
import ReactDatePicker from "react-datepicker"
import { handleAxiosError } from "@/helpers/errorhandler"
import {
  changeCurrentTermNameSchema,
  extendCurrentTermSchema,
} from "@/types/Admin/Term/Term"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import TermNameModal from "@/components/Modal/TermNameModal"
import TermDateModal from "@/components/Modal/TermDateModal"

export type ChangeCurrentTermNameSchema = z.infer<
  typeof changeCurrentTermNameSchema
>
export type ExtendCurrentTermSchema = z.infer<typeof extendCurrentTermSchema>
function Term() {
  const dispatch = useAppDispatch()
  const saveTermNameRef = useRef<HTMLButtonElement | null>(null)
  const saveTermDateRef = useRef<HTMLButtonElement | null>(null)
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState("")
  const queryClient = useQueryClient()
  const { data: currentTerm, isLoading } = useQuery({
    queryKey: [api.application.currentTerm.getTermSubjects.queryKey],
    queryFn: api.application.currentTerm.getTermSubjects.query,
  })

  const { mutateAsync: termExtendMutation, isPending: termExtendIsPending } =
    useMutation({
      mutationFn: api.admin.term.extendCurrentTerm.mutation,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [api.application.currentTerm.getTermSubjects.queryKey],
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
  const {
    mutateAsync: termNameChangeMutation,
    isPending: termNameChangeIsPending,
  } = useMutation({
    mutationFn: api.admin.term.changeCurrentTermName.mutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [api.application.currentTerm.getTermSubjects.queryKey],
      })
      if (loadingToastId) toast.dismiss(loadingToastId)
      toast.success(`Term Name updated to ${data.name} 👌`)
    },
    onError: (error: unknown) => {
      if (loadingToastId) toast.dismiss(loadingToastId)
      handleAxiosError(error)
    },
  })
  const termExtendMethods = useForm<ExtendCurrentTermSchema>({
    resolver: zodResolver(extendCurrentTermSchema),
    defaultValues: {
      date: currentTerm?.endDate ? new Date(currentTerm.endDate) : new Date(),
    },
  })
  const termNameMethods = useForm<ChangeCurrentTermNameSchema>({
    resolver: zodResolver(changeCurrentTermNameSchema),
    defaultValues: {
      name: !isLoading ? currentTerm?.name : "",
    },
  })
  const onTermExtendSubmit = async (values: ExtendCurrentTermSchema) => {
    if (currentTerm?.id) {
      const toastId = toast.loading(`Extending term , please wait`)
      setLoadingToastId(toastId.toString())
      const updatedTerm = { ...currentTerm, endDate: values.date.toString() }
      await termExtendMutation({
        id: currentTerm?.id,
        updatedTerm,
      })
    } else {
      toast.error(`There is no such term in the database.`)
    }

    setItem("")
    setIsEdit(false)
  }
  const onTermNameSubmit = async (values: ChangeCurrentTermNameSchema) => {
    if (currentTerm?.id) {
      dispatch(
        setOpenModal({
          isOpen: false,
          type: "",
        })
      )
      const toastId = toast.loading(`Term Name is Getting updated`)
      setLoadingToastId(toastId.toString())
      const updatedTerm = { ...currentTerm, name: values.name }
      await termNameChangeMutation({
        id: currentTerm?.id,
        updatedTerm,
      })
    } else {
      toast.error(`There is no such term in the database.`)
    }

    setItem("")
    setIsEdit(false)
  }
  useEffect(() => {
    if (currentTerm && !isLoading) {
      termNameMethods.reset({
        name: currentTerm.name,
      })
      termExtendMethods.reset({
        date: new Date(currentTerm?.endDate),
      })
    }
  }, [currentTerm, isLoading, termNameMethods, termExtendMethods])
  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4">
        <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900 ">
            View and Manage Current term.
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-6 text-red-500 italic ">
            *brief description for this section here.
          </p>
        </div>
        <Link
          to=".."
          className="text-blue-300 italic text-sm flex justify-center items-center"
        >
          <span>
            <Icons.Undo2 className="w-4 h-4" />
          </span>
          <p className="hidden sm:block sm:text-sm">Go Back</p>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center ">
          <LoadingSpinner className="w-12 h-12" />
        </div>
      ) : (
        <>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <FormProvider {...termNameMethods}>
                <form
                  onSubmit={termNameMethods.handleSubmit(onTermNameSubmit)}
                  noValidate
                >
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Current term
                    </dt>
                    {item != "termName" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {currentTerm?.name}
                        </dd>
                        <button
                          onClick={() => {
                            setIsEdit(true)
                            setItem("termName")
                          }}
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Update name
                        </button>
                      </>
                    )}
                    {isEdit && item === "termName" && (
                      <>
                        {termNameChangeIsPending ? (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <div>
                                <LoadingSpinner className="peer block w-full" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <input
                                autoComplete="off"
                                {...termNameMethods.register("name")}
                                className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                          </>
                        )}
                        <div className="flex justify-center gap-x-4 ">
                          <button
                            ref={saveTermNameRef}
                            className="hidden rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                            type="submit"
                          >
                            confirm
                          </button>
                          <button
                            onClick={() => {
                              dispatch(
                                setOpenModal({
                                  isOpen: true,
                                  type: "termChange",
                                })
                              )
                            }}
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                            type="button"
                          >
                            save
                          </button>
                          <button
                            type="button"
                            className="rounded-md bg-white font-medium text-red-600 hover:text-red-500"
                            onClick={() => {
                              setIsEdit(false)
                              setItem("")
                            }}
                          >
                            cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </form>
              </FormProvider>
              {currentTerm && (
                <>
                  <TermDetails
                    description=" Start date"
                    value={currentTerm?.startDate}
                  />
                </>
              )}
              <FormProvider {...termExtendMethods}>
                <form
                  onSubmit={termExtendMethods.handleSubmit(onTermExtendSubmit)}
                  noValidate
                >
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      End date
                    </dt>
                    {item != "termExtend" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {currentTerm?.endDate &&
                            formatDate(currentTerm?.endDate)}
                        </dd>
                        <button
                          onClick={() => {
                            setIsEdit(true)
                            setItem("termExtend")
                          }}
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Extend term
                        </button>
                      </>
                    )}
                    {isEdit && item === "termExtend" && (
                      <>
                        {termExtendIsPending ? (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <div>
                                <LoadingSpinner className="peer block w-full" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <Controller
                                name="date"
                                control={termExtendMethods.control}
                                render={({ field }) => (
                                  <ReactDatePicker
                                    className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholderText="Select date"
                                    onChange={(date: Date) =>
                                      field.onChange(date)
                                    }
                                    selected={field.value}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    showIcon
                                    icon={
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 48 48"
                                      >
                                        <mask id="ipSApplication0">
                                          <g
                                            fill="none"
                                            stroke="#fff"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              d="M40.04 22v20h-32V22"
                                            ></path>
                                            <path
                                              fill="#fff"
                                              d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                            ></path>
                                          </g>
                                        </mask>
                                        <path
                                          fill="currentColor"
                                          d="M0 0h48v48H0z"
                                          mask="url(#ipSApplication0)"
                                        ></path>
                                      </svg>
                                    }
                                  />
                                )}
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                          </>
                        )}
                        <div className="flex justify-center gap-x-4 ">
                          <button
                            ref={saveTermDateRef}
                            className="hidden rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                            type="submit"
                          >
                            confirm
                          </button>
                          <button
                            onClick={() => {
                              dispatch(
                                setOpenModal({
                                  isOpen: true,
                                  type: "termDate",
                                })
                              )
                            }}
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                            type="button"
                          >
                            save
                          </button>
                          <button
                            type="button"
                            className="rounded-md bg-white font-medium text-red-600 hover:text-red-500"
                            onClick={() => {
                              setIsEdit(false)
                              setItem("")
                            }}
                          >
                            cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </form>
              </FormProvider>
              {currentTerm && (
                <>
                  <TermDetails
                    description="Created on"
                    value={currentTerm?.createdAt}
                  />
                  <TermDetails
                    description="Last Updated on"
                    value={currentTerm?.updatedAt}
                  />
                  <TermDetails description="Total Students" value={100} />
                </>
              )}

              <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Subjects Details
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {currentTerm?.TermSubject.map((term) => (
                        <div
                          key={term.subject.id}
                          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="focus:outline-none ">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <div className="flex gap-1">
                                <p className="text-sm  text-gray-900 w-1/3">
                                  Name
                                </p>
                                <p className="text-sm font-medium text-gray-900 w-full">
                                  {term.subject.name &&
                                    capitalizeFirstCharacter(term.subject.name)}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <p className="text-sm  text-gray-900 w-1/3">
                                  Fee
                                </p>
                                <p className="text-sm font-medium text-gray-900 w-full">
                                  {term.subject.fee.amount}
                                </p>
                              </div>

                              <div className="flex gap-1">
                                <p className="text-sm text-gray-900 w-1/3">
                                  Fee Interval
                                </p>
                                <p className="text-sm font-medium text-gray-900 w-full">
                                  {capitalizeFirstCharacter(
                                    term.subject.fee.paymentType.toLowerCase()
                                  )}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <p className="text-sm text-gray-900 w-1/3">
                                  Levels
                                </p>
                                <p className="text-sm font-medium text-gray-900 w-full">
                                  {term.subject.SubjectLevel.map((level) =>
                                    capitalizeFirstCharacter(level.level.name)
                                  ).join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
      <TermNameModal ref={saveTermNameRef} />
      <TermDateModal ref={saveTermDateRef} />
    </div>
  )
}

export default Term
