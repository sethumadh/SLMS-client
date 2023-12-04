import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { StepperFooterSection } from "@/components/Application/StepperFooterSection/StepperFooterSection"
import ApplicantInfo from "@/components/Application/ApplicantInfo/ApplicantInfo"
import ParentsInfo from "@/components/Application/ParentsInfo/ParentsInfo"
import EmergencyContact from "@/components/Application/EmergencyContact/EmergencyContact"
import HealthInformation from "@/components/Application/HealthInformation/HealthInformation"
import Subjects from "@/components/Application/Subjects/Subjects"
import OtherInfo from "@/components/Application/OtherInfo/OtherInfo"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/api"
import { applicantSchema } from "@/types/Application/applicantSchema"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { NewApplicantSchema } from "@/api/application/application"
import SubmitApplicantModal from "@/components/Modal/SubmitApplicantModal"

export type ApplicantSchema = z.infer<typeof applicantSchema>

function Application() {
  const dispatch = useAppDispatch()
  const [nextPage, setNextPage] = useState(false)
  const [step, setStep] = useState(0)
  const currentTerm = useQuery({
    queryKey: [api.application.currentTerm.getTermSubjects.queryKey],
    queryFn: api.application.currentTerm.getTermSubjects.query,
  })
  console.log()
  const methods = useForm<ApplicantSchema>({
    resolver: zodResolver(applicantSchema),
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
    //   parentsDetails: {
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
    //    subjectInterest: {
    //     subjectsChosen: [],
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
        gender: "Male",
        email: "s@s.com",
        contact: "0999999999",
        address: "sethu",
        suburb: "sethu",
        state: "Victoria",
        country: "Australia",
        postcode: "1234",
        image: "",
      },
      parentsDetails: {
        fatherName: "sethu",
        motherName: "sethu",
        parentContact: "0999999999",
        parentEmail: "b@b.com",
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
      subjectInterest: {
        subjectsChosen: [],
        subjectRelated: [],
      },
      otherInformation: {
        otherInfo: "",
        declaration: [],
      },
    },
  })

  const { trigger } = methods
  const handleNextStep = async () => {
    if (step == 0) {
      setNextPage(false)
      const validateStep = await trigger(["personalDetails"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(1)
    } else if (step == 1) {
      const validateStep = await trigger(["parentsDetails"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(2)
    } else if (step == 2) {
      setNextPage(false)
      const validateStep = await trigger(["emergencyContact"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(3)
    } else if (step == 3) {
      setNextPage(false)
      const validateStep = await trigger(["healthInformation"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(4)
    } else if (step == 4) {
      const validateStep = await trigger(["subjectInterest"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(5)
    } else if (step == 5) {
      const validateStep = await trigger(["otherInformation"], {
        shouldFocus: true,
      })

      if (validateStep) setNextPage(true)
    }
  }

  const onSubmit = async (values: ApplicantSchema) => {
    if (currentTerm.data?.name) {
      const formattedValues: NewApplicantSchema = {
        ...values,
        personalDetails: {
          ...values.personalDetails,
          DOB: values.personalDetails.DOB.toISOString(),
        },
      }
      console.log(formattedValues)
      dispatch(
        setOpenModal({
          isOpen: true,
          type: "submitApplicant",
          data: {
            value: formattedValues,
          },
        })
      )
    }
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
              {step == 0 && <ApplicantInfo />}
              {step == 1 && <ParentsInfo />}
              {step == 2 && <EmergencyContact />}
              {step == 3 && <HealthInformation />}
              {step == 4 && <Subjects />}
              {step == 5 && <OtherInfo />}
              <div className="">
                <StepperFooterSection
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
      <SubmitApplicantModal />
    </div>
  )
}

export default Application
