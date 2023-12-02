/* trunk-ignore-all(prettier) */

import { api } from "@/api/api"
import Create from "@/components/Administration/CreateTerm/Create"
import Review from "@/components/Administration/CreateTerm/Review"
import { StepperSection } from "@/components/Administration/CreateTerm/StepperSection"
import { handleAxiosError } from "@/helpers/errorhandler"
import { setTermData } from "@/redux/slice/termSlice"
import { setOpenModal } from "@/redux/slice/modalSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store"

import { createTermWithSubjectSchema } from "@/types/Admin/Term/Term"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

export type CreateTermWithSubjectSchema = z.infer<
  typeof createTermWithSubjectSchema
>
function CreateTerm() {
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const [nextPage, setNextPage] = useState(false)

  const [step, setStep] = useState(0)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { mutateAsync: createTermSetup, isPending: createTermPending } =
    useMutation({
      mutationFn: api.admin.term.createTermWithSubjectsSetup.mutation,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [
            api.application.currentTerm.getTermSubjects.queryKey,
            api.admin.term.findAllTerms.queryKey,
          ],
        })
        // add inavlidate for getting all terms
        if (loadingToastId) toast.dismiss(loadingToastId)
        toast.success(`new term is created 👌`)
        dispatch(
          setOpenModal({
            isOpen: true,
            type: "isPublishTerm",
            data: {
              id: data?.id,
              value: data?.name,
            },
          })
        )
      },
      onError: (error: unknown) => {
        if (loadingToastId) toast.dismiss(loadingToastId)
        handleAxiosError(error)
      },
    })

  const data = useAppSelector((state) => state.term)
  const termState = useMemo(
    () => ({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    }),
    [data]
  )


  const createTermWithSubjectMethods = useForm<CreateTermWithSubjectSchema>({
    resolver: zodResolver(createTermWithSubjectSchema),
    defaultValues: {
      termName: "",
      startDate: new Date(),
      endDate: new Date(),
      groupSubjects: [
        {
          groupName: "",
          fee: "",
          feeInterval: "TERM",
          subjects: [
            {
              subjectName: "",
              levels: [],
            },
          ],
        },
      ],
    },
    shouldFocusError: true,
  })
  const { trigger, getValues } = createTermWithSubjectMethods

  const handleNextStep = async () => {
    const formData = getValues()
    const formattedData = {
      ...formData,
      startDate: formData?.startDate
        ? formData?.startDate.toString()
        : new Date().toString(),
      endDate: formData?.endDate
        ? formData?.endDate.toString()
        : new Date().toString(),
    }

    if (step == 0) {
      setNextPage(false)
      const validateStep = await trigger(
        ["endDate", "startDate", "groupSubjects", "termName"],
        {
          shouldFocus: true,
        }
      )

      if (validateStep) {
        dispatch(setTermData(formattedData))
        setStep(1)
      }
    } else if (step == 1) {
      const validateStep = await trigger(
        ["endDate", "startDate", "groupSubjects", "termName"],
        {
          shouldFocus: true,
        }
      )
      if (validateStep) {
        setNextPage(true)
      }
    }
  }

  const onSubmit = async (termData: CreateTermWithSubjectSchema) => {
    console.log(termData)
    const toastId = toast.loading(
      `Creating a new term in database, please wait`
    )
    const modifiedTermData = {
      ...termData,
      endDate: termData?.endDate.toString(),
      startDate: termData?.startDate.toString(),
    }
    setLoadingToastId(toastId.toString())
    await createTermSetup(modifiedTermData)
  }
  return (
    <div>
      <FormProvider {...createTermWithSubjectMethods}>
        <form
          onSubmit={createTermWithSubjectMethods.handleSubmit(onSubmit)}
          noValidate
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4  mb-16">
            {step == 0 && <Create />}
            {step == 1 && <Review />}
            <div className="border border-red-400">
              <StepperSection
                isSubmitting={createTermPending}
                showPrevBtn={step == 0 ? false : true}
                prevText={"Previous"}
                prevOnClick={() => {
                  createTermWithSubjectMethods.reset({
                    endDate: termState?.endDate
                      ? new Date(termState?.endDate?.toString())
                      : new Date(),
                    startDate: termState?.startDate
                      ? new Date(termState?.startDate?.toString())
                      : new Date(),
                    termName: termState?.termName,
                    groupSubjects:
                      termState.groupSubjects.length > 0
                        ? termState.groupSubjects.map((sub) => ({
                            groupName: sub.groupName,
                            fee: sub.fee,
                            feeInterval: sub.feeInterval,
                            subjects: sub.subjects.map((s) => {
                              return {
                                subjectName: s.subjectName,
                                levels: s.levels,
                              }
                            }),
                          }))
                        : [
                            {
                              groupName: "",
                              fee: "",
                              feeInterval: "TERM",
                              subjects: [
                                {
                                  subjectName: "",
                                  levels: [],
                                },
                              ],
                            },
                          ],
                  })
                  setStep(step - 1)
                }}
                type={!nextPage ? "button" : "submit"}
                nextText={step != 1 ? "Create Details" : "Review & Submit"}
                nextOnClick={() => {
                  handleNextStep()
                }}

                // isSubmitting={updateBrandProfile.isLoading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
      {/* <IsCurrentTermModal /> */}
    </div>
  )
}

export default CreateTerm
