import SideNavbar from "@/components/SideNavbar/SideNavbar"
import { Outlet } from "react-router-dom"

function AdminDashboardLayout() {
  return (
    <div>

      <SideNavbar />
      <Outlet />
    </div>
  )
}

export default AdminDashboardLayout
