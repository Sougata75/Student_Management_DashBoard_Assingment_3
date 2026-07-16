import { Outlet } from "react-router-dom"
import NavBar from "../forStudent/Navbar"
import SideBar from "../forStudent/Sidebar"
import { Box } from "@mui/material"
import { useContext } from "react";
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext";




function StudentWrapper() {
  const bgContext = useContext(CreateUserContext);
  return (
    <>
    <Box>
    <NavBar/>
    <Box sx={{display: "flex", width: "100%"}}>
        <SideBar/>
        <Box  className="p-0 md:p-6 w-full flex justify-end h-[91vh] md:h-[93vh] ">
          <Box onClick={()=> bgContext?.sethambuerger(false)} className={`${bgContext?.hambuerger? "bg-black/50 backdrop-blur-[2px] z-10":"hidden"} w-full h-[93vh] absolute`} ></Box>

        <Outlet/>
        </Box>
    </Box>
 </Box>
    </>
  )
}

export default StudentWrapper