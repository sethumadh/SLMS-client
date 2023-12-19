import { api } from "@/api/api"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react"

import { cn } from "@/lib/utils"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import LoadingSpinner from "@/components/Loadingspinner"

function AllClass() {
  const { data: currentTermClassesData, isLoading: currentTermClassesLoading } =
    useQuery({
      queryKey: [api.admin.classes.findCurrentTermAllClass.querykey],
      queryFn: api.admin.classes.findCurrentTermAllClass.query,
    })

  return (
    <>
      {currentTermClassesLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <div>
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Classes for the current term
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the classes
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        Classes Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Number of Students
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Term
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentTermClassesData?.termSubjectLevel.map((classes) => (
                      <Fragment key={classes.id}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={5}
                            scope="colgroup"
                            className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            {classes.subject.name &&
                              capitalizeFirstCharacter(
                                classes.subject.name
                              )}{" "}
                            {classes.level.name}
                          </th>
                        </tr>
                        {classes.sections.map((section, sectionIndex) => (
                          <tr
                            key={section.id}
                            className={cn(
                              sectionIndex === 0
                                ? "border-gray-300"
                                : "border-gray-200",
                              "border-t"
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                              {section.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              50
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {currentTermClassesData.name &&
                                capitalizeFirstCharacter(
                                  currentTermClassesData.name
                                )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Action
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
        </div>
      )}
    </>
  )
}

export default AllClass
