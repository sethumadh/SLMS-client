import { NavLink, Outlet, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

const tabs = [
  { name: "Applicant Details", smName: "Personal", href: ".", current: true },
  {
    name: "Approve Applicant",
    smName: "Approve",
    href: "approve",
    current: true,
  },
]

export default function NewTeacherApplicantDetailsLayout() {
  const location = useLocation()
  const activeLink = location.pathname

  return (
    <div className="container">
      <div className="sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow "
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <NavLink
              end
              key={tab.name}
              to={tab.href}
              className={({ isActive }) =>
                cn(
                  "bg-slate-50 m:text-xs lg:text-sm",
                  isActive || activeLink.includes(tab.href)
                    ? "text-indigo-500  border-b-2 bg-white text-base"
                    : "",
                  " sm:flex-1 overflow-hidden  py-4 px-4 text-center font-medium hover:bg-gray-50 focus:z-10 "
                )
              }
              aria-current={tab.current ? "page" : undefined}
            >
              <span className="hidden sm:block ">{tab.name}</span>
              <span className="text-xs sm:hidden ">{tab.smName}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
