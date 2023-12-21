import { z } from "zod"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import ReactDatePicker from "react-datepicker"
import Select, { SingleValue } from "react-select"

import { createTermWithSubjectSchema } from "@/types/Admin/term/term"
import SubjectCreate from "./SubjectCreate"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { useEffect, useMemo, useState } from "react"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { useAppSelector } from "@/redux/store"
import { removeDuplicates } from "@/helpers/removeDuplicates"

const options = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "TERM", label: "Term" },
]

export type CreateTermWithSubjectSchema = z.infer<
  typeof createTermWithSubjectSchema
>
function Create() {
  const data = useAppSelector((state) => state.term)

  // const { data: allGroupData, isLoading: allGroupLoading } = useQuery({
  //   queryKey: [api.admin.groups.findAllGroups.querykey],
  //   queryFn: api.admin.groups.findAllGroups.query,
  // })
  const { data: allLevelsData, isLoading: allLevelsLoading } = useQuery({
    queryKey: [api.admin.levels.findAllLevels.querykey],
    queryFn: api.admin.levels.findAllLevels.query,
  })
  const { data: allSubjectData, isLoading: allSubjectLoading } = useQuery({
    queryKey: [api.admin.subjects.findAllSubjects.querykey],
    queryFn: api.admin.subjects.findAllSubjects.query,
  })

  const [newSubjects, setNewSubjects] =
    useState<{ value: string; label: string }[]>()
  const [newLevels, setNewLevels] =
    useState<{ value: string; label: string }[]>()
  const subjectData: { value: string; label: string }[] | undefined =
    useMemo(() => {
      return allSubjectData?.map((s) => ({
        value: s.name,
        label: capitalizeFirstCharacter(s.name),
        isDisabled: !s.isActive,
      }))
    }, [allSubjectData])
  const levelData: { value: string; label: string }[] | undefined =
    useMemo(() => {
      return allLevelsData?.map((l) => ({
        value: l.name,
        label: capitalizeFirstCharacter(l.name),
        isDisabled: !l.isActive,
      }))
    }, [allLevelsData])

  useEffect(() => {
    if (!allLevelsLoading) {
      const levels = data.groupSubjects
        .flatMap((groupSubject) =>
          groupSubject.subjects.flatMap((subject) => subject.levels)
        )
        .map((l) => ({
          value: l,
          label: capitalizeFirstCharacter(l),
        }))
      const uniqueLevelOptions = [...(levelData ?? []), ...levels].filter(
        (obj, index, self) =>
          index ===
          self.findIndex((t) => t.value === obj.value && t.label === obj.label)
      )
      const uniqueList = removeDuplicates(uniqueLevelOptions)
      setNewLevels([...uniqueList])
    }
    if (!allSubjectLoading) {
      const subjectNames = data.groupSubjects
        .flatMap((groupSubject) =>
          groupSubject.subjects.map((subject) => subject.subjectName)
        )
        .map((s) => ({
          value: s,
          label: capitalizeFirstCharacter(s),
        }))
        .filter((s) => s.value !== "" && s.label !== "")
      const uniqueSubjectOptions = [
        ...(subjectData ?? []),
        ...subjectNames,
      ].filter(
        (obj, index, self) =>
          index ===
          self.findIndex((t) => t.value === obj.value && t.label === obj.label)
      )
      const uniqueList = removeDuplicates(uniqueSubjectOptions)

      setNewSubjects([...uniqueList])
    }
  }, [
    levelData,
    levelData?.length,
    allLevelsLoading,
    subjectData,
    allSubjectLoading,
    data.groupSubjects,
  ])

  const { control, register, formState } =
    useFormContext<CreateTermWithSubjectSchema>()
  const {
    fields: groupSubjectsFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    name: "groupSubjects",
    control,
  })

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-4">
        <div className="px-4 sm:px-0 md:col-span-1">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create Term and subject details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            You can review this information in next section.
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
                          {...register("termName")}
                          type="text"
                          className="block sm:w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="h-4">
                        {formState.errors.termName?.message && (
                          <span className="text-xs text-red-600">
                            {formState.errors.termName?.message}
                          </span>
                        )}
                      </div>
                    </label>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Term Start Date
                        <span className="text-red-600">*</span>
                        <div className="mt-2">
                          <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                            <Controller
                              name="startDate"
                              control={control}
                              render={({ field }) => (
                                <ReactDatePicker
                                  className="peer block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholderText="Select date"
                                  onChange={(date: Date) =>
                                    field.onChange(date)
                                  }
                                  selected={field.value}
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  showIcon
                                  icon={
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 48 48"
                                    >
                                      <mask id="ipSApplication0">
                                        <g
                                          fill="none"
                                          stroke="#fff"
                                          strokeLinejoin="round"
                                          strokeWidth="4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            d="M40.04 22v20h-32V22"
                                          ></path>
                                          <path
                                            fill="#fff"
                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                          ></path>
                                        </g>
                                      </mask>
                                      <path
                                        fill="currentColor"
                                        d="M0 0h48v48H0z"
                                        mask="url(#ipSApplication0)"
                                      ></path>
                                    </svg>
                                  }
                                />
                              )}
                            />
                          </div>
                        </div>
                      </label>
                      <div className="h-4">
                        {formState.errors.startDate?.message && (
                          <span className="text-xs text-red-600">
                            {formState.errors.startDate?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Term End Date<span className="text-red-600">*</span>
                        <div className="mt-2">
                          <div className="sm:col-span-2 sm:mt-0 relative mt-2">
                            <Controller
                              name="endDate"
                              control={control}
                              render={({ field }) => (
                                <ReactDatePicker
                                  className="peer block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholderText="Select date"
                                  onChange={(date: Date) =>
                                    field.onChange(date)
                                  }
                                  selected={field.value}
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  showIcon
                                  icon={
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 48 48"
                                    >
                                      <mask id="ipSApplication0">
                                        <g
                                          fill="none"
                                          stroke="#fff"
                                          strokeLinejoin="round"
                                          strokeWidth="4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            d="M40.04 22v20h-32V22"
                                          ></path>
                                          <path
                                            fill="#fff"
                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                          ></path>
                                        </g>
                                      </mask>
                                      <path
                                        fill="currentColor"
                                        d="M0 0h48v48H0z"
                                        mask="url(#ipSApplication0)"
                                      ></path>
                                    </svg>
                                  }
                                />
                              )}
                            />
                          </div>
                        </div>
                      </label>
                      <div className="h-4">
                        {formState.errors.endDate?.message && (
                          <span className="text-xs text-red-600">
                            {formState.errors.endDate?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* eof term */}

                {groupSubjectsFields.map((field, index) => (
                  <div
                    key={field.id}
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
                          className="block sm:w-1/2 disabled:bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Group-name"
                          {...register(
                            `groupSubjects.${index}.groupName` as const
                          )}
                        />
                        <div className="">
                          {formState.errors?.groupSubjects?.message ===
                            "Group names must be unique within a term" && (
                            <span className="text-xs text-red-600">
                              {formState.errors?.groupSubjects?.message}
                            </span>
                          )}
                          {formState.errors?.groupSubjects &&
                            formState.errors?.groupSubjects[index]?.groupName
                              ?.message && (
                              <span className="text-xs text-red-600">
                                {
                                  formState.errors?.groupSubjects[index]
                                    ?.groupName?.message
                                }
                              </span>
                            )}
                        </div>
                      </label>
                      <div className="flex gap-8">
                        <label
                          htmlFor="fee"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Fee<span className="text-red-600">*</span>
                          <input
                            id="fee"
                            type="text"
                            placeholder="200"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register(`groupSubjects.${index}.fee` as const)}
                          />
                          <div className="">
                            {formState.errors.groupSubjects &&
                              formState.errors?.groupSubjects[index]?.fee
                                ?.message && (
                                <span className="text-xs text-red-600">
                                  {
                                    formState.errors?.groupSubjects[index]?.fee
                                      ?.message
                                  }
                                </span>
                              )}
                          </div>
                        </label>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Fee Interval
                            <span className="text-red-600">*</span>
                          </label>

                          <Controller
                            defaultValue="MONTHLY"
                            name={`groupSubjects.${index}.feeInterval` as const}
                            control={control}
                            render={({ field }) => (
                              <Select
                                className="w-40"
                                isSearchable={false}
                                {...field}
                                options={options}
                                value={options.find(
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
                        <div className="">
                          {formState.errors.groupSubjects &&
                            formState.errors?.groupSubjects[index]?.feeInterval
                              ?.message && (
                              <span className="text-xs text-red-600">
                                {
                                  formState.errors?.groupSubjects[index]
                                    ?.feeInterval?.message
                                }
                              </span>
                            )}
                        </div>
                      </div>
                      {newLevels && newSubjects && (
                        <SubjectCreate
                          newLevels={newLevels}
                          newSubjects={newSubjects}
                          setNewLevels={setNewLevels}
                          setNewSubjects={setNewSubjects}
                          {...{ control, register }}
                          index={index}
                        />
                      )}
                    </div>
                    <div className="">
                      {index === 0 ? (
                        <div className="flex items-center  justify-evenly mt-8 gap-8">
                          <div className=" text-slate-400 text-center bg-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-not-allowed ">
                            Delete Group
                          </div>
                          <div className="flex justify-center items-center mt-2 ">
                            {" "}
                            {/* Add items-center if vertical centering is needed */}
                            <button
                              className="disabled:cursor-not-allowed disabled:bg-slate-300 max-w-max text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              type="button"
                              onClick={() => {
                                appendGroup({
                                  groupName: "",
                                  fee: "",
                                  feeInterval: "TERM",
                                  subjects: [
                                    {
                                      subjectName: "",
                                      levels: [],
                                    },
                                  ],
                                })
                              }}
                            >
                              Add Group
                            </button>
                          </div>
                        </div>
                      ) : (
                        index > 0 && (
                          <div className="flex items-center justify-evenly mt-8 gap-8">
                            {!formState.isSubmitting && (
                              <div
                                onClick={() => {
                                  removeGroup(index)
                                }}
                                className="flex flex-col items-center cursor-pointer text-red-500 text-center disabled:bg-slate-300  bg-white hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              >
                                Delete Group
                              </div>
                            )}

                            <div className="flex flex-col justify-center items-center mt-2 ">
                              {" "}
                              {/* Add items-center if vertical centering is needed */}
                              <button
                                className="disabled:cursor-not-allowed text-lg disabled:bg-slate-300 max-w-max text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                type="button"
                                onClick={() => {
                                  appendGroup({
                                    groupName: "",
                                    fee: "",
                                    feeInterval: "TERM",
                                    subjects: [
                                      {
                                        subjectName: "",
                                        levels: [],
                                      },
                                    ],
                                  })
                                }}
                              >
                                Add Group
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* eof */}
        </div>
      </div>
    </div>
  )
}

export default Create
