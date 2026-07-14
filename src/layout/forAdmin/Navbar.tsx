import { Box, Typography } from "@mui/material"
import { BellDot, FileQuestionMarkIcon, LayoutGridIcon, LogOut } from "lucide-react"
import { account } from "../../lib/appwrite.config"
import Cookies from "js-cookie"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { adminSidebar } from "../../services/json/navigation.routes";
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext";



function Navbar() {

    const navigate = useNavigate();

    const hambuergerContext = useContext(CreateUserContext);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("user");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
   <>
    <Box sx={{width:"100%",}} className=" p-2 py-3 md:p-3 bg-slate-950 md:bg-white border-b md:border-b-2 border-slate-400 md:border-white shadow-md shadow-gray-400 flex justify-between items-center md:justify-end" >
      <Box>
        <Typography onClick={() => hambuergerContext?.sethambuerger((prev) => !prev)} className={`${hambuergerContext?.hambuerger? "bg-slate-900":""} cursor-pointer md:hidden text-white bg-slate-500 px-2 py-1 md:p-2 rounded-md shadow-md shadow-black/30`}><LayoutGridIcon /></Typography>
      </Box>
        <Box className="flex justify-between w-[38%]  md:w-[12.5%] items-center">
            <Typography className="text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 px-2 py-1 md:p-2 rounded-md md:rounded-lg shadow-md shadow-black/30 hover:shadow-blue-600 "><BellDot/></Typography>
            <Typography className="hidden md:block text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 px-2 py-1 md:p-2 rounded-md md:rounded-lg shadow-md shadow-black/30 hover:shadow-green-600 ">Help Center</Typography>
            <Typography className="block md:hidden text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 px-2 py-1 md:p-2 rounded-md md:rounded-lg shadow-md shadow-black/30 hover:shadow-green-600 "><FileQuestionMarkIcon/></Typography>
            <Typography onClick={handleLogout} className="hidden md:block text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 p-1 px-2 md:p-2 rounded-md md:rounded-lg shadow-md shadow-black/30 hover:shadow-red-600 cursor-pointer ">Log Out</Typography>
            <Typography onClick={handleLogout} className="block md:hidden text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 p-1 px-2 md:p-2 rounded-md md:rounded-lg shadow-md shadow-black/30 hover:shadow-red-600 cursor-pointer "><LogOut/></Typography>
        </Box>
    </Box>

    <Box className={`${hambuergerContext?.hambuerger? "translate-x-[0] block ":"translate-x-[-160px]"} transition-all duration-[250ms] left-0 absolute w-[150px] h-[91vh] bg-white/30 backdrop-blur-md z-20`}>

{adminSidebar?.map((nav) => (
            <NavLink key={nav.label} to={nav.path}>
                {(({isActive})=> (
                    <Box sx={{textShadow:"2px 2px 8px rgba(0,0,0,.5)"}} className={`${isActive? "font-semibold text-blue-600 bg-blue-300/40 border-r-2 border-white shadow-md shadow-black/50":"text-slate-800"}  w-[100%] flex justify-center py-2`}>{nav.label}</Box>
                ))}
            </NavLink>
        ))}   

    </Box>
   </>
  )
}

export default Navbar