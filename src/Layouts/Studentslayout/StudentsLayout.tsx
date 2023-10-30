import { cn } from "@/lib/utils"
import { NavLink, Outlet, useLocation } from "react-router-dom"

const tabs = [
  {
    name: "Enrolled Students",
    href: "/admin/students/student-detail",
    to: "/admin/students",
    current: false,
    end: true,
  },
  {
    name: "Alumni",
    href: "/admin/students/alumni",
    to: "/admin/students/alumni",
    current: false,
    end: false,
  },
]

export default function StudentsNavbar() {
  // const [setActiveLink]
  const location = useLocation()
  const activeLink = location.pathname
  console.log(activeLink)
  return (
    <div className="hidden sm:block">
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
                  activeLink.startsWith(tab.href) || isActive
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
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
