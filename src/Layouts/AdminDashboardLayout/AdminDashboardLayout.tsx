import SideNavbar from "@/components/SideNavbar/SideNavbar"
import { useAppSelector } from "@/redux/store"
import { Outlet } from "react-router-dom"
import IsCurrentTermModal from "@/components/Modal/IsCurrentTermModal"
import IsPublishTermModal from "@/components/Modal/IsPublishTermModal"
import TermDeleteModal from "@/components/Modal/TermDeleteModal"

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
      <TermDeleteModal/>
    </div>
  )
}

export default AdminDashboardLayout
