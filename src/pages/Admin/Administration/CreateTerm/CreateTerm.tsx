/* trunk-ignore-all(prettier) */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form"
import { toast } from "react-toastify"
import { useEffect, useMemo, useState } from "react"
import ReactDatePicker from "react-datepicker"
import Select, { MultiValue, SingleValue } from "react-select"
import CreatableSelect from "react-select/creatable"

import Icons from "@/constants/icons"
import { formatDate } from "@/helpers/dateFormatter"
import LoadingSpinner from "@/components/Loadingspinner"

import { createTermWithSubjectSchema } from "@/types/Admin/Term/Term"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { api } from "@/api/api"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import OverloayLoadingspinner from "@/components/OverloayLoadingspinner"

const options = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "TERM", label: "Term" },
]
const levels = [
  { value: "beginner", label: "static Beginner" },
  { value: "intermediate", label: "static  Intermediate" },
  { value: "advanced", label: "static Advanced" },
]
export type CreateTermWithSubjectSchema = z.infer<
  typeof createTermWithSubjectSchema
>


function CreateTerm() {
  const dispatch = useAppDispatch()
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [api.admin.levels.findAllLevels.querykey],
    queryFn: api.admin.levels.findAllLevels.query,
  })
  const [newLevels, setNewLevels] =
    useState<{ value: string; label: string }[]>()
  const levelData: { value: string; label: string }[] | undefined =
    useMemo(() => {
      return (
        data?.map((l) => ({
          value: l.name,
          label: capitalizeFirstCharacter(l.name),
        })) || levels
      )
    }, [data])

  useEffect(() => {
    if (levelData?.length && !isLoading && levelData?.length > 0) {
      setNewLevels(levelData)
    }
  }, [levelData, isLoading])

  const createTermWithSubjectMethods = useForm<CreateTermWithSubjectSchema>({
    resolver: zodResolver(createTermWithSubjectSchema),
    defaultValues: {
      termName: "",
      startDate: new Date(),
      endDate: new Date(),
      subjects: [
        {
          subject: "",
          fee: "",
          feeInterval: "MONTHLY",
          levels: [""],
        },
      ],
    },
    shouldFocusError: true,
  })
  const { control, register, formState } = createTermWithSubjectMethods
  const { fields, append, remove } = useFieldArray({
    name: "subjects",
    control,
  })

  const onTermCreateWithSubjectSubmit = async (
    values: CreateTermWithSubjectSchema
  ) => {
    console.log(values)
  }

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
          <FormProvider {...createTermWithSubjectMethods}>
            <form
              className="flex flex-col gap-4"
              onSubmit={createTermWithSubjectMethods.handleSubmit(
                onTermCreateWithSubjectSubmit
              )}
              noValidate
            >
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
                                  control={createTermWithSubjectMethods.control}
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
                                  control={createTermWithSubjectMethods.control}
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

                    {fields.map((field, index) => (
                      <div key={field.id} className="sm:col-span-6">
                        <div className="flex flex-col gap-4 shadow-sm px-4 py-2 rounded-lg border">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Subject Name<span className="text-red-600">*</span>
                            <input
                              id="name"
                              type="text"
                              placeholder="Maths"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              {...register(
                                `subjects.${index}.subject` as const
                              )}
                            />
                            <div className="">
                              {formState.errors.subjects &&
                                formState.errors?.subjects[index]?.subject
                                  ?.message && (
                                  <span className="text-xs text-red-600">
                                    {
                                      formState.errors?.subjects[index]?.subject
                                        ?.message
                                    }
                                  </span>
                                )}
                            </div>
                          </label>
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
                              {...register(`subjects.${index}.fee` as const)}
                            />
                            <div className="">
                              {formState.errors.subjects &&
                                formState.errors?.subjects[index]?.fee
                                  ?.message && (
                                  <span className="text-xs text-red-600">
                                    {
                                      formState.errors?.subjects[index]?.fee
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
                              name={`subjects.${index}.feeInterval`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  className="sm:w-1/2"
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
                            {formState.errors.subjects &&
                              formState.errors?.subjects[index]?.feeInterval
                                ?.message && (
                                <span className="text-xs text-red-600">
                                  {
                                    formState.errors?.subjects[index]
                                      ?.feeInterval?.message
                                  }
                                </span>
                              )}
                          </div>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="gender"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Subject levels
                              <span className="text-red-600">*</span>
                            </label>
                            {isLoading ? (
                              <OverloayLoadingspinner />
                            ) : (
                              <Controller
                                name={`subjects.${index}.levels`}
                                control={control}
                                render={({ field }) => (
                                  <CreatableSelect
                                    isClearable
                                    isMulti
                                    options={newLevels}
                                    className="no-outline"
                                    {...field}
                                    value={newLevels?.filter((level) =>
                                      field?.value?.includes(level?.value)
                                    )}
                                    onChange={(
                                      level: MultiValue<{
                                        value: string
                                        label: string
                                      }>
                                    ) =>
                                      field.onChange(
                                        level.map((level) => level.value)
                                      )
                                    }
                                    onCreateOption={(inputValue) => {
                                      const newOption = {
                                        value: inputValue,
                                        label: inputValue,
                                      }
                                      setNewLevels((prev) => {
                                        const l =
                                          prev?.length && prev?.length > 0
                                            ? [...prev]
                                            : []
                                        return [...l, newOption]
                                      })
                                      field.onChange([
                                        ...field.value,
                                        inputValue,
                                      ])
                                    }}
                                  />
                                )}
                              />
                            )}
                          </div>
                          <div className="">
                            {formState.errors.subjects &&
                              formState.errors?.subjects[index]?.levels
                                ?.message && (
                                <span className="text-xs text-red-600">
                                  {
                                    formState.errors?.subjects[index]?.levels
                                      ?.message
                                  }
                                </span>
                              )}
                          </div>

                          {index === 0 ? (
                            <div className="flex flex-col items-center ">
                              <div className=" text-slate-400 text-center bg-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-not-allowed ">
                                <Icons.Trash2 />
                              </div>
                              {/* <div className="h-4 w-4"></div> */}
                            </div>
                          ) : (
                            index > 0 && (
                              <div className=" flex flex-col items-center justify-center ">
                                {!createTermWithSubjectMethods.formState
                                  .isSubmitting && (
                                  <div
                                    onClick={() => {
                                      remove(index)
                                    }}
                                    className="flex flex-col items-center cursor-pointer text-red-500 text-center  disabled:bg-slate-300  bg-white hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  >
                                    <Icons.Trash2 />
                                  </div>
                                )}

                                <h1 className="text-muted-foreground text-xs italic">
                                  Click{" "}
                                  <span className="font-light">delete</span>{" "}
                                  icon to delete entire subject section
                                </h1>
                                {/* <div className="h-4 w-4"></div> */}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                {" "}
                {/* Add items-center if vertical centering is needed */}
                <button
                  className="disabled:cursor-not-allowed disabled:bg-slate-300 max-w-max text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => {
                    append({
                      fee: "",
                      subject: "",
                      feeInterval: "MONTHLY",
                      levels: [],
                    })
                  }}
                >
                  <Icons.PlusIcon className="w-5 h-5" />
                </button>
                <h1 className="text-muted-foreground ">
                  Click <span className="font-semibold">Add</span> to add a new
                  Subject Section
                </h1>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Icons.CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Button text
              </button>
              {/* eof */}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default CreateTerm