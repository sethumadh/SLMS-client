import NewTeacherApplicantPersonalDetails from "./NewTeacherApplicantPersonalDetails/NewTeacherApplicantPersonalDetails"
import NewTeacherApplicationBankingDetails from "./NewTeacherApplicationBankingDetails/NewTeacherApplicationBankingDetails"
import NewTeacherApplicantHealthDetails from "./NewTeacherApplicationEmergencyContact/NewTeacherApplicationEmergencyContact"
import NewTeacherApplicationWorkRight from "./NewTeacherApplicationWorkRight/NewTeacherApplicationWorkRight"
import NewTeacherOtherInformation from "./NewTeacherOtherInformation/NewTeacherOtherInformation"

function NewTeacherApplicationDetail() {
  return (
    <div className="mb-12">
      <NewTeacherApplicantPersonalDetails />
      <NewTeacherApplicantHealthDetails />
      <NewTeacherApplicationWorkRight />
      <NewTeacherApplicationBankingDetails />
      <NewTeacherOtherInformation />
    </div>
  )
}

export default NewTeacherApplicationDetail
