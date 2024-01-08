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
import Application from "@/pages/Application/Student/Application"
import Navbar from "@/Layouts/Navbar/Navbar"
import SubmitPage from "@/pages/SubmitPage/SubmitPage"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout/AdminDashboardLayout"
import Dashboard from "@/pages/Admin/Dashboard/Dashboard"
import LoadingSpinner from "@/components/Loadingspinner"
import EnrolledStudentList from "./pages/Admin/Students/EnrolledStudentList/EnrolledStudentList"
import Finance from "./pages/Admin/Finance/Finance"
import Attendance from "./pages/Admin/Attendance/Attendance"
import EditTimetable from "./pages/Admin/Timetable/EditTimetable"
import Communication from "./pages/Admin/Communication/Communication"
import Administration from "./pages/Admin/Administration/Administration"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import ClassesAndEvents from "./pages/ClassesAndEvents/ClassesAndEvents"

import PersonalDetails from "./pages/Admin/Students/EnrolledStudentDetail/PersonalDetails/PersonalDetails"
import ParentDetails from "./pages/Admin/Students/EnrolledStudentDetail/ParentDetails/ParentDetails"
import HealthDetails from "./pages/Admin/Students/EnrolledStudentDetail/HealthDetails.tsx/HealthDetails"
import Declaration from "./pages/Admin/Students/EnrolledStudentDetail/Declaration/Declaration"
import SubjectDetails from "./pages/Admin/Students/EnrolledStudentDetail/Subjects/SubjectDetails"
import Alumni from "./pages/Admin/Students/Alumni/Alumni"
import EnrollmentNavbarLayout from "./Layouts/EnrollmentNavbarLayout/EnrollmentNavbarLayout"
import NewStudentApplications from "./pages/Admin/Enrollement/NewApplications/NewApplications"
import NewApplicatantDetailsLayout from "./Layouts/NewApplicationsDetailLayout/NewApplicationsDetailLayout"
import NewApplicantSubjectDetails from "./pages/Admin/Enrollement/NewApplicantDetails/Subjects/SubjectDetails"
import StudentsNavbarLayout from "./Layouts/StudentsNavbarLayout/StudentsNavbarLayout"
import ManageTermLayout from "./Layouts/AdministrationLayout/ManageTermLayout/ManageTermLayout"
import CurrentTerm from "./pages/Admin/Administration/ManageTerm/CurrentTerm/CurrentTerm"
import CreateTerm from "./pages/Admin/Administration/ManageTerm/CreateTerm/CreateTerm"
import AllTerms from "./pages/Admin/Administration/ManageTerm/AllTerms/AllTerms"
import TermDetails from "./pages/Admin/Administration/ManageTerm/AllTerms/TermDetails/TermDetail"
import ManageClassLayout from "./Layouts/AdministrationLayout/ManageClassLayout/ManageClassLayout"
import AllClass from "./pages/Admin/Administration/ManageClass/AllClasses/AllClasses"
import CreateClass from "./pages/Admin/Administration/ManageClass/CreateClass/CreateClass"
import TimetableLayout from "./Layouts/TimetableLayout/TimetableLayout"
import CreateTimeTable from "./pages/Admin/Timetable/CreateTimetable"
import TermStudentList from "./pages/Admin/Administration/ManageTerm/AllTerms/TermDetails/TermStudentList"
import ViewTimeTable from "./pages/Admin/Timetable/ViewTimetable"
import PublishedTerm from "./pages/Admin/Administration/ManageTerm/PublishedTerm/PublishedTerm"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ActiveStudentsList from "./pages/Admin/Students/ActiveStudentsList/ActiveStudentsList"
import EnrolledStudentDetailLayout from "./Layouts/StudentDetailLayout/EnrolledStudentDetailLayout"
import ActiveStudentDetailLayout from "./Layouts/StudentDetailLayout/ActiveStudentDetailLayout"
import PersonalInformation from "./pages/Admin/Students/ActiveStudentDetail/PersonalInformation/PersonalInformation"
import NewApplicantDetail from "./pages/Admin/Enrollement/NewApplicantDetails/NewApplicantDetail"
import LateEnrollmentList from "./pages/Admin/Students/LateEnrollmentList/LateEnrollmentList"
import LateEnrollmentLayout from "./Layouts/StudentDetailLayout/LateEnrollmentLayout"
import LateEnrollmentPersonalDetails from "./pages/Admin/Students/LateEnrollmentDetail/PersonalDetails/PersonalDetails"
import LateEnrollmentParentDetails from "./pages/Admin/Students/LateEnrollmentDetail/ParentDetails/ParentDetails"
import LateEnrollmentHealthDetails from "./pages/Admin/Students/LateEnrollmentDetail/HealthDetails.tsx/HealthDetails"
import LateEnrolledDeclaration from "./pages/Admin/Students/LateEnrollmentDetail/Declaration/Declaration"
import ManageAndEnroll from "./pages/Admin/Students/LateEnrollmentDetail/Subjects/ManageAndEnroll"
import FeeDetails from "./pages/Admin/Students/ActiveStudentDetail/Fee/FeeDetails"
import ManageFee from "./pages/Admin/Students/ActiveStudentDetail/Fee/ManageFee"
import ManageClass from "./pages/Admin/Students/ActiveStudentDetail/ManageClass/ManageClass"
import TeacherApplication from "./pages/Application/Teacher/TeacherApplication"
import ManageTeacherLayout from "./Layouts/AdministrationLayout/ManageTeacherLayout/ManageTeacherLayout"
import Teacher from "./pages/Admin/Administration/ManageTeacher/Teacher/Teacher"
import NewTeachersApplications from "./pages/Admin/Administration/ManageTeacher/NewApplication/NewTeachersApplications"
import NewTeacherApplicantDetailsLayout from "./Layouts/NewTeacherApplicantLayout/NewTeacherApplicantLayout"
import NewTeacherApplicationDetail from "./pages/Admin/Administration/ManageTeacher/NewApplication/NewTeacherApplicationDetail/NewTeacherApplicationDetail"
import ApproveApplicant from "./pages/Admin/Administration/ManageTeacher/NewApplication/ApproveApplicant/ApproveApplicant"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Role = guest/user */}
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="classes" element={<ClassesAndEvents />} />
        <Route path="application" element={<Application />} />
        <Route path="teacher-application" element={<TeacherApplication />} />
        <Route path="application-submit" element={<SubmitPage />} />
      </Route>

      {/* Role = admin */}
      <Route path="admin" element={<AdminDashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* student */}
        <Route path="students" element={<StudentsNavbarLayout />}>
          <Route index element={<ActiveStudentsList />} />
          <Route
            path="student-detail/:id"
            element={<ActiveStudentDetailLayout />}
          >
            <Route index element={<PersonalInformation />} />
            <Route path="view-fee-details" element={<FeeDetails />} />
            <Route path="manage-class" element={<ManageClass />} />
            <Route
              path="view-fee-details/manage-fee/:feePaymentId"
              element={<ManageFee />}
            />
          </Route>
          <Route
            path="late-enrolled-students"
            element={<LateEnrollmentList />}
          />
          <Route
            path="late-enrolled-students/student-detail/:id"
            element={<LateEnrollmentLayout />}
          >
            <Route index element={<LateEnrollmentPersonalDetails />} />
            <Route path="parent" element={<LateEnrollmentParentDetails />} />
            <Route path="health" element={<LateEnrollmentHealthDetails />} />
            <Route path="declaration" element={<LateEnrolledDeclaration />} />
            <Route path="manage-and-enroll" element={<ManageAndEnroll />} />
          </Route>
          <Route path="enrolled-students" element={<EnrolledStudentList />} />
          <Route
            path="enrolled-students/student-detail/:id"
            element={<EnrolledStudentDetailLayout />}
          >
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
            <Route index element={<NewApplicantDetail />} />
            <Route
              path="manage-subjects-classes"
              element={<NewApplicantSubjectDetails />}
            />
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
        <Route path="administration">
          <Route index element={<Administration />} />
          <Route path="manage-term" element={<ManageTermLayout />}>
            <Route index element={<CurrentTerm />} />
            <Route path="view-publish-term" element={<PublishedTerm />} />
            <Route path="create-term" element={<CreateTerm />} />
            <Route path="all-terms">
              <Route index element={<AllTerms />} />
              <Route path="term-details/:id">
                <Route index element={<TermDetails />} />
                <Route path="studentList" element={<TermStudentList />} />
              </Route>
            </Route>
          </Route>
          <Route path="manage-class" element={<ManageClassLayout />}>
            <Route index element={<CreateClass />} />
            <Route path="all-classes">
              <Route index element={<AllClass />} />
              <Route path="class-details/:id" element={<TermDetails />} />
            </Route>
          </Route>
          <Route path="manage-teacher" element={<ManageTeacherLayout />}>
            <Route index element={<Teacher />} />
            <Route path="new-applications">
              <Route index element={<NewTeachersApplications />} />
              <Route
                path="applicant-details/:id"
                element={<NewTeacherApplicantDetailsLayout />}
              >
                <Route index element={<NewTeacherApplicationDetail />} />
                <Route
                  path="approve"
                  element={<ApproveApplicant/>}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="timetable" element={<TimetableLayout />}>
          <Route index element={<ViewTimeTable />} />
          <Route path="edit-timetable" element={<EditTimetable />} />
          <Route path="create-timetable" element={<CreateTimeTable />} />
        </Route>
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
          {/* <IsCurrentTermModal /> */}
          <RouterProvider router={router} />
        </PersistGate>
        {/* <TermNameModal /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
