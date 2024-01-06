import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { StepperFooterSection } from "@/components/StudentApplication/StepperFooterSection/StepperFooterSection"
import { useAppDispatch } from "@/redux/store"
import { setOpenModal } from "@/redux/slice/modalSlice"
import SubmitApplicantModal from "@/components/Modal/SubmitApplicantModal"
import { teacherApplicantSchema } from "@/types/Application/teacherApplicantSchema"
import TeacherApplicantInfo from "@/components/TeacherApplication/TeacherApplicantInfo/TeacherApplicantInfo"
import TeacherEmergencyContact from "@/components/TeacherApplication/TeacherEmergencyContact/TeacherEmergencyContact"

import TeacherWorkRights from "@/components/TeacherApplication/TeacherWorkRights/TeacherWorkRights"
import TeacherBankDetails from "@/components/TeacherApplication/TeacherBankDetails/TeacherBankDetails"
import TeacherWWCHealthInformation from "@/components/TeacherApplication/TeacherHealthInformation/TeacherHealthInformation"
import TeacherQualificationAvailability from "@/components/TeacherApplication/TeacherQualificationAvailability/TeacherQualificationAvailability"
import TeacherOtherInfo from "@/components/TeacherApplication/TeacherOtherInfo/TeacherOtherInfo"

export type TeacherApplicantSchema = z.infer<typeof teacherApplicantSchema>

function TeacherApplication() {
  const dispatch = useAppDispatch()
  const [nextPage, setNextPage] = useState(false)
  const [step, setStep] = useState(0)
  const methods = useForm<TeacherApplicantSchema>({
    resolver: zodResolver(teacherApplicantSchema),
    defaultValues: {
      teacherPersonalDetails: {
        // firstName: "",
        // lastName: "",
        // DOB: new Date("01-01-2010"),
        // gender: "",
        // email: "",
        // contact: "",
        // address: "",
        // suburb: "",
        // state: "Victoria",
        // country: "Australia",
        // postcode: "",
        // image: "",
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

      teacherEmergencyContact: {
        // contactPerson: "",
        // contactNumber: "",
        // relationship: "",
        contactPerson: "sethu",
        contactNumber: "0999999999",
        relationship: "friend",
      },
      teacherWorkRights: {
        workRights: "YES",
        immigrationStatus: "Citizen",
        // workRights: "",
        // immigrationStatus: "",
      },
      teacherWWCHealthInformation: {
        medicareNumber: "1212121212",
        medicalCondition: "some condition",
        childrenCheckCardNumber: "33232",
        workingWithChildrenCheckExpiry: new Date("01-01-2010"),
        workingwithChildrenCheckCardPhotoImage: "",
        // medicareNumber: "",
        // medicalCondition: "",
        // childrenCheckCardNumber: "",
        // workingWithChildrenCheckExpiry: new Date("01-01-2010"),
        // workingwithChildrenCheckCardPhotoImage: "",
      },
      teacherBankDetails: {
        // bankAccountName: "",
        // BSB: "",
        // accountNumber: "",
        // ABN: "",
        bankAccountName: "12345",
        BSB: "1232",
        accountNumber: "121212",
        ABN: "43434",
      },
      teacherQualificationAvailability: {
        subjectsChosen: ["maths"],
        timeSlotsChosen: ["Sunday 11AM-12PM"],
        qualification: "BEd",
        experience: "2 years",
        // subjectsChosen: [],
        // timeSlotsChosen: [],
        // qualification: "",
        // experience: "",
      },
      teacherOtherInformation: {
        otherInfo:""

      },
    },
    // defaultValues: {
    //   personalDetails: {
    //     firstName: "sethu",
    //     lastName: "sethu",
    //     DOB: new Date("01-01-2010"),
    //     gender: "Male",
    //     email: "s@s.com",
    //     contact: "0999999999",
    //     address: "sethu",
    //     suburb: "sethu",
    //     state: "Victoria",
    //     country: "Australia",
    //     postcode: "1234",
    //     image: "",
    //   },
    //   parentsDetails: {
    //     fatherName: "sethu",
    //     motherName: "sethu",
    //     parentContact: "0999999999",
    //     parentEmail: "b@b.com",
    //   },
    //   emergencyContact: {
    //     contactPerson: "sethu",
    //     contactNumber: "0999999999",
    //     relationship: "friend",
    //   },
    //   healthInformation: {
    //     medicareNumber: "1111111111",
    //     ambulanceMembershipNumber: "2222",
    //     medicalCondition: "sssss",
    //     allergy: "ssssss",
    //   },
    //   subjectInterest: {
    //     subjectsChosen: [],
    //     subjectRelated: [],
    //   },
    //   otherInformation: {
    //     otherInfo: "",
    //     declaration: [],
    //   },
    // },
  })
  console.log(methods.formState.errors)
  const { trigger } = methods
  const handleNextStep = async () => {
    if (step == 0) {
      setNextPage(false)
      const validateStep = await trigger(["teacherPersonalDetails"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(1)
    } else if (step == 1) {
      setNextPage(false)
      const validateStep = await trigger(["teacherEmergencyContact"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(2)
    } else if (step == 2) {
      setNextPage(false)
      const validateStep = await trigger(["teacherWorkRights"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(3)
    } else if (step == 3) {
      setNextPage(false)
      const validateStep = await trigger(["teacherWWCHealthInformation"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(4)
    } else if (step == 4) {
      setNextPage(false)
      const validateStep = await trigger(["teacherBankDetails"], {
        shouldFocus: true,
      })
      if (validateStep) setStep(5)
    } else if (step == 5) {
      setNextPage(false)
      const validateStep = await trigger(["teacherQualificationAvailability"], {
        shouldFocus: true,
      })

      if (validateStep) setStep(6)
    } else if (step == 6) {
      const validateStep = await trigger(["teacherOtherInformation"], {
        shouldFocus: true,
      })

      if (validateStep) setNextPage(true)
    }
  }

  const onSubmit: SubmitHandler<TeacherApplicantSchema> = async (values) => {
    // const formattedValues: NewApplicantSchema = {
    //   ...values,
    //   personalDetails: {
    //     ...values.personalDetails,
    //     DOB: values.personalDetails.DOB.toISOString(),
    //   },
    // }
    // dispatch(
    //   setOpenModal({
    //     isOpen: true,
    //     type: "submitApplicant",
    //     data: {
    //       value: formattedValues,
    //     },
    //   })
    // )
    console.log(values)
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
              {step == 0 && <TeacherApplicantInfo />}
              {step == 1 && <TeacherEmergencyContact />}
              {step == 2 && <TeacherWorkRights />}
              {step == 3 && <TeacherWWCHealthInformation />}
              {step == 4 && <TeacherBankDetails />}
              {step == 5 && <TeacherQualificationAvailability />}
              {step == 6 && <TeacherOtherInfo />}
              <div className="">
                <StepperFooterSection
                  showPrevBtn={step == 0 ? false : true}
                  prevText={"Previous"}
                  prevOnClick={() => {
                    setStep(step - 1)
                  }}
                  type={!nextPage ? "button" : "submit"}
                  nextText={step != 6 ? "Next" : "Submit"}
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

export default TeacherApplication
