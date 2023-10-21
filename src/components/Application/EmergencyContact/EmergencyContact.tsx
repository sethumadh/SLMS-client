import { useFormContext } from "react-hook-form"
import { StudentWizardSchema } from "@/pages/Application/Application"

function EmergencyContact() {
  const { formState, register } = useFormContext<StudentWizardSchema>()
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Emergency Contact Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide name of the person and mobile. (Must be different
            from parents)
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="contact-person"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Emergency Contact Person<span className="text-red-600">*</span> - Name
                </label>
                <div className="mt-2">
                  <input
                    id="contact-person"
                    {...register("emergencyContact.contactPerson")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.emergencyContact?.contactPerson
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.emergencyContact?.contactPerson
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
                  htmlFor="contact-number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Emergency Contact<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="contact-number"
                    {...register("emergencyContact.contactNumber")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.emergencyContact?.contactNumber
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.emergencyContact?.contactNumber
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
                  htmlFor="relationship"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Relationship with child<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="relationship"
                    {...register("emergencyContact.relationship")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.emergencyContact?.relationship?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.emergencyContact?.relationship?.message}
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

export default EmergencyContact
