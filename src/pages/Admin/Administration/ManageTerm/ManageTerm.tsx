/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { api } from "@/api/api"
import Icons from "@/constants/icons"
import { formatDate } from "@/helpers/dateFormatter"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import LoadingSpinner from "@/components/Loadingspinner"
import { changeCurrentTermNameSchema } from "@/api/admin/admin"
import { useEffect,useState } from "react"
import { AxiosError } from "axios"

export type ChangeCurrentTermNameSchema = z.infer<
  typeof changeCurrentTermNameSchema
>

function Term() {
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState("")
  const queryClient = useQueryClient()
  const { data: currentTerm, isLoading } = useQuery({
    queryKey: [api.application.currentTerm.getTermSubjects.queryKey],
    queryFn: api.application.currentTerm.getTermSubjects.query,
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
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { message?: string }
        if (errorData && errorData.message) {
          toast.error(`${errorData.message}`)
        } else {
          toast.error("An unknown error occurred")
        }
      } else {
        console.log("An error occurred, Please contact Administrator")
        // toast.error('An error occurred, but it was not an Axios error');
      }
    },
  })
  const termNameMethods = useForm<ChangeCurrentTermNameSchema>({
    resolver: zodResolver(changeCurrentTermNameSchema),
    defaultValues: {
      name: !isLoading ? currentTerm?.name : "",
    },
  })
  const onTermNameSubmit = async (values: ChangeCurrentTermNameSchema) => {
    if (currentTerm?.id) {
      const toastId = toast.loading(`Term Name is Getting updated`)
      setLoadingToastId(toastId.toString())
      await termNameChangeMutation({
        name: values.name,
        id: currentTerm?.id,
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
    }
  }, [currentTerm, isLoading, termNameMethods])

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
      {isLoading && (
        <div className="">
          <LoadingSpinner />
        </div>
      )}

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
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                        type="submit"
                      >
                        confirm
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

          <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Start date
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {currentTerm?.startDate && formatDate(currentTerm?.startDate)}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                ></button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              End date
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {currentTerm?.endDate && formatDate(currentTerm?.endDate)}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                ></button>
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Extend term
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Created on
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {currentTerm?.createdAt && formatDate(currentTerm?.createdAt)}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                ></button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last Updated on
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {currentTerm?.updatedAt && formatDate(currentTerm?.updatedAt)}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                ></button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Total Students
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">100</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                ></button>
              </span>
            </dd>
          </div>
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
                            <p className="text-sm  text-gray-900 w-1/3">Name</p>
                            <p className="text-sm font-medium text-gray-900 w-full">
                              {term.subject.name &&
                                capitalizeFirstCharacter(term.subject.name)}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <p className="text-sm  text-gray-900 w-1/3">Fee</p>
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

          {/*  */}
        </dl>
      </div>
    </div>
  )
}

export default Term
