import { api } from "@/api/api"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react"
import { useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { formatDate } from "@/helpers/dateFormatter"

export default function FeeDetails() {
  const params = useParams()
  const { data: currentTerm } = useQuery({
    queryKey: [
      api.admin.term.currentTerm.findCurrentTermAdministration.queryKey,
    ],
    queryFn: api.admin.term.currentTerm.findCurrentTermAdministration.query,
  })

  const {
    data: activeStudentFeeData,
    isLoading: activeStudentDataIsLoading,
    // isError: activeStudentDataIsError,
  } = useQuery({
    queryKey: [
      api.students.activeStudent.findActiveStudentFeeDetailsById.querykey,
      params.id,
      currentTerm?.id,
    ],
    queryFn: () => {
      if (params.id && currentTerm?.id) {
        return api.students.activeStudent.findActiveStudentFeeDetailsById.query(
          params.id,
          currentTerm?.id
        )
      }
    },
    enabled: !!params.id && !!currentTerm?.id,
  })

  console.log(activeStudentFeeData)

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Fee Details
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            The student fee details for the currently enrolled term.
          </p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div> */}
      </div>
      {activeStudentDataIsLoading ? (
        <>
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
        </>
      ) : (
        <>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr className="">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Subject Group
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Due Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Paid Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Method
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Manage fee
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {activeStudentFeeData?.map((feeData) => (
                      <Fragment
                        key={feeData.termSubjectGroup.subjectGroup.groupName}
                      >
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={7}
                            scope="colgroup"
                            className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            {feeData.termSubjectGroup.subjectGroup.groupName &&
                              capitalizeFirstCharacter(
                                feeData.termSubjectGroup.subjectGroup.groupName
                              )}
                          </th>
                        </tr>
                        {feeData.feePayment.map((fee, feeIdx) => (
                          <tr
                            key={feeIdx}
                            className={cn(
                              feeIdx === 0
                                ? "border-gray-300"
                                : "border-gray-200",
                              "border-t"
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 truncate max-w-[100px]">
                              {feeData.termSubjectGroup.enrollment
                                .map(
                                  (en) =>
                                    en.subjectEnrollment.termSubject.subject
                                      .name &&
                                    capitalizeFirstCharacter(
                                      en.subjectEnrollment.termSubject.subject
                                        .name
                                    )
                                )
                                .join(",")}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {feeData.termSubjectGroup.fee.paymentType.toLowerCase()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {fee.dueDate && formatDate(fee.dueDate)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {fee.dueAmount}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                              {fee.paidDate? formatDate(fee.paidDate):"Not paid"}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {fee.method}

                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              role
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
