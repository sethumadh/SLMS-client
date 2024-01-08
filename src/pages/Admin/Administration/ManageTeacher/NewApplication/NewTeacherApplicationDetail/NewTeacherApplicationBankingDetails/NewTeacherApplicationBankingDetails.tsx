import { Link, useParams } from "react-router-dom"
import Icons from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"

function NewTeacherApplicationBankingDetails() {
  const params = useParams()
  const { data: applicantData } = useQuery({
    queryKey: [
      api.admin.teacherApprove.findTeacherApplicantById.querykey,
      params.id,
    ],
    queryFn: () => {
      if (params.id) {
        return api.admin.teacherApprove.findTeacherApplicantById.query(
          params.id
        )
      }
    },
    enabled: !!params.id,
  })
  const { ABN, BSB, accountNumber, bankAccountName } =
    applicantData?.teacherBankDetails ?? {}
  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
        <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
          <h3 className="sm:text-base font-semibold leading-7 text-gray-900  ">
            Banking Details
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
            *Banking Details given by the applicatant.
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

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 lg:mt-4 border rounded-xl p-4"
      >
        <div className="col-span-2  sm:px-4 sm:py-2 ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Account Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {bankAccountName}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {" "}
                BSB
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {BSB}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {" "}
                Account Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {accountNumber}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4  sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {" "}
                ABN
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ABN}
              </dd>
            </div>
          </dl>
        </div>
      </ul>
    </div>
  )
}

export default NewTeacherApplicationBankingDetails
