import { api } from "@/api/api"
import LoadingSpinner from "@/components/Loadingspinner"
import Icons from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

export default function Declaration() {
  const params = useParams()
  const {
    data: activeStudentData,
    isLoading: activeStudentDataIsLoading,
    isError: activeStudentDataIsError,
  } = useQuery({
    queryKey: [
      api.students.activeStudent.findActiveStudentById.querykey,
      params.id,
    ],
    queryFn: () => {
      if (params.id) {
        return api.students.activeStudent.findActiveStudentById.query(params.id)
      }
    },
    enabled: !!params.id,
  })
  if (activeStudentDataIsError) {
    return (
      <>
        <div className="h-[600px] w-full flex justify-center items-center">
          <p className="font-medium text-lg">There is no data to show</p>
        </div>
      </>
    )
  }
  return (
    <div>
      {activeStudentDataIsLoading ? (
        <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <LoadingSpinner className="w-20 h-20" />
          </div>
        </>
      ) : activeStudentData?.otherInformation ? (
        <>
          <div>
            <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
              <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
                <h3 className="sm:text-base font-semibold leading-7 text-gray-900  ">
                  Declaration by the applicant/parents
                </h3>
                <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
                  {/* * As given by the applicatant. */}
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
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Any comments
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {activeStudentData.otherInformation.otherInfo}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Declaration
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {activeStudentData.otherInformation.declaration}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Signature
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Image of the signature
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <p className="font-medium text-lg">There is no data to show</p>
          </div>
        </>
      )}
    </div>
  )
}
