import { Box } from "@mui/material"
import Navbar from "../forAdmin/Navbar"
import Sidebar from "../forAdmin/Sidebar"
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext"


function AdminWrapper() {

  const bgContext = useContext(CreateUserContext);

  return (
   <>
   <Box>
    <Navbar/>
    <Box sx={{display: "flex", width: "100%"}}>
        <Sidebar/>
        <Box  className="p-0 md:p-6 w-full flex justify-end h-[91vh] md:h-[93vh] ">
          <Box onClick={()=> bgContext?.sethambuerger(false)} className={`${bgContext?.hambuerger? "bg-black/50 backdrop-blur-[2px] z-10":"hidden"} w-full h-[92.6%] absolute`} ></Box>

        <Outlet/>
        </Box>
    </Box>
 </Box>
   </>
  )
}

export default AdminWrapper