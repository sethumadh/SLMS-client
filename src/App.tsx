import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import Home from "@/pages/Home/Home"
import Application from "@/pages/Application/Application"
import Navbar from "@/Layouts/Navbar/Navbar"
import SubmitPage from "@/pages/SubmitPage/SubmitPage"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout/AdminDashboardLayout"
import Dashboard from "@/pages/Admin/Dashboard/Dashboard"
import LoadingSpinner from "@/components/Loadingspinner"
import Students from "./pages/Admin/Students/Students"
import Enrollment from "./pages/Admin/Enrollement/Enrollement"
import Finance from "./pages/Admin/Finance/Finance"
import Attendance from "./pages/Admin/Attendance/Attendance"
import Timetable from "./pages/Admin/Timetable/Timetable"
import Communication from "./pages/Admin/Communication/Communication"
import Administration from "./pages/Admin/Administration/Administration"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/application-submit" element={<SubmitPage />} />
      </Route>
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="enrollment" element={<Enrollment />} />
        <Route path="finance" element={<Finance />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="communication" element={<Communication />} />
        <Route path="administration" element={<Administration />} />
        <Route path="timetable" element={<Timetable />} />
      </Route>
      {/* <Route path="/*" element={}/> */}
    </>
  )
)

function App() {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen mx-auto">
            <LoadingSpinner className="w-20 h-20" />
          </div>
        }
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App
