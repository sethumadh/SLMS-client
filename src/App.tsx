import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Home from "@/pages/Home/Home"
import Application from "@/pages/Application/Application"
import Navbar from "./Layouts/Navbar/Navbar"
import SubmitPage from "./pages/SubmitPage/SubmitPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/application-submit" element={<SubmitPage />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
