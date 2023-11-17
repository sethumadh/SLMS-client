import { Outlet } from "react-router-dom"

export default function AdministrationLayout() {
  return (
    <div className="">
      <div className="bg-slate-50 border-b py-2 px-8">
        <div className="-mb-px border-gray-200 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Administration
          </h2>
          <p className="mt-1 italic text-xs sm:text-sm sm:leading-8 text-gray-600">
            *Manage and create terms , subjects, levels and teacher information.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
