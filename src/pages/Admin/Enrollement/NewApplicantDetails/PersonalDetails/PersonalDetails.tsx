import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import Icons from "@/constants/icons"
import { applicantPersonalDetailsSchema } from "@/types/Application/applicantSchema"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import LoadingSpinner from "@/components/Loadingspinner"
import { formatDate } from "@/helpers/dateFormatter"

export type PersonalDetailsSchema = z.infer<
  typeof applicantPersonalDetailsSchema
>

const people = {
  name: "Karan Singh",
  title: "Student",
  role: "Active",
  email: "janecooper@example.com",
  telephone: "+1-202-555-0170",
  imageUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
}
// More people...

function NewApplicantPersonalDetails() {
  const params = useParams()

  const saveRef = useRef<HTMLButtonElement | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState("")
  const {
    data: applicantData,
    isLoading: applicantDataIsLoading,
    isError: applicantDataIsError,
    // error: applicantDataError,
  } = useQuery({
    queryKey: [api.enrollment.enrollment.findApplicantById.querykey, params.id],
    queryFn: () => {
      if (params.id) {
        return api.enrollment.enrollment.findApplicantById.query(params.id)
      }
    },
    enabled: !!params.id,
  })

  const {
    firstName,
    lastName,
    DOB,
    address,
    contact,
    country,
    email,
    gender,
    id,
    postcode,
    state,
    suburb,
  } = applicantData?.personalDetails ?? {}
  const methods = useForm<PersonalDetailsSchema>({
    resolver: zodResolver(applicantPersonalDetailsSchema),

    defaultValues: {
      email: "karansingh@example.com",
      contact: "0123456789",
      address: `Unit 1 , Plumtpton Court, 8th Gillinham street`,
      suburb: "Dandenong ",
      postcode: "4222",
    },
  })
  const onSubmit = (values: PersonalDetailsSchema) => {
    console.log(values)
    setIsEdit(false)
  }
  useEffect(() => {
    methods.reset({
      email: email,
      contact: contact,
      address: address,
      suburb: suburb,
      postcode: postcode,
    })
  }, [email, contact, address, suburb, postcode, methods])
  if (applicantDataIsError) {
    return (
      <>
        <div className="h-[600px] w-full flex justify-center items-center">
          <p className="font-medium text-lg">There is no data to show</p>
        </div>
      </>
    )
  }
  return (
    <>
      {applicantDataIsLoading ? (
        <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <LoadingSpinner className="w-20 h-20" />
          </div>
        </>
      ) : applicantData?.personalDetails ? (
        <>
          <div>
            <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4">
              <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
                <h3 className="text-base font-semibold leading-7 text-gray-900 ">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
                  *Personal details given by the applicatant.
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
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:mt-4 border rounded-xl p-4 "
                >
                  <li
                    key={id}
                    className="col-span-1 h-[350px] flex flex-col divide-y  divide-gray-200 rounded-lg bg-white text-center shadow "
                  >
                    <div className="flex  flex-col p-8">
                      <img
                        className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                        src={people.imageUrl}
                        alt=""
                      />
                      <h3 className="mt-6 text-sm font-medium text-gray-900">
                        {firstName} {lastName}
                      </h3>
                      <dl className="mt-1 flex flex-grow flex-col justify-between">
                        <dt className="sr-only">Title</dt>
                        <dd className="text-sm text-gray-500">
                          {applicantData?.role &&
                            capitalizeFirstCharacter(applicantData?.role)}
                        </dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {applicantData?.role == "APPLICANT"
                              ? "Applied"
                              : ""}
                          </span>
                        </dd>
                      </dl>
                    </div>
                    <div>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                          <Link
                            to={`mailto:${email}`}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <Icons.EnvelopeIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Email
                          </Link>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                          <Link
                            to={`tel:${contact}`}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <Icons.PhoneIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Call
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>

                  <div className="col-span-2  sm:px-4 sm:py-2 ">
                    <dl className="divide-y divide-gray-100">
                      {/*  */}

                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          First Name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                          {firstName && capitalizeFirstCharacter(firstName)}
                        </dd>

                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Last name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                          {lastName && capitalizeFirstCharacter(lastName)}
                        </dd>
                      </div>

                      {/*  */}

                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Gender
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                          {gender && capitalizeFirstCharacter(gender)}
                        </dd>

                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Date of Birth
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                          {DOB && formatDate(DOB)}
                        </dd>
                      </div>

                      {/*  */}
                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </dt>
                        {item != "email" && (
                          <>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {email}
                            </dd>
                            <button type="button">
                              <Icons.Pencil
                                className="w-4 h-4 flex justify-center items-center text-blue-400"
                                onClick={() => {
                                  setIsEdit(true)
                                  setItem("email")
                                }}
                              />
                            </button>
                          </>
                        )}

                        {isEdit && item == "email" && (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <input
                                {...methods.register("email")}
                                className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex gap-x-4">
                              <button
                                // type="submit"
                                onClick={() => {
                                  saveRef.current?.click()
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.Check className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                onClick={() => {
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </>
                        )}
                        <div className="flex items-center">
                          {methods.formState.errors.email?.message && (
                            <span className="text-xs text-red-600">
                              *{methods.formState.errors.email?.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Contact
                        </dt>
                        {item != "contact" && (
                          <>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {contact}
                            </dd>
                            <button type="button">
                              <Icons.Pencil
                                className="w-4 h-4 flex justify-center items-center text-blue-400"
                                onClick={() => {
                                  setIsEdit(true)
                                  setItem("contact")
                                }}
                              />
                            </button>
                          </>
                        )}
                        {isEdit && item == "contact" && (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <input
                                {...methods.register("contact")}
                                className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex gap-x-4">
                              <button
                                // type="submit"
                                onClick={() => {
                                  saveRef.current?.click()
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.Check className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                onClick={() => {
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </>
                        )}
                        {isEdit && (
                          <div className="flex items-center">
                            {methods.formState.errors.contact?.message && (
                              <span className="text-xs text-red-600">
                                *{methods.formState.errors.contact?.message}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Address
                        </dt>
                        {item != "address" && (
                          <>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {address}
                            </dd>
                            <button type="button">
                              <Icons.Pencil
                                className="w-4 h-4 flex justify-center items-center text-blue-400"
                                onClick={() => {
                                  setIsEdit(true)
                                  setItem("address")
                                }}
                              />
                            </button>
                          </>
                        )}
                        {isEdit && item == "address" && (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <input
                                {...methods.register("address")}
                                className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex gap-x-4">
                              <button
                                // type="submit"
                                onClick={() => {
                                  saveRef.current?.click()
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.Check className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                onClick={() => {
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </>
                        )}
                        {isEdit && (
                          <div className="flex items-center">
                            {methods.formState.errors.address?.message && (
                              <span className="text-xs text-red-600">
                                *{methods.formState.errors.address?.message}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Suburb
                        </dt>
                        {item != "suburb" && (
                          <>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {suburb}
                            </dd>
                            <button type="button">
                              <Icons.Pencil
                                className="w-4 h-4 flex justify-center items-center text-blue-400"
                                onClick={() => {
                                  setIsEdit(true)
                                  setItem("suburb")
                                }}
                              />
                            </button>
                          </>
                        )}
                        {isEdit && item == "suburb" && (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <input
                                {...methods.register("suburb")}
                                className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex gap-x-4">
                              <button
                                // type="submit"
                                onClick={() => {
                                  saveRef.current?.click()
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.Check className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                onClick={() => {
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </>
                        )}
                        {isEdit && (
                          <div className="flex items-center">
                            {methods.formState.errors.suburb?.message && (
                              <span className="text-xs text-red-600">
                                *{methods.formState.errors.suburb?.message}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Postcode
                        </dt>
                        {item != "postcode" && (
                          <>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {postcode}
                            </dd>
                            <button type="button">
                              <Icons.Pencil
                                className="w-4 h-4 flex justify-center items-center text-blue-400"
                                onClick={() => {
                                  setIsEdit(true)
                                  setItem("postcode")
                                }}
                              />
                            </button>
                          </>
                        )}
                        {isEdit && item == "postcode" && (
                          <>
                            <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                              <input
                                {...methods.register("postcode")}
                                className="peer block w-full border-0 bg-gray-50 p-0 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                              <div
                                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex gap-x-4">
                              <button
                                // type="submit"
                                onClick={() => {
                                  saveRef.current?.click()
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.Check className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                onClick={() => {
                                  setIsEdit(false)
                                  setItem("")
                                }}
                              >
                                <Icons.X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </>
                        )}
                        {isEdit && (
                          <div className="flex items-center">
                            {methods.formState.errors.postcode?.message && (
                              <span className="text-xs text-red-600">
                                *{methods.formState.errors.postcode?.message}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          State
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                          {state}
                        </dd>

                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Country
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                          {country}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </ul>

                <div className="flex justify-center items-center gap-8 mt-12 ">
                  <button
                    onClick={() => {
                      setIsEdit(true)
                    }}
                    type="button"
                    disabled={isEdit}
                    className="hidden disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                  >
                    Edit
                  </button>
                  <button
                    ref={saveRef}
                    disabled={!isEdit}
                    type="submit"
                    className="hidden disabled:bg-slate-400 disabled:cursor-not-allowed rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>

                  <button
                    disabled={!isEdit}
                    onClick={() => {
                      setIsEdit(false)
                    }}
                    type="button"
                    className="hidden disabled:bg-slate-400 disabled:cursor-not-allowed rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    cancel
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </>
      ) : (
        <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <p className="font-medium text-lg">There is no data to show</p>
          </div>
        </>
      )}
    </>
  )
}

export default NewApplicantPersonalDetails
