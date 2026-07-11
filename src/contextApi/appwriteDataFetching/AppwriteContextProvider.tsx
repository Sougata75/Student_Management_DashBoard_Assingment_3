import { useEffect, useState } from "react";
import { tablesDB } from "../../lib/appwrite.config";
import { Query } from "appwrite";
import CreateUserContext from "./CreateApwriteContext";
import type { StudentListType } from "../../typescript/interface/interface";
import { toast } from "sonner";


const AppwriteContextProvider = ({children}:{children:React.ReactNode}) => {
  const [studentList, setstudentList] = useState<StudentListType[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(null);
  const [searchResult, setsearchResult] = useState<StudentListType[]>([]);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [editMode, seteditMode] = useState<StudentListType[]>([]);
  const [hambuerger, sethambuerger] = useState<boolean>(false)

  useEffect(() => {
    const userData = async () => {
          setisLoading(true);
          try {
            const response = await tablesDB.listRows(
              { databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
                tableId: "user",
                queries:[ Query.equal("role","Student")]
              });
              setstudentList(response?.rows as unknown as StudentListType[]);
              setsearchResult(response?.rows as unknown as StudentListType[]);

          } catch (error:any) {
            setisError(error);
            console.log(isError);
          }finally{
            setisLoading(false);
          }
        }
    
        userData();
  },[]);

  const searchFunc = (data:{searchData:string} | undefined) => {
    const searchTerm = data?.searchData.toLowerCase() || "";

    const searchResult = studentList.filter((user) => {
        const matchEmail = user.email.toLowerCase().includes(searchTerm);
        const matchPhone = user.phone.toLowerCase().includes(searchTerm);

        return matchEmail || matchPhone; 
    });
    setsearchResult(searchResult);

    if(searchTerm === ""){
      setsearchResult(studentList);
    }
  };

  const handleDelete = async(data:string|undefined) => {
    try {
      await tablesDB.deleteRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
           tableId: "user",
           rowId: data || ""
      });

      toast.success("User deleted");
    } catch (error:any) {
      toast.error(error.message);
    }finally{
      const updatedList = studentList.filter((student) => student.$id !== data);
      setstudentList(updatedList);
      setsearchResult(updatedList);
    }
  };


  

  const updateUser = async (data:StudentListType)=>{
    if(isEdit || editMode.length > 0){
      
      const targatedId = editMode?.[0]?.$id;

      try {
          await tablesDB.updateRow({
           databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
           tableId: "user",
           rowId: targatedId ,
           data: {
            name: data.name,
            phone: data.phone,
            role: data.role,
            isBlocked: data.isBlocked
           }
        });

        const updateList = studentList.map((student) => {
          if(student?.$id === targatedId){
            return {...student,...data}
          } return student;
        });

        const updatedData = updateList.filter((user) => user.role === "Student");
        setstudentList(updatedData);
        setsearchResult(updatedData);
      
        toast.success("User successfully updated");
      } catch (error:any) {
        toast.error(error.message);
      }finally{
        setisEdit(false);
      };
    };
  };

  return (
    <>
      <CreateUserContext
        value={{ isLoading, isError, studentList , searchResult, isEdit , editMode , searchFunc , handleDelete , updateUser , setisEdit ,seteditMode , hambuerger , sethambuerger}}
      >
        {children}
      </CreateUserContext>
    </>
  );
}

export default AppwriteContextProvider