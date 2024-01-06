import { useFormContext } from "react-hook-form"
import { TeacherApplicantSchema } from "@/pages/Application/Teacher/TeacherApplication"

function TeacherBankDetails() {
  const { formState, register } = useFormContext<TeacherApplicantSchema>()

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Applicant Bank account Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Make sure to check bank details before submitting.
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="account-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Account Name <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="account-name"
                    {...register("teacherBankDetails.bankAccountName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherBankDetails?.bankAccountName
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherBankDetails?.bankAccountName
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="BSB"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  BSB<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="BSB"
                    {...register("teacherBankDetails.BSB")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherBankDetails?.BSB?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherBankDetails?.BSB?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Account Number<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="accountNumber"
                    {...register("teacherBankDetails.accountNumber")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherBankDetails?.accountNumber
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherBankDetails?.accountNumber
                          .message
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="ABN"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ABN<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="ABN"
                    {...register("teacherBankDetails.ABN")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherBankDetails?.ABN?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherBankDetails?.ABN?.message}
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

export default TeacherBankDetails
