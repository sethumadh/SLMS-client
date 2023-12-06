import { api } from "@/api/api"
import { formatDate } from "@/helpers/dateFormatter"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export default function AllTerms() {
  const { data: allTermData, isLoading: allTermDataLoading } = useQuery({
    queryKey: [api.admin.term.findAllTerms.queryKey],
    queryFn: api.admin.term.findAllTerms.query,
  })
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            All terms
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            All Terms Data Description. Click on action to see detailed
            information of term
          </p>
        </div>
      </div>
      {allTermDataLoading ? (
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
      ) : (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Time Period
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Current term
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Time Expired
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Published
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allTermData?.map((term) => (
                    <tr key={term.name}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="">
                            <div className="font-medium text-gray-900">
                              {term.name}
                            </div>
                            <div className="mt-1 text-gray-500">
                              {/* {term.endDate} */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {term.startDate && formatDate(term.startDate)}{" "}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                        {term.endDate && formatDate(term.endDate)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-md ${
                            term.currentTerm ? "bg-green-50" : "bg-red-300"
                          } bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`}
                        >
                          {term.currentTerm ? "Current term" : "Not Current"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-md ${
                            term.endDate && new Date(term.endDate) > new Date()
                              ? "bg-blue-50"
                              : "bg-red-300"
                          } bg-green-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20`}
                        >
                          {term.endDate && new Date(term.endDate) > new Date()
                            ? "Active"
                            : "Expired"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-md ${
                            term.isPublish ? "bg-yellow-50" : "bg-red-300"
                          } bg-green-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20`}
                        >
                          {term.isPublish ? "Published" : "No"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <Link
                          to={`term-details/${term.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                          <span className="sr-only">, {term.name}</span>
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
    </div>
  )
}
