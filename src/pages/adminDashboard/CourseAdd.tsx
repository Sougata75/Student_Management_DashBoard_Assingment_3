import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { Edit, Plus, PlusSquare } from "lucide-react"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form";
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex"
import type { CourseInterface, CoursePayload } from "../../typescript/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../../services/validation/courseAdd.validation";
import { ID, tablesDB } from "../../lib/appwrite.config";
import { toast } from "sonner";
import { courseColumn } from "../../services/json/studentManagement.table";
import CourseEdit from "../../components/admin/CourseEdit";
import SubjectAdd from "../../components/admin/SubjectAdd";



function CourseAdd() {

  const {register,reset,handleSubmit} = useForm<CoursePayload>({
    resolver: yupResolver(courseSchema),
    defaultValues:{
      course_name: "",
      course_description: "",
    }
    
  });

  

  const courseContext = useContext(CourseContextCreate);
  if(!courseContext){
    throw new Error("User context not provided");
  }

  const onCreate = async(data:CoursePayload) => {
     courseContext.setIsLoading(true);
    try {
        const response = await tablesDB.createRow({
            databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
            tableId:"courses",
            rowId: ID.unique(),
            data:{
                course_name: data.course_name,
                course_description: data.course_description,
                course_code: ID.unique()
            }
        });
        if(response){
                courseContext.setcourses([...courseContext.courses, response as unknown as CourseInterface]);
                toast.success("Course successfully added");
                reset();
                courseContext.setaddCourse(false);
            }
    } catch (error:any) {
        courseContext.setisError(error.message);
        toast.error(error.message);
        courseContext.setIsLoading(false);
    }finally{
        courseContext.setIsLoading(false);
    }
}

useEffect(() => {
    if(courseContext.courses.length === 0){
      courseContext.fetchCourses();
    }
  },[])

 return (
   <>
   <Box className="w-full md:w-[98%] h-[90.5vh] md:h-full bg-white md:shadow-[0px_0px_20px] md:shadow-gray-500 md:rounded-md px-2 pt-2 md:p-5 flex flex-col justify-between">
    <Box className="w-full h-[10%]">
        <Box className="w-full h-full bg-slate-300 shadow-xl shadow-gray-400 rounded-md flex justify-between items-center p-4">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-xl md:!text-2xl text-blue-600">Courses</Typography>

          <Box>
          <Button onClick={()=> courseContext.setaddCourse((prev) => !prev)} sx={{bgcolor:"#2563eb"}} className="md:h-[45px] hover:bg-blue-700 hover:text-white"><Plus color="#ffffff"/></Button>
        </Box>
        </Box>
    </Box>

    <Box className="w-full h-[86%] bg-slate-300 p-2 md:p-5 shadow-xl shadow-gray-400 rounded-md flex flex-wrap items-center md:justify-center">
      {courseContext.loadingState? (
        <Box className="w-full h-[90%] flex flex-wrap justify-center items-center">
          <CircularProgress/>
        </Box>
       
      ):(
        <>
        <Box className="w-full h-[10%] py-3 hidden md:flex flex-wrap justify-between md:gap-2">
              {courseColumn.map((col) => (
                <Box key={col} className="w-[24.5%] flex justify-center bg-slate-100 items-center rounded-sm md:rounded-md">
                 <Typography variant="h4" sx={{fontWeight:"600"}} className="!text-[10px] md:!text-[16px] text-slate-600">{col}</Typography>
                </Box>
              ))}
            </Box>

        <Box className="w-full h-full md:h-[85%] overflow-y-scroll  flex flex-wrap justify-center  noBar">
          {courseContext.courses.map((item) => (
            <Box key={item.$id} className="w-full gap-2 md:gap-0 h-min flex flex-wrap justify-between items-center border-b border-gray-400 rounded-md bg-gray-200 hover:bg-gray-50 transition-colors py-[14.2px] px-5">
            <Box className="w-1/4 hidden md:block">
             <Typography variant="h4" className="!text-[16px] text-slate-800">{item.course_name}</Typography>
            </Box>
            <Box className="w-1/4 hidden md:flex justify-center">
             <Typography variant="h4" className="!text-[16px] text-slate-800">{item.course_code}</Typography>
            </Box>
            <Box className="w-1/4 hidden md:flex justify-center">
             <Button onClick={() => {courseContext.seteditDialog(true), courseContext.setisEdit([item])}}><Edit/></Button>
            </Box>
            <Box className="w-1/4 hidden md:flex justify-center">
             <Button onClick={()=>{courseContext.setisSubject(true), courseContext.setisEdit([item])}} variant="contained" size="medium" color="success" ><PlusSquare/></Button>
            </Box>

            <Box className="w-full block md:hidden">
             <Typography variant="h4" className="!text-[16px] text-slate-800">Name: {item.course_name}</Typography>
            </Box>
            <Box className="w-full block md:hidden">
             <Typography variant="h4" className="!text-[16px] text-slate-800">ID: {item.course_code}</Typography>
            </Box>
            <Box className="w-full flex md:hidden justify-center">
             <Button className="w-full" variant="contained" onClick={() => {courseContext.seteditDialog(true), courseContext.setisEdit([item])}} ><Edit/></Button>
            </Box>
            <Box className="w-full flex md:hidden justify-center">
             <Button onClick={()=>{courseContext.setisSubject(true), courseContext.setisEdit([item])}} className="w-full" variant="contained" size="medium" color="success" ><PlusSquare/></Button>
            </Box>
          </Box>
          ))}
        </Box>

        </>
      )}
    </Box>
   </Box>

   <Dialog open={courseContext.addCourse === true}>
        <DialogTitle>Add New Courses</DialogTitle>
        <DialogContent sx={{width:"450px"}} className="!w-[310px] md:!w-[450px]">
          <Box onSubmit={handleSubmit(onCreate)} component={"form"} className="w-full flex flex-wrap gap-3">
            <TextField sx={{width:"400px"}} label="Course Name" placeholder="Course Name" {...register("course_name")} />
            <TextField sx={{width:"400px"}} label="Course Description" placeholder="Course Description" {...register("course_description")}/>
            <Button variant="contained" type="submit" className="w-full">{courseContext.isLoading? <CircularProgress/>:"Upload"}</Button>
            <Button variant="contained" onClick={()=> courseContext.setaddCourse(false)} className="w-full">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <CourseEdit/>
      <SubjectAdd/>
   </>
  )
}

export default CourseAdd