import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { ToastContainer } from "react-toastify"

import Home from "@/pages/Home/Home"
import Application from "@/pages/Application/Application"
import Navbar from "@/Layouts/Navbar/Navbar"
import SubmitPage from "@/pages/SubmitPage/SubmitPage"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout/AdminDashboardLayout"
import Dashboard from "@/pages/Admin/Dashboard/Dashboard"
import LoadingSpinner from "@/components/Loadingspinner"
import Students from "./pages/Admin/Students/StudentList/StudentList"
import Finance from "./pages/Admin/Finance/Finance"
import Attendance from "./pages/Admin/Attendance/Attendance"
import Timetable from "./pages/Admin/Timetable/Timetable"
import Communication from "./pages/Admin/Communication/Communication"
import Administration from "./pages/Admin/Administration/Administration"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import ClassesAndEvents from "./pages/ClassesAndEvents/ClassesAndEvents"
import StudentDetailLayout from "./Layouts/StudentDetailLayout/StudentDetailLayout"
import PersonalDetails from "./pages/Admin/Students/StudentDetail/PersonalDetails/PersonalDetails"
import ParentDetails from "./pages/Admin/Students/StudentDetail/ParentDetails/ParentDetails"
import HealthDetails from "./pages/Admin/Students/StudentDetail/HealthDetails.tsx/HealthDetails"
import Declaration from "./pages/Admin/Students/StudentDetail/Declaration/Declaration"
import SubjectDetails from "./pages/Admin/Students/StudentDetail/Subjects/SubjectDetails"
import Alumni from "./pages/Admin/Students/Alumni/Alumni"
import EnrollmentNavbarLayout from "./Layouts/EnrollmentNavbarLayout/EnrollmentNavbarLayout"
import NewStudentApplications from "./pages/Admin/Enrollement/NewApplications/NewApplications"
import NewApplicatantDetailsLayout from "./Layouts/NewApplicationsDetailLayout/NewApplicationsDetailLayout"
import NewApplicantPersonalDetails from "./pages/Admin/Enrollement/NewApplicantDetails/PersonalDetails/PersonalDetails"
import NewApplicantParentDetails from "./pages/Admin/Enrollement/NewApplicantDetails/ParentDetails/ParentDetails"
import NewApplicantHealthDetails from "./pages/Admin/Enrollement/NewApplicantDetails/HealthDetails.tsx/HealthDetails"
import NewApplicantDeclaration from "./pages/Admin/Enrollement/NewApplicantDetails/Declaration/Declaration"
import NewApplicantSubjectDetails from "./pages/Admin/Enrollement/NewApplicantDetails/Subjects/SubjectDetails"
import StudentsNavbarLayout from "./Layouts/StudentsNavbarLayout/StudentsNavbarLayout"
import AdministrationLayout from "./Layouts/AdministrationLayout/AdministrationLayout"
import ManageTermLayout from "./Layouts/AdministrationLayout/ManageTermLayout/ManageTermLayout"
import ManageTerm from "./pages/Admin/Administration/ManageTerm/ManageTerm"
// import TermNameModal from "./components/Modal/TermNameModal"
// import TermLayout from "./pages/Admin/Administration/Terms/Terms"

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
      <Route path="admin" element={<AdminDashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* student */}
        <Route path="students" element={<StudentsNavbarLayout />}>
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

          <Route path="alumni" element={<Alumni />} />
        </Route>
        {/* eof student */}
        {/* enrollment */}
        <Route path="enrollment" element={<EnrollmentNavbarLayout />}>
          <Route index element={<NewStudentApplications />} />
          <Route
            path="new-applicant-detail/:id"
            element={<NewApplicatantDetailsLayout />}
          >
            <Route index element={<NewApplicantPersonalDetails />} />
            <Route
              path="manage-subjects-classes"
              element={<NewApplicantSubjectDetails />}
            />
            <Route path="parent" element={<NewApplicantParentDetails />} />
            <Route path="health" element={<NewApplicantHealthDetails />} />
            <Route path="declaration" element={<NewApplicantDeclaration />} />
          </Route>
          <Route
            path="waitlisted"
            element={
              <>
                <div className="flex justify-center items-center">
                  waitlisted applications
                </div>
              </>
            }
          />
          <Route
            path="rejected"
            element={
              <>
                <div className="flex justify-center items-center">
                  Rejected applications
                </div>
              </>
            }
          />
        </Route>
        {/* eof enrollment */}

        <Route path="finance" element={<Finance />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="communication" element={<Communication />} />
        <Route path="administration" element={<AdministrationLayout />}>
          <Route index element={<Administration />} />
          <Route path="manage-term" element={<ManageTermLayout />}>
            <Route index element={<ManageTerm />} />
          </Route>
        </Route>
        <Route path="timetable" element={<Timetable />} />
      </Route>
      {/* Role = teacher */}
      <Route path="/*" element={<PageNotFound />} />
    </>
  )
)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
function App() {
  const persistor = persistStore(store)
  return (
    <QueryClientProvider client={queryClient}>
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
        {/* <TermNameModal /> */}
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
