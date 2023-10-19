import { PhotoIcon } from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker"
import Select, { SingleValue } from "react-select"
import { useState } from "react"

import { PersonalSchema } from "@/types/studentSetupWIzardSchema"

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "female" },
  { value: "other", label: "Other" },
]

function Application() {
  type PersonalType = z.infer<typeof PersonalSchema>
  const [imagePreview, setImagePreview] = useState<string | null>()

  const methods = useForm<PersonalType>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
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
      postcode: "123456",
      image: "",
    },
  })

  // const handleImageUpload=()=>{

  // }
  console.log()
  const onSubmit = (values: PersonalType) => {
    console.log(values)
  }
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Student Personal Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent email where you can receive regular emails.
          </p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name{" "}
                    <span className="italic text-xs text-gray-500">
                      (including middle name)
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("firstName")}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.firstName?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.firstName?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("lastName")}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="h-4">
                      {methods.formState.errors.lastName?.message && (
                        <span className="text-xs text-red-600">
                          {methods.formState.errors.lastName?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* DOB */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-2">
                    {/* <input
                      {...methods.register("DOB")}
                      type="date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                    <Controller
                      name="DOB"
                      control={methods.control}
                      render={({ field }) => (
                        <DatePicker
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
                      {methods.formState.errors.DOB?.message && (
                        <span className="text-xs text-red-600">
                          {methods.formState.errors.DOB?.message}
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
                    Gender
                  </label>
                  <div className="mt-2">
                    <Controller
                      defaultValue=""
                      name="gender"
                      control={methods.control}
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
                    {methods.formState.errors.gender?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.gender?.message}
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
                    Contact number-
                    <span className="italic text-xs bg-slate-200 text-gray-500">
                      ਇਸ ਮੋਬਾਇਲ ਨੰਬਰ ਤੇ ਆਪ ਜੀ ਨੂੰ ਵਿਦਿਆਰਥੀ ਨਾਲ ਸੰਬੰਧਿਤ ਤਸਵੀਰਾਂ,
                      ਵੀਡੀਉ ਅਤੇ ਸੰਦੇਸ਼ ਭੇਜੇ ਜਾਣਗੇ । You will be receiving videos
                      , Photos and other related information on this mobile
                      number
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("contact")}
                      type="text"
                      placeholder=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.contact?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.contact?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("email")}
                      type="email"
                      placeholder="email@example.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.email?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.email?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("address")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.address?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.address?.message}
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
                      {...methods.register("country")}
                      className="disabled:bg-slate-200 disabled:cursor-not-allowed block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.country?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.country?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Suburb
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("suburb")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.suburb?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.suburb?.message}
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
                      {...methods.register("state")}
                      className="disabled:bg-slate-200 disabled:cursor-not-allowed block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.state?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.state?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      {...methods.register("postcode")}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="h-4">
                    {methods.formState.errors.postcode?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.postcode?.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* upload Student picture */}
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo -
                    <span className="italic text-xs text-gray-600">
                      Student Photo will be used to make Student ID Card.
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
                            name="image"
                            control={methods.control}
                            render={({ field }) => {
                              return (
                                <input
                                  {...field}
                                  value={field.value?.fileName}
                                  onChange={(event) => {
                                    const file =
                                      event.target.files &&
                                      event.target.files[0]
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
                                  disabled={methods.formState.isSubmitting}
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
                    {methods.formState.errors.image?.message && (
                      <span className="text-xs text-red-600">
                        {methods.formState.errors.image?.message as string}
                      </span>
                    )}
                  </div>
                </div>
                {/* end of photo upload */}
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Application
