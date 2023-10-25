import images from "@/constants/images/images"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <div>
        <header className="relative">
          <div className="container px-6 py-6 mx-auto lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <NavLink className="flex items-center -mx-1" to={"/"}>
                <img
                  className="w-12 h-12 mx-1 sm:h-12 sm:w-12"
                  src={images.Logo}
                  alt="Akaal Shaouni logo"
                />
                <div className="mx-1 text-gray-700">
                  <h3 className="uppercase tracking-[0.15em] font-medium">
                    Akaal Shaouni
                  </h3>
                  <p className="text-xs italic">Brief descrption</p>
                </div>
              </NavLink>
              <button
                className="text-gray-600 lg:hidden"
                onClick={toggleMobileMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                isOpen ? "opacity-100 " : "opacity-0 -translate-x-full "
              } absolute lg:static transition-all duration-300 w-full py-12 lg:py-0 left-1/2 lg:opacity-100 lg:translate-x-0 lg:bg-transparent lg:w-auto -translate-x-1/2 top-20 sm:top-24 bg-[#3764cd] `}
            >
              <nav className="flex flex-col items-center space-y-8 lg:flex-row lg:space-y-0 lg:-mx-4">
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return `font-medium text-white lg:text-black lg:hover:text-gray-400 lg:mx-4 ${
                      isActive ? "underline underline-offset-4 text-lg" : ""       
                    }`
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => {
                    return `font-medium text-white lg:text-black lg:hover:text-gray-400 lg:mx-4 ${
                      isActive ? "underline underline-offset-4 text-lg" : ""
                    }`
                  }}
                >
                  About
                </NavLink>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => {
                    return `font-medium text-white lg:text-black lg:hover:text-gray-400 lg:mx-4 ${
                      isActive ? "underline underline-offset-4 text-lg" : ""
                    }`
                  }}
                >
                  Admin
                </NavLink>
                <NavLink
                  to="/classes"
                  className={({ isActive }) => {
                    return `font-medium text-white lg:text-black lg:hover:text-gray-400 lg:mx-4 ${
                      isActive ? "underline underline-offset-4 text-lg" : ""
                    }`
                  }}
                >
                  Classes & Events
                </NavLink>
                <NavLink
                  className="px-8 py-2.5 text-white lg:text-black lg:hover:bg-blue-600 lg:hover:text-white duration-300 transition-colors font-medium lg:mx-4 border-2 lg:border-blue-400 border-blue-400 rounded-lg"
                  to="#"
                >
                  Staff Login
                </NavLink>
              </nav>
            </div>
          </div>
        </header>
      </div>
      <Outlet />
    </div>
  )
}
export default Navbar
