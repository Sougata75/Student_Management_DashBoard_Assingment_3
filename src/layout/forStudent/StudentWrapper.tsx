import { Outlet } from "react-router-dom"
import NavBar from "../forStudent/Navbar"
import SideBar from "../forStudent/Sidebar"
import { Box } from "@mui/material"



function StudentWrapper() {
  return (
    <>
    <Box>
    <NavBar/>
    <Box sx={{display: "flex", width: "100%"}}>
        <SideBar/>
        <Box sx={{width: "100%",height:"92.7vh" ,display:"flex", justifyContent:"end", p:3}}>
        <Outlet/>
        </Box>
    </Box>
 </Box>
    </>
  )
}

export default StudentWrapper