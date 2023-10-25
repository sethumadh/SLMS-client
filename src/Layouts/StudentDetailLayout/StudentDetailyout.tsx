import { cn } from "@/lib/utils"
import { NavLink, Outlet, useLocation } from "react-router-dom"

const tabs = [
  { name: "Student Details", href: "#", current: true },
  { name: "Emergency and Health", href: "#", current: false },
  { name: "Any other", href: "#", current: false },
  { name: "Declaration", href: "#", current: false },
]

export default function StudentDetailLayout() {
  const location = useLocation()
  const activeLink= location.pathname
  console.log(activeLink)
  
  return (
    <div className="container">
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              className={({ isActive }) => {
                return cn(
                  isActive 
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )
              }}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={cn(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet/>
    </div>
  )
}
