import { useState } from "react"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import Icons from "@/constants/icons"
import { StudentPersonalDetailsSchema } from "@/types/studentSetupWizardSchema"

export type PersonalDetailsSchema = z.infer<typeof StudentPersonalDetailsSchema>

const people = [
  {
    name: "Karan Singh",
    title: "Student",
    role: "Active",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
]

function PersonalDetails() {
  const [isEdit, setIsEdit] = useState(false)
  const methods = useForm<PersonalDetailsSchema>({
    resolver: zodResolver(StudentPersonalDetailsSchema),

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
  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
        <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900 ">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
            *Personal details, parents information given by the applicatant.
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
            {people.map((person) => (
              <li
                key={person.email}
                className="col-span-1 h-[350px] flex flex-col divide-y  divide-gray-200 rounded-lg bg-white text-center shadow "
              >
                <div className="flex  flex-col p-8">
                  <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {person.name}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500">{person.title}</dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {person.role}
                      </span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <Link
                        to={`mailto:${person.email}`}
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
                        to={`tel:${person.telephone}`}
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
            ))}
            <div className="col-span-2  sm:px-4 sm:py-2 ">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    First name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Karan
                  </dd>
                </div>

                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Singh
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Gender
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Male
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Date of Birth
                  </dt>

                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    01/01/2008
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      karansingh@example.com
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("email")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      0123456789
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("contact")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Unit 1 , Plumtpton Court, 8th Gillinham street
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("address")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Dandenong
                    </dd>
                  ) : (
                    <div className="sm:col-span-2 sm:mt-0">
                      <input
                        {...methods.register("suburb")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      4222
                    </dd>
                  ) : (
                    <div className="">
                      <input
                        {...methods.register("postcode")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                    Victoria
                  </dd>
                  {/* </div>

                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0"> */}
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Country
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                    Australia
                  </dd>
                </div>

                {/* <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0 ">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Subjects
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Maths, Science
                  </dd>
                </div> */}
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

export default PersonalDetails
