import { NavLink, Outlet, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

const tabs = [
  { name: "Personal Details", smName: "Personal", href: ".", current: true },
  {
    name: "Subject & classes",
    smName: "Classes",
    href: "manage-subjects-classes",
    current: false,
  },
  {
    name: "Parents Details",
    smName: "Parents",
    href: "parent",
    current: false,
  },
  {
    name: "Emergency and Health",
    smName: "Health",
    href: "health",
    current: false,
  },
  { name: "Declaration", smName: "Terms", href: "declaration", current: false },
]

export default function EnrolledStudentDetailLayout() {
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
