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
    <div>
      <div className="bg-gray-100">
        <nav
          className=" flex space-x-4 rounded-lg container px-4 sm:px-6 lg:px-8 py-4"
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
                    ? "bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium underline underline-offset-4"
                    : "text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium",
                  ""
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
