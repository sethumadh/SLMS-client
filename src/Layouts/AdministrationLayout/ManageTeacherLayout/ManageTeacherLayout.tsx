import { cn } from "@/lib/utils"
import { NavLink, Outlet, useLocation } from "react-router-dom"

const tabs = [
  {
    name: "Teacher",
    href: "/teacher",
    to: "/admin/administration/manage-teacher",
    current: false,
    end: true,
  },
  {
    name: "New Applications",
    href: "new",
    to: "/admin/administration/manage-teacher/new-applications",
    current: false,
    end: false,
  },
  {
    name: "Assign",
    href: "Assign",
    to: "/admin/administration/manage-teacher/assign",
    current: false,
    end: false,
  },
]

export default function EnrollmentNavbarLayout() {
  // const [setActiveLink]
  const location = useLocation()
  const activeLink = location.pathname

  return (
    <div className="">
      <div className="bg-slate-50 border-b">
        <nav
          className="-mb-px flex  border-gray-200 container"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <NavLink
              end
              key={tab.name}
              to={tab.to}
              className={({ isActive }) => {
                return cn(
                  activeLink.includes(tab.href) || isActive
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "w-1/4 border-b-2 py-4 px-1 text-center text-lg font-medium"
                )
              }}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
