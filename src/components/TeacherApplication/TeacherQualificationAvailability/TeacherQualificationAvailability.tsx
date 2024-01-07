import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { TeacherApplicantSchema } from "@/pages/Application/Teacher/TeacherApplication"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { useMemo } from "react"

const timeslotsOptions = [
  "Sunday 11AM-12PM",
  "Sunday 12AM-1PM",
  "Sunday 1PM-2PM",

  // Add more TeacherQualificationAvailability as needed
]

function TeacherQualificationAvailability() {
  const { formState, register } = useFormContext<TeacherApplicantSchema>()

  const allSubjects = useQuery({
    queryKey: [api.application.teacher.allSubjects.findAllSubjects.queryKey],
    queryFn: api.application.teacher.allSubjects.findAllSubjects.query,
  })

  const activeSubjects = useMemo(() => {
    const list = allSubjects?.data?.filter((subject) => subject.isActive)
    const updatedName = list?.map((l) => {
      return {
        name: capitalizeFirstCharacter(l.name),
        isActive: l.isActive,
      }
    })
    return updatedName
  }, [allSubjects.data])

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container mb-12 pb-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className=" px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Qualification and Availability{" "}
            <span className="text-xs text-slate-400 italic">
              Please select the subjects you can teach and time available
            </span>
          </h2>
        </div>

        <div className=" bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="TeacherQualificationAvailability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subjects
                  <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  {activeSubjects?.map((subject, i) => (
                    <div key={i}>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id={i.toString()}
                            value={capitalizeFirstCharacter(subject.name)}
                            {...register(
                              "teacherQualificationAvailability.subjectsChosen",
                              {
                                required: {
                                  value: true,
                                  message: "choose a subject",
                                },
                              }
                            )}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor={subject.name}
                            className="font-medium text-gray-900"
                          >
                            {subject.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="h-4">
                    {formState.errors.teacherQualificationAvailability
                      ?.subjectsChosen?.message && (
                      <span className="text-xs text-red-600">
                        {
                          formState.errors.teacherQualificationAvailability
                            ?.subjectsChosen?.message
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="TeacherQualificationAvailability-related"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {" "}
                  Availibilty <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  {timeslotsOptions.map((option) => (
                    <div key={option}>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id={option}
                            value={option}
                            {...register(
                              "teacherQualificationAvailability.timeSlotsChosen",
                              {
                                required: {
                                  value: true,
                                  message: "choose an option",
                                },
                              }
                            )}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor={option}
                            className="font-medium text-gray-900"
                          >
                            {option}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="h-4">
                    {formState.errors.teacherQualificationAvailability
                      ?.timeSlotsChosen?.message && (
                      <span className="text-xs text-red-600">
                        {
                          formState.errors.teacherQualificationAvailability
                            ?.timeSlotsChosen?.message
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Qualification<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="qualification"
                    {...register(
                      "teacherQualificationAvailability.qualification"
                    )}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherQualificationAvailability
                    ?.qualification?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherQualificationAvailability
                          ?.qualification?.message
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4  grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Experience<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="qualification"
                    {...register("teacherQualificationAvailability.experience")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherQualificationAvailability?.experience
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherQualificationAvailability
                          ?.experience?.message
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  ---end of---*/}
    </div>
  )
}

export default TeacherQualificationAvailability
