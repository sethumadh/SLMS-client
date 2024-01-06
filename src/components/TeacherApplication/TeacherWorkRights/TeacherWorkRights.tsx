import { Controller, useFormContext } from "react-hook-form"
import Select, { SingleValue } from "react-select"
import { TeacherApplicantSchema } from "@/pages/Application/Teacher/TeacherApplication"

const workRightOptions = [
  { value: "yes", label: "YES" },
  { value: "no", label: "NO" },
]
const immigrationStatusOptions = [
  { value: "australianCitizen", label: "Australian Citizen" },
  {
    value: "australianPermanentResidence",
    label: "Australian Permanent Residence",
  },
  { value: "temporaryVisaHolder", label: "Temporary Visa Holder" },
]
function TeacherWorkRights() {
  const { formState, control } = useFormContext<TeacherApplicantSchema>()

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Applicant's work right Details
          </h2>
          <p>
            If you dont have work rights, please dont go ahead with the
            application
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
                  Work Rights<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="teacherWorkRights.workRights"
                    render={({ field }) => (
                      <Select
                        isSearchable={false}
                        {...field}
                        options={workRightOptions}
                        value={workRightOptions.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(
                          option: SingleValue<{
                            value: string
                            label: string
                          }>
                        ) => {
                          return field.onChange(option?.value)
                        }}
                      />
                    )}
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherWorkRights?.workRights?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherWorkRights?.workRights?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="father-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Immigration Status <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="teacherWorkRights.immigrationStatus"
                    render={({ field }) => (
                      <Select
                        isSearchable={false}
                        {...field}
                        options={immigrationStatusOptions}
                        value={immigrationStatusOptions.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(
                          option: SingleValue<{
                            value: string
                            label: string
                          }>
                        ) => {
                          return field.onChange(option?.value)
                        }}
                      />
                    )}
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherWorkRights?.immigrationStatus
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherWorkRights?.immigrationStatus
                          ?.message
                      }
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

export default TeacherWorkRights
