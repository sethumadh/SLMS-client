import Declaration from "./Declaration/Declaration"
import HealthDetails from "./HealthDetails.tsx/HealthDetails"
import ParentDetails from "./ParentDetails/ParentDetails"
import PersonalDetails from "./PersonalDetails/PersonalDetails"

const PersonalInformation = () => {
  return (
    <div>
      <PersonalDetails />
      <ParentDetails />
      <HealthDetails/>
      <Declaration/>
    </div>
  )
}

export default PersonalInformation
