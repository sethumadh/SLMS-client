import { api } from "@/api/api"
import LoadingSpinner from "@/components/Loadingspinner"
import EnrollApplicantToStudentModal from "@/components/Modal/EnrollApplicantToStudentModal"
import Icons from "@/constants/icons"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

export default function NewApplicantDeclaration() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const {
    data: applicantData,
    isLoading: applicantDataIsLoading,
    isError: applicantDataIsError,
    // error: applicantDataError,
  } = useQuery({
    queryKey: [api.enrollment.enrollment.findApplicantById.querykey, params.id],
    queryFn: () => {
      if (params.id) {
        return api.enrollment.enrollment.findApplicantById.query(params.id)
      }
    },
    enabled: !!params.id,
  })
  if (applicantDataIsError) {
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
      {applicantDataIsLoading ? (
        <>
          <div className="h-[600px] w-full flex justify-center items-center">
            <LoadingSpinner className="w-20 h-20" />
          </div>
        </>
      ) : applicantData?.personalDetails ? (
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
                    {applicantData.otherInformation.otherInfo}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    About
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicantData.otherInformation.declaration}
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
            <div className="flex justify-center">
              <span className="isolate inline-flex rounded-md shadow-sm  mt-4">
                <button
                  onClick={() => {
                    if (params.id) {
                      dispatch(
                        setOpenModal({
                          isOpen: true,
                          type: "enrollApllicantToStudent",
                          data: {
                            id: parseInt(params.id),
                          },
                        })
                      )
                    }
                  }}
                  type="button"
                  className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Waitlist
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Reject
                </button>
              </span>
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
      <EnrollApplicantToStudentModal />
    </div>
  )
}
