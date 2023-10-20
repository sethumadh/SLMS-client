import { useFormContext } from "react-hook-form"
import { StudentWizardSchema } from "@/pages/Application/Application"

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

function Subjects() {
  const { formState, register } = useFormContext<StudentWizardSchema>()
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Subjects
          </h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide medicare of private health insurance number below
          </p> */}
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subjects
                </label>
                <div className="mt-2">
                  {subjects.map((subject) => (
                    <div key={subject}>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id={subject}
                            value={subject}
                            {...register("subjects.subjects", {
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
                  <div className="h-4">
                    {formState.errors.subjects?.subjects?.message && (
                      <span className="text-xs text-red-600">
                        {formState.errors.subjects?.subjects?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  ---end of---*/}

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Please tick all relevant
          </h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide medicare of private health insurance number below
          </p> */}
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="subjects-related"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="mt-2">
                  {subjectOptions.map((subjectOption) => (
                    <div key={subjectOption}>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id={subjectOption}
                            value={subjectOption}
                            {...register("subjects.subjectRelated", {
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
                  <div className="h-4">
                    {formState.errors.subjects?.subjectRelated?.message && (
                      <span className="text-xs text-red-600">
                        {formState.errors.subjects?.subjectRelated?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}

export default Subjects
