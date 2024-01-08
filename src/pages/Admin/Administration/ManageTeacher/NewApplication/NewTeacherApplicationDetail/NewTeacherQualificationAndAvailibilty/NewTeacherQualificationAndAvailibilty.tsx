import {  useParams } from "react-router-dom"
// import Icons from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
// import { capitalizeFirstCharacter } from "@/helpers/capitalizeFirstCharacter"

function NewTeacherQualificationAndAvailibilty() {
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
  const { experience, qualification, subjectsChosen, timeSlotsChosen } =
    applicantData?.teacherQualificationAvailability ?? {}
  console.log(experience, qualification, subjectsChosen, timeSlotsChosen)
  return <div>NewTeacherQualificationAndAvailibilty</div>
}

export default NewTeacherQualificationAndAvailibilty
