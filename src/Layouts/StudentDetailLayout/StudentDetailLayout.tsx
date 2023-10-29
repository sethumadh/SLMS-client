import { Link, NavLink, Outlet, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

const tabs = [
  { name: "Personal Details", href: ".", current: true },
  {
    name: "Manage Subject and classes",
    href: "manage-subjects-classes",
    current: true,
  },
  { name: "Parent Details", href: "parent", current: false },
  { name: "Emergency and Health", href: "health", current: false },
  { name: "Declaration", href: "declaration", current: false },
  // { name: "Declaration", href: "declaration", current: false },
]

export default function StudentDetailLayout() {
  const location = useLocation()
  const activeLink = location.pathname

  return (
    <div className="container">
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={cn(
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <NavLink
                end
                to={tab.href}
                aria-hidden="true"
                className={({ isActive }) =>
                  cn(
                    activeLink.includes(tab.href) || isActive
                      ? "bg-indigo-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )
                }
              ></NavLink>
            </Link>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
