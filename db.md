// export default function TimeTable() {
//   const [assignments, setAssignments] = useState<TimetableSchema>(
//     [
//     {
//       name: "10AM - 11AM",
//       rooms: [
//         {
//           teacherName: "Mr. Smith",
//           subjectName: "english.L1.S1",
//         },
//         {
//           teacherName: "Ms. Johnson",
//           subjectName: "english.L1.S2",
//         },
//         {
//           teacherName: "Mr. Lee",
//           subjectName: "french.L1.S3",
//         },
//         {
//           teacherName: "Mr. doe",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. will",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. sam",
//           subjectName: "french.L2.S1",
//         },
//       ],
//     },
//     {
//       name: "11AM - 12PM",
//       rooms: [
//         {
//           teacherName: "Ms. Davis",
//           subjectName: "french.L2.S2",
//         },
//         {
//           teacherName: "Mr. Miller",
//           subjectName: "music.L1.S4",
//         },
//         {
//           teacherName: "Ms. Brown",
//           subjectName: "painting.L1.S1",
//         },
//         {
//           teacherName: "Mr. doe",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. will",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. sam",
//           subjectName: "french.L2.S1",
//         },
//       ],
//     },
//     {
//       name: "1PM - 2PM",
//       rooms: [
//         {
//           teacherName: "Ms. Davis",
//           subjectName: "french.L2.S2",
//         },
//         {
//           teacherName: "Mr. Miller",
//           subjectName: "music.L1.S4",
//         },
//         {
//           teacherName: "Ms. Brown",
//           subjectName: "painting.L1.S1",
//         },
//         {
//           teacherName: "Mr. doe",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. will",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. sam",
//           subjectName: "french.L2.S1",
//         },
//       ],
//     },
//     {
//       name: "2PM - 3PM",
//       rooms: [
//         {
//           teacherName: "Ms. Davis",
//           subjectName: "french.L2.S2",
//         },
//         {
//           teacherName: "Mr. Miller",
//           subjectName: "music.L1.S4",
//         },
//         {
//           teacherName: "Ms. Brown",
//           subjectName: "painting.L1.S1",
//         },
//         {
//           teacherName: "Mr. doe",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. will",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. sam",
//           subjectName: "french.L2.S1",
//         },
//       ],
//     },
//     {
//       name: "3PM - 4PM",
//       rooms: [
//         {
//           teacherName: "Ms. Davis",
//           subjectName: "french.L2.S2",
//         },
//         {
//           teacherName: "Mr. Miller",
//           subjectName: "music.L1.S4",
//         },
//         {
//           teacherName: "Ms. Brown",
//           subjectName: "painting.L1.S1",
//         },
//         {
//           teacherName: "Mr. doe",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. will",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. sam",
//           subjectName: "french.L2.S1",
//         },
//       ],
//     },
//     {
//       name: "4PM - 5PM",
//       rooms: [
//         {
//           teacherName: "Ms. Davis",
//           subjectName: "french.L2.S2",
//         },
//         {
//           teacherName: "Mr. Miller",
//           subjectName: "music.L1.S4",
//         },
//         {
//           teacherName: "Ms. Brown",
//           subjectName: "painting.L1.S1",
//         },
//         {
//           teacherName: "",
//           subjectName: "",
//         },
//         {
//           teacherName: "Mr. will",
//           subjectName: "french.L2.S1",
//         },
//         {
//           teacherName: "Mr. sam",
//           subjectName: "french.L2.S1",
//         },
//       ],
//     },
//     {
//       name: "12PM - 1PM",
//       rooms: [
//         {
//           teacherName: "Ms. Davis",
//           subjectName: "french.L2.S2",
//         },
//         {
//           teacherName: "Mr. Miller",
//           subjectName: "music.L1.S4",
//         },
//         {
//           teacherName: "",
//           subjectName: "",
//         },
//         {
//           teacherName: "",
//           subjectName: "",
//         },
//         {
//           teacherName: "",
//           subjectName: "",
//         },
//         {
//           teacherName: "",
//           subjectName: "",
//         },
//       ],
//     },
//   ]
//   )
//   console.log(assignments, "assignments")
//   const [isEditMode, setEditMode] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState,
//     reset,
//     setValue,
//     getValues,
//     watch,
//   } = useForm<TimetableSchema>({
//     resolver: zodResolver(timetableSchema),
//     defaultValues: initialAssignments ?? [],
//   })
//   useEffect(() => {
//     reset([...assignments])
//   }, [reset, assignments])

//   const {
//     data: currentTermClassesData,
//     // isLoading: _currentTermClassesLoading,
//   } = useQuery({
//     queryKey: [api.admin.classes.findCurrentTermAllClass.querykey],
//     queryFn: api.admin.classes.findCurrentTermAllClass.query,
//   })
//   const transformedData = useMemo(() => {
//     const data: { value: string; label: string }[] = []

//     currentTermClassesData?.termSubjectLevel?.forEach((item) => {
//       const subjectName =
//         item.subject.name.charAt(0).toUpperCase() + item.subject.name.slice(1)
//       const levelName = item.level.name

//       item.sections.forEach((section) => {
//         const sectionName = section.name
//         const label = `${subjectName} ${levelName} ${sectionName}`
//         const value = `${subjectName.toLowerCase()}.${levelName}.${sectionName}`

//         data.push({ label, value })
//       })
//     })

//     return data
//   }, [currentTermClassesData])

//   const onSubmit = (data: TimetableSchema) => {
//     console.log("submite", data)
//     if (data) setAssignments(data)
//     setEditMode(false)
//   }
//   // console.log(transformedData)

//   console.log(getValues(), "GETVALUE")
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="px-4 sm:px-6 lg:px-20 lg:py-20">
//         <div className="sm:flex sm:items-center">
//           <div className="sm:flex-auto">
//             <h1 className="text-base font-semibold leading-6 text-gray-900">
//               Time Table
//             </h1>
//             <p className="mt-2 text-sm text-gray-700">
//               Edit and Manage your timeTable
//             </p>
//           </div>
//           <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//             <button
//               type="button"
//               onClick={() => setEditMode(!isEditMode)}
//               className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               {isEditMode ? "Cancel" : "Edit"}
//             </button>
//           </div>
//           <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//             <button className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//               submit
//             </button>
//           </div>
//         </div>
//         <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg ">
//           <table className="min-w-full divide-y divide-gray-800">
//             <thead>
//               <tr className="">
//                 <th className="px-3 py-3.5 text-left text-lg leading-7 tracking-wider font-semibold text-gray-900 border-4 bg-slate-100">
//                   Time/ Rooms
//                 </th>
//                 {Array.from({ length: NUM_ROOMS }, (_, index) => (
//                   <th
//                     key={index}
//                     className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-6 border-4 bg-slate-100"
//                   >
//                     Room {index + 1}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {assignments.map((timeslot, index) => {
//                 return (
//                   <tr key={index} className="border border-slate-200 shadow-sm">
//                     <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6 bg-blue-300 w-32 h-20 border-4">
//                       {isEditMode ? (
//                         <div className="max-w-32 h-20">
//                           <input
//                             type="text"
//                             defaultValue={timeslot.name}
//                             {...register(`${index}.name` as const)}
//                             className="rounded-md border-gray-300 shadow-s"
//                           />
//                           <div className="text-lg font-bold">
//                             {formState.errors?.[index]?.rooms?.root
//                               ?.message && (
//                               <>
//                                 <p className="text-red-500 text-xs">
//                                   Unique Teacher Name required
//                                 </p>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="font-medium text-gray-900 ">
//                           {timeslot.name}
//                         </div>
//                       )}
//                     </td>
//                     {timeslot.rooms.map((room, roomIndex) => {
//                       return (
//                         <td
//                           key={roomIndex}
//                           className={`px-3 py-3.5 text-sm text-gray-500 border-4 shadow-sm w-32 h-20 ${
//                             !room.teacherName &&
//                             !room.subjectName &&
//                             !isEditMode
//                               ? "bg-red-300"
//                               : ""
//                           } ${
//                             room.teacherName && room.subjectName && !isEditMode
//                               ? "bg-green-300"
//                               : ""
//                           }`}
//                         >
//                           {isEditMode ? (
//                             <div>
//                               {/* <input
//                                 type="text"
//                                 defaultValue={room.teacherName}
//                                 {...register(
//                                   `${index}.rooms.${roomIndex}.teacherName` as const
//                                 )}
//                                 className={`mb-2 block w-full rounded-md shadow-sm
//                                 `}
//                               /> */}
//                               <Controller
//                                 control={control}
//                                 name={
//                                   `${index}.rooms.${roomIndex}.teacherName` as const
//                                 }
//                                 render={({ field }) => {
//                                   const s = watch(
//                                     `${index}.rooms.${roomIndex}.teacherName`
//                                   )

//                                   console.log(s, index, roomIndex, "watch")
//                                   console.log(field.value)
//                                   return (
//                                     <Select
//                                       className=""
//                                       isSearchable
//                                       isClearable
//                                       {...field}
//                                       options={teacherOptions}
//                                       value={teacherOptions.find(
//                                         (option) => option.value === field.value
//                                       )}
//                                       onChange={(
//                                         option: SingleValue<{
//                                           value: string
//                                           label: string
//                                         }>
//                                       ) => {
//                                         console.log(option)
//                                         return field.onChange(
//                                           option?.value ?? ""
//                                         )
//                                         // const newValue = option
//                                         //   ? option.value
//                                         //   : ""
//                                         // setValue(
//                                         //   `${index}.rooms.${roomIndex}.subjectName`,
//                                         //   newValue
//                                         // )
//                                       }}
//                                     />
//                                   )
//                                 }}
//                               />

//                               <input
//                                 type="text"
//                                 defaultValue={room.subjectName}
//                                 {...register(
//                                   `${index}.rooms.${roomIndex}.subjectName` as const
//                                 )}
//                                 className="block w-full rounded-md border-gray-300 shadow-sm"
//                               />
//                               {/* <Controller
//                                 control={control}
//                                 name={
//                                   `${index}.rooms.${roomIndex}.subjectName` as const
//                                 }

//                                 render={({ field }) => {
//                                   const s = watch(
//                                     `${index}.rooms.${roomIndex}.subjectName`
//                                   )

//                                   console.log(s, index, roomIndex, "watch")
//                                   console.log(field.value)
//                                   return (
//                                     <Select
//                                       className=""
//                                       isSearchable
//                                       isClearable
//                                       {...field}
//                                       options={transformedData}
//                                       value={transformedData.find(
//                                         (option) => option.value === field.value
//                                       )}
//                                       onChange={(
//                                         option: SingleValue<{
//                                           value: string
//                                           label: string
//                                         }>
//                                       ) => {
//                                         console.log(option)
//                                         return field.onChange(
//                                           option?.value ?? ""
//                                         )
//                                         // const newValue = option
//                                         //   ? option.value
//                                         //   : ""
//                                         // setValue(
//                                         //   `${index}.rooms.${roomIndex}.subjectName`,
//                                         //   newValue
//                                         // )
//                                       }}
//                                     />
//                                   )
//                                 }}
//                               /> */}
//                             </div>
//                           ) : (
//                             <>
//                               <span></span>

//                               <ul
//                                 role="list"
//                                 className="border-blue-500 flex flex-col space-y-8"
//                               >
//                                 {!room.teacherName && !room.subjectName && (
//                                   <span className="flex justify-center items-center">
//                                     <span className="text-center text-lg font-light italic">
//                                       No classes Scheduled
//                                     </span>
//                                   </span>
//                                 )}
//                                 {room.teacherName && room.subjectName && (
//                                   <>
//                                     <li>{room.teacherName}</li>
//                                     <li>{room.subjectName}</li>
//                                   </>
//                                 )}
//                               </ul>
//                             </>
//                           )}
//                         </td>
//                       )
//                     })}
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </form>
//   )
// }


const=timetableData{
    "id": 10,
    "name": "summer 2024",
    "isActive": true,
    "data": [
        {
            "name": "10AM - 11AM",
            "rooms": [
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "english.L1.S2",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L1.S3",
                    "teacherName": "Mr. Lee"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "10AM - 11AM",
            "rooms": [
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "english.L1.S2",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L1.S3",
                    "teacherName": "Mr. Lee"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "10AM - 11AM",
            "rooms": [
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "english.L1.S2",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L1.S3",
                    "teacherName": "Mr. Lee"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "11AM - 12PM",
            "rooms": [
                {
                    "subjectName": "english.L1.S1",
                    "teacherName": "Ms. Davis"
                },
                {
                    "subjectName": "music.L1.S4",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "1PM - 2PM",
            "rooms": [
                {
                    "subjectName": "french.L2.S2",
                    "teacherName": "Ms. Davis"
                },
                {
                    "subjectName": "music.L1.S4",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "2PM - 3PM",
            "rooms": [
                {
                    "subjectName": "french.L2.S2",
                    "teacherName": "Ms. Davis"
                },
                {
                    "subjectName": "music.L1.S4",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "3PM - 4PM",
            "rooms": [
                {
                    "subjectName": "french.L2.S2",
                    "teacherName": "Ms. Davis"
                },
                {
                    "subjectName": "music.L1.S4",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. doe"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        },
        {
            "name": "4PM - 5PM",
            "rooms": [
                {
                    "subjectName": "french.L2.S2",
                    "teacherName": "Ms. Davis"
                },
                {
                    "subjectName": "music.L1.S4",
                    "teacherName": "Mr. Miller"
                },
                {
                    "subjectName": "painting.L1.S1",
                    "teacherName": "Mr. Smith"
                },
                {
                    "subjectName": "",
                    "teacherName": ""
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. will"
                },
                {
                    "subjectName": "french.L2.S1",
                    "teacherName": "Mr. sam"
                }
            ]
        }
    ],
    "updatedAt": "2023-12-21T05:18:43.472Z",
    "createdAt": "2023-12-20T05:29:07.923Z"
}