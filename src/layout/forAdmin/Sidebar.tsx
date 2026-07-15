import { Box, Typography } from "@mui/material"
import { adminSidebar } from "../../services/json/navigation.routes"
import { NavLink } from "react-router-dom"


function Sidebar() {
  return (
    <>
    <Box className="w-[250px] hidden md:block"></Box>
    <Box className="w-[250px] h-[100vh] hidden md:block shadow-[4px_0px_15px] shadow-gray-600 bg-slate-800 absolute top-0">
        <Box className="w-full h-[70px] bg-black/20 flex justify-center items-center">
            <Typography className="!text-white !font-bold !text-2xl">Management.Lab</Typography>
            </Box>
            {adminSidebar?.map((nav) => (
            <NavLink key={nav.label} to={nav.path}>
                {(({isActive})=> (
                    <Box sx={{textShadow:"2px 2px 4px rgba(0,0,0,1.5)"}} className={`${isActive? "font-semibold text-blue-500 bg-blue-300/40 border-r-2 border-white shadow-md shadow-black/50":"text-slate-400"}  w-[100%] flex justify-center py-4`}>{nav.label}</Box>
                ))}
            </NavLink>
        ))}   
    </Box>
    </>
  )
}

export default Sidebar