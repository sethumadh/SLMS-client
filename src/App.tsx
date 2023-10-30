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
import Students from "./pages/Admin/Students/StudentList/StudentList"
import Enrollment from "./pages/Admin/Enrollement/Enrollement"
import Finance from "./pages/Admin/Finance/Finance"
import Attendance from "./pages/Admin/Attendance/Attendance"
import Timetable from "./pages/Admin/Timetable/Timetable"
import Communication from "./pages/Admin/Communication/Communication"
import Administration from "./pages/Admin/Administration/Administration"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import ClassesAndEvents from "./pages/ClassesAndEvents/ClassesAndEvents"
import StudentsNavbar from "./Layouts/Studentslayout/StudentsLayout"
import StudentDetailLayout from "./Layouts/StudentDetailLayout/StudentDetailLayout"
import PersonalDetails from "./pages/Admin/Students/StudentDetail/PersonalDetails/PersonalDetails"
import ParentDetails from "./pages/Admin/Students/StudentDetail/ParentDetails/ParentDetails"
import HealthDetails from "./pages/Admin/Students/StudentDetail/HealthDetails.tsx/HealthDetails"
import Declaration from "./pages/Admin/Students/StudentDetail/Declaration/Declaration"
import SubjectDetails from "./pages/Admin/Students/StudentDetail/Subjects/SubjectDetails"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Role = guest/user */}
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="classes" element={<ClassesAndEvents />} />
        <Route path="application" element={<Application />} />
        <Route path="application-submit" element={<SubmitPage />} />
      </Route>

      {/* Role = admin */}
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsNavbar />}>
          <Route index element={<Students />} />
          <Route path="student-detail/:id" element={<StudentDetailLayout />}>
            <Route index element={<PersonalDetails />} />
            <Route
              path="manage-subjects-classes"
              element={<SubjectDetails />}
            />
            <Route path="health" element={<HealthDetails />} />
            <Route path="parent" element={<ParentDetails />} />
            <Route path="declaration" element={<Declaration />} />
          </Route>

          <Route
            path="alumni"
            element={
              <>
                <div className="flex justify-center items-center">
                  Alumni section
                </div>
              </>
            }
          />
        </Route>
        <Route path="enrollment" element={<Enrollment />} />
        <Route path="finance" element={<Finance />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="communication" element={<Communication />} />
        <Route path="administration" element={<Administration />} />
        <Route path="timetable" element={<Timetable />} />
      </Route>
      {/* Role = teacher */}
      <Route path="/*" element={<PageNotFound />} />
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
