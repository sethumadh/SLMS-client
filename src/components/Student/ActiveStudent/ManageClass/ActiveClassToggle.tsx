import { api } from "@/api/api"

import Toggle from "@/components/Toggle"
import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type ActiveClassToggleProps = {
  className: string
  isCurrentlyAssigned: boolean
  id: string
}
function ActiveClassToggle({
  className,
  id,
  isCurrentlyAssigned,
}: ActiveClassToggleProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: manageClass } = useMutation({
    mutationFn: api.students.activeStudent.manageClasses.query,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          api.students.activeStudent.findUniqueStudentClassDetails.querykey,
        ],
      })
    },
  })

  const handleCurrentlyAssigned = () => {
    manageClass(id)
  }

  return (
    <dl className="divide-y divide-gray-100">
      <>
        {" "}
        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-x-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Class</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {capitalizeFirstCharacter(className)}
          </dd>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <Toggle
              enabled={isCurrentlyAssigned}
              handleEnabled={handleCurrentlyAssigned}
              labelTrue='Remove Student from class'
              labelFalse="Put back student to class"

            />
          </dd>
        </div>
      </>
    </dl>
  )
}

export default ActiveClassToggle
