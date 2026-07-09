import { Box } from "@mui/material"
import Navbar from "../forAdmin/Navbar"
import Sidebar from "../forAdmin/Sidebar"
import { Outlet } from "react-router-dom"


function AdminWrapper() {
  return (
   <>
   <Box>
    <Navbar/>
    <Box sx={{display: "flex", width: "100%"}}>
        <Sidebar/>
        <Box sx={{width: "100%",height:"92.7vh" ,display:"flex", justifyContent:"end"}} className="p-0 md:p-6">
        <Outlet/>
        </Box>
    </Box>
 </Box>
   </>
  )
}

export default AdminWrapper