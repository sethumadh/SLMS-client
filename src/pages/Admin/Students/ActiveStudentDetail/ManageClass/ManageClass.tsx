import Select, { SingleValue } from "react-select"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useParams } from "react-router-dom"

import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { api } from "@/api/api"
import { z } from "zod"
import { assignClassSchema } from "@/types/Admin/class/class"
import OverlayLoadingspinner from "@/components/OverlayLoadingspinner"
import Icons from "@/constants/icons"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import AssignClassModal from "@/components/Modal/AssignClassModal"
import ActiveClassToggle from "@/components/Student/ActiveStudent/ManageClass/ActiveClassToggle"

export type AssignClassSchema = z.infer<typeof assignClassSchema>
export type AssignClassData = {
  studentId: string
  termId: string
  subjectName: string
  levelName: string
  sectionName: string
}
function ManageClass() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const [optionSubject, setOptionSubject] = useState<{
    value: string
    label: string
  }>()
  const [currentLevel, setCurrentLevel] = useState<{
    value: string
    label: string
  } | null>(null)

  const { data: currentTerm, isLoading } = useQuery({
    queryKey: [
      api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
    ],
    queryFn: api.admin.term.currentTerm.findCurrentTermAdministration.query,
  })
  const {
    data: activeStudentEnrolledSubjectsData,
    isLoading: activeStudentEnrolledSubjectsDataIsLoading,
  } = useQuery({
    queryKey: [
      api.students.activeStudent.findActiveStudentEnrolledSubjects.querykey,
      params.id,
      currentTerm?.id,
    ],
    queryFn: () => {
      if (params.id && currentTerm?.id) {
        return api.students.activeStudent.findActiveStudentEnrolledSubjects.query(
          params.id,
          currentTerm?.id
        )
      }
    },
    enabled: !!params.id && !!currentTerm?.id,
  })

  const { data: currentTermData, isLoading: currentTermLoading } = useQuery({
    queryKey: [
      api.students.activeStudent.findCurrentTermToAssignClassClass.querykey,
    ],
    queryFn: api.students.activeStudent.findCurrentTermToAssignClassClass.query,
  })

  const currentTermSubjectData: { value: string; label: string }[] | undefined =
    useMemo(() => {
      return activeStudentEnrolledSubjectsData?.map((s) => ({
        value: s.subjectName,
        label: capitalizeFirstCharacter(s.subjectName),
      }))
    }, [activeStudentEnrolledSubjectsData])
  const { data: assignedClassesData, isLoading: assignedClassesDataLoading } =
    useQuery({
      queryKey: [
        api.students.activeStudent.findUniqueStudentClassDetails.querykey,
      ],
      queryFn: () => {
        if (params.id) {
          return api.students.activeStudent.findUniqueStudentClassDetails.query(
            params.id
          )
        }
      },
      enabled: !!params.id,
    })
  const classes = useMemo(() => {
    return assignedClassesData?.map((classHistory) => {
      const subjectName = classHistory.termSubjectLevel.subject.name
      const levelName = classHistory.termSubjectLevel.level.name
      const sectionName = classHistory.section.name
      return {
        className: `${subjectName} ${levelName} ${sectionName}`,
        isCurrentlyAssigned: classHistory.isCurrentlyAssigned,
        id: classHistory.id,
      }
    })
  }, [assignedClassesData])
  console.log(classes)
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

  // const sectionData
  const currentTermSectionData = useMemo(() => {
    // Find termSubjectLevel data for the selected subject and level
    const termSubjectLevelData = currentTermData?.termSubjectLevel.find(
      (tsl) =>
        tsl.subject.name === optionSubject?.value &&
        tsl.level.name === currentLevel?.value
    )
    return (
      termSubjectLevelData?.sections.map((section) => ({
        value: section.name,
        label: section.name,
      })) ?? []
    )
  }, [currentTermData?.termSubjectLevel, optionSubject, currentLevel])

  const methods = useForm<AssignClassSchema>({
    resolver: zodResolver(assignClassSchema),
    defaultValues: {
      sectionName: "",
    },
  })
  const { formState, control } = methods

  const onSubmit: SubmitHandler<AssignClassSchema> = (values) => {
    if (
      currentTermData?.id &&
      params.id &&
      optionSubject?.value &&
      currentLevel?.value
    ) {
      const assignClassData: AssignClassData = {
        studentId: params.id?.toString(),
        termId: currentTermData.id.toString(),
        subjectName: optionSubject?.value,
        levelName: currentLevel?.value,
        sectionName: values.sectionName,
      }
      console.log(assignClassData)
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "assignClass",
          data: {
            value: assignClassData,
          },
        })
      )
    }
  }

  return (
    <div className="container my-4 py-12">
      <div>
        <div className="px-4 sm:px-0 mt-4 lg:mt-8">
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Current Term
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Assign Classes for current term
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
                        {currentTermLoading ||
                        activeStudentEnrolledSubjectsDataIsLoading ||
                        isLoading ||
                        assignedClassesDataLoading ? (
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
                    choose enrolled subject{" "}
                    <span className="text-red-600">*</span>
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
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        noValidate
                      >
                        <>
                          {" "}
                          <Controller
                            control={control}
                            name="sectionName"
                            render={({ field }) => (
                              <Select
                                {...field}
                                id="subject"
                                isDisabled={
                                  currentTermLevelData.length == 0 ||
                                  !currentLevel
                                }
                                isClearable
                                isSearchable
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                options={currentTermSectionData}
                                value={currentTermSectionData.find(
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
                          <div className="h-4">
                            {formState.errors.sectionName?.message && (
                              <span className="text-xs text-red-600">
                                {formState.errors.sectionName?.message}
                              </span>
                            )}
                          </div>
                        </>

                        <div className="mt-8">
                          <button className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Assign Class to student
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
        <AssignClassModal />
      </div>
      <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4">
        <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900 ">
            View and Manage Classes for current term.
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-6 text-red-500 italic ">
            *brief description for this section here.
          </p>
        </div>
        <Link
          to=".."
          className="text-blue-300 italic text-sm flex justify-center items-center"
        >
          <span>
            <Icons.Undo2 className="w-4 h-4" />
          </span>
          <p className="hidden sm:block sm:text-sm">Go Back</p>
        </Link>
      </div>
      {classes &&
        classes?.map((cls) => (
          <>
            <div key={cls.id} className="mt-6 border-t border-gray-100">
              <ActiveClassToggle
                className={cls.className}
                id={cls.id.toString()}
                isCurrentlyAssigned={cls.isCurrentlyAssigned}
              />
            </div>
          </>
        ))}
    </div>
  )
}

export default ManageClass
