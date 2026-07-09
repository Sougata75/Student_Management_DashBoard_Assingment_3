import { Box, Typography } from "@mui/material"
import { BellDot } from "lucide-react"
import { account } from "../../lib/appwrite.config"
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function NavBar() {

  const navigate = useNavigate();

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
    <Box sx={{width:"100%",padding:"14px"}} className="bg-white border-b-2 border-white shadow-md shadow-gray-400 flex justify-end" >
        <Box className="flex justify-between w-[15%] items-center">
            <Typography className="text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 p-2 rounded-lg shadow-md shadow-black/30 hover:shadow-blue-600 "><BellDot/></Typography>
            <Typography className="text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 p-2 rounded-lg shadow-md shadow-black/30 hover:shadow-green-600 ">Help Center</Typography>
            <Typography onClick={handleLogout} className="text-white bg-blue-600 hover:bg-blue-800 border border-gray-400 p-2 rounded-lg shadow-md shadow-black/30 hover:shadow-red-600 cursor-pointer">Log Out</Typography>
        </Box>
    </Box>
    </>
  )
}

export default NavBar