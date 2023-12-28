import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import Select, { MultiValue } from "react-select"

import Icons from "@/constants/icons"
import { enrolledStudentSubjectDetailSchema } from "@/types/Admin/student/enrolledStudentSchema"
import { useAppDispatch } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { setOpenModal } from "@/redux/slice/modalSlice"
import OverlayLoadingspinner from "@/components/OverlayLoadingspinner"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { formatDate } from "@/helpers/dateFormatter"
import EnrollStudentModal from "@/components/Modal/EnrollStudentModal"
import DeEnrollStudentModal from "@/components/Modal/DeEnrollStudentModal"
import EnrollToActiveStudentModal from "@/components/Modal/EnrollToActiveStudentModal"

export type EnrolledStudentSubjectDetailSchema = z.infer<
  typeof enrolledStudentSubjectDetailSchema
>

type studentEnrollData = {
  enrolledStudentId: number
  enrollData: {
    subject: string
    termSubjectGroupId: number
    subjectGroupId: number
    termId: number
    feeId: number
    termSubjectId: number
  }[]
}
function ManageAndEnroll() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const [subjectOptions, setSubjectOptions] = useState<
    { label: string; value: string }[]
  >([])

  const { data: currentTerm } = useQuery({
    queryKey: [
      api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
    ],
    queryFn: api.admin.term.currentTerm.findCurrentTermAdministration.query,
  })
  const methods = useForm<EnrolledStudentSubjectDetailSchema>({
    resolver: zodResolver(enrolledStudentSubjectDetailSchema),

    defaultValues: {
      enrolledSubjects: [""],
    },
  })
  const { control, formState } = methods
  // De enroll
  const deEnrollMethods = useForm<EnrolledStudentSubjectDetailSchema>({
    resolver: zodResolver(enrolledStudentSubjectDetailSchema),
    defaultValues: {
      enrolledSubjects: [""],
    },
  })
  const { control: deEnrollControl, formState: deEnrollFormState } =
    deEnrollMethods
  const {
    data: enrolledStudentData,
    isLoading: enrolledStudentDataIsLoading,
    isError: enrolledStudentDataIsError,
  } = useQuery({
    queryKey: [
      api.students.lateEnrolledStudent.findLateEnrolledStudentById.querykey,
      params?.id,
      currentTerm?.id,
    ],
    // findLateEnrolledStudentEnrolledSubjects:
    queryFn: () => {
      if (params.id && currentTerm?.id) {
        return api.students.lateEnrolledStudent.findLateEnrolledStudentById.query(
          params.id
        )
      }
    },
    enabled: !!params.id,
  })
  const {
    data: termToEnrollData,
    isLoading: termToEnrollDataIsLoading,
    isError: termToEnrollDataIsError,
  } = useQuery({
    queryKey: [
      api.students.lateEnrolledStudent.findTermToEnrollLateEnrolledStudent
        .queryKey,
    ],
    queryFn:
      api.students.lateEnrolledStudent.findTermToEnrollLateEnrolledStudent
        .query,

    enabled: !!params.id,
  })
  const {
    data: enrolledStudentEnrolledData,
    isLoading: enrolledStudentEnrolledDataIsLoading,
    isError: enrolledStudentEnrolledDataIsError,
  } = useQuery({
    queryKey: [
      api.students.lateEnrolledStudent.findLateEnrolledStudentEnrolledSubjects
        .queryKey,
    ],
    queryFn: () => {
      if (params.id && currentTerm?.id) {
        return api.students.lateEnrolledStudent.findLateEnrolledStudentEnrolledSubjects.query(
          params.id,
          currentTerm?.id
        )
      }
    },

    enabled: !!params.id,
  })
  console.log(enrolledStudentEnrolledData)
  useEffect(() => {
    if (termToEnrollData?.termSubject) {
      const transformedSubjectOptions = termToEnrollData?.termSubject?.map(
        (item) => {
          const name = item.subject.name
          return {
            label: name.charAt(0).toUpperCase() + name.slice(1),
            value: name,
          }
        }
      )
      setSubjectOptions(transformedSubjectOptions)
    }
  }, [termToEnrollData])
  console.log(
    enrolledStudentData,
    termToEnrollData,
    enrolledStudentEnrolledData
  )
  const subjectRelated = enrolledStudentData?.subjectRelated
  const subjectsChosen = enrolledStudentData?.subjectsChosen

  const onSubmit = (values: EnrolledStudentSubjectDetailSchema) => {
    if (termToEnrollData?.termSubject && enrolledStudentData?.id) {
      const enrollData: studentEnrollData["enrollData"] =
        termToEnrollData?.termSubject
          .filter((item) => values.enrolledSubjects.includes(item.subject.name))
          .map((item) => {
            return {
              subject: item.subject.name,
              termSubjectGroupId: item.termSubjectGroup.id,
              subjectGroupId: item.termSubjectGroup.subjectGroupId,
              termId: item.termSubjectGroup.termId,
              feeId: item.termSubjectGroup.feeId,
              termSubjectId: item.id,
            }
          })

      const studentEnrollData: studentEnrollData = {
        enrolledStudentId: enrolledStudentData?.id,
        enrollData,
      }
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "enrollStudent",
          data: {
            value: studentEnrollData,
          },
        })
      )
    }
  }
  const onDeEnrollSubmit = (values: EnrolledStudentSubjectDetailSchema) => {
    if (termToEnrollData?.termSubject && enrolledStudentData?.id) {
      const enrollData: studentEnrollData["enrollData"] =
        termToEnrollData?.termSubject
          .filter((item) => values.enrolledSubjects.includes(item.subject.name))
          .map((item) => {
            return {
              subject: item.subject.name,
              termSubjectGroupId: item.termSubjectGroup.id,
              subjectGroupId: item.termSubjectGroup.subjectGroupId,
              termId: item.termSubjectGroup.termId,
              feeId: item.termSubjectGroup.feeId,
              termSubjectId: item.id,
            }
          })

      const studentEnrollData: studentEnrollData = {
        enrolledStudentId: enrolledStudentData?.id,
        enrollData,
      }
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "deEnrollStudent",
          data: {
            value: studentEnrollData,
          },
        })
      )
    }
  }

  return (
    <div className="sm:py-12">
      {enrolledStudentDataIsLoading ||
      termToEnrollDataIsLoading ||
      enrolledStudentEnrolledDataIsLoading ? (
        <>
          <div className="h-[600px] font-medium text-lg flex justify-center items-center">
            <div>
              <OverlayLoadingspinner />
            </div>
          </div>
        </>
      ) : !enrolledStudentDataIsError ||
        !termToEnrollDataIsError ||
        !enrolledStudentEnrolledDataIsError ? (
        <div className="sm:py-12">
          <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
            <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
              <h3 className="sm:text-base font-semibold leading-7 text-gray-900  ">
                Manage Subjects and Classes
              </h3>
              <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
                * add or change subjects and classes.
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
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mt-4 border rounded-xl p-4"
          >
            <div className="col-span-2  sm:px-4 sm:py-2 ">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Subjects opted by student
                  </dt>

                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {subjectsChosen?.join(", ")}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Options chosed by student
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {subjectRelated?.join(" ")}
                  </dd>
                </div>
              </dl>
            </div>
          </ul>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mt-4 border rounded-xl p-4"
          >
            <div className="col-span-2  sm:px-4 sm:py-2 ">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                    Subjects enrolled by student
                  </dt>

                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {enrolledStudentEnrolledData &&
                      enrolledStudentEnrolledData
                        .map((sub) => {
                          return capitalizeFirstCharacter(sub.subjectName)
                        })
                        .join(", ")}
                    {enrolledStudentEnrolledData?.length === 0 && (
                      <>
                        <div className="font-medium  text-base">
                          No subjects Enrolled yet
                        </div>
                      </>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </ul>

          <div className="flex gap-4 my-12">
            <div className="px-8 py-4 shadow-md rounded-lg ">
              <div className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Enroll Student to{" "}
                  <span className="font-medium underline underline-offset-4">
                    {currentTerm?.name &&
                      capitalizeFirstCharacter(currentTerm?.name)}
                  </span>
                </h3>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4  mb-1">
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Term Details
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            This is the upcoming term for you school where you
                            will choose subject groups and related subjects to
                            enroll
                          </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="termName"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Term Name
                            </label>
                            <div className="mt-2">
                              <div className="bg-slate-100 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <div className="disabled:bg-slate-50 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                  {termToEnrollData?.name &&
                                    capitalizeFirstCharacter(
                                      termToEnrollData?.name
                                    )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Term Period
                            </label>
                            <div className="mt-2">
                              <div className="bg-slate-100 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <div className="disabled:bg-slate-50 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                  <span className="font-medium">
                                    {termToEnrollData?.startDate &&
                                      formatDate(termToEnrollData.startDate)}
                                  </span>
                                  <span> to </span>
                                  <span className="font-medium">
                                    {termToEnrollData?.endDate &&
                                      formatDate(termToEnrollData?.endDate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                              {/* to do. enable link to term list */}
                              To see more details of this term see term list in
                              Administration tab or click{" "}
                              <Link
                                to={
                                  "/admin/administration/manage-term/all-terms"
                                }
                                className="text-blue-500"
                              >
                                {" "}
                                here
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Subject Details
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose multiple subjects to enroll.
                          </p>
                        </div>

                        <div className="flex flex-col gap-4 py-2 rounded-lg">
                          <label
                            htmlFor="group"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Subjects<span className="text-red-600">*</span>
                          </label>
                          <Controller
                            name="enrolledSubjects"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                isMulti
                                className="w-60"
                                options={subjectOptions}
                                value={subjectOptions?.filter((option) =>
                                  field?.value?.includes(option?.value)
                                )}
                                onChange={(
                                  options: MultiValue<{
                                    value: string
                                    label: string
                                  }>
                                ) => {
                                  field.onChange(
                                    options && options.length > 0
                                      ? options.map((option) => option.value)
                                      : [""] // Pass a non-empty array to trigger Zod validation
                                  )
                                }}
                              />
                            )}
                          />
                          <div className="">
                            {formState.errors?.enrolledSubjects && (
                              <span className="text-xs text-red-600">
                                {formState.errors?.enrolledSubjects[0]?.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Enroll
                    <Icons.CheckCircleIcon
                      className="-mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </FormProvider>
            </div>

            <div className="px-8 py-4 border shadow-md rounded-lg">
              <div className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  De-Enroll Student{" "}
                  <span className="font-medium underline underline-offset-4">
                    {currentTerm?.name &&
                      capitalizeFirstCharacter(currentTerm?.name)}
                  </span>
                </h3>
              </div>
              <FormProvider {...deEnrollMethods}>
                <form
                  onSubmit={deEnrollMethods.handleSubmit(onDeEnrollSubmit)}
                  noValidate
                >
                  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4">
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Term Details
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            This is the upcoming term for you school where you
                            will choose subject groups and related subjects to
                            de-enroll
                          </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="termName"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Term Name
                            </label>
                            <div className="mt-2">
                              <div className="bg-slate-100 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <div className="disabled:bg-slate-50 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                  {termToEnrollData?.name &&
                                    capitalizeFirstCharacter(
                                      termToEnrollData?.name
                                    )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Term Period
                            </label>
                            <div className="mt-2">
                              <div className="bg-slate-100 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <div className="disabled:bg-slate-50 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                  <span className="font-medium">
                                    {termToEnrollData?.startDate &&
                                      formatDate(termToEnrollData.startDate)}
                                  </span>
                                  <span> to </span>
                                  <span className="font-medium">
                                    {termToEnrollData?.endDate &&
                                      formatDate(termToEnrollData?.endDate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                              {/* to do. enable link to term list */}
                              To see more details of this term see term list in
                              Administration tab or click{" "}
                              <Link
                                to={
                                  "/admin/administration/manage-term/all-terms"
                                }
                                className="text-blue-500"
                              >
                                {" "}
                                here
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Subject Details
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose multiple subjects to enroll.
                          </p>
                        </div>

                        <div className="flex flex-col gap-4 py-2 rounded-lg">
                          <label
                            htmlFor="group"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Subjects<span className="text-red-600">*</span>
                          </label>
                          <Controller
                            name="enrolledSubjects"
                            control={deEnrollControl}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                className="w-60"
                                isMulti
                                options={subjectOptions}
                                value={subjectOptions?.filter((option) =>
                                  field?.value?.includes(option?.value)
                                )}
                                onChange={(
                                  options: MultiValue<{
                                    value: string
                                    label: string
                                  }>
                                ) => {
                                  field.onChange(
                                    options && options.length > 0
                                      ? options.map((option) => option.value)
                                      : [""] // Pass a non-empty array to trigger Zod validation
                                  )
                                }}
                              />
                            )}
                          />
                          <div className="">
                            {deEnrollFormState.errors?.enrolledSubjects && (
                              <span className="text-xs text-red-600">
                                {
                                  deEnrollFormState.errors?.enrolledSubjects[0]
                                    ?.message
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    De-Enroll
                    <Icons.CheckCircleIcon
                      className="-mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </FormProvider>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => {
                if (currentTerm?.id && params.id) {
                  dispatch(
                    setOpenModal({
                      isOpen: true,
                      type: "enrollToActiveStudent",
                    })
                  )
                }
              }}
              className="bg-green-400 px-4 py-2 rounded"
            >
              Transfer Student to the current term
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="h-[600px] font-medium text-lg flex justify-center items-centerß">
            <p>No data to show</p>
          </div>
        </>
      )}

      <EnrollStudentModal />
      <DeEnrollStudentModal />
      <EnrollToActiveStudentModal />
    </div>
  )
}

export default ManageAndEnroll
