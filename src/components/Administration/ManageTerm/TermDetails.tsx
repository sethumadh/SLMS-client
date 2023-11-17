import { formatDate } from "@/helpers/dateFormatter"

type TermDetailsProps = {
  description: string
  value: string | number
}

function TermDetails({ description, value }: TermDetailsProps) {
  return (
    <>
      <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
          {description}
        </dt>
        <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {typeof value === "string" && (
            <span className="flex-grow">{value && formatDate(value)}</span>
          )}
          {typeof value === "number" && (
            <span className="flex-grow">{value}</span>
          )}
          <span className="ml-4 flex-shrink-0">
            <button
              type="button"
              className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
            ></button>
          </span>
        </dd>
      </div>
    </>
  )
}

export default TermDetails
