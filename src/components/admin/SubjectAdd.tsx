import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext } from "react"
import CourseContextCreate from "../../contextApi/coursesData/CreateCourseContex"
import { useForm } from "react-hook-form";
import type { CourseInterface, SubjectPayload } from "../../typescript/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { subjectSchema } from "../../services/validation/courseAdd.validation";
import { toast } from "sonner";
import { tablesDB } from "../../lib/appwrite.config";



function SubjectAdd() {

    const subjectContext = useContext(CourseContextCreate);
    if(!subjectContext){
        throw new Error("context not provided")
    }

    const {register,reset,handleSubmit} = useForm<SubjectPayload>({
        resolver:yupResolver(subjectSchema),
        defaultValues: {
            semister: "",
            subject: "",
            overview: ""
        }
    });


    const onSubmit = async(data:SubjectPayload) => {
        const currentCourse = subjectContext.isEdit?.[0];
        const actualRowId = currentCourse?.$id;

        console.log("current course",currentCourse);
        console.log("Course id", actualRowId);

        if(!actualRowId){
            toast.error("Course not selected");
            return;
        }

        try {
            const existingSubjects = currentCourse?.course_subjects || [];

            const newSubectString = JSON.stringify({
                semister: data.semister,
                subject: data.subject,
                overview: data.overview
            });

            const updatedSubjectsArray = [...existingSubjects,newSubectString];

                await tablesDB.updateRow({
                databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
                tableId: "courses",
                rowId: actualRowId,
                data:{
                   course_subjects: updatedSubjectsArray 
                }
            });

            const updatedSubject = subjectContext.courses.map((item) => {
                if(item.$id === actualRowId){
                    return {...item,course_subjects:updatedSubjectsArray} as CourseInterface;
                }
                return item;
            });
            
            subjectContext.setcourses(updatedSubject);
            toast.success("Subject Added");
            reset();
            subjectContext.setisSubject(false);

        } catch (error:any) {
            toast.error(error.message);
        }
    }

  return (
    <>
    <Dialog open={subjectContext?.isSubject === true}>
        <DialogTitle>Add new subject</DialogTitle>
        <DialogContent sx={{width:"450px"}} className="!w-[310px] md:!w-[450px]">
          <Box onSubmit={handleSubmit(onSubmit)}  component={"form"} className="w-full flex flex-wrap gap-3">
            <TextField sx={{width:"400px"}} label="Semister" placeholder="Semister" {...register("semister")} />
            <TextField sx={{width:"400px"}} label="Subject Name" placeholder="Subject Name" {...register("subject")} />
            <TextField sx={{width:"400px"}} label="Subject Overview" placeholder="Subject Overview" {...register("overview")} />
            <Button variant="contained" type="submit" className="w-full">Upload</Button>
            <Button variant="contained" onClick={()=> subjectContext.setisSubject(false)} className="w-full">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SubjectAdd