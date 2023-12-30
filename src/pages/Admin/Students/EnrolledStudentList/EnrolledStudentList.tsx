/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"
import Select, { SingleValue } from "react-select"

import Searchbar from "@/components/Searchbar/Searchbar"
import Skeleton from "@/components/Skeleton"
import Icons from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"



const subjectOptions = [
  { value: "maths", label: "Maths" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
]
const classOptions = [
  { value: "class1", label: "Class1 " },
  { value: "class2", label: "Class2" },
  { value: "class3", label: "Class3" },
]
function EnrolledStudentList() {
  const [query, setQuery] = useState("")
  const [_isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [recordsPerPage, _setRecordPerPage] = useState(10)
  const { data: PublishedTerm} = useQuery({
    queryKey: [
      api.admin.term.publishedTerm.findPublishedTermAdministration.queryKey,
    ],
    queryFn: api.admin.term.publishedTerm.findPublishedTermAdministration.query,
  })
  const {
    data: allStudentData,
    isLoading: allStudentDataLoading,
    isError: allStudentDataIsError,
    error: _allStudentDataError,
  } = useQuery({
    queryKey: [
      api.students.enrolledStudent.findAllEnrolledStudents.querykey,
      currentPage,
      query,
      PublishedTerm?.id,
    ],
    queryFn: () => {
      if (query) {
        if (PublishedTerm?.id)
          return api.students.enrolledStudent.searchEnrolledStudents.query(
            query,
            currentPage,
            PublishedTerm?.id
          )
      } else {
        if (PublishedTerm?.id)
          return api.students.enrolledStudent.findAllEnrolledStudents.query(
            currentPage,
            PublishedTerm?.id
          )
      }
    },
    enabled: !!PublishedTerm?.id && !(PublishedTerm?.currentTerm && PublishedTerm?.isPublish),
  })

  const nPages = Math.ceil((allStudentData?.count ?? 0) / recordsPerPage)

  const handleSearch = useCallback(
    (term: string) => {
      setQuery(term)
    },
    [setQuery]
  )
  const handleLoading = useCallback((bool: boolean) => {
    setIsLoading(bool)
  }, [])

  const handlePageChange = (page: { selected: number }) => {
    const currentPage = page.selected
    setCurrentPage(currentPage)
  }
  const handleSubjectSelect = (
    selectedSubject: SingleValue<{ value: string; label: string }>
  ) => {
    console.log(selectedSubject)
  }
  const handleClassSelect = (
    selectedClass: SingleValue<{ value: string; label: string }>
  ) => {
    console.log(selectedClass)
  }

  return (
    <div className=" mt-2">
      <div className="container">
        <div className="sm:flex sm:items-center">
          <div className="flex justify-between items-end sm:flex-auto ">
            <div className="">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                Enrolled Students  <span className="italic font-medium text-md text-indigo-500 underline underline-offset-4">
                  {PublishedTerm?.name &&
                    capitalizeFirstCharacter(PublishedTerm?.name)}
                </span>
              </h3>
              <span className="italic text-xs text-slate-400">
                *Search by student's name,primary or secondary email or contact
                number.
              </span>
              <div className="w-2/3 lg:w-full ">
                {/* <span className="mt-2 text-sm text-gray-700">
                A list of all enrolled students.
              </span> */}

                <Searchbar
                  handleSearch={handleSearch}
                  handleLoading={handleLoading}
                  // isLoading={isLoading}
                />
              </div>
            </div>
            <div className="flex flex-col">
              {/* <h3 className="leading-6 text-gray-900 mb-4">
                Filter student by subjects & classes
              </h3> */}
              <div className="flex gap-12">
                <div>
                  <p className="text-slate-400 text-xs italic">*subjects</p>
                  <Select
                    className="absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    options={subjectOptions}
                    onChange={(
                      val: SingleValue<{ value: string; label: string }>
                    ) => handleSubjectSelect(val)}
                  />
                </div>
                <div>
                  <p className="text-slate-400 text-xs italic">*classes</p>
                  <Select
                    className="absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    options={classOptions}
                    onChange={(
                      val: SingleValue<{ value: string; label: string }>
                    ) => handleClassSelect(val)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
        </div>

        {allStudentDataLoading ? (
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
        ) : allStudentData ? (
          <>
            <div className="mt-2 flow-root">
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
                          Primary Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Primary Contact
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
                      {allStudentData?.enrolledStudents.map(
                        (enrolledStudent) => (
                          <tr key={enrolledStudent.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              {enrolledStudent.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {enrolledStudent.personalDetails.firstName &&
                                capitalizeFirstCharacter(
                                  enrolledStudent.personalDetails.firstName
                                )}
                              {enrolledStudent.personalDetails.lastName &&
                                capitalizeFirstCharacter(
                                  enrolledStudent.personalDetails.lastName
                                )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {enrolledStudent.personalDetails.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {enrolledStudent.personalDetails.contact}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                              <Link
                                to={`student-detail/${enrolledStudent.id.toString()}`}
                                className="text-indigo-600 hover:text-indigo-900 "
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  {allStudentData.count == 0 && (
                    <>
                      <div className="h-[600px] w-full flex justify-center items-center">
                        <p className="font-medium text-lg">
                          There is no enrolled students to show
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
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
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                activeClassName="bg-slate-300 "
                containerClassName="flex items-center justify-center"
                pageClassName="border border-[1px] mr-3 rounded-full text-xl px-4 py-1 text-sm bg-blue-600 hover:bg-[#2E8CFF] text-white  cursor-pointer"
                onPageChange={handlePageChange}
              />
              {/* <div>{JSON.stringify(pageNumber, null, 2)}</div> */}
            </div>
          </>
        ) : allStudentDataIsError ? (
          <>
            <div className="flex flex-row h-[650px] w-full justify-center items-center ">
              <p className="font-medium ">
                There are no Applicants data to show
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row h-[650px] w-full justify-center items-center ">
              <p className="font-medium ">
                There are no Applicants data to show. Some error happened
              </p>
            </div>
          </>
        )}
        {/* pagination */}
      </div>
    </div>
  )
}

export default EnrolledStudentList
