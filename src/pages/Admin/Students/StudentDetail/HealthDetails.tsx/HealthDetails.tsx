import { useState } from "react"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import Icons from "@/constants/icons"
import { StudentHealthDetailsSchema } from "@/types/studentSetupWizardSchema"

export type HealthDetailsSchema = z.infer<typeof StudentHealthDetailsSchema>

function HealthDetails() {
  const [isEdit, setIsEdit] = useState(false)
  const methods = useForm<HealthDetailsSchema>({
    resolver: zodResolver(StudentHealthDetailsSchema),

    defaultValues: {
      medicareNumber: "1234567890",
      ambulanceMembershipNumber: "999999999",
      medicalCondition: "condition1 , condition 2",
      allergy: "allergy 1, allergy 2",
    },
  })
  const onSubmit = (values: HealthDetailsSchema) => {
    console.log(values)
    setIsEdit(false)
  }
  return (
    <div>
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
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mt-4 border rounded-xl p-4"
          >
            <div className="col-span-2  sm:px-4 sm:py-2 ">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Medicare Number
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      1234567890
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("medicareNumber")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  )}
                  {isEdit && (
                    <div className="flex items-center">
                      {methods.formState.errors.medicareNumber?.message && (
                        <span className="text-xs text-red-600">
                          *{methods.formState.errors.medicareNumber?.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Ambulance Membership Number
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      999999999
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("ambulanceMembershipNumber")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  )}
                  {isEdit && (
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
                  )}
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Medical Condition
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      condition1 , condition 2
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("medicalCondition")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  )}
                  {isEdit && (
                    <div className="flex items-center">
                      {methods.formState.errors.medicalCondition?.message && (
                        <span className="text-xs text-red-600">
                          *{methods.formState.errors.medicalCondition?.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Allergy
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      allergy 1, allergy 2
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("allergy")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
              className="disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Edit
            </button>
            <button
              disabled={!isEdit}
              type="submit"
              className="disabled:bg-slate-400 disabled:cursor-not-allowed rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>

            <button
              disabled={!isEdit}
              onClick={() => {
                setIsEdit(false)
              }}
              type="button"
              className="disabled:bg-slate-400 disabled:cursor-not-allowed rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              cancel
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default HealthDetails
