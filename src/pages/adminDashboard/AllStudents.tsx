import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { tablesDB } from "../../lib/appwrite.config";
import { Query } from "appwrite";
import { EditIcon, Search } from "lucide-react";
import type { StudentListType } from "../../typescript/interface/interface";
import { columnName, userRoleSelection } from "../../services/json/studentManagement.table";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";



function AllStudents() {

  const [studentList, setstudentList] = useState<StudentListType[]>([]);
  const [isLoading, setisLoading] = useState<Boolean>(false);
  const [isError, setisError] = useState<string | null>("");
  const [searchResult, setsearchResult] = useState<StudentListType[]>([]);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [editMode, seteditMode] = useState<StudentListType[]>([]);

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

  const {register,reset,handleSubmit} = useForm({
    defaultValues:{
      searchData:"",
    }
  });

  const searchFunc = (data:{searchData:string}) => {
    const searchTerm = data.searchData.toLowerCase();

    const searchedUser = studentList.filter((user) => {
      const matchedEmail = user.email.toLowerCase().includes(searchTerm);
      const matchedphone = user.phone.toLowerCase().includes(searchTerm);

      return matchedEmail || matchedphone;
    });

    setsearchResult(searchedUser);
    reset();
  };
  
  const {register:registerEdit,handleSubmit:handleSubmitEdit,reset:resetEdit,control,watch,setValue} = useForm<StudentListType>();

  useEffect(() => {
    if(isEdit && editMode.length > 0){
      const student = editMode[0];

      resetEdit({
        
        name: student.name,
        phone: student.phone,
        role: student.role,
        isBlocked: student.isBlocked,
  
      })
    };
  },[isEdit,editMode,resetEdit]);

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

  const handleDelete = async(data:string) => {
    try {
      await tablesDB.deleteRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
           tableId: "user",
           rowId: data 
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

  const currentStatus:boolean = watch("isBlocked");

  return (
  <>  
    <Box className="w-full md:w-[98%] h-full bg-white md:shadow-[0px_0px_20px] md:shadow-gray-500 rounded-md p-2 md:p-5 flex flex-col justify-between">
      <Box className="w-full h-[10%]">
        <Box className="w-full h-full bg-slate-300 shadow-xl shadow-gray-400 rounded-md flex justify-between items-center p-4">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-xl md:!text-2xl text-blue-600">Student Management</Typography>
          <Box component={"form"} onSubmit={handleSubmit(searchFunc)} className="hidden md:flex flex-wrap items-center gap-2">
            <TextField size="small" placeholder="Search by email or contact number" label="Search for students" className="w-[100px] md:w-[300px]" sx={{bgcolor:" #e5e7eb",} } {...register("searchData")}/>
            <Button type="submit" sx={{bgcolor:"#2563eb",color:"black"}} className="h-[39px] hover:bg-blue-700 hover:text-white"><Search/></Button>
          </Box>
        </Box>
      </Box>
    
      <Box className="w-full h-[86%] bg-slate-300 p-2 md:p-5 shadow-xl shadow-gray-400 rounded-md flex flex-wrap justify-center">
        <Box className="w-full h-[10%] py-3 hidden md:flex flex-wrap justify-between md:gap-2">
          {columnName.map((col) => (
            <Box key={col} className="w-[16%] flex justify-center bg-slate-100 items-center rounded-sm md:rounded-md">
             <Typography variant="h4" sx={{fontWeight:"600"}} className="!text-[10px] md:!text-[16px] text-slate-600">{col}</Typography>
            </Box>
          ))}
        </Box>

        <Box component={"form"} onSubmit={handleSubmit(searchFunc)} className="w-full h-[10%]  bg-slate-200 px-2 rounded-md  md:hidden flex flex-wrap justify-between items-center">
          <TextField size="small" placeholder="Search by email or contact number" label="Search for students" className="w-[255px]" sx={{bgcolor:" #e5e7eb",} } {...register("searchData")}/>
          <Button type="submit" sx={{bgcolor:"#2563eb",color:"black"}} className="h-[39px] hover:bg-blue-700 hover:text-white"><Search/></Button>
        </Box>
        {isLoading? (
          <Box className="w-full h-[90%] flex flex-wrap justify-center items-center">
            <CircularProgress/>
          </Box>
        ):(
          <Box className="w-full h-[85%] overflow-y-scroll  flex flex-wrap justify-center  noBar">
        {searchResult?.map((user) => (
          <Box key={user.$id} className="w-full  h-min flex flex-wrap justify-between items-center border-b border-gray-400 rounded-md bg-gray-200 hover:bg-gray-50 transition-colors py-[14.2px] px-5">
            <Box className="w-1/6 hidden md:block">
             <Typography variant="h4" className="!text-[16px] text-slate-800">{user.name}</Typography>
            </Box>
            <Box className="w-1/6 hidden md:flex justify-center">
             <Typography variant="h4" className="!text-[16px] text-slate-800">{user.email}</Typography>
            </Box>
            <Box className="w-1/6 hidden md:flex justify-center">
             <Typography variant="h4" className="!text-[16px] text-slate-800">{user.phone}</Typography>
            </Box>
            <Box className="w-1/6 hidden md:flex justify-center">
            <Typography variant="h4" className="!text-[16px] text-slate-800">{user.isBlocked? "Blocked":"Normal"}</Typography>
            </Box>
            <Box className="w-1/6 hidden md:flex justify-center">
            <Button onClick={() => {setisEdit(true),seteditMode([user])}}><EditIcon/></Button>
            </Box>
            <Box className="w-1/6 hidden md:flex justify-center md:pl-12">
              <Button onClick={() => handleDelete(user.$id)} variant="contained" size="medium" color="error">Delete</Button>
            </Box>

            <Box className="w-full flex flex-wrap md:hidden gap-3">
              <Typography>Name: {user.name}</Typography>
              <Typography>Email Id: {user.email}</Typography>
              <Typography>Status: {user.isBlocked? "Blocked":"Normal"}</Typography>

              <Box className="w-full flex  md:hidden justify-center">
            <Button className="w-full" variant="contained" onClick={() => {setisEdit(true),seteditMode([user])}}><EditIcon/></Button>
            </Box>
            <Box className="w-full block md:hidden justify-center md:pl-12">
              <Button className="w-full" onClick={() => handleDelete(user.$id)} variant="contained" size="medium" color="error">Delete</Button>
            </Box>
              
            </Box>
          </Box>
        ))}
      </Box>
        )}
      </Box>
      
    </Box>

    <Dialog open={isEdit === true}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent sx={{width:"450px"}}>
          <Box onSubmit={handleSubmitEdit(updateUser)} component={"form"} className="w-full flex flex-wrap gap-3">
            <TextField sx={{width:"400px"}} label="Name" placeholder="Change name" {...registerEdit("name")}/>
            <TextField sx={{width:"400px"}} label="Contact number" placeholder="Change contact number" {...registerEdit("phone")}/>
            
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Controller name="role" control={control} render={(({field}) => (
                  <Select {...field} labelId="role-select-lebel" label="role">
                  {userRoleSelection.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))};
                </Select>
                ))}/>
            </FormControl>

            <Box className="w-full flex flex-wrap justify-between items-center">
              <Typography>Change Status : </Typography>
              <Button variant="contained" type="button" color={currentStatus? "success":"error"} onClick={() => setValue("isBlocked",!currentStatus, {shouldDirty:true})}>{currentStatus? "Blocked":"Block"}</Button>
            </Box>
            <Button variant="contained" type="submit" className="w-full">Update</Button>
            <Button variant="contained" onClick={()=> setisEdit(false)} className="w-full">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
  </>
  )
}

export default AllStudents;