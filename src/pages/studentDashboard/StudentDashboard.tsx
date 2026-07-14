import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext";
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex";


function StudentDashboard() {

  const currentDate:Date = new Date();
    const formattedDate:string = currentDate.toLocaleDateString('en-GB');

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
    <>

    <Box className="w-full md:w-[98%] h-[90.5vh] md:h-full bg-white md:shadow-[0px_0px_20px] md:shadow-gray-500 md:rounded-md px-2 pt-2 md:p-5 flex flex-col justify-between">
      <Box className="w-full h-[10%]">
        <Box className="w-full h-full bg-slate-300 shadow-xl shadow-gray-400 rounded-md flex justify-between items-center p-4">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-xl md:!text-2xl text-blue-600">Dashboard</Typography>

          <Box className="md:px-5">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-lg md:!text-2xl text-blue-600">{formattedDate}</Typography>
        </Box>
        </Box>
    </Box>

    <Box className="w-full h-[86%] overflow-y-scroll noBar bg-slate-300 p-2 md:p-5 shadow-xl shadow-gray-400 rounded-md flex flex-wrap items-center md:justify-between gap-2">
      
    </Box>
   </Box>

    </>
  )
}

export default StudentDashboard