import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import StudentWrapper from "../layout/forStudent/StudentWrapper"
import StudentDashboard from "../pages/studentDashboard/StudentDashboard"
import Calender from "../pages/studentDashboard/Calender"
import Courses from "../pages/studentDashboard/Courses"
import Myprofile from "../pages/studentDashboard/Myprofile"
import Batch from "../pages/studentDashboard/Batch"
import AnnounceMent from "../pages/studentDashboard/AnnounceMent"
import AdminWrapper from "../layout/forAdmin/AdminWrapper"
import Dashboard from "../pages/adminDashboard/Dashboard"
import AllStudents from "../pages/adminDashboard/AllStudents"
import BatchManagement from "../pages/adminDashboard/BatchManagement"
import CourseAdd from "../pages/adminDashboard/CourseAdd"
import Announce from "../pages/adminDashboard/Announce"

const Routes = createBrowserRouter([
    {
        path:"/",
        element: <Home/>
    },
    {
        path: "",
        element: <StudentWrapper/>,
        children:[
            {
                path:"/dashboard",
                element: <StudentDashboard/>
            },
            {
                path:"/calender",
                element: <Calender/>
            },
            {
                path:"/courses",
                element: <Courses/>
            },
            {
                path:"/myProfile",
                element: <Myprofile/>
            },
            {
                path:"/batch",
                element: <Batch/>
            },
            {
                path:"/announcement",
                element: <AnnounceMent/>
            },
        ]
    },
    {
        path:"",
        element: <AdminWrapper/>,
        children:[
            {
                path:"/adminDashboard",
                element:<Dashboard/>
            },
            {
                path:"/studentsAll",
                element:<AllStudents/>
            },
            {
                path:"/batches",
                element:<BatchManagement/>
            },
            {
                path:"/manageCourses",
                element:<CourseAdd/>
            },
            {
                path:"/announce",
                element:<Announce/>
            }
        ]
    }
])

export default Routes