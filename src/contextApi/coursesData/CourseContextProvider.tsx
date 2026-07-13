import { useState } from "react"
import CourseContextCreate from "./CreateCourseContex"
import type { CourseInterface } from "../../typescript/interface/interface"
import { tablesDB } from "../../lib/appwrite.config";
import { toast } from "sonner";




const CourseContextProvider = ({children}:{children:React.ReactNode}) => {


const [isLoading, setIsLoading] = useState(false);
const [isError, setisError] = useState("");
const [addCourse, setaddCourse] = useState(false);

const [courses,setcourses] = useState<CourseInterface[]>([]);
const [loadingState, setloadingState] = useState(false);
const [isEdit, setisEdit] = useState<CourseInterface[]>([]);
const [editDialog, seteditDialog] = useState(false);
const [isSubject, setisSubject] = useState(false);

if(isError){
    console.log("Error", isError);
}

const fetchCourses = async() => {
    setloadingState(true);
    try {
        const response = await tablesDB.listRows({
            databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
            tableId: "courses"
        });
        setcourses(response?.rows as unknown as CourseInterface[]);
    } catch (error:any) {
        console.log("Course Data Fetching", error.message);
        toast.error("Something Going Wrong");
        setloadingState(false);
    }finally{
        setloadingState(false);
    }
}

  return (
    <>
    <CourseContextCreate value={{courses,setcourses,isLoading,setIsLoading,isError,setisError,addCourse, setaddCourse, fetchCourses,loadingState,isEdit,setisEdit,editDialog,seteditDialog,isSubject,setisSubject}}>
        {children}
    </CourseContextCreate>
    </>
  )
}

export default CourseContextProvider;