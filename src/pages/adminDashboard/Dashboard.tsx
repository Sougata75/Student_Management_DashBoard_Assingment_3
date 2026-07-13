import { Box, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext"
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex";
import { BookAIcon, BookCheck, ChartLine, FileExclamationPointIcon, LayersPlus, MoveUpRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



function Dashboard() {

  const navigate = useNavigate();

  const mainContext = useContext(CreateUserContext);
  const courseContext = useContext(CourseContextCreate);

  if(!mainContext){
     throw new Error("User context not provided");
  }

  if(!courseContext){
     throw new Error("User context not provided");
  }

  useEffect(() => {
      if(mainContext.studentList.length === 0){
        mainContext.userData();
      }

      if(courseContext.courses.length === 0){
        courseContext.fetchCourses();
      }
    },[])

    const currentDate:Date = new Date();
    const formattedDate:string = currentDate.toLocaleDateString('en-GB');

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
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] hidden md:flex flex-wrap justify-between bg-white rounded-md ">
        <Box className="w-[30%] relative h-full bg-cyan-500 rounded-l-md flex justify-center items-center">
          <Users size="150" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 pt-4 flex flex-wrap gap-3 items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-xl">Total Students</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-black !font-bold !text-9xl">{mainContext.studentList.length}<ChartLine size="115" color="#86efac"/></Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-xl">Manage Students</Typography>
            <Typography onClick={()=> navigate("/studentsAll")} className="flex items-center p-2 !text-white rounded-md cursor-pointer bg-green-300 hover:!bg-green-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] hidden md:flex flex-wrap justify-between bg-white rounded-md ">
        <Box className="w-[30%] relative h-full bg-purple-500 rounded-l-md flex justify-center items-center">
          <BookCheck size="150" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 pt-4 flex flex-wrap gap-3 items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-xl">Active Courses</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-black !font-bold !text-9xl">{courseContext.courses.length}<BookAIcon size="105" color="#93c5fd"/></Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-xl">Add More Courses</Typography>
            <Typography onClick={()=> navigate("/manageCourses")} className="flex items-center p-2 !text-white rounded-md cursor-pointer bg-blue-300 hover:!bg-blue-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] hidden md:flex flex-wrap justify-between bg-white rounded-md ">
        <Box className="w-[30%] relative h-full bg-green-500 rounded-l-md flex justify-center items-center">
          <LayersPlus size="150" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 pt-4 flex flex-wrap gap-3 items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-xl">Active Batches</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-gray-400 !font-bold !text-6xl">Not Avilable</Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-xl">Manage Batches</Typography>
            <Typography onClick={()=> toast.error("Currently this feature is not available")} className="flex items-center p-2 !text-white rounded-md cursor-pointer bg-red-300 hover:!bg-red-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] hidden md:flex flex-wrap justify-between bg-white rounded-md">
        <Box className="w-[30%] relative h-full bg-red-500 rounded-l-md flex justify-center items-center">
          <FileExclamationPointIcon size="150" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 pt-4 flex flex-wrap gap-3 items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-xl">Recent Announcements</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-gray-400 !font-bold !text-6xl">Not Avilable</Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-xl">Announce Something</Typography>
            <Typography onClick={()=> toast.error("Currently this feature is not available")} className="flex items-center p-2 !text-white rounded-md cursor-pointer bg-red-300 hover:!bg-red-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>


      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] md:hidden flex flex-wrap justify-between bg-white rounded-md ">
        <Box className="w-[30%] relative h-full bg-cyan-500 rounded-l-md flex justify-center items-center">
          <Users size="70" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 flex flex-wrap items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Total Students</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-black !font-bold !text-7xl md:!text-9xl">{mainContext.studentList.length}<ChartLine size="60" color="#86efac"/></Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Manage Students</Typography>
            <Typography onClick={()=> navigate("/studentsAll")} className="flex items-center p-1 !text-white rounded-md cursor-pointer bg-green-300 hover:!bg-green-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] md:hidden flex flex-wrap justify-between bg-white rounded-md ">
        <Box className="w-[30%] relative h-full bg-purple-500 rounded-l-md flex justify-center items-center">
          <BookCheck size="70" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 flex flex-wrap items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Active Courses</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-black !font-bold !text-7xl md:!text-9xl">{courseContext.courses.length}<BookAIcon size="60" color="#93c5fd"/></Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Add More Courses</Typography>
            <Typography onClick={()=> navigate("/manageCourses")} className="flex items-center p-1 !text-white rounded-md cursor-pointer bg-blue-300 hover:!bg-blue-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] md:hidden flex flex-wrap justify-between bg-white rounded-md ">
        <Box className="w-[30%] relative h-full bg-green-500 rounded-l-md flex justify-center items-center">
          <LayersPlus size="70" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 flex flex-wrap items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Active Batches</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-gray-400 !font-bold !text-3xl md:!text-6xl">Not Avilable</Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Manage Batches</Typography>
            <Typography onClick={()=> toast.error("Currently this feature is not available")} className="flex items-center p-1 !text-white rounded-md cursor-pointer bg-red-300 hover:!bg-red-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-[49.5%] h-[40%] md:h-[48.5%] md:hidden flex flex-wrap justify-between bg-white rounded-md">
        <Box className="w-[30%] relative h-full bg-red-500 rounded-l-md flex justify-center items-center">
          <FileExclamationPointIcon size="70" color="white"/>
          <Box className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] rounded-l-md"></Box>
        </Box>
        <Box className="w-[70%] h-full p-2 flex flex-wrap items-center ">
          <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Recent Announcements</Typography>
          <Typography className="w-full flex justify-center items-center gap-x-2 !text-gray-400 !font-bold !text-3xl md:!text-6xl">Not Avilable</Typography>
          <Box className="w-full h-[1px] bg-black/50"></Box>
          <Box className="w-full  flex justify-between items-center">
            <Typography className="w-full !text-gray-600 !font-bold !text-[18px]">Announce Something</Typography>
            <Typography onClick={()=> toast.error("Currently this feature is not available")} className="flex items-center p-1 !text-white rounded-md cursor-pointer bg-red-300 hover:!bg-red-600 transition-colors duration-[500ms]"><MoveUpRight /></Typography>
          </Box>
        </Box>
      </Box>

    </Box>
   </Box>
    </>
  )
}

export default Dashboard;