import { useFormContext } from "react-hook-form"
import { ApplicantSchema } from "@/pages/Application/Student/Application"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"

// const subjects = [
//   "Math",
//   "Science",
//   "History",
//   "English",

//   // Add more subjects as needed
// ]
const subjectOptions = [
  "option-1",
  "option-2",
  "option-3",
  "option-4",
  "option-5",
  "option-6",
  // Add more subjects as needed
]

function Subjects() {
  const { formState, register } = useFormContext<ApplicantSchema>()
  const currentTerm = useQuery({
    queryKey: [api.application.publishedTerm.getPublishedTerm.queryKey],
    queryFn: api.application.publishedTerm.getPublishedTerm.query,
  })

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Subjects{" "}
            <span className="text-xs text-slate-400 italic">
              *ਪੰਜਾਬੀ ਅਤੇ ਗੁਰਮਤਿ ਕਲਾਸਾਂ ਲਈ ਘੱਟੋ-ਘੱਟ ਉਮਰ ਸਾਢੇ ਤਿੰਨ ਸਾਲ ਹੋਣੀ
              ਚਾਹੀਦੀ ਹੈ । *ਕੀਰਤਨ ਅਤੇ ਗਤਕਾ ਕਲਾਸਾਂ ਲਈ ਘੱਟੋ-ਘੱਟ ਉਮਰ ਪੰਜ ਸਾਲ ਹੋਣੀ
              ਚਾਹੀਦੀ ਹੈ । *ਗੁਰਬਾਣੀ ਸੰਥਿਆਂ ਲਈ ਵਿਦਿਆਰਥੀ ਪੰਜਾਬੀ ਚੰਗੀ ਤਰ੍ਹਾਂ ਪੜ੍ਹ
              ਲੈਂਦਾ ਹੋਵੇ ।
            </span>
          </h2>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subjects<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  {currentTerm.data?.termSubject?.map((subject) => (
                    <div key={subject.id}>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id={subject.id.toString()}
                            value={subject.subject.name}
                            {...register("subjectInterest.subjectsChosen", {
                              required: {
                                value: true,
                                message: "choose a subject",
                              },
                            })}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor={subject.subject.name}
                            className="font-medium text-gray-900"
                          >
                            {subject.subject.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="h-4">
                    {formState.errors.subjectInterest?.subjectsChosen
                      ?.message && (
                      <span className="text-xs text-red-600">
                        {
                          formState.errors.subjectInterest?.subjectsChosen
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

      {/*  ---end of---*/}

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Please tick all relevant<span className="text-red-600">*</span>
          </h2>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="subjects-related"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="mt-2">
                  {subjectOptions.map((subjectOption) => (
                    <div key={subjectOption}>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id={subjectOption}
                            value={subjectOption}
                            {...register("subjectInterest.subjectRelated", {
                              required: {
                                value: true,
                                message: "choose an option",
                              },
                            })}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor={subjectOption}
                            className="font-medium text-gray-900"
                          >
                            {subjectOption}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="h-4">
                    {formState.errors.subjectInterest?.subjectRelated
                      ?.message && (
                      <span className="text-xs text-red-600">
                        {
                          formState.errors.subjectInterest?.subjectRelated
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
        {/*  */}
      </div>
    </div>
  )
}

export default Subjects
