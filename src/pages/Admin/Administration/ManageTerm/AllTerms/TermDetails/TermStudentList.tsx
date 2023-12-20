/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/api/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export default function TermStudentList() {
    const params = useParams()
    console.log(params)
    const {
        data: _termData,
        isLoading: _termDataLoading,
        isError: _termDataError,
      } = useQuery({
        queryKey: [
          api.admin.term.findStudentListInATerm.queryKey,
          `termDetail${params.id}`,
        ],
        queryFn: () => {
          if (params.id) {
            return api.admin.term.findStudentListInATerm.query(params.id)
          }
          throw new Error("No term ID provided")
        },
        enabled: !!params.id,
      })
  return <div>TermStudentList</div>
}
