import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import Icons from "@/constants/icons"
import { applicantHealthDetailsSchema } from "@/types/Application/applicantSchema"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import LoadingSpinner from "@/components/Loadingspinner"

export type HealthDetailsSchema = z.infer<typeof applicantHealthDetailsSchema>

function HealthDetails() {
  const params = useParams()
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState("")
  const {
    data: activeStudentData,
    isLoading: activeStudentDataIsLoading,
    isError: activeStudentDataIsError,
  } = useQuery({
    queryKey: [
      api.students.activeStudent.findActiveStudentById.querykey,
      params.id,
    ],
    queryFn: () => {
      if (params.id) {
        return api.students.activeStudent.findActiveStudentById.query(params.id)
      }
    },
    enabled: !!params.id,
  })
  const {
    allergy,
    ambulanceMembershipNumber,
    medicalCondition,
    medicareNumber,
  } = activeStudentData?.healthInformation ?? {}
  const { contactNumber, contactPerson, relationship } =
    activeStudentData?.emergencyContact ?? {}
  const methods = useForm<HealthDetailsSchema>({
    resolver: zodResolver(applicantHealthDetailsSchema),
  })
  useEffect(() => {
    if (
      allergy &&
      ambulanceMembershipNumber &&
      medicalCondition &&
      medicareNumber &&
      contactNumber &&
      contactPerson &&
      relationship
    ) {
      methods.reset({
        allergy,
        ambulanceMembershipNumber,
        medicalCondition,
        medicareNumber,
        contactNumber,
        contactPerson,
        relationship,
      })
    }
  }, [
    allergy,
    ambulanceMembershipNumber,
    medicalCondition,
    medicareNumber,
    contactNumber,
    contactPerson,
    relationship,
    methods,
  ])
  const onSubmit = (values: HealthDetailsSchema) => {
    console.log(values)
    setIsEdit(false)
  }
  if (activeStudentDataIsError) {
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
     {activeStudentDataIsLoading ? (
        <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <LoadingSpinner className="w-20 h-20" />
          </div>
        </>
      ) : activeStudentData?.personalDetails ? ( <div>
        <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
          <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
            <h3 className="sm:text-base font-semibold leading-7 text-gray-900  ">
              Emergency and Health Information
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
              * As given by the applicatant.
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
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:mt-4 border rounded-xl p-4"
            >
              <div className="col-span-2  sm:px-4 sm:py-2 ">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Medicare Number
                    </dt>
                    {item != "medicare" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {medicareNumber}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("medicare")
                            }}
                          />
                        </button>
                      </>
                    )}
  
                    {isEdit && item == "medicare" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("medicareNumber")}
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
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Ambulance Membership
                    </dt>
                    {item != "ambulance" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {ambulanceMembershipNumber}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("ambulance")
                            }}
                          />
                        </button>
                      </>
                    )}
  
                    {isEdit && item == "ambulance" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("ambulanceMembershipNumber")}
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
                      {methods.formState.errors.ambulanceMembershipNumber
                        ?.message && (
                        <span className="text-xs text-red-600">
                          *
                          {
                            methods.formState.errors.ambulanceMembershipNumber
                              ?.message
                          }
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Medical Condition
                    </dt>
                    {item != "medicalCondition" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {medicalCondition}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("medicalCondition")
                            }}
                          />
                        </button>
                      </>
                    )}
  
                    {isEdit && item == "medicalCondition" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("medicalCondition")}
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
                      {methods.formState.errors.medicalCondition?.message && (
                        <span className="text-xs text-red-600">
                          *{methods.formState.errors.medicalCondition?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Allergy
                    </dt>
                    {item != "allergy" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {allergy}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("allergy")
                            }}
                          />
                        </button>
                      </>
                    )}
                    {isEdit && item == "allergy" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("allergy")}
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
                        {methods.formState.errors.allergy?.message && (
                          <span className="text-xs text-red-600">
                            *{methods.formState.errors.allergy?.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {/*  */}
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Contact Person
                    </dt>
                    {item != "contactPerson" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {contactPerson}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("contactPerson")
                            }}
                          />
                        </button>
                      </>
                    )}
                    {isEdit && item == "contactPerson" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("contactPerson")}
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
                        {methods.formState.errors.contactPerson?.message && (
                          <span className="text-xs text-red-600">
                            *{methods.formState.errors.contactPerson?.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Contact Number
                    </dt>
                    {item != "contactNumber" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {contactNumber}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("contactNumber")
                            }}
                          />
                        </button>
                      </>
                    )}
                    {isEdit && item == "contactNumber" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("contactNumber")}
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
                        {methods.formState.errors.contactNumber?.message && (
                          <span className="text-xs text-red-600">
                            *{methods.formState.errors.contactNumber?.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      relationship
                    </dt>
                    {item != "relationship" && (
                      <>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
  {relationship}
                        </dd>
                        <button type="button">
                          <Icons.Pencil
                            className="w-4 h-4 flex justify-center items-center text-blue-400"
                            onClick={() => {
                              setIsEdit(true)
                              setItem("relationship")
                            }}
                          />
                        </button>
                      </>
                    )}
                    {isEdit && item == "relationship" && (
                      <>
                        <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                          <input
                            {...methods.register("relationship")}
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
                        {methods.formState.errors.relationship?.message && (
                          <span className="text-xs text-red-600">
                            *{methods.formState.errors.relationship?.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {/*  */}
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
      </div>):( <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <p className="font-medium text-lg">There is no data to show</p>
          </div>
        </>)
     }
   
    </>
  )
}

export default HealthDetails
