import { api } from "@/api/api"
import TermDateModal from "@/components/Modal/TermDateModal"
import Icons from "@/constants/icons"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { formatDate } from "@/helpers/dateFormatter"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

export default function TermDetails() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const {
    data: termData,
    isLoading: termDataLoading,
    isError: termDataError,
  } = useQuery({
    queryKey: [
      api.admin.term.findUniqueTerm.queryKey,
      `termDetail${params.id}`,
    ],
    queryFn: () => {
      if (params.id) {
        return api.admin.term.findUniqueTerm.query(params.id)
      }
      throw new Error("No term ID provided")
    },
    enabled: !!params.id,
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
                  Publish Term
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-shrink-0 flex justify-center items-end gap-4 italic">
                    <button
                      disabled={
                        (termData?.endDate
                          ? new Date(termData.endDate) < new Date()
                          : false) || termData?.isPublish
                      }
                      type="button"
                      className="disabled:bg-slate-200 disabled:text-gray-400  px-2 border border-indigo-300 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        dispatch(
                          setOpenModal({
                            isOpen: true,
                            type: "isPublishTerm",
                            data: {
                              id: termData?.id,
                              value: termData?.name,
                            },
                          })
                        )
                      }}
                    >
                      Publish
                    </button>
                    {termData?.endDate &&
                      new Date(termData.endDate) < new Date() && (
                        <p className="text-xs">
                          {" "}
                          Please make the expiry date of the term greater than
                          today's date to publish the term
                        </p>
                      )}
                    {termData?.isPublish && (
                      <p className="text-xs"> Already Pusbished term</p>
                    )}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Make the term current term
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-shrink-0 flex justify-center items-end gap-4 italic">
                    <button
                      disabled={
                        (termData?.endDate
                          ? new Date(termData.endDate) < new Date()
                          : false) || termData?.currentTerm
                      }
                      type="button"
                      className="disabled:bg-slate-200 disabled:text-gray-400  px-2 border border-indigo-300 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        dispatch(
                          setOpenModal({
                            isOpen: true,
                            type: "isCurrentTerm",
                            data: {
                              id: termData?.id,
                              value: termData?.name,
                            },
                          })
                        )
                      }}
                    >
                      Make term current
                    </button>
                    {termData?.endDate &&
                      new Date(termData.endDate) < new Date() && (
                        <p className="text-xs">
                          Please make the expiry date of the term greater than
                          today's date to activate the term
                        </p>
                      )}
                    {termData?.currentTerm && (
                      <p className="text-xs"> The term is already current and active</p>
                    )}
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
                      className="rounded-md bg-red-600 px-2 font-medium text-white hover:text-red-50"
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
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Students List
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-shrink-0">
                    <Link
                      to={`${
                        termData?.isPublish ? "/admin/students" : "studentList"
                      }`}
                      className="rounded-md px-2 font-medium text-indigo-600 hover:text-indigo-500 underline-offset-4 underline "
                    >
                      Click here to see the list of student
                    </Link>
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
      <TermDateModal />
    </div>
  )
}
