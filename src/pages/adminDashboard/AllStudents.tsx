import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { EditIcon, Search } from "lucide-react";
import type { StudentListType } from "../../typescript/interface/interface";
import { columnName, userRoleSelection } from "../../services/json/studentManagement.table";
import { Controller, useForm } from "react-hook-form";
import CreateUserContext from "../../contextApi/appwriteDataFetching/CreateApwriteContext";



function AllStudents() {

  const {register,handleSubmit} = useForm({
    defaultValues:{
      searchData:"",
    }
  });

  const userContext = useContext(CreateUserContext);

  if(!userContext){
    throw new Error("User context not provided");
  }

  useEffect(() => {
    if(userContext.studentList.length === 0){
      userContext.userData();
    }
  },[])

  const {register:registerEdit,handleSubmit:handleSubmitEdit,reset:resetEdit,control,watch,setValue} = useForm<StudentListType>();

  useEffect(() => {
    if(userContext.isEdit && userContext.editMode.length > 0){
      const student = userContext.editMode[0];

      resetEdit({
        
        name: student.name,
        phone: student.phone,
        role: student.role,
        isBlocked: student.isBlocked,
  
      })
    };
  },[userContext.isEdit, userContext.editMode,resetEdit]);

  const currentStatus:boolean = watch("isBlocked");

  return (
  <>  
    
    <Box className="w-full md:w-[98%] h-[90.5vh] md:h-full bg-white md:shadow-[0px_0px_20px] md:shadow-gray-500 md:rounded-md px-2 pt-2 md:p-5 flex flex-col justify-between">
      <Box className="w-full h-[10%]">
        <Box className="w-full h-full bg-slate-300 shadow-xl shadow-gray-400 rounded-md flex justify-between items-center p-4">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-xl md:!text-2xl text-blue-600">Student Management</Typography>
          <Box component={"form"} onSubmit={handleSubmit(userContext.searchFunc)} className="hidden md:flex flex-wrap items-center gap-2">
            <TextField {...register("searchData")} size="small" placeholder="Search by email or contact number" label="Search for students" className="w-[100px] md:w-[300px]" sx={{bgcolor:" #e5e7eb",} } />
            <Button type="submit" sx={{bgcolor:"#2563eb",color:"black"}} className="h-[39px] hover:bg-blue-700 hover:text-white"><Search color="#ffffff"/></Button>
          </Box>
        </Box>
      </Box>
    
      <Box className="w-full h-[86%] bg-slate-300 p-2 md:p-5 shadow-xl shadow-gray-400 rounded-md flex flex-wrap items-center md:justify-center">
        <Box className="w-full h-[10%] py-3 hidden md:flex flex-wrap justify-between md:gap-2">
          {columnName.map((col) => (
            <Box key={col} className="w-[16%] flex justify-center bg-slate-100 items-center rounded-sm md:rounded-md">
             <Typography variant="h4" sx={{fontWeight:"600"}} className="!text-[10px] md:!text-[16px] text-slate-600">{col}</Typography>
            </Box>
          ))}
        </Box>

        <Box component={"form"}  className="w-full h-[10%]  bg-slate-200 px-2 rounded-md  md:hidden flex flex-wrap justify-between items-center">
          <TextField size="small" placeholder="Search by email or contact number" label="Search for students" className="w-[78%]" sx={{bgcolor:" #e5e7eb",} } />
          <Button type="submit" sx={{bgcolor:"#2563eb",color:"black"}} className="h-[39px] hover:bg-blue-700 hover:text-white"><Search color="#ffffff "/></Button>
        </Box>
        {userContext?.isLoading? (
          <Box className="w-full h-[90%] flex flex-wrap justify-center items-center">
            <CircularProgress/>
          </Box>
        ):(
          <Box className="w-full h-[85%] overflow-y-scroll  flex flex-wrap justify-center  noBar">
        {userContext?.searchResult.map((user) => (
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
            <Button onClick={() => {userContext.setisEdit(true),userContext.seteditMode([user])}}><EditIcon/></Button>
            </Box>
            <Box className="w-1/6 hidden md:flex justify-center md:pl-12">
              <Button onClick={() => userContext.handleDelete(user.$id)} variant="contained" size="medium" color="error">Delete</Button>
            </Box>

            <Box className="w-full flex flex-wrap md:hidden gap-3">
              <Typography className="!w-full">Name: {user.name}</Typography>
              <Typography className="!w-full">Email Id: {user.email}</Typography>
              <Typography className="!w-full">Email Id: {user.phone}</Typography>
              <Typography className="!w-full">Status: {user.isBlocked? "Blocked":"Active"}</Typography>

              <Box className="w-full flex  md:hidden justify-center">
            <Button className="w-full" variant="contained" onClick={() => {userContext.setisEdit(true),userContext.seteditMode([user])}}><EditIcon/></Button>
            </Box>
            <Box className="w-full block md:hidden justify-center md:pl-12">
              <Button onClick={() => userContext.handleDelete(user.$id)} className="w-full"  variant="contained" size="medium" color="error">Delete</Button>
            </Box>
              
            </Box>
          </Box>
        ))}
      </Box>
        )}
      </Box>
      

    </Box>

    <Dialog open={userContext.isEdit === true}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent sx={{width:"450px"}} className="!w-[310px] md:!w-[450px]">
          <Box onSubmit={handleSubmitEdit(userContext.updateUser)}  component={"form"} className="w-full flex flex-wrap gap-3">
            <TextField sx={{width:"400px"}} label="Name" placeholder="Change name" {...registerEdit("name")} />
            <TextField sx={{width:"400px"}} label="Contact number" placeholder="Change contact number" {...registerEdit("phone")} />
            
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
              <Button variant="contained" type="button" color={currentStatus? "error":"success"} onClick={() => setValue("isBlocked", !currentStatus, {shouldDirty : true})}>{currentStatus? "Blocked":"Active"}</Button>
            </Box>
            <Button variant="contained" type="submit" className="w-full">Update</Button>
            <Button variant="contained" onClick={()=> userContext.setisEdit(false)} className="w-full">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
  </>
  )
}

export default AllStudents;