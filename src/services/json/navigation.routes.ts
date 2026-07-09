import type { BarItems } from "../../typescript/interface/interface";

export const sideBarItems: BarItems[] = [
    {
                path:"/dashboard",
                label: "Dashboard"
            },
            {
                path:"/myProfile",
                label: "My Profile"
            },
            {
                path:"/batch",
                label: "Batch"
            },
            {
                path:"/courses",
                label: "Courses"
            },
            {
                path:"/calender",
                label: "Calender"
            },
            {
                path:"/announcement",
                label: "Announcement"
            },
]

export const adminSidebar:BarItems[] = [
    {
                path:"/adminDashboard",
                label: "Dashboard"
            },
            {
                path:"/studentsAll",
                label: "Management"
            },
            {
                path:"/batches",
                label: "Batches"
            },
            {
                path:"/manageCourses",
                label: "Courses"
            },
            {
                path:"/announce",
                label: "Announcement"
            }
]