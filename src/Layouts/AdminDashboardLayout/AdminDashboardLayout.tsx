import SideNavbar from "@/components/SideNavbar/SideNavbar"
import { Outlet } from "react-router-dom"

function AdminDashboardLayout() {
  return (
<div style={{ height: "auto", display: "flex" }} className="relative">
      <SideNavbar />
      <main className="w-full flex-1 md:pl-[70px]">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminDashboardLayout
