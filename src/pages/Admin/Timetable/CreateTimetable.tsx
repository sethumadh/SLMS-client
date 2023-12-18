import { useQuery } from "@tanstack/react-query"
import { useState, useMemo, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import Select, { SingleValue } from "react-select"
import { useAppDispatch } from "@/redux/store"

import { api } from "@/api/api"
import {
  TimetableSchema,
  timetableSchema,
} from "@/types/Admin/timetable/timetable"
import { zodResolver } from "@hookform/resolvers/zod"
import LoadingSpinner from "@/components/Loadingspinner"
import { formatString } from "@/helpers/formatStringTimetable"
import { setOpenModal } from "@/redux/slice/modalSlice"
import CreateTimetableModal from "@/components/Modal/CreatetimetableModal"

const teacherOptions = [
  { label: "Ms. Davis", value: "Ms. Davis" },
  { label: "Mr. Miller", value: "Mr. Miller" },
  { label: "Mr. Smith", value: "Mr. Smith" },
  { label: "Mr. doe", value: "Mr. doe" },
  { label: "Mr. Lee", value: "Mr. Lee" },
  { label: "Mr. sam", value: "Mr. sam" },
  { label: "Mr. will", value: "Mr. will" },
  { label: "Ms. Johnson", value: "Ms. Johnson" },
]

const NUM_ROOMS = 6

export default function CreateTimeTable() {
  const dispatch = useAppDispatch()
  const [isEditMode, setEditMode] = useState(false)
  const { data: timetableData, isLoading: timetableDataLoading } = useQuery({
    queryKey: [api.timetable.timetable.findActiveTimetable.querykey],
    queryFn: api.timetable.timetable.findActiveTimetable.query,
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TimetableSchema>({
    defaultValues: {
      data: timetableData?.data.map((timeslot) => ({
        ...timeslot,
        rooms: timeslot.rooms.map((room) => ({
          teacherName: room.teacherName || "",
          subjectName: room.subjectName || "",
        })),
      })),
    },
    resolver: zodResolver(timetableSchema),
  })
  useEffect(() => {
    reset({ data: timetableData?.data })
  }, [timetableData?.data, reset])

  const { data: currentTermClassesData, isLoading: currentTermClassesLoading } =
    useQuery({
      queryKey: [api.admin.classes.findCurrentTermAllClass.querykey],
      queryFn: api.admin.classes.findCurrentTermAllClass.query,
    })

  const subjectOptions = useMemo(() => {
    const data: { value: string; label: string }[] = []

    currentTermClassesData?.termSubjectLevel?.forEach((item) => {
      const subjectName =
        item.subject.name.charAt(0).toUpperCase() + item.subject.name.slice(1)
      const levelName = item.level.name

      item.sections.forEach((section) => {
        const sectionName = section.name
        const label = `${subjectName} ${levelName} ${sectionName}`
        const value = `${subjectName.toLowerCase()}.${levelName}.${sectionName}`

        data.push({ label, value })
      })
    })

    return data
  }, [currentTermClassesData])

  const onSubmit = (data: TimetableSchema) => {
    // settimetableData(data)
    setEditMode(false)

    dispatch(
      setOpenModal({
        isOpen: true,
        type: "createTimetable",
        data: {
          value: data,
        },
      })
    )
  }

  return (
    <div>
      {currentTermClassesLoading || timetableDataLoading ? (
        <>
          <div className="h-600 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 sm:px-6 lg:px-20 lg:py-12">
            <div className="border-b-2 border-gray-200 pb-5 ">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                Create a New Timetable.
              </h3>
              <div className="flex flex-col gap-1 mt-4">
                <p className="mt-2 max-w-4xl text-sm text-gray-500">
                  Data is loaded from the existing time table. This action will
                  replace the current timetable
                </p>
              </div>
            </div>
            <div className="sm:flex sm:items-center mt-8 gap-20">
              <div className="sm:flex-none">
                <button
                  type="button"
                  onClick={() => setEditMode(!isEditMode)}
                  className={`block rounded-md ${
                    isEditMode
                      ? "bg-red-500 text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "bg-slate-200 text-black hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  }  px-3 py-2 text-center text-sm font-semibold shadow-sm `}
                >
                  {isEditMode ? "Cancel" : "Edit Data"}
                </button>
              </div>
              <div className=" sm:flex-none">
                <button
                  disabled={!isEditMode}
                  className={`disabled:cursor-not-allowed disabled:bg-slate-300 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  Create Timetable
                </button>
              </div>
            </div>
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg ">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr className="">
                    <th className="px-3 py-3.5 text-left text-lg leading-7 tracking-wider font-semibold text-gray-900 border-4 bg-slate-100">
                      Time/ Rooms
                    </th>
                    {Array.from({ length: NUM_ROOMS }, (_, index) => (
                      <>
                        <th
                          key={index}
                          className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-6 border-4 bg-slate-100"
                        >
                          Room {index + 1}
                        </th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableData?.data.map((timeslot, index) => {
                    return (
                      <tr
                        key={`timeslot-${timeslot.name}-${index}`}
                        className="border border-slate-200 shadow-sm"
                      >
                        <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6 bg-blue-300 w-32 h-20 border-4">
                          {isEditMode ? (
                            <div className="">
                              <input
                                type="text"
                                defaultValue={timeslot.name}
                                {...register(`data.${index}.name` as const)}
                                className="text-center rounded-md border-gray-300 shadow-s"
                              />
                              <div className="h-4">
                                {errors?.data?.[index]?.rooms?.[0]?.root
                                  ?.message && (
                                  <p className="text-red-500 font-bold py-4">
                                    {
                                      errors?.data?.[index]?.rooms?.[0]?.root
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="font-medium text-gray-900 ">
                              {timeslot.name}
                            </div>
                          )}
                        </td>
                        {timeslot.rooms.map((room, roomIndex) => {
                          const teacherKeyPart = room.teacherName || "empty"
                          const cellKey = `cell-${timeslot.name}-${teacherKeyPart}-${roomIndex}`
                          return (
                            <td
                              key={cellKey}
                              className={`px-3 py-3.5 text-sm text-gray-500 border-4 shadow-sm w-32 h-20 ${
                                !room.teacherName &&
                                !room.subjectName &&
                                !isEditMode
                                  ? "bg-red-300"
                                  : ""
                              } ${
                                room.teacherName &&
                                room.subjectName &&
                                !isEditMode
                                  ? "bg-green-300"
                                  : ""
                              }`}
                            >
                              {isEditMode ? (
                                <div>
                                  <Controller
                                    name={`data.${index}.rooms.${roomIndex}.teacherName`}
                                    control={control}
                                    defaultValue={room.teacherName}
                                    render={({ field }) => (
                                      <Select
                                        className=""
                                        {...field}
                                        isClearable
                                        isSearchable
                                        options={teacherOptions}
                                        value={teacherOptions.find(
                                          (option) =>
                                            option.value === field.value
                                        )}
                                        onChange={(selectedOption) =>
                                          field.onChange(
                                            selectedOption
                                              ? selectedOption.value
                                              : ""
                                          )
                                        }
                                        styles={{
                                          control: (provided) => ({
                                            ...provided,
                                            // Add your custom styles here
                                            backgroundColor: "white",
                                            borderColor: "lightgray",
                                            boxShadow: "none",
                                            "&:hover": {
                                              borderColor: "gray",
                                            },
                                          }),
                                          option: (provided, state) => ({
                                            ...provided,
                                            // Add your custom styles for options here
                                            backgroundColor: state.isSelected
                                              ? "blue"
                                              : "white",
                                            color: state.isSelected
                                              ? "white"
                                              : "black",
                                            "&:hover": {
                                              backgroundColor: "lightblue",
                                            },
                                          }),

                                          // Add other parts you want to customize like menu, multiValue, etc.
                                        }}
                                      />
                                    )}
                                  />

                                  <Controller
                                    name={`data.${index}.rooms.${roomIndex}.subjectName`}
                                    control={control}
                                    defaultValue={room.subjectName}
                                    render={({ field }) => (
                                      <Select
                                        {...field}
                                        isClearable
                                        isSearchable
                                        options={subjectOptions}
                                        value={subjectOptions.find(
                                          (
                                            option: SingleValue<{
                                              value: string
                                              label: string
                                            }>
                                          ) => option?.value === field.value
                                        )}
                                        onChange={(selectedOption) =>
                                          field.onChange(
                                            selectedOption
                                              ? selectedOption.value
                                              : ""
                                          )
                                        }
                                      />
                                    )}
                                  />
                                  <div>
                                    {errors.data?.[index]?.rooms?.root
                                      ?.message && (
                                      <p className="text-red-500 text-xs">
                                        {
                                          errors.data?.[index]?.rooms?.root
                                            ?.message
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <ul
                                    role="list"
                                    className="border-blue-500 flex flex-col space-y-8"
                                  >
                                    {!room.teacherName && !room.subjectName && (
                                      <span className="flex justify-center items-center">
                                        <span className="text-center text-lg font-light italic">
                                          No classes Scheduled
                                        </span>
                                      </span>
                                    )}
                                    {room.teacherName && room.subjectName && (
                                      <div>
                                        <li className="text-black">
                                          {room.teacherName}
                                        </li>
                                        <li className="text-black">
                                          {room.subjectName &&
                                            formatString(room.subjectName)}
                                        </li>
                                      </div>
                                    )}
                                  </ul>
                                </>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      )}
      <CreateTimetableModal />
    </div>
  )
}
