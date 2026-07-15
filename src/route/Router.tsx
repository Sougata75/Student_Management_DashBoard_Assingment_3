import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import StudentWrapper from "../layout/forStudent/StudentWrapper";
import StudentDashboard from "../pages/studentDashboard/StudentDashboard";
import Calender from "../pages/studentDashboard/Calender";
import Courses from "../pages/studentDashboard/Courses";
import Myprofile from "../pages/studentDashboard/Myprofile";
import Batch from "../pages/studentDashboard/Batch";
import AnnounceMent from "../pages/studentDashboard/AnnounceMent";
import AdminWrapper from "../layout/forAdmin/AdminWrapper";
import Dashboard from "../pages/adminDashboard/Dashboard";
import AllStudents from "../pages/adminDashboard/AllStudents";
import BatchManagement from "../pages/adminDashboard/BatchManagement";
import CourseAdd from "../pages/adminDashboard/CourseAdd";
import Announce from "../pages/adminDashboard/Announce";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import ErrorBoundery from "../pages/ErrorBoundery";
import BlockedPage from "../pages/BlockedPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement:<ErrorBoundery/>
  },
  {
    path:"/accessDenied",
    element:<BlockedPage/>,
    errorElement:<ErrorBoundery/>
  },
  {
    path: "",
    element: <ProtectedRoute allowedRole="Student" />,
    children: [
      {
        path: "",
        element: <StudentWrapper />,
        children: [
          {
            path: "/dashboard",
            element: <StudentDashboard />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/calender",
            element: <Calender />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/courses",
            element: <Courses />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/myProfile",
            element: <Myprofile />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/batch",
            element: <Batch />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/announcement",
            element: <AnnounceMent />,
            errorElement:<ErrorBoundery/>
          },
        ],
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute allowedRole="Admin" />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "/adminDashboard",
            element: <Dashboard />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/studentsAll",
            element: <AllStudents />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/batches",
            element: <BatchManagement />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/manageCourses",
            element: <CourseAdd />,
            errorElement:<ErrorBoundery/>
          },
          {
            path: "/announce",
            element: <Announce />,
            errorElement:<ErrorBoundery/>
          },
        ],
      },
    ],
  },
  {
    path:"*",
    element:<NotFound/>
  }
]);

export default Routes;
