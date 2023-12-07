/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

import Searchbar from "@/components/Searchbar/Searchbar"
import Skeleton from "@/components/Skeleton"
import Icons from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"

function NewStudentApplications() {
  const [query, setQuery] = useState("")
  const [_isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [recordsPerPage, _setRecordPerPage] = useState(10)
  const {
    data: allApplicantData,
    isLoading: allApplicantDataLoading,
    isError: allApplicantDataIsError,
    error: _allApplicantDataError,
  } = useQuery({
    queryKey: [
      api.enrollment.enrollment.findAllApplicants.querykey,
      currentPage,
      query,
    ],
    queryFn: () => {
      if (query) {
        return api.enrollment.enrollment.searchApplicants.query(
          query,
          currentPage
        )
      } else {
        return api.enrollment.enrollment.findAllApplicants.query(currentPage)
      }
    },
  })

  const nPages = Math.ceil(
    (allApplicantData?.count._count?.id ?? 0) / recordsPerPage
  )
  console.log(allApplicantData)
  const handleSearch = useCallback(
    (term: string) => {
      setCurrentPage(0)
      setQuery(term)
    },
    [setQuery, setCurrentPage]
  )
  const handleLoading = useCallback((bool: boolean) => {
    setIsLoading(bool)
  }, [])

  const handlePageChange = (page: { selected: number }) => {
    const currentPage = page.selected
    setCurrentPage(currentPage)
  }

  return (
    <div className="max-w-7xl mx-auto  mt-2">
      <div className="container">
        <div className="sm:flex sm:items-center">
          <div className="flex justify-between items-end sm:flex-auto ">
            <div className="">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                New Applications
              </h3>
              <div className="w-full">
                <Searchbar
                  handleSearch={handleSearch}
                  handleLoading={handleLoading}
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

        {allApplicantDataLoading ? (
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
        ) : allApplicantData ? (
          <>
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
                          Sl no
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                      {allApplicantData?.applicants.map((applicant, index) => (
                        <tr key={applicant.personalDetails.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {index + 1 + currentPage * recordsPerPage}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {applicant.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {applicant.personalDetails.firstName}{" "}
                            {applicant.personalDetails.lastName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {applicant.personalDetails.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {applicant.parentsDetails.parentContact}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(applicant.createdAt).toLocaleString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                            <Link
                              to={`new-applicant-detail/${applicant.id.toString()}`}
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
        ) : allApplicantDataIsError ? (
          <div className="flex flex-row h-[650px] w-full justify-center items-center ">
            <p className="font-medium ">There are no Applicants data to show</p>
          </div>
        ) : (
          <>
            <>
              <div className="flex flex-row h-[650px] w-full justify-center items-center ">
                <p className="font-medium ">
                  There are no Applicants data to show. Some error happened
                </p>
              </div>
            </>
          </>
        )}
      </div>
    </div>
  )
}

export default NewStudentApplications
