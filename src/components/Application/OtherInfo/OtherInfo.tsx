import { useFormContext } from "react-hook-form"
import { ApplicantSchema } from "@/pages/Application/Application"

const declaration = `Declaration:

In the case of an emergency, I authorize the Akaal Shaouni Ltd, where it is impracticable to communicate with me to
arrange for me/my child(ren)/ward(s) to receive such medical or surgical treatment as may be deemed
necessary. I also undertake to pay or reimburse cost which may be incurred for medical attention, ambulance
transport and drugs while I am/my child(ren)/ward(s) is enrolled with the program

I understand that although Akaal Shaouni Ltd and their service providers attempt to minimize any
risk of personal injury within practical boundaries. Accidents do happen and all physical activities carry the risk
of personal injury. I acknowledge that there is an inherent risk of personal injury in physical activities that will
be undertaken as part of this program and I agree that I/my child(ren)/ward(s) undertake/undertakes the
activities at my/his/her/their own risk especially Gatka (Martial Art), which involves sharp objects that could
cause serious injury.

I release and indemnify Akaal Shaouni Ltd and its officers, employess, volunteers, agents and service providers
against all action suits, claims, demands, proceedings, losses, damages, compensation, costs, charges and any
expenses whatsoever arising directly or indirectly out of any personal injury to me/my child(ren)/ward(s)
howsoever occasioned, including claims arising from principles of contract, negligence, tort, statute or
otherwise which I now have or later may have in any way resulting from, or arising out of, or relating in any
way to my child(ren) s/ward(s) participation in activities to the fullest extent permitted by law.

Personal Property:

Parent/Guardians are advised that it is a condition of attendance that any personal
property taken to is the personal responsibility of the attendee. Akaal Shaouni Ltd does not have
insurance to cover any loss or damage to personal property, nor does the management accept any responsibility
for any loss or damage to any personal property, howsoever such loss or damage may arise or be caused.


Additionally,if I do not agree to my/my child(ren)/ward(s) s photograph appearing in any Akaal Shaouni's promotional material, I will inform the management in writing through email.


I understand and agree that I will remain with my child(ren) at Akaal Shaouni Ltd throughout the session unless otherwise transport organised by this organisation

Please accept the terms & conditions to submit this form.
`
function OtherInfo() {
  const { formState, register } = useFormContext<ApplicantSchema>()

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container ">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3 ">
        <div className="px-4 sm:px-0 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Other Information
          </h2>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 ">
          <div className="px-4 py-6 sm:p-8 ">
            <div className="grid w-full  ">
              <div className="sm:col-span-3">
                {/*  */}
                <textarea
                  {...register("otherInformation.otherInfo")}
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Any other info..."
                ></textarea>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
      {/*  ---end of---*/}

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Declaration<span className="text-red-600">*</span>
          </h2>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid w-full">
              <div className="sm:col-span-3">
                <label
                  htmlFor="subjects-related"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="mt-2">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        value={declaration}
                        {...register("otherInformation.declaration", {
                          required: {
                            value: true,
                            message: "Please submit your declaration",
                          },
                        })}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor={"declaration"}
                        className="font-medium text-gray-900"
                      >
                        <h1 className="w-full">{declaration}</h1>
                      </label>
                    </div>
                  </div>
                  <div className="h-4 mx-auto ">
                    {formState.errors.otherInformation?.declaration
                      ?.message && (
                      <span className="text-xs text-red-600 mx-auto flex justify-center">
                        {formState.errors.otherInformation.declaration?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherInfo
