import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { studentSetupWizardSchema } from "@/types/studentSetupWizardSchema"
import { ApplicationFooterSection } from "@/components/Application/ApplicationFooterSection/ApplicationFooterSection"
import StudentInfo from "@/components/Application/StudentInfo/StudentInfo"
import ParentsInfo from "@/components/Application/ParentsInfo/ParentsInfo"
import EmergencyContact from "@/components/Application/EmergencyContact/EmergencyContact"
import HealthInformation from "@/components/Application/HealthInformation/HealthInformation"
import Subjects from "@/components/Application/Subjects/Subjects"
import OtherInfo from "@/components/Application/OtherInfo/OtherInfo"

export type StudentWizardSchema = z.infer<typeof studentSetupWizardSchema>
type FieldName =
  | "personalDetails"
  | "parentsSchema"
  | "emergencyContact"
  | "healthInformation"
  | "subjects"
  | "otherInformation"

function Application() {
  const [nextPage, setNextPage] = useState(false)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const methods = useForm<StudentWizardSchema>({
    resolver: zodResolver(studentSetupWizardSchema),
    // defaultValues: {
    //   personalDetails: {
    //     firstName: "",
    //     lastName: "",
    //     DOB: new Date("01-01-2010"),
    //     gender: "",
    //     email: "",
    //     contact: "",
    //     address: "",
    //     suburb: "",
    //     state: "Victoria",
    //     country: "Australia",
    //     postcode: "",
    //     image: "",
    //   },
    //   parentsSchema: {
    //     fatherName: "",
    //     motherName: "",
    //     parentContact: "",
    //     parentEmail: "",
    //   },
    //   emergencyContact: {
    //     contactPerson: "",
    //     contactNumber: "",
    //     relationship: "",
    //   },
    //   healthInformation: {
    //     medicareNumber: "",
    //     ambulanceMembershipNumber: "",
    //     medicalCondition: "",
    //     allergy: "",
    //   },
    //   subjects: {
    //     subjects: [],
    //     subjectRelated: [],
    //   },
    //   otherInformation: {
    //     otherInfo: "",
    //     declaration: [],
    //   },
    // },
    defaultValues: {
      personalDetails: {
        firstName: "sethu",
        lastName: "sethu",
        DOB: new Date("01-01-2010"),
        gender: "",
        email: "s@s.com",
        contact: "0999999999",
        address: "sethu",
        suburb: "sethu",
        state: "Victoria",
        country: "Australia",
        postcode: "1234",
        image: "",
      },
      parentsSchema: {
        fatherName: "sethu",
        motherName: "sethu",
        parentContact: "0999999999",
        parentEmail: "s@s.com",
      },
      emergencyContact: {
        contactPerson: "sethu",
        contactNumber: "0999999999",
        relationship: "friend",
      },
      healthInformation: {
        medicareNumber: "1111111111",
        ambulanceMembershipNumber: "2222",
        medicalCondition: "sssss",
        allergy: "ssssss",
      },
      subjects: {
        subjects: [],
        subjectRelated: [],
      },
      otherInformation: {
        otherInfo: "",
        declaration: [],
      },
    },
  })

  const { trigger } = methods
  // const handleNextStep = async () => {
  //   if (step == 0) {
  //     setNextPage(false)
  //     const validateStep = await trigger(["personalDetails"], {
  //       shouldFocus: true,
  //     })
  //     if (validateStep) setStep(1)
  //   } else if (step == 1) {
  //     const validateStep = await trigger(["parentsSchema"], {
  //       shouldFocus: true,
  //     })
  //     if (validateStep) setStep(2)
  //   } else if (step == 2) {
  //     setNextPage(false)
  //     const validateStep = await trigger(["emergencyContact"], {
  //       shouldFocus: true,
  //     })
  //     if (validateStep) setStep(3)
  //   } else if (step == 3) {
  //     setNextPage(false)
  //     const validateStep = await trigger(["healthInformation"], {
  //       shouldFocus: true,
  //     })
  //     if (validateStep) setStep(4)
  //   } else if (step == 4) {
  //     const validateStep = await trigger(["subjects"], {
  //       shouldFocus: true,
  //     })

  //     if (validateStep) setStep(5)
  //   } else if (step == 5) {
  //     const validateStep = await trigger(["subjects"], {
  //       shouldFocus: true,
  //     })

  //     if (validateStep) setNextPage(true)
  //   }
  // }

  const handleNextStep = async () => {
    const validationFields: FieldName[] = [
      "personalDetails",
      "parentsSchema",
      "emergencyContact",
      "healthInformation",
      "subjects",
    ]

    if (step >= 0 && step <= validationFields.length) {
      setNextPage(false)
      const validateStep = await trigger([validationFields[step]], {
        shouldFocus: true,
      })

      if (validateStep) {
        if (step === 5) {
          setNextPage(true)
        } else {
          setStep(step + 1)
        }
      }
    }
  }

  console.log()
  const onSubmit = (values: StudentWizardSchema) => {
    console.log("hello")
    console.log(values)
    navigate("/application-submit", { replace: true })
  }
  return (
    <div>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 mb-16">
              {step == 0 && <StudentInfo />}
              {step == 1 && <ParentsInfo />}
              {step == 2 && <EmergencyContact />}
              {step == 3 && <HealthInformation />}
              {step == 4 && <Subjects />}
              {step == 5 && <OtherInfo />}
              <div className="">
                <ApplicationFooterSection
                  showPrevBtn={step == 0 ? false : true}
                  prevText={"Previous"}
                  prevOnClick={() => {
                    setStep(step - 1)
                  }}
                  type={!nextPage ? "button" : "submit"}
                  nextText={step != 5 ? "Next" : "Submit"}
                  nextOnClick={() => {
                    handleNextStep()
                  }}
                  // isSubmitting={updateBrandProfile.isLoading}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Application
