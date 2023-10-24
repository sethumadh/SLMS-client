import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

import icons from "@/constants/icons"
import { useAppSelector, useAppDispatch } from "@/redux/store"
// import { persistor, useAppSelector, useAppDispatch } from "@/redux/store"
import { setActivePath } from "@/redux/slice/sidebarSlice"
import images from "@/constants/images/images"
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
// import { logoutSuccess } from "../helper/functions/functions"
// import useAxiosInstance from "../hooks/useAxiosInstance"

function SideNavBar() {
  //   const { axiosInstance } = useAxiosInstance()
  const location = useLocation()
  const dispatch = useAppDispatch()
  //   const user = useAppSelector((state) => state.user)
  const activeLink = useAppSelector((state) => state.sidebar.activePath)
  const [collapsed, setCollapsed] = useState(true)
  //   const navigate = useNavigate()
  //   const handleLogout = async () => {
  //     try {
  //       persistor.purge()
  //       logoutSuccess()
  //       navigate("/login")
  //       const response = await axiosInstance.post(`/api/users/logout`)
  //       console.log(response)
  //     } catch (err) {
  //       // console.log(err)
  //       navigate("/login")
  //     }
  //   }

  useEffect(() => {
    dispatch(setActivePath(location.pathname))
  }, [location, dispatch])
  return (
    <div style={{ height: "auto", display: "flex" }} className="relative">
      <Sidebar
        style={{
          height: "auto",
          backgroundColor: "white",
          marginRight: "",
          position: "fixed",
          zIndex: 999,
        }}
        collapsed={collapsed}
        transitionDuration={400}
        className="bg-white hidden md:block"
      >
        <Menu className="min-h-screen border-r-2 bg-white">
          <MenuItem
            className="bg-white "
            icon={<icons.Menu />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ textAlign: "center" }}
          >
            <img
              className="inline-block h-8 w-8 rounded-full border border-red-300 ml-0"
              src={images.Logo}
              alt=""
            />
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            icon={
              <>
                {/* <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <img
                  className="inline-block h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </>
            }
            component={<Link to={`/admin`} />}

          >
            {/* {user.user.name} */} Admin
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin" 
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.LayoutDashboard style={{ color: "black" }} />}
            component={<Link to={`/admin`} />}
          >
            DashBoard
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/students"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.Users style={{ color: "black" }} />}
            component={<Link to={`students`} />}
          >
            Students
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/enrollment"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.Package style={{ color: "black" }} />}
            component={<Link to={`enrollment`} />}
          >
            Enrollment
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/finance"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.BadgeDollarSign style={{ color: "black" }} />}
            component={<Link to={`finance`} />}
          >
            Finance
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/attendance"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.ShieldAlert style={{ color: "black" }} />}
            component={<Link to={`attendance`} />}
          >
            Attendance
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/timetable"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.Clock4 style={{ color: "black" }} />}
            component={<Link to={`timetable`} />}
          >
            Timetable
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/communication"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.Send style={{ color: "black" }} />}
            component={<Link to={`communication`} />}
          >
            Communication
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/admin/administration"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.LockKeyhole style={{ color: "black" }} />}
            component={<Link to={`administration`} />}
          >
            Administration
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/"
                ? "bg-gradient-to-r from-orange-400  to-yellow-300"
                : ""
            }`}
            icon={<icons.Home style={{ color: "black" }} />}
            component={<Link to={`/`} />}
          >
            Home Page
          </MenuItem>
          <MenuItem
            onClick={() => {
              //   handleLogout()
              console.log("log out")
            }}
            icon={<icons.LogOut style={{ color: "black" }} />}
            component={<Link to={`/login`} />}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideNavBar
