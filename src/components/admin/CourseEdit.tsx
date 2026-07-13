import { useContext, useEffect } from "react"
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex"
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { CoursePayload } from "../../typescript/interface/interface";
import { useForm } from "react-hook-form";
import { tablesDB } from "../../lib/appwrite.config";
import { toast } from "sonner";


function CourseEdit() {

    const editContext = useContext(CourseContextCreate);
    if(!editContext){
        throw new Error("User context not provided");
    }

    const {register,reset,handleSubmit} = useForm<CoursePayload>();

      const editCourse = async(data:CoursePayload) => {
        if(editContext.editDialog || editContext.isEdit.length>0){
            const targatedRowId = editContext.isEdit?.[0]?.$id;

            try {
                await tablesDB.updateRow({
                 databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
                 tableId: "courses",
                 rowId: targatedRowId,
                 data:{
                    course_name: data.course_name,
                    course_description: data.course_description,
                 }
                });

                const upatedList = editContext.courses.map((course) => {
                    if(course.$id === targatedRowId){
                        return {...course,...data};
                    }return course;
                });

                editContext.setcourses(upatedList);
                toast.success("Course Updated");
                editContext.setisEdit([]);
                editContext.seteditDialog(false);
            }catch(error:any) {
                console.log("course update error", error.message)
                toast.error(error.message);
            }
        }
      }

      useEffect(() => {
          if(editContext.editDialog && editContext.isEdit.length > 0){
            const course = editContext.isEdit[0];
      
            reset({ 
              course_name: course.course_name,
              course_description: course.course_description,
            })
          };
        },[editContext.isEdit,reset]);

        const handleDelete = async(id:string) => {
          try {
            await tablesDB.deleteRow({
              databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
              tableId: "courses",
              rowId: id
            });

            const upatedList = editContext.courses.filter((item) => item.$id !== id);
            editContext.setcourses(upatedList);
            editContext.seteditDialog(false);
            toast.success("Course successfully deleted");
          } catch (error:any) {
            toast(error.message);
          };
        };

  return (
    <>
    <Dialog open={editContext?.editDialog === true}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent sx={{width:"450px"}} className="!w-[310px] md:!w-[450px]">
          <Box onSubmit={handleSubmit(editCourse)}  component={"form"} className="w-full flex flex-wrap gap-3">
            <TextField sx={{width:"400px"}} label="Course Name" placeholder="Course Name" {...register("course_name")} />
            <TextField sx={{width:"400px"}} label="Course Description" placeholder="Course Description" {...register("course_description")}/>
            <Button variant="contained" type="submit" className="w-full">Update</Button>
            <Button onClick={() => handleDelete(editContext.isEdit[0].$id)} variant="contained" color="error" className="w-full">Delete</Button>
            <Button variant="contained" onClick={()=> editContext.seteditDialog(false)} className="w-full">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CourseEdit