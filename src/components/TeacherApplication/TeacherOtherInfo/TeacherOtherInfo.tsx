import { useFormContext } from "react-hook-form"

import { TeacherApplicantSchema } from "@/pages/Application/Teacher/TeacherApplication"

function TeacherOtherInfo() {
  const { register } = useFormContext<TeacherApplicantSchema>()

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
                  {...register("teacherOtherInformation.otherInfo")}
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
    </div>
  )
}

export default TeacherOtherInfo
