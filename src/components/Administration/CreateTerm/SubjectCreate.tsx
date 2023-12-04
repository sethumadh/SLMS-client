import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import OverlayLoadingspinner from "@/components/OverlayLoadingspinner"
import CreatableSelect from "react-select/creatable"
import { MultiValue, SingleValue } from "react-select"
import { CreateTermWithSubjectSchema } from "./Create"

// type FormValues = {
//   subjectName: string
//   levels: string[]
// }[]
type SubjectCreateProps = {
  index: number
  control: Control<CreateTermWithSubjectSchema>
  newLevels: {
    value: string
    label: string
  }[]
  newSubjects: {
    value: string
    label: string
  }[]
  setNewLevels: React.Dispatch<
    React.SetStateAction<
      | {
          value: string
          label: string
        }[]
      | undefined
    >
  >
  setNewSubjects: React.Dispatch<
    React.SetStateAction<
      | {
          value: string
          label: string
        }[]
      | undefined
    >
  >
}

function SubjectCreate({
  index = 0,
  control,
  newLevels,
  newSubjects,
  setNewLevels,
  setNewSubjects,
}: SubjectCreateProps) {
  const { isLoading: allLevelsLoading } = useQuery({
    queryKey: [api.admin.levels.findAllLevels.querykey],
    queryFn: api.admin.levels.findAllLevels.query,
  })
  const { isLoading: allSubjectLoading } = useQuery({
    queryKey: [api.admin.subjects.findAllSubjects.querykey],
    queryFn: api.admin.subjects.findAllSubjects.query,
  })

  const { formState } = useFormContext<CreateTermWithSubjectSchema>()
  const {
    fields: groupSubjectsFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    name: `groupSubjects.${index}.subjects`,
    control,
  })

  return (
    <div className="">
      {groupSubjectsFields.map((subject, subjectIndex) => (
        <div key={`${subjectIndex}${index}`}>
          <div className="sm:col-span-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Subject
              <span className="text-red-600">*</span>
            </label>
            {allSubjectLoading ? (
              <OverlayLoadingspinner />
            ) : (
              <Controller
                key={`subject-${index}-${subjectIndex}`}
                name={
                  `groupSubjects.${index}.subjects.${subjectIndex}.subjectName` as const
                }
                control={control}
                render={({ field: subjectField }) => (
                  <CreatableSelect
                    id="subject"
                    isClearable
                    isSearchable
                    options={newSubjects}
                    className="no-outline"
                    {...subjectField}
                    value={newSubjects?.filter((subject) =>
                      subjectField?.value?.includes(subject?.value || "")
                    )}
                    onChange={(
                      subject: SingleValue<{
                        value: string
                        label: string
                      }>
                    ) => subjectField.onChange(subject ? subject.value : "")}
                    onCreateOption={(inputValue) => {
                      const newOption = {
                        value: inputValue,
                        label: inputValue,
                      }
                      setNewSubjects((prev) => {
                        const l =
                          prev?.length && prev?.length > 0 ? [...prev] : []
                        return [...l, newOption]
                      })
                      subjectField.onChange(inputValue)
                    }}
                  />
                )}
              />
            )}
          </div>
          <div className="">
            {/*   trying to display error here  */}
            {formState.errors?.groupSubjects?.message ===
              "Subject names must be unique within a term" && (
              <span className="text-xs text-red-600">
                {formState.errors?.groupSubjects?.message}
              </span>
            )}
            {formState.errors.groupSubjects?.[index]?.subjects?.message && (
              <span className="text-xs text-red-600">
                {formState.errors.groupSubjects?.[index]?.subjects?.message}
              </span>
            )}
            {formState.errors.groupSubjects?.[index]?.subjects?.[subjectIndex]
              ?.subjectName?.message && (
              <span className="text-xs text-red-600">
                {formState.errors.groupSubjects?.[index]?.subjects?.[
                  subjectIndex
                ]?.subjectName?.message &&
                  formState.errors.groupSubjects?.[index]?.subjects?.[
                    subjectIndex
                  ]?.subjectName?.message}
              </span>
            )}
          </div>
          <div key={subject.id} className="sm:col-span-4">
            <label
              htmlFor="levels"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Subject Levels
              <span className="text-red-600">*</span>
            </label>
            {allLevelsLoading ? (
              <OverlayLoadingspinner />
            ) : (
              <Controller
                name={
                  `groupSubjects.${index}.subjects.${subjectIndex}.levels` as const
                }
                control={control}
                render={({ field: subjectField }) => (
                  <CreatableSelect
                    id={`${index}${subjectIndex}${
                      subject.levels.map((level) => level)[0]
                    }`}
                    isMulti
                    isClearable
                    isSearchable
                    options={newLevels}
                    className="no-outline"
                    {...subjectField}
                    value={newLevels?.filter((level) =>
                      subjectField?.value?.includes(level?.value)
                    )}
                    onChange={(
                      level: MultiValue<{
                        value: string
                        label: string
                      }>
                    ) =>
                      subjectField.onChange(level.map((level) => level.value))
                    }
                    onCreateOption={(inputValue) => {
                      const newOption = {
                        value: inputValue,
                        label: inputValue,
                      }
                      setNewLevels((prev) => {
                        const l =
                          prev?.length && prev?.length > 0 ? [...prev] : []
                        return [...l, newOption]
                      })
                      subjectField.onChange([...subjectField.value, inputValue])
                    }}
                  />
                )}
              />
            )}
          </div>
          <div className="">
            {formState.errors.groupSubjects?.[index]?.subjects?.[subjectIndex]
              ?.levels?.message && (
              <span className="text-xs text-red-600">
                {formState.errors.groupSubjects?.[index]?.subjects?.[
                  subjectIndex
                ]?.levels?.message &&
                  formState.errors.groupSubjects?.[index]?.subjects?.[
                    subjectIndex
                  ]?.levels?.message}
              </span>
            )}
          </div>
          {subjectIndex === 0 ? (
            <div className="flex justify-center items-center ">
              <div className=" text-slate-400 text-center bg-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-not-allowed ">
                Delete
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="cursor-pointer border border-blue-400 text-blue-500 text-center  disabled:bg-slate-300  bg-white hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => {
                    appendSubject({
                      subjectName: "",
                      levels: [],
                    })
                  }}
                >
                  add
                </button>
              </div>
            </div>
          ) : (
            subjectIndex > 0 && (
              <div className="flex justify-center">
                <div className=" flex  items-center justify-center">
                  {!formState.isSubmitting && (
                    <div
                      onClick={() => {
                        // <div>{JSON.stringify(index, null, 2)}</div>

                        removeSubject(subjectIndex)
                      }}
                      className="flex flex-col items-center cursor-pointer text-red-500 text-center  disabled:bg-slate-300  bg-white hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Delete
                    </div>
                  )}

                  <div className="flex justify-center items-center">
                    <button
                      className="cursor-pointer border border-blue-400 text-blue-500 text-center  disabled:bg-slate-300  bg-white hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2 mr-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => {
                        appendSubject({
                          subjectName: "",
                          levels: [],
                        })
                      }}
                    >
                      add
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  )
}

export default SubjectCreate
