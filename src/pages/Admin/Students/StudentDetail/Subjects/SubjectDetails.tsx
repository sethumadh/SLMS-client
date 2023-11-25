import { useState } from "react"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import Icons from "@/constants/icons"
import { applicantSubjectDetailsSchema } from "@/types/applicantSchema"

export type SubjectDetailsSchema = z.infer<typeof applicantSubjectDetailsSchema>
const subjects = [
  "Math",
  "Science",
  "History",
  "English",

  // Add more subjects as needed
]
const subjectOptions = [
  "option-1",
  "option-2",
  "option-3",
  "option-4",
  "option-5",
  "option-6",
  // Add more subjects as needed
]

function SubjectDetails() {
  const [isEdit, setIsEdit] = useState(false)
  const methods = useForm<SubjectDetailsSchema>({
    resolver: zodResolver(applicantSubjectDetailsSchema),

    defaultValues: {
      subjects: [],
      subjectRelated: [],
    },
  })
  const onSubmit = (values: SubjectDetailsSchema) => {
    console.log(values)
    setIsEdit(false)
  }
  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
        <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
          <h3 className="sm:text-base font-semibold leading-7 text-gray-900  ">
            Manage Subjects and Classes
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
            * add or change subjects and classes.
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
                    Subjects
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Maths, Science
                    </dd>
                  ) : (
                    <div className="mt-2">
                      {subjects.map((subject) => (
                        <div key={subject}>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id={subject}
                                value={subject}
                                {...methods.register("subjects", {
                                  required: {
                                    value: true,
                                    message: "choose a subject",
                                  },
                                })}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor={subject}
                                className="font-medium text-gray-900"
                              >
                                {subject}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {isEdit && (
                    <div className="flex items-center">
                      {methods.formState.errors.subjects?.message && (
                        <span className="text-xs text-red-600">
                          *{methods.formState.errors.subjects?.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Options
                  </dt>
                  {!isEdit ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      option 1 and option 2
                    </dd>
                  ) : (
                    <div className="mt-2">
                      {subjectOptions.map((subjectOption) => (
                        <div key={subjectOption}>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id={subjectOption}
                                value={subjectOption}
                                {...methods.register("subjectRelated", {
                                  required: {
                                    value: true,
                                    message: "choose an option",
                                  },
                                })}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor={subjectOption}
                                className="font-medium text-gray-900"
                              >
                                {subjectOption}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {isEdit && (
                    <div className="flex items-center">
                      {methods.formState.errors.subjectRelated?.message && (
                        <span className="text-xs text-red-600">
                          *{methods.formState.errors.subjectRelated?.message}
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

export default SubjectDetails
