import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext";
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex";
import { DoorOpen, GraduationCapIcon, Layers, NotepadText } from "lucide-react";
import { useNavigate } from "react-router-dom";


function StudentDashboard() {

  const navigate = useNavigate();

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
      
      <Box className="w-full relative md:w-[49.5%] h-[40%] md:h-[48.5%] bg-white rounded-md">
        <Box className="w-full h-[30%] rounded-t-md flex items-center p-5 bg-green-300 border-b-2 border-black/30">
          <Typography className="!text-2xl !text-black/50 !font-semibold">Welcome</Typography>

          <Box className="absolute border-[4px] rounded-full right-7 md:right-12 top-6 md:top-9">
            <Typography className="!text-2xl !text-black/50 bg-green-500 rounded-full p-5 hidden md:block !font-semibold"><DoorOpen size={55}/></Typography>
            <Typography className="!text-2xl !text-black/50 bg-green-500 rounded-full p-3 md:hidden block !font-semibold"><DoorOpen size={35}/></Typography>
          </Box>
        </Box>
        <Box className="w-full h-[70%] flex flex-wrap items-center">
          <Typography className="!text-2xl md:!text-6xl h-[60%] flex !items-center !ml-5 !text-black/50 !font-semibold">{userContext.individualPerson?.name}</Typography>
          <Box className="w-full h-[1px] bg-black"></Box>
          <Box className="w-full flex flex-wrap justify-between px-5">
            <Typography className="!text-[16px] !text-black">Visit your profile</Typography>
            <Typography onClick={(() => navigate("/myProfile"))} className="!text-[16px] !text-black hover:!text-blue-500 cursor-pointer">View More</Typography>
          </Box>
        </Box>

      </Box>
      <Box className="w-full relative md:w-[49.5%] h-[40%] md:h-[48.5%] bg-white rounded-md">
        <Box className="w-full h-[30%] rounded-t-md flex items-center p-5 bg-purple-300 border-b-2 border-black/30">
          <Typography className="!text-2xl !text-black/50 !font-semibold">Batch</Typography>

          <Box className="absolute border-[4px] rounded-full right-7 md:right-12 top-6 md:top-9">
            <Typography className="!text-2xl !text-black/50 bg-purple-500 rounded-full p-5 hidden md:block !font-semibold"><Layers size={55}/></Typography>
            <Typography className="!text-2xl !text-black/50 bg-purple-500 rounded-full p-3 md:hidden block !font-semibold"><Layers size={35}/></Typography>
          </Box>
        </Box>
        <Box className="w-full h-[70%] flex flex-wrap items-center">
          <Typography className="!text-2xl md:!text-6xl h-[60%] flex !items-center !ml-5 !text-black/50 !font-semibold">Not Assigned</Typography>
          <Box className="w-full h-[1px] bg-black"></Box>
          <Box className="w-full flex flex-wrap justify-between px-5">
            <Typography className="!text-[16px] !text-black">For more information</Typography>
            <Typography onClick={(() => navigate("/batch"))} className="!text-[16px] !text-black hover:!text-blue-500 cursor-pointer">View More</Typography>
          </Box>
        </Box>

      </Box>
      <Box className="w-full relative md:w-[49.5%] h-[40%] md:h-[48.5%] bg-white rounded-md">
        <Box className="w-full h-[30%] rounded-t-md flex items-center p-5 bg-blue-300 border-b-2 border-black/30">
          <Typography className="!text-2xl !text-black/50 !font-semibold">Courses</Typography>

          <Box className="absolute border-[4px] rounded-full right-7 md:right-12 top-6 md:top-9">
            <Typography className="!text-2xl !text-black/50 bg-blue-500 rounded-full p-5 hidden md:block !font-semibold"><GraduationCapIcon size={55}/></Typography>
            <Typography className="!text-2xl !text-black/50 bg-blue-500 rounded-full p-3 md:hidden block !font-semibold"><GraduationCapIcon size={35}/></Typography>
          </Box>
        </Box>
        <Box className="w-full h-[70%] flex flex-wrap items-center">
          <Typography className="!text-2xl md:!text-6xl h-[60%] flex !items-center !ml-5 !text-black/50 !font-semibold">Not Assigned</Typography>
          <Box className="w-full h-[1px] bg-black"></Box>
          <Box className="w-full flex flex-wrap justify-between px-5">
            <Typography className="!text-[16px] !text-black">For more information</Typography>
            <Typography onClick={(() => navigate("/courses"))} className="!text-[16px] !text-black hover:!text-blue-500 cursor-pointer">View More</Typography>
          </Box>
        </Box>

      </Box>
      <Box className="w-full relative md:w-[49.5%] h-[40%] md:h-[48.5%] bg-white rounded-md">
        <Box className="w-full h-[30%] rounded-t-md flex items-center p-5 bg-orange-300 border-b-2 border-black/30">
          <Typography className="!text-2xl !text-black/50 !font-semibold">Announcements</Typography>

          <Box className="absolute border-[4px] rounded-full right-7 md:right-12 top-6 md:top-9">
            <Typography className="!text-2xl !text-black/50 bg-orange-500 rounded-full p-5 hidden md:block !font-semibold"><NotepadText size={55}/></Typography>
            <Typography className="!text-2xl !text-black/50 bg-orange-500 rounded-full p-3 md:hidden block !font-semibold"><NotepadText size={35}/></Typography>
          </Box>
        </Box>
        <Box className="w-full h-[70%] flex flex-wrap items-center">
          <Typography className="!text-2xl md:!text-6xl h-[60%] flex !items-center !ml-5 !text-black/50 !font-semibold">Nothing Yet</Typography>
          <Box className="w-full h-[1px] bg-black"></Box>
          <Box className="w-full flex flex-wrap justify-between px-5">
            <Typography className="!text-[16px] !text-black">For more information</Typography>
            <Typography onClick={(() => navigate("/announcement"))} className="!text-[16px] !text-black hover:!text-blue-500 cursor-pointer">View More</Typography>
          </Box>
        </Box>

      </Box>

    </Box>
   </Box>

    </>
  )
}

export default StudentDashboard