/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

import Searchbar from "@/components/Searchbar/Searchbar"
import Skeleton from "@/components/Skeleton"
import Icons from "@/constants/icons"

type studentListSchema = {
  id: number
  name: string
  parentContact: string
  email: string
  dateApplied: Date
}[]

const NewApplications: studentListSchema = [
  {
    id: 1,
    name: "Student 1",
    parentContact: "1234567890",
    email: "student1@example.com",
    dateApplied: new Date(),
  },
  {
    id: 2,
    name: "Student 2",
    parentContact: "2345678901",
    email: "student2@example.com",
    dateApplied: new Date(),
  },
  {
    id: 3,
    name: "Student 3",
    parentContact: "3456789012",
    email: "student3@example.com",
    dateApplied: new Date(),
  },
  {
    id: 4,
    name: "Student 4",
    parentContact: "4567890123",
    email: "student4@example.com",
    dateApplied: new Date(),
  },
]

function NewStudentApplications() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchData, setSearchData] = useState<studentListSchema>([])
  // client side pagination
  const [currentPage, setCurrentPage] = useState(1)
  // const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [recordsPerPage] = useState(10)
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
    const data = NewApplications.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.parentContact.toLowerCase().includes(query)
    )
    setSearchData(data)
    setCurrentPage(1)
  }, [query, NewApplications])
  const handlePageChange = (page: { selected: number }) => {
    const currentPage = page.selected
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className="container mt-2">
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="flex justify-between items-end sm:flex-auto ">
            <div className="">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                New Applications
              </h3>
              <div className="w-full">
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
          <div className="mt-8 flow-root h-[575px]">
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
                        Date Applied
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
                          {student.dateApplied.toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                          <Link
                            to={`new-applicant-detail/${student.id.toString()}`}
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

export default NewStudentApplications
