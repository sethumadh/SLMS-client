import NewApplicantDeclaration from "./Declaration/Declaration"
import NewApplicantHealthDetails from "./HealthDetails.tsx/HealthDetails"
import NewApplicantParentDetails from "./ParentDetails/ParentDetails"
import NewApplicantPersonalDetails from "./PersonalDetails/ NewApplicantPersonalDetails"

function NewApplicantDetail() {
  return (
    <div>
      <NewApplicantPersonalDetails />
      <NewApplicantParentDetails />
      <NewApplicantHealthDetails />
      <NewApplicantDeclaration />
    </div>
  )
}

export default NewApplicantDetail
