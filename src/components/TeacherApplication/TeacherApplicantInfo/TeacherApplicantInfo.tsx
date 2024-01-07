import { TeacherApplicantSchema } from "@/pages/Application/Teacher/TeacherApplication"
import { PhotoIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import { Controller, useFormContext } from "react-hook-form"
import Select, { SingleValue } from "react-select"

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]


function TeacherApplicantInfo() {
  const { formState, control, register } =
    useFormContext<TeacherApplicantSchema>()
  const [imagePreview, setImagePreview] = useState<string | null>()

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Applicant Personal Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent email which you will use to login.
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name <span className="text-red-600">*</span>
                  <span className="italic text-xs text-gray-500">
                    (including middle name)
                  </span>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      {...register("teacherPersonalDetails.firstName")}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </label>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.firstName
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.firstName
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name<span className="text-red-600">*</span>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      {...register("teacherPersonalDetails.lastName")}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </label>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.lastName
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.lastName
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>

              {/* DOB */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    name="teacherPersonalDetails.DOB"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholderText="Select date"
                        onChange={(date: Date) => field.onChange(date)}
                        selected={field.value}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        showIcon
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 48 48"
                          >
                            <mask id="ipSApplication0">
                              <g
                                fill="none"
                                stroke="#fff"
                                strokeLinejoin="round"
                                strokeWidth="4"
                              >
                                <path
                                  strokeLinecap="round"
                                  d="M40.04 22v20h-32V22"
                                ></path>
                                <path
                                  fill="#fff"
                                  d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                ></path>
                              </g>
                            </mask>
                            <path
                              fill="currentColor"
                              d="M0 0h48v48H0z"
                              mask="url(#ipSApplication0)"
                            ></path>
                          </svg>
                        }
                      />
                    )}
                  />
                  <div className="h-4">
                    {formState.errors.teacherPersonalDetails?.DOB?.message && (
                      <span className="text-xs text-red-600">
                        {formState.errors.teacherPersonalDetails?.DOB?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/*  */}

              {/* gender select */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    defaultValue=""
                    name="teacherPersonalDetails.gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        isSearchable={false}
                        {...field}
                        options={options}
                        value={options.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(
                          option: SingleValue<{
                            value: string
                            label: string
                          }>
                        ) => {
                          return field.onChange(option?.value)
                        }}
                      />
                    )}
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.gender?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherPersonalDetails?.gender?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* end of gender select */}

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact number<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("teacherPersonalDetails.contact")}
                    type="text"
                    placeholder=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.contact
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.contact
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("teacherPersonalDetails.email")}
                    type="email"
                    placeholder="email@example.com"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.email?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherPersonalDetails?.email?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("teacherPersonalDetails.address")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.address
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.address
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    {...register("teacherPersonalDetails.country")}
                    className="disabled:bg-slate-200 disabled:cursor-not-allowed block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.country
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.country
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Suburb<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("teacherPersonalDetails.suburb")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.suburb?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherPersonalDetails?.suburb?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    {...register("teacherPersonalDetails.state")}
                    className="disabled:bg-slate-200 disabled:cursor-not-allowed block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.state?.message && (
                    <span className="text-xs text-red-600">
                      {formState.errors.teacherPersonalDetails?.state?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("teacherPersonalDetails.postcode")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.postcode
                    ?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.postcode
                          ?.message
                      }
                    </span>
                  )}
                </div>
              </div>
              {/* upload teacher picture */}
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo<span className="text-red-600">*</span> -
                  <span className="italic text-xs text-gray-600">
                    will be used for profile picture.
                  </span>
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-40 h-40 object-contain mx-auto"
                      />
                    )}
                    {!imagePreview && (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        {imagePreview && (
                          <span className="ring-0 outline-none bg-slate-200 px-4 py-2 rounded-lg">
                            Confirm and Upload a Photo
                          </span>
                        )}
                        {!imagePreview && (
                          <span className="ring-0 outline-none">
                            Select a photo
                          </span>
                        )}
                        <Controller
                          name="teacherPersonalDetails.image"
                          control={control}
                          render={({ field }) => {
                            return (
                              <input
                                {...field}
                                value={field.value?.fileName}
                                onChange={(event) => {
                                  const file =
                                    event.target.files && event.target.files[0]
                                  // upload to s3
                                  // set preview
                                  setImagePreview(
                                    file ? URL.createObjectURL(file) : null
                                  )
                                  field.onChange(file)
                                }}
                                accept=".png, .jpg, .jpeg, .image/*"
                                type="file"
                                className="sr-only"
                                disabled={formState.isSubmitting}
                                id="file-upload"
                              />
                            )
                          }}
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    {!imagePreview && (
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, JPEG up to 4MB
                      </p>
                    )}
                  </div>
                </div>
                <div className="h-4">
                  {formState.errors.teacherPersonalDetails?.image?.message && (
                    <span className="text-xs text-red-600">
                      {
                        formState.errors.teacherPersonalDetails?.image
                          ?.message as string
                      }
                    </span>
                  )}
                </div>
              </div>
              {/* end of photo upload */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeacherApplicantInfo
