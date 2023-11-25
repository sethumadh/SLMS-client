import { api } from "@/api/api"
import Icons from "@/constants/icons"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { formatDate } from "@/helpers/dateFormatter"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import {  useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"


export default function TermDetails() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const {
    data: termData,
    isLoading: termDataLoading,
    isError: termDataError,
  } = useQuery({
    queryKey: [api.admin.term.findUniqueTerm.queryKey, params.id],
    queryFn: () => {
      if (params.id) {
        return api.admin.term.findUniqueTerm.query(params.id)
      }
      throw new Error("No term ID provided")
    },
    enabled: !!params.id,
    staleTime: 1000 * 60 * 5,
  })


  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            TermDetails
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Detailed Term Data Description. Click on action to see detailed
            information of term
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
      {termDataLoading ? (
        <div className="flex flex-col items-center justify-center h-[500px] w-ful">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.75s"
                values="0 12 12;360 12 12"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      ) : termDataError ? (
        // No data available message
        <div className="flex flex-col items-center justify-center h-[500px] w-full">
          <p className="text-lg text-gray-700">No data available.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Term name
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    {termData?.name && capitalizeFirstCharacter(termData?.name)}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Term Period
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow ">
                    {termData?.startDate && formatDate(termData?.startDate)} to{" "}
                    {termData?.endDate && formatDate(termData?.endDate)}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  last Updated on
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow ">
                    {termData?.updatedAt && formatDate(termData?.updatedAt)}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Delete term
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        dispatch(
                          setOpenModal({
                            isOpen: true,
                            type: "deleteTerm",
                            data: {
                              id: termData?.id,
                              value: termData?.name,
                            },
                          })
                        )
                      }}
                    >
                      Delete
                    </button>
                  </span>
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Subjects Details
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {!termDataLoading ? (
                        termData?.termSubject.map((term) => (
                          <div
                            key={term.subject.id}
                            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="focus:outline-none ">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <div className="flex gap-1">
                                  <p className="text-sm  text-gray-900 w-1/3">
                                    Name
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {term.subject.name &&
                                      capitalizeFirstCharacter(
                                        term.subject.name
                                      )}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <p className="text-sm  text-gray-900 w-1/3">
                                    Fee
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {term.fee.amount}
                                  </p>
                                </div>

                                <div className="flex gap-1">
                                  <p className="text-sm text-gray-900 w-1/3">
                                    Fee Interval
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {capitalizeFirstCharacter(
                                      term.fee.paymentType.toLowerCase()
                                    )}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <p className="text-sm text-gray-900 w-1/3">
                                    Levels
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {term.level
                                      .map((l) =>
                                        capitalizeFirstCharacter(l.name)
                                      )
                                      .join(", ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          {/* {currentTerm?.termSubject.length > 0 ?"":""} */}
                          <div>There are no subjects to show</div>
                        </>
                      )}
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  )
}
