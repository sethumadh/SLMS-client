import Select, { MultiValue } from "react-select"
import { useQuery } from "@tanstack/react-query"
import CreatableSelect from "react-select/creatable"
import { useEffect, useMemo, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { api } from "@/api/api"
import { z } from "zod"
import { createClassWithSectionsSchema } from "@/types/Admin/class/class"
import OverlayLoadingspinner from "@/components/OverlayLoadingspinner"
import Icons from "@/constants/icons"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import CreateClassModal from "@/components/Modal/CreateClassModal"

export type CreateClassWithSectionsSchema = z.infer<
  typeof createClassWithSectionsSchema
>
export type CreateClassData = {
  termId: number
  subjectName: string
  levelName: string
  sections: string[]
}
function CreateClass() {
  const dispatch = useAppDispatch()
  const [optionSubject, setOptionSubject] = useState<{
    value: string
    label: string
  }>()
  const [currentLevel, setCurrentLevel] = useState<{
    value: string
    label: string
  } | null>(null)
  const [currentTermSectionData, setCurrentTermSectionData] = useState<
    {
      value: string
      label: string
    }[]
  >()

  const { data: currentTermData, isLoading: currentTermLoading } = useQuery({
    queryKey: [api.admin.classes.findCurrentTermForManageClass.querykey],
    queryFn: api.admin.classes.findCurrentTermForManageClass.query,
  })
  const { data: sectionData, isLoading: sectionDataLoading } = useQuery({
    queryKey: [api.admin.classes.findSectionsForManageClass.querykey],
    queryFn: api.admin.classes.findSectionsForManageClass.query,
  })
  //   const { data: publishTermData, isLoading: publishTermLoading } = useQuery({
  //     queryKey: [api.admin.classes.findPublishTermForManageClass.querykey],
  //     queryFn: api.admin.classes.findPublishTermForManageClass.query,
  //   })

  const currentTermSubjectData: { value: string; label: string }[] | undefined =
    useMemo(() => {
      return currentTermData?.termSubject?.map((s) => ({
        value: s.subject.name,
        label: capitalizeFirstCharacter(s.subject.name),
        isDisabled: !s.subject.isActive,
      }))
    }, [currentTermData?.termSubject])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionSubject = (option: any) => {
    setOptionSubject(option)
    setCurrentLevel(null)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCurrentLevel = (option: any) => {
    setCurrentLevel(option)
  }

  const currentTermLevelData = useMemo(() => {
    const optedTermData = currentTermData?.termSubject?.find(
      (s) => s.subject.name === optionSubject?.value
    )
    return (
      optedTermData?.level.map((l) => ({
        value: l.name,
        label: capitalizeFirstCharacter(l.name),
      })) ?? []
    )
  }, [optionSubject, currentTermData?.termSubject])

  useEffect(() => {
    const transformedData = sectionData?.map((s) => ({
      value: s.name,
      label: capitalizeFirstCharacter(s.name),
    }))

    setCurrentTermSectionData(transformedData || [])
  }, [sectionData, currentTermData?.termSubject])

  const methods = useForm<CreateClassWithSectionsSchema>({
    resolver: zodResolver(createClassWithSectionsSchema),
    defaultValues: {
      sectionName: [],
    },
  })
  const { control, formState } = methods
  console.log(sectionData)
  const onSubmit = (values: CreateClassWithSectionsSchema) => {
    if (currentTermData?.id && optionSubject?.value && currentLevel?.value) {
      const createClassData: CreateClassData = {
        termId: currentTermData.id,
        subjectName: optionSubject?.value,
        levelName: currentLevel?.value,
        sections: values.sectionName,
      }
      console.log(createClassData)
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "createClass",
          data: {
            value: createClassData,
          },
        })
      )
    }
  }

  return (
    <div className="container">
      <div className="px-4 sm:px-0 mt-4 lg:mt-8">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Current Term
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add /delete sections for current term
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Term Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <div
                      id="website"
                      className="bg-slate-300 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="www.example.com"
                    >
                      {currentTermLoading ? (
                        <>
                          <OverlayLoadingspinner />
                        </>
                      ) : (
                        <>
                          {currentTermData?.name &&
                            capitalizeFirstCharacter(currentTermData?.name)}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  choose subject <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Select
                    isClearable
                    isSearchable
                    options={currentTermSubjectData}
                    onChange={handleOptionSubject}
                    id="website"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="--Select--"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  choose a level
                  <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Select
                    isClearable
                    isSearchable
                    isDisabled={currentTermLevelData.length == 0}
                    value={currentLevel}
                    options={currentTermLevelData}
                    onChange={handleCurrentLevel}
                    id="website"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="--Select--"
                  />
                </div>
                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="sections"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject Sections
                    <span className="text-red-600">*</span>
                  </label>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                      {sectionDataLoading ? (
                        <>
                          <OverlayLoadingspinner />
                        </>
                      ) : (
                        <>
                          <Controller
                            key="sections"
                            name="sectionName"
                            control={control}
                            render={({ field }) => (
                              <CreatableSelect
                                id="subject"
                                isMulti
                                isDisabled={
                                  currentTermLevelData.length == 0 ||
                                  !currentLevel
                                }
                                isClearable
                                isSearchable
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                options={currentTermSectionData}
                                {...field}
                                value={currentTermSectionData?.filter(
                                  (section) =>
                                    field?.value?.includes(section?.value)
                                )}
                                onChange={(
                                  section: MultiValue<{
                                    value: string
                                    label: string
                                  }>
                                ) =>
                                  field.onChange(section.map((s) => s.value))
                                }
                                onCreateOption={(inputValue) => {
                                  const newOption = {
                                    value: inputValue,
                                    label: inputValue,
                                  }
                                  setCurrentTermSectionData((prev) => {
                                    const s =
                                      prev?.length && prev?.length > 0
                                        ? [...prev]
                                        : []
                                    return [...s, newOption]
                                  })
                                  field.onChange([...field.value, inputValue])
                                }}
                              />
                            )}
                          />
                          <div className="h-4">
                            {formState.errors.sectionName?.message && (
                              <span className="text-xs text-red-600">
                                {formState.errors.sectionName?.message}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                      <div className="mt-8">
                        <button className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Create Class
                          <Icons.CheckCircleIcon
                            className="-mr-0.5 h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <CreateClassModal />
    </div>
  )
}

export default CreateClass
