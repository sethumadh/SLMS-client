import { useFormContext } from "react-hook-form"
import { StudentWizardSchema } from "@/pages/Application/Application"

function ParentsInfo() {
  const { formState, register } = useFormContext<StudentWizardSchema>()

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Student Parent's Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent email where you can receive emails.
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="father-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Father's name{" "}
                </label>
                <div className="mt-2">
                  <input
                    id="father-name"
                    {...register("parentsSchema.fatherName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.parentsSchema?.fatherName?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.parentsSchema?.fatherName?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="mother-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mother's name{" "}
                </label>
                <div className="mt-2">
                  <input
                    id="mother-name"
                    {...register("parentsSchema.motherName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.parentsSchema?.motherName?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.parentsSchema?.motherName?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="parent-mobile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Parent's Mobile
                </label>
                <div className="mt-2">
                  <input
                    id="parent-mobile"
                    {...register("parentsSchema.parentContact")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.parentsSchema?.parentContact?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.parentsSchema?.parentContact.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="parent-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Parents' Email
                </label>
                <div className="mt-2">
                  <input
                    id="parent-email"
                    {...register("parentsSchema.parentEmail")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.parentsSchema?.parentEmail?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.parentsSchema?.parentEmail?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentsInfo
