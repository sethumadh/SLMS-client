// PublishedTerm
/* trunk-ignore-all(prettier) */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query"
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
import {
  changePublishedTermNameSchema,
  extendPublishedTermSchema,
} from "@/types/Admin/term/publishTerm"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import TermNameModal from "@/components/Modal/TermNameModal"
import TermDateModal from "@/components/Modal/TermDateModal"
import { useTermExtendmutation } from "@/hooks/Admin.Administration.Term/mutation/useTermExtendMutation"
import { useTermNameChangeMutation } from "@/hooks/Admin.Administration.Term/mutation/useTermNameChangeMutation"
import MakeCurrentTermModal from "@/components/Modal/MakeCurrentTermModal"
import UnPublishTermModal from "@/components/Modal/UnPublishTermModal"

export type ChangePublishedTermNameSchema = z.infer<
  typeof changePublishedTermNameSchema
>
export type ExtendPublishedTermSchema = z.infer<
  typeof extendPublishedTermSchema
>
function PublishedTerm() {
  const dispatch = useAppDispatch()
  const saveTermNameRef = useRef<HTMLButtonElement | null>(null)
  const saveTermDateRef = useRef<HTMLButtonElement | null>(null)
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState("")
  const { data: PublishedTerm, isLoading } = useQuery({
    queryKey: [
      api.admin.term.publishedTerm.findPublishedTermAdministration.queryKey,
    ],
    queryFn: api.admin.term.publishedTerm.findPublishedTermAdministration.query,
  })

  const { termExtendMutation, termExtendIsPending } =
    useTermExtendmutation(loadingToastId)
  const { termNameChangeMutation, termNameChangeIsPending } =
    useTermNameChangeMutation(loadingToastId)
  const termExtendMethods = useForm<ExtendPublishedTermSchema>({
    resolver: zodResolver(extendPublishedTermSchema),
    defaultValues: {
      date: PublishedTerm?.endDate
        ? new Date(PublishedTerm.endDate)
        : new Date(),
    },
    shouldFocusError: true,
  })
  const termNameMethods = useForm<ChangePublishedTermNameSchema>({
    resolver: zodResolver(changePublishedTermNameSchema),
    defaultValues: {
      name: !isLoading ? PublishedTerm?.name : "",
    },
    shouldFocusError: true,
  })
  const onTermExtendSubmit = async (values: ExtendPublishedTermSchema) => {
    if (PublishedTerm?.id) {
      const toastId = toast.loading(`Extending term , please wait`)
      setLoadingToastId(toastId.toString())
      const updatedTerm = {
        ...PublishedTerm,
        endDate: values.date.toISOString(),
      }
      await termExtendMutation({
        id: PublishedTerm?.id,
        updatedTerm,
      })
    } else {
      toast.error(`There is no such term in the database.`)
    }

    setItem("")
    setIsEdit(false)
  }
  const onTermNameSubmit = async (values: ChangePublishedTermNameSchema) => {
    if (PublishedTerm?.id) {
      dispatch(
        setOpenModal({
          isOpen: false,
          type: "",
        })
      )
      const toastId = toast.loading(`Term Name is Getting updated`)
      setLoadingToastId(toastId.toString())
      const updatedTerm = { ...PublishedTerm, name: values.name }
      await termNameChangeMutation({
        id: PublishedTerm?.id,
        updatedTerm,
      })
    } else {
      toast.error(`There is no such term in the database.`)
    }

    setItem("")
    setIsEdit(false)
  }
  useEffect(() => {
    if (PublishedTerm && !isLoading) {
      termNameMethods.reset({
        name: PublishedTerm?.name,
      })
      termExtendMethods.reset({
        date: new Date(PublishedTerm?.endDate),
      })
    }
  }, [PublishedTerm, isLoading, termNameMethods, termExtendMethods])
  if (!PublishedTerm?.name) {
    return (
      <div className="h-screen textxl font-medium flex justify-center items-center">
        <h1 className="italic">There are no data to show</h1>
      </div>
    )
  }

  return (
    <div className="container">
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
                          {PublishedTerm?.name &&
                            capitalizeFirstCharacter(PublishedTerm?.name)}
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
                            onClick={async () => {
                              const validate = await termNameMethods.trigger([
                                "name",
                              ])
                              if (validate) {
                                dispatch(
                                  setOpenModal({
                                    isOpen: true,
                                    type: "termName",
                                  })
                                )
                              }
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
                              termNameMethods.reset({
                                name: PublishedTerm?.name,
                              })
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

                  {termNameMethods.formState.errors?.name?.message && (
                    <span className="hidden">
                      {toast.error(
                        `${termNameMethods.formState.errors?.name?.message}`,
                        {
                          toastId: `${123}`,
                        }
                      )}
                    </span>
                  )}
                </form>
              </FormProvider>
              {PublishedTerm && (
                <>
                  <TermDetails
                    description=" Start date"
                    value={PublishedTerm?.startDate}
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
                          {PublishedTerm?.endDate &&
                            formatDate(PublishedTerm?.endDate)}
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
                                  type: "termExtend",
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
                    {termExtendMethods.formState.errors?.date?.message && (
                      <span className="hidden">
                        {toast.error(
                          `${termExtendMethods.formState.errors?.date?.message}`,
                          {
                            toastId: `${334}`,
                          }
                        )}
                      </span>
                    )}
                  </div>
                </form>
              </FormProvider>
              <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Make the term current term
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-shrink-0 flex justify-center items-end gap-4 italic">
                    <button
                      disabled={
                        (PublishedTerm?.endDate
                          ? new Date(PublishedTerm.endDate) < new Date()
                          : false) || PublishedTerm?.currentTerm
                      }
                      type="button"
                      className="disabled:bg-slate-200 disabled:text-gray-400  px-2 border border-indigo-300 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        dispatch(
                          setOpenModal({
                            isOpen: true,
                            type: "makeCurrentTerm",
                            data: {
                              id: PublishedTerm?.id,
                              value: PublishedTerm?.name,
                            },
                          })
                        )
                      }}
                    >
                      Make term current
                    </button>
                    {PublishedTerm?.endDate &&
                      new Date(PublishedTerm.endDate) < new Date() && (
                        <p className="text-xs">
                          Please make the expiry date of the term greater than
                          today's date to activate the term
                        </p>
                      )}
                    {PublishedTerm?.currentTerm && (
                      <p className="text-xs">
                        {" "}
                        The term is already current and active
                      </p>
                    )}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Remove the term from published term
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-shrink-0 flex justify-center items-end gap-4 italic">
                    <button
                      disabled={!PublishedTerm?.isPublish}
                      type="button"
                      className="disabled:bg-slate-200 disabled:text-gray-400  px-2 border border-indigo-300 rounded-md bg-white font-medium text-red-600 hover:text-red-500"
                      onClick={() => {
                        dispatch(
                          setOpenModal({
                            isOpen: true,
                            type: "unPublishTerm",
                            data: {
                              id: PublishedTerm?.id,
                              value: PublishedTerm?.name,
                            },
                          })
                        )
                      }}
                    >
                      Unpublish term
                    </button>
                    <p className="text-xs">
                      This action will remove this term from being
                      advertised/published on the application page
                    </p>
                  </span>
                </dd>
              </div>
              {PublishedTerm && (
                <>
                  <TermDetails
                    description="Created on"
                    value={PublishedTerm?.createdAt}
                  />
                  <TermDetails
                    description="Last Updated on"
                    value={PublishedTerm?.updatedAt}
                  />
                  <TermDetails description="Total Students" value={100} />
                </>
              )}

              {/* give subject and levels details
               */}
              <h1>Subject details here</h1>
            </dl>
          </div>
        </>
      )}
      <TermNameModal ref={saveTermNameRef} />
      <TermDateModal ref={saveTermDateRef} />
      <MakeCurrentTermModal />
      <UnPublishTermModal/>
    </div>
  )
}

export default PublishedTerm
