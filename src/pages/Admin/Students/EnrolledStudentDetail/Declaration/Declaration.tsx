import Icons from "@/constants/icons"
import { Link } from "react-router-dom"

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
export default function Declaration() {
  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between gap-x-4 lg:mt-4 ">
        <div className="flex flex-col sm:flex sm:flex-row gap-x-4">
          <h3 className="sm:text-base font-semibold leading-7 text-gray-900  ">
            Declaration by the applicant/parents
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-500 italic">
            {/* * As given by the applicatant. */}
          </p>
        </div>
        <Link
          to=".."
          className="text-blue-300 italic text-sm flex justify-center items-center"
        >
          <span>
            <Icons.Undo2 className="w-4 h-4" />
          </span>
          <p className="hidden sm:block sm:text-sm">Go Back</p>
        </Link>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Any comments
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Comments made during the application
            </dd>
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {declaration}
            </dd>
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Signature
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Image of the signature
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
