import { useFormContext } from "react-hook-form"
import { StudentWizardSchema } from "@/pages/Application/Application"

function HealthInformation() {
  const { formState, register } = useFormContext<StudentWizardSchema>()
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Health Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide medicare of private health insurance number below
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="medicare"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Medicare Number
                </label>
                <div className="mt-2">
                  <input
                    id="medicare"
                    {...register("healthInformation.medicareNumber")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.healthInformation?.medicareNumber
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.healthInformation?.medicareNumber
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
                  htmlFor="ambulance-number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ambulance Membership Number
                </label>
                <div className="mt-2">
                  <input
                    id="ambulance-number"
                    {...register("healthInformation.ambulanceMembershipNumber")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.healthInformation?.ambulanceMembershipNumber
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.healthInformation
                          ?.ambulanceMembershipNumber?.message
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="medical-condition"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Medical Condition
                </label>
                <div className="mt-2">
                  <input
                    id="medical-condition"
                    {...register("healthInformation.medicalCondition")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.healthInformation?.medicalCondition
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.healthInformation?.medicalCondition
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
                  htmlFor="allergy"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Allergy
                </label>
                <div className="mt-2">
                  <input
                    id="allergy"
                    {...register("healthInformation.allergy")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.healthInformation?.allergy?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.healthInformation?.allergy?.message}
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

export default HealthInformation
