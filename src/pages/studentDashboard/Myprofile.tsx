import { Box, Typography } from "@mui/material"
import { GraduationCapIcon } from "lucide-react"
import { useContext, useEffect } from "react";
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext";
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex";


function Myprofile() {


  const userContext = useContext(CreateUserContext);
  const courseContext = useContext(CourseContextCreate);

  if (!userContext) {
    throw new Error("User context not provided");
  }

  if (!courseContext) {
    throw new Error("User context not provided");
  }

  useEffect(() => {
    if (userContext.studentList.length === 0) {
      userContext.userData();
    }

    if (courseContext.courses.length === 0) {
      courseContext.fetchCourses();
    }
  }, []);

  

  
  return (
    <Box className="w-full md:w-[98%] h-[90.5vh] md:h-full bg-white md:shadow-[0px_0px_20px] md:shadow-gray-500 md:rounded-md px-2 pt-2 md:p-5 flex flex-col justify-between">
      <Box className="w-full h-[10%]">
        <Box className="w-full h-full bg-slate-300 shadow-xl shadow-gray-400 rounded-md flex justify-between items-center p-4">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-xl md:!text-2xl text-blue-600">My Profile</Typography>
        </Box>
    </Box>

    <Box className="w-full h-[86%] bg-slate-300 p-2 md:p-5 shadow-xl shadow-gray-400 rounded-md flex flex-wrap justify-center">
      <Box className="w-full h-[20%] md:h-[30%] flex justify-between items-center px-12 bg-cyan-200 rounded-l-md">
        
          <Box className="absolute md:top-[32%] border-[8px] border-white rounded-full top-[30%] right-8 md:right-40">
            <Typography className="!h-min !bg-cyan-300 hidden md:block rounded-full p-5"><GraduationCapIcon size={180} color="gray" /></Typography>
            <Typography className="!h-min !bg-cyan-300 rounded-full block md:hidden p-5"><GraduationCapIcon size={50} color="gray" /></Typography>
          </Box>
          <Typography className="!text-xl md:!text-5xl !text-black/40 !font-bold">{userContext.individualPerson?.name}</Typography>
        
      </Box>
      <Box className="w-full h-[80%] md:h-[70%] bg-white rounded-r-md flex flex-wrap justify-center flex-col pl-10 gap-5 md:gap-8">
        <Typography className="!text-black md:!text-4xl !font-semibold">Name: {userContext.individualPerson?.name}</Typography>
        <Typography className="!text-black md:!text-4xl !font-semibold">Mail ID: {userContext.individualPerson?.email}</Typography>
        <Typography className="!text-black md:!text-4xl !font-semibold">Contact Number: +91 {userContext.individualPerson?.phone}</Typography>
        <Typography className="!text-black md:!text-4xl !font-semibold">Proffession: {userContext.individualPerson?.role}</Typography>
        <Typography className="!text-black md:!text-4xl !font-semibold">Course: "Not Assigned"</Typography>
      </Box>
    </Box>
   </Box>
  )
}

export default Myprofile