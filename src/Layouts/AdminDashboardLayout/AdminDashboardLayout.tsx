import SideNavbar from "@/components/SideNavbar/SideNavbar"
import { useAppSelector } from "@/redux/store"
import { Outlet } from "react-router-dom"
import IsCurrentTermModal from "@/components/Modal/IsCurrentTermModal"
import DeleteTermModal from "@/components/Modal/DeleteTermModal"
import IsPublishTermModal from "@/components/Modal/IsPublishTermModal"

function AdminDashboardLayout() {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen)
  return (
    <div style={{ height: "auto", display: "flex" }} className="relative">
      <div className={`${isModalOpen ? "backdrop-blur-sm" : ""}`}>
        <SideNavbar />
      </div>
      <main className="w-full flex-1 md:pl-[70px]">
        <Outlet />
      </main>
      <IsCurrentTermModal />
      <IsPublishTermModal/>
      <DeleteTermModal />
    </div>
  )
}

export default AdminDashboardLayout
