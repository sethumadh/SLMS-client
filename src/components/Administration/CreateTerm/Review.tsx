// import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { formatDate } from "@/helpers/dateFormatter"
import { useAppSelector } from "@/redux/store"
import { useMemo } from "react"
import Select from "react-select"

const Review = () => {
  const data = useAppSelector((state) => state.term)
  const termState = useMemo(
    () => ({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    }),
    [data]
  )

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-4">
        <div className="px-4 sm:px-0 md:col-span-1">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Review Details and submit.
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            If you want to edit go back to previous section.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="sm:col-span-6 ">
                  <div className="flex flex-col gap-4 shadow-sm px-4 py-2 rounded-lg border">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Term name<span className="text-red-600">*</span>
                      <div className="mt-2">
                        <input
                          id="first-name"
                          placeholder="Term name-2024"
                          disabled
                          value={termState.termName}
                          type="text"
                          className="block sm:w-1/2 disabled:bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </label>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Term Start Date
                        <span className="text-red-600">*</span>
                        <div className="mt-2">
                          <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                            <input
                              id="startDate"
                              type="text"
                              disabled
                              value={formatDate(
                                termState.startDate?.toString()
                                  ? termState.startDate?.toString()
                                  : new Date().toString()
                              )}
                              className="peer block disabled:bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Term End Date<span className="text-red-600">*</span>
                        <div className="mt-2">
                          <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                            <input
                              id="endDate"
                              type="text"
                              disabled
                              value={formatDate(
                                termState.endDate?.toString()
                                  ? termState.endDate?.toString()
                                  : new Date().toString()
                              )}
                              className="peer block disabled:bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {termState.groupSubjects.map((sub, index) => (
                  <div
                    key={index}
                    className="sm:col-span-6 rounded-lg shadow-lg border px-4 py-2"
                  >
                    <div className="flex flex-col gap-4  px-4 py-2 rounded-lg">
                      <label
                        htmlFor="group-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Group Name<span className="text-red-600">*</span>
                        <input
                          id="group-name"
                          disabled
                          value={sub.groupName}
                          className="block sm:w-1/2 disabled:bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Group-name"
                        />
                      </label>
                      <div className="flex gap-8">
                        <label
                          htmlFor="fee"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Fee<span className="text-red-600">*</span>
                          <input
                            id="fee"
                            disabled
                            value={sub.fee}
                            type="text"
                            placeholder="200"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 "
                          />
                        </label>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="fee-interval"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Fee Interval
                            <span className="text-red-600">*</span>
                          </label>

                          <Select
                            id={`feeInterval-${index}`}
                            className=""
                            isSearchable={false}
                            isDisabled={true}
                            value={{
                              value: sub.feeInterval,
                              label: sub.feeInterval,
                            }}
                          />
                        </div>
                      </div>

                      {sub.subjects.map((s, i) => (
                        <div key={`${i}- ${s.subjectName}`}>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Subject
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              disabled
                              value={s.subjectName}
                              type="text"
                              placeholder="200"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 "
                            />
                          </div>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="levels"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Subject Levels
                              <span className="text-red-600">*</span>
                            </label>
                            <Select
                              id={`${i}${index}${
                                s.levels.map((level) => level)[0]
                              }`}
                              isMulti
                              className="sm:w-full"
                              isDisabled={true}
                              defaultValue={s.levels.map((l) => ({
                                value: l,
                                label: capitalizeFirstCharacter(l),
                              }))}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
