import { Link, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import Select, { MultiValue, SingleValue } from "react-select"
import { Controller, FormProvider, useForm } from "react-hook-form"

import Icons from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { formatDate } from "@/helpers/dateFormatter"
import { z } from "zod"
import { enrollStudentToTermSchema } from "@/types/Enrollment/enrollment"
import { useEffect, useState } from "react"
import EnrollApplicantModal from "@/components/Modal/EnrollApplicantModal"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import OverlayLoadingspinner from "@/components/OverlayLoadingspinner"

type applicantEnrollData = {
  applicantId: number
  enrollData: {
    subject: string
    termSubjectGroupId: number
    subjectGroupId: number
    termId: number
    feeId: number
    termSubjectId: number
  }[]
}
export type EnrollStudentToTermSchema = z.infer<
  typeof enrollStudentToTermSchema
>
function NewApplicantSubjectDetails() {
  const [term, setTerm] = useState<string | null>("publishedTerm")
  const [pageLoad, setPageLoad] = useState(false)
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
  const { data: publishedTerm } = useQuery({
    queryKey: [
      api.admin.term.publishedTerm.findPublishedTermAdministration.queryKey,
    ],
    queryFn: api.admin.term.publishedTerm.findPublishedTermAdministration.query,
  })
  // Enroll
  const methods = useForm<EnrollStudentToTermSchema>({
    resolver: zodResolver(enrollStudentToTermSchema),
    defaultValues: {
      enrolledSubjects: [""],
    },
  })
  const { control, formState } = methods

  const {
    data: applicantData,
    isLoading: applicantDataIsLoading,
    isError: applicantDataIsError,
  } = useQuery({
    queryKey: [
      api.enrollment.applicantEnrollment.findApplicantById.querykey,
      params.id,
    ],
    queryFn: () => {
      if (params.id) {
        return api.enrollment.applicantEnrollment.findApplicantById.query(
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
      api.enrollment.applicantEnrollment.getTermToEnroll.queryKey,
      term,
    ],
    queryFn: () => {
      if (term === "publishedTerm") {
        return api.enrollment.applicantEnrollment.getTermToEnroll.query()
      } else {
        return api.enrollment.applicantEnrollment.findCurrentTermToEnroll.query()
      }
    },
  })

  const options = [
    { label: "Current Term", value: "currentTerm" },
    { label: "Published/Advertised Term", value: "publishedTerm" },
  ]

  const {
    data: applicantEnrolledData,
    isLoading: applicantEnrolledDataIsLoading,
    isError: applicantEnrolledDataIsError,
  } = useQuery({
    queryKey: [
      api.enrollment.applicantEnrollment.getApplicantEnrolledSubjects.queryKey,
    ],
    queryFn: () => {
      if (params.id) {
        return api.enrollment.applicantEnrollment.getApplicantEnrolledSubjects.query(
          params.id
        )
      }
    },

    enabled: !!params.id,
  })

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

  const subjectRelated = applicantData?.subjectRelated
  const subjectsChosen = applicantData?.subjectsChosen
  const handleTermChange = (
    selectedTerm: SingleValue<{ value: string; label: string }>
  ) => {
    setPageLoad(true)
    setTimeout(() => {
      setPageLoad(false)
    }, 500)
    if (selectedTerm?.value) setTerm(selectedTerm?.value)
  }

  const onSubmit = (values: EnrollStudentToTermSchema) => {
    if (termToEnrollData?.termSubject && applicantData?.id) {
      const enrollData: applicantEnrollData["enrollData"] =
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

      const applicantEnrollData: applicantEnrollData = {
        applicantId: applicantData?.id,
        enrollData,
      }
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "enrollApplicant",
          data: {
            value: applicantEnrollData,
          },
        })
      )
    }
  }

  return (
    <div className="">
      {applicantDataIsLoading ||
      termToEnrollDataIsLoading ||
      applicantEnrolledDataIsLoading ? (
        <>
          <div className="h-[600px] font-medium text-lg flex justify-center items-center">
            <div>
              <OverlayLoadingspinner />
            </div>
          </div>
        </>
      ) : !applicantDataIsError ||
        !termToEnrollDataIsError ||
        !applicantEnrolledDataIsError ? (
        <>
          <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
            <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
              <h3 className="sm:text-xl font-bold leading-7 text-gray-900  ">
                Manage Subjects and term for applicant
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
                    {applicantEnrolledData &&
                      applicantEnrolledData
                        .map((sub) => {
                          return capitalizeFirstCharacter(sub.subjectName)
                        })
                        .join(", ")}
                    {applicantEnrolledData?.length === 0 && (
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
          {pageLoad ? (
            <div className="h-[600px] font-medium text-lg flex justify-center items-center">
              <div>
                <OverlayLoadingspinner />
              </div>
            </div>
          ) : (
            <div className="px-8 py-4 shadow-md rounded-lg">
              <div className="border-b border-gray-200 pb-5 mt-8">
                <h3 className=" text-base sm:text-lg font-bold leading-6 text-gray-900">
                  Enroll and Approve Applicant to the advertised / published
                  term or to Current Term
                </h3>
                <span className="text-red-400 text-sm italic">
                  {term === "publishedTerm" && !termToEnrollData
                    ? "*Attention . There is no publish term"
                    : term === "currentTerm" && !termToEnrollData
                    ? "*Attention . There is no current term"
                    : ""}
                </span>
                <span className="text-red-400 text-md font-semibold italic">
                  {publishedTerm?.id === currentTerm?.id &&
                    "**Published Term and Current term are the same"}
                </span>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4  mb-16">
                    <div className="space-y-12">
                      <div className=" grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Choose Term to enroll Applicant
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {term == "publishedTerm"
                              ? "By Default the option is advertised or published term"
                              : "This is current term"}
                          </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="termName"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Select term
                            </label>
                            <div className="mt-2">
                              <Select
                                options={options}
                                onChange={(
                                  val: SingleValue<{
                                    value: string
                                    label: string
                                  }>
                                ) => handleTermChange(val)}
                                defaultValue={options.filter(
                                  (option) => option.value == term
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <>
                        {/* first red */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3 ">
                          <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                              Term Details
                            </h2>
                            {term === "publishedTerm" ? (
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                This is the{" "}
                                <span className="text-base font-semibold">
                                  upcoming term/adevrtised term{" "}
                                </span>
                                for you school where you will choose subject
                                groups and related subjects to enroll
                              </p>
                            ) : (
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                This is the
                                <span className="text-base font-semibold">
                                  Current term{" "}
                                </span>{" "}
                                for you school where you will choose subject
                                groups and related subjects to enroll
                              </p>
                            )}
                          </div>

                          <div className=" grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
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
                                    {termToEnrollData?.name
                                      ? capitalizeFirstCharacter(
                                          termToEnrollData?.name
                                        )
                                      : `Not Applicable - No ${term} term availabe`}{" "}
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
                                      {termToEnrollData?.startDate
                                        ? formatDate(termToEnrollData.startDate)
                                        : `Not Applicable - No ${term} term availabe`}{" "}
                                    </span>
                                    <span>
                                      {" "}
                                      {termToEnrollData?.startDate && "to"}{" "}
                                    </span>
                                    <span className="font-medium">
                                      {termToEnrollData?.endDate &&
                                        formatDate(termToEnrollData?.endDate)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                {/* to do. enable link to term list */}
                                To see more details of this term see term list
                                in Administration tab or click{" "}
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
                        {/* 2nd red */}
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
                            {termToEnrollData ? (
                              <>
                                {" "}
                                <Controller
                                  name="enrolledSubjects"
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
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
                                            ? options.map(
                                                (option) => option.value
                                              )
                                            : [""] // Pass a non-empty array to trigger Zod validation
                                        )
                                      }}
                                    />
                                  )}
                                />
                                <div className="">
                                  {formState.errors?.enrolledSubjects && (
                                    <span className="text-xs text-red-600">
                                      {
                                        formState.errors?.enrolledSubjects[0]
                                          ?.message
                                      }
                                    </span>
                                  )}
                                </div>
                              </>
                            ) : (
                              "No Subjects available to enroll"
                            )}
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                  {/* 3rd button */}
                  <button
                    disabled={
                      (term === "publishedTerm" && !termToEnrollData) ||
                      (term === "currentTerm" && !termToEnrollData)
                    }
                    type="submit"
                    className="disabled:bg-slate-300 disabled:cursor-not-allowed inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {term === "publishedTerm"
                      ? "Enroll and Approve Applicant to Published term"
                      : "Enroll and Approve Applicant to Current term"}

                    <Icons.CheckCircleIcon
                      className="-mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </FormProvider>
              {/* <IsCurrentTermModal /> */}
            </div>
          )}

          <div className="mt-4" />
          <div className="flex justify-center mb-12 py-12">
            <span className="isolate inline-flex rounded-md shadow-sm  mt-4">
              <button
                type="button"
                className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              >
                Waitlist
              </button>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              >
                Reject
              </button>
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="h-[600px] font-medium text-lg flex justify-center items-centerß">
            <p>No data to show</p>
          </div>
        </>
      )}

      <EnrollApplicantModal />
    </div>
  )
}

export default NewApplicantSubjectDetails
