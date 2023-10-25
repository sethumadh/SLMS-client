/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

import Searchbar from "@/components/Searchbar/Searchbar"
import Skeleton from "@/components/Skeleton"
import Icons from "@/constants/icons"

type studentListSchema = {
  id: number
  name: string
  parentContact: string
  email: string
  fatherName: string
}[]

const studentsEnrolled: studentListSchema = [
  {
    id: 1,
    name: "Student 1",
    parentContact: "1234567890",
    email: "student1@example.com",
    fatherName: "Father 1",
  },
  {
    id: 2,
    name: "Student 2",
    parentContact: "2345678901",
    email: "student2@example.com",
    fatherName: "Father 2",
  },
  {
    id: 3,
    name: "Student 3",
    parentContact: "3456789012",
    email: "student3@example.com",
    fatherName: "Father 3",
  },
  {
    id: 4,
    name: "Student 4",
    parentContact: "4567890123",
    email: "student4@example.com",
    fatherName: "Father 4",
  },
  {
    id: 5,
    name: "Student 5",
    parentContact: "5678901234",
    email: "student5@example.com",
    fatherName: "Father 5",
  },
  {
    id: 6,
    name: "Student 6",
    parentContact: "6789012345",
    email: "student6@example.com",
    fatherName: "Father 6",
  },
  {
    id: 7,
    name: "Student 7",
    parentContact: "7890123456",
    email: "student7@example.com",
    fatherName: "Father 7",
  },
  {
    id: 8,
    name: "Student 8",
    parentContact: "8901234567",
    email: "student8@example.com",
    fatherName: "Father 8",
  },
  {
    id: 9,
    name: "Student 9",
    parentContact: "9012345678",
    email: "student9@example.com",
    fatherName: "Father 9",
  },
  {
    id: 10,
    name: "Student 10",
    parentContact: "0123456789",
    email: "student10@example.com",
    fatherName: "Father 10",
  },
  {
    id: 11,
    name: "Student 11",
    parentContact: "1123456789",
    email: "student11@example.com",
    fatherName: "Father 11",
  },
  {
    id: 12,
    name: "Student 12",
    parentContact: "1223456789",
    email: "student12@example.com",
    fatherName: "Father 12",
  },
  {
    id: 13,
    name: "Student 13",
    parentContact: "1323456789",
    email: "student13@example.com",
    fatherName: "Father 13",
  },
  {
    id: 14,
    name: "Student 14",
    parentContact: "1423456789",
    email: "student14@example.com",
    fatherName: "Father 14",
  },
  {
    id: 15,
    name: "Student 15",
    parentContact: "1523456789",
    email: "student15@example.com",
    fatherName: "Father 15",
  },
  {
    id: 16,
    name: "Student 16",
    parentContact: "1623456789",
    email: "student16@example.com",
    fatherName: "Father 16",
  },
  {
    id: 17,
    name: "Student 17",
    parentContact: "1723456789",
    email: "student17@example.com",
    fatherName: "Father 17",
  },
  {
    id: 18,
    name: "Student 18",
    parentContact: "1823456789",
    email: "student18@example.com",
    fatherName: "Father 18",
  },
  {
    id: 19,
    name: "Student 19",
    parentContact: "1923456789",
    email: "student19@example.com",
    fatherName: "Father 19",
  },
  {
    id: 20,
    name: "Student 20",
    parentContact: "2023456789",
    email: "student20@example.com",
    fatherName: "Father 20",
  },
  {
    id: 21,
    name: "Student 21",
    parentContact: "2123456789",
    email: "student21@example.com",
    fatherName: "Father 21",
  },
  {
    id: 22,
    name: "Student 22",
    parentContact: "2223456789",
    email: "student22@example.com",
    fatherName: "Father 22",
  },
  {
    id: 23,
    name: "Student 23",
    parentContact: "2323456789",
    email: "student23@example.com",
    fatherName: "Father 23",
  },
  {
    id: 24,
    name: "Student 24",
    parentContact: "2423456789",
    email: "student24@example.com",
    fatherName: "Father 24",
  },
  {
    id: 25,
    name: "Student 25",
    parentContact: "2523456789",
    email: "student25@example.com",
    fatherName: "Father 25",
  },
  {
    id: 26,
    name: "Student 26",
    parentContact: "2623456789",
    email: "student26@example.com",
    fatherName: "Father 26",
  },
  {
    id: 27,
    name: "Student 27",
    parentContact: "2723456789",
    email: "student27@example.com",
    fatherName: "Father 27",
  },
  {
    id: 28,
    name: "Student 28",
    parentContact: "2823456789",
    email: "student28@example.com",
    fatherName: "Father 28",
  },
  {
    id: 29,
    name: "Student 29",
    parentContact: "2923456789",
    email: "student29@example.com",
    fatherName: "Father 29",
  },
  {
    id: 30,
    name: "Student 30",
    parentContact: "3023456789",
    email: "student30@example.com",
    fatherName: "Father 30",
  },
  {
    id: 31,
    name: "Student 31",
    parentContact: "3123456789",
    email: "student31@example.com",
    fatherName: "Father 31",
  },
  {
    id: 32,
    name: "Student 32",
    parentContact: "3223456789",
    email: "student32@example.com",
    fatherName: "Father 32",
  },
  {
    id: 33,
    name: "Student 33",
    parentContact: "3323456789",
    email: "student33@example.com",
    fatherName: "Father 33",
  },
  {
    id: 34,
    name: "Student 34",
    parentContact: "3423456789",
    email: "student34@example.com",
    fatherName: "Father 34",
  },
  {
    id: 35,
    name: "Student 35",
    parentContact: "3523456789",
    email: "student35@example.com",
    fatherName: "Father 35",
  },
  {
    id: 36,
    name: "Student 36",
    parentContact: "3623456789",
    email: "student36@example.com",
    fatherName: "Father 36",
  },
  {
    id: 37,
    name: "Student 37",
    parentContact: "3723456789",
    email: "student37@example.com",
    fatherName: "Father 37",
  },
  {
    id: 38,
    name: "Student 38",
    parentContact: "3823456789",
    email: "student38@example.com",
    fatherName: "Father 38",
  },
  {
    id: 39,
    name: "Student 39",
    parentContact: "3923456789",
    email: "student39@example.com",
    fatherName: "Father 39",
  },
  {
    id: 40,
    name: "Student 40",
    parentContact: "4023456789",
    email: "student40@example.com",
    fatherName: "Father 40",
  },
  {
    id: 41,
    name: "Student 41",
    parentContact: "4123456789",
    email: "student41@example.com",
    fatherName: "Father 41",
  },
  {
    id: 42,
    name: "Student 42",
    parentContact: "4223456789",
    email: "student42@example.com",
    fatherName: "Father 42",
  },
  {
    id: 43,
    name: "Student 43",
    parentContact: "4323456789",
    email: "student43@example.com",
    fatherName: "Father 43",
  },
  {
    id: 44,
    name: "Student 44",
    parentContact: "4423456789",
    email: "student44@example.com",
    fatherName: "Father 44",
  },
  {
    id: 45,
    name: "Student 45",
    parentContact: "4523456789",
    email: "student45@example.com",
    fatherName: "Father 45",
  },
  {
    id: 46,
    name: "Student 46",
    parentContact: "4623456789",
    email: "student46@example.com",
    fatherName: "Father 46",
  },
  {
    id: 47,
    name: "Student 47",
    parentContact: "4723456789",
    email: "student47@example.com",
    fatherName: "Father 47",
  },
  {
    id: 48,
    name: "Student 48",
    parentContact: "4823456789",
    email: "student48@example.com",
    fatherName: "Father 48",
  },
  {
    id: 49,
    name: "Student 49",
    parentContact: "4923456789",
    email: "student49.example.com",
    fatherName: "Father 49",
  },
  {
    id: 50,
    name: "Student 50",
    parentContact: "5023456789",
    email: "student50@example.com",
    fatherName: "Father 50",
  },
  {
    id: 51,
    name: "Student 51",
    parentContact: "5123456789",
    email: "student51@example.com",
    fatherName: "Father 51",
  },
  {
    id: 52,
    name: "Student 52",
    parentContact: "5223456789",
    email: "student52@example.com",
    fatherName: "Father 52",
  },
  {
    id: 53,
    name: "Student 53",
    parentContact: "5323456789",
    email: "student53@example.com",
    fatherName: "Father 53",
  },
  {
    id: 54,
    name: "Student 54",
    parentContact: "5423456789",
    email: "student54@example.com",
    fatherName: "Father 54",
  },
  {
    id: 55,
    name: "Student 55",
    parentContact: "5523456789",
    email: "student55@example.com",
    fatherName: "Father 55",
  },
  {
    id: 56,
    name: "Student 56",
    parentContact: "5623456789",
    email: "student56@example.com",
    fatherName: "Father 56",
  },
  {
    id: 57,
    name: "Student 57",
    parentContact: "5723456789",
    email: "student57@example.com",
    fatherName: "Father 57",
  },
  {
    id: 58,
    name: "Student 58",
    parentContact: "5823456789",
    email: "student58@example.com",
    fatherName: "Father 58",
  },
  {
    id: 59,
    name: "Student 59",
    parentContact: "5923456789",
    email: "student59@example.com",
    fatherName: "Father 59",
  },
  {
    id: 60,
    name: "Student 60",
    parentContact: "6023456789",
    email: "student60@example.com",
    fatherName: "Father 60",
  },
  {
    id: 61,
    name: "Student 61",
    parentContact: "6123456789",
    email: "student61@example.com",
    fatherName: "Father 61",
  },
  {
    id: 62,
    name: "Student 62",
    parentContact: "6223456789",
    email: "student62@example.com",
    fatherName: "Father 62",
  },
  {
    id: 63,
    name: "Student 63",
    parentContact: "6323456789",
    email: "student63@example.com",
    fatherName: "Father 63",
  },
  {
    id: 64,
    name: "Student 64",
    parentContact: "6423456789",
    email: "student64@example.com",
    fatherName: "Father 64",
  },
  {
    id: 65,
    name: "Student 65",
    parentContact: "6523456789",
    email: "student65@example.com",
    fatherName: "Father 65",
  },
  {
    id: 66,
    name: "Student 66",
    parentContact: "6623456789",
    email: "student66@example.com",
    fatherName: "Father 66",
  },
  {
    id: 67,
    name: "Student 67",
    parentContact: "6723456789",
    email: "student67@example.com",
    fatherName: "Father 67",
  },
  {
    id: 68,
    name: "Student 68",
    parentContact: "6823456789",
    email: "student68@example.com",
    fatherName: "Father 68",
  },
  {
    id: 69,
    name: "Student 69",
    parentContact: "6923456789",
    email: "student69.example.com",
    fatherName: "Father 69",
  },
  {
    id: 70,
    name: "Student 70",
    parentContact: "7023456789",
    email: "student70@example.com",
    fatherName: "Father 70",
  },
  {
    id: 71,
    name: "Student 71",
    parentContact: "7123456789",
    email: "student71@example.com",
    fatherName: "Father 71",
  },
  {
    id: 72,
    name: "Student 72",
    parentContact: "7223456789",
    email: "student72@example.com",
    fatherName: "Father 72",
  },
  {
    id: 73,
    name: "Student 73",
    parentContact: "7323456789",
    email: "student73@example.com",
    fatherName: "Father 73",
  },
  {
    id: 74,
    name: "Student 74",
    parentContact: "7423456789",
    email: "student74@example.com",
    fatherName: "Father 74",
  },
  {
    id: 75,
    name: "Student 75",
    parentContact: "7523456789",
    email: "student75@example.com",
    fatherName: "Father 75",
  },
  {
    id: 76,
    name: "Student 76",
    parentContact: "7623456789",
    email: "student76@example.com",
    fatherName: "Father 76",
  },
  {
    id: 77,
    name: "Student 77",
    parentContact: "7723456789",
    email: "student77@example.com",
    fatherName: "Father 77",
  },
  {
    id: 78,
    name: "Student 78",
    parentContact: "7823456789",
    email: "student78@example.com",
    fatherName: "Father 78",
  },
  {
    id: 79,
    name: "Student 79",
    parentContact: "7923456789",
    email: "student79.example.com",
    fatherName: "Father 79",
  },
  {
    id: 80,
    name: "Student 80",
    parentContact: "8023456789",
    email: "student80@example.com",
    fatherName: "Father 80",
  },
  {
    id: 81,
    name: "Student 81",
    parentContact: "8123456789",
    email: "student81@example.com",
    fatherName: "Father 81",
  },
  {
    id: 82,
    name: "Student 82",
    parentContact: "8223456789",
    email: "student82@example.com",
    fatherName: "Father 82",
  },
  {
    id: 83,
    name: "Student 83",
    parentContact: "8323456789",
    email: "student83@example.com",
    fatherName: "Father 83",
  },
  {
    id: 84,
    name: "Student 84",
    parentContact: "8423456789",
    email: "student84@example.com",
    fatherName: "Father 84",
  },
  {
    id: 85,
    name: "Student 85",
    parentContact: "8523456789",
    email: "student85@example.com",
    fatherName: "Father 85",
  },
  {
    id: 86,
    name: "Student 86",
    parentContact: "8623456789",
    email: "student86@example.com",
    fatherName: "Father 86",
  },
  {
    id: 87,
    name: "Student 87",
    parentContact: "8723456789",
    email: "student87@example.com",
    fatherName: "Father 87",
  },
  {
    id: 88,
    name: "Student 88",
    parentContact: "8823456789",
    email: "student88@example.com",
    fatherName: "Father 88",
  },
  {
    id: 89,
    name: "Student 89",
    parentContact: "8923456789",
    email: "student89@example.com",
    fatherName: "Father 89",
  },
  {
    id: 90,
    name: "Student 90",
    parentContact: "9023456789",
    email: "student90@example.com",
    fatherName: "Father 90",
  },
  {
    id: 91,
    name: "Student 91",
    parentContact: "9123456789",
    email: "student91@example.com",
    fatherName: "Father 91",
  },
  {
    id: 92,
    name: "Student 92",
    parentContact: "9223456789",
    email: "student92@example.com",
    fatherName: "Father 92",
  },
  {
    id: 93,
    name: "Student 93",
    parentContact: "9323456789",
    email: "student93@example.com",
    fatherName: "Father 93",
  },
  {
    id: 94,
    name: "Student 94",
    parentContact: "9423456789",
    email: "student94@example.com",
    fatherName: "Father 94",
  },
  {
    id: 95,
    name: "Student 95",
    parentContact: "9523456789",
    email: "student95@example.com",
    fatherName: "Father 95",
  },
  {
    id: 96,
    name: "Student 96",
    parentContact: "9623456789",
    email: "student96@example.com",
    fatherName: "Father 96",
  },
]

function Students() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchData, setSearchData] = useState<studentListSchema>([])
  // client side pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const nPages = Math.ceil(searchData?.length / recordsPerPage)
  const studentsPerPage = searchData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )
  const handleSearch = useCallback(
    (term: string) => {
      setQuery(term)
    },
    [setQuery]
  )
  const handleLoading = useCallback((bool: boolean) => {
    setIsLoading(bool)
  }, [])
  useEffect(() => {
    const data = studentsEnrolled.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.parentContact.toLowerCase().includes(query) ||
        student.fatherName.toLowerCase().includes(query)
    )
    setSearchData(data)
    setCurrentPage(1)
  }, [query, studentsEnrolled])
  const handlePageChange = (page: { selected: number }) => {
    const currentPage = page.selected
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className="container mt-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                Enrolled Students
              </h3>
              <div className="w-full md:w-1/3 ">
                {/* <span className="mt-2 text-sm text-gray-700">
                A list of all enrolled students.
               
              </span> */}

                <Searchbar
                  handleSearch={handleSearch}
                  handleLoading={handleLoading}
                  // isLoading={isLoading}
                />
              </div>
              <span className="italic text-xs text-slate-400">
                *Search students using student's name or email, father's name or
                mother's name, parent's contact or email.
              </span>
            </div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
        </div>

        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Father
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentsPerPage.map((student) => (
                      <tr key={student.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {student.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {student.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {student.parentContact}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {student.fatherName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                          <Link
                            to="#"
                            className="text-indigo-600 hover:text-indigo-900 "
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* pagination */}
        <div className="flex justify-center text-xs mt-4">
          <ReactPaginate
            breakLabel={<span className="mr-4">...</span>}
            previousLabel={
              <span className="text-andisor-blue">
                <Icons.ChevronLeft style={{ width: "30px" }} />
              </span>
            }
            nextLabel={
              <span className="text-andisor-blue">
                <Icons.ChevronRight style={{ width: "30px" }} />
              </span>
            }
            pageCount={nPages}
            forcePage={currentPage - 1}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            activeClassName="bg-slate-300 "
            containerClassName="flex items-center justify-center"
            pageClassName="border border-[1px] mr-3 rounded-full text-xl px-4 py-1 text-sm bg-blue-600 hover:bg-[#2E8CFF] text-white  cursor-pointer"
            onPageChange={handlePageChange}
          />
          {/* <div>{JSON.stringify(pageNumber, null, 2)}</div> */}
        </div>
      </div>
    </div>
  )
}

export default Students
