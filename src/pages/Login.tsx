import { Box, Button, CircularProgress, TextField } from "@mui/material"
import {  useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import type {LoginPyaload}  from "../typescript/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../services/validation/login.vaidation";
import { account, tablesDB } from "../lib/appwrite.config";
import { Query } from "appwrite";
import Cookies from "js-cookie";
import { toast } from "sonner";
import CreateUserContext from "../contextApi/appwriteDataFetching/CreateApwriteContext";


const Login = () => {
  
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const fetchContext = useContext(CreateUserContext);

  const {register,reset,formState:{errors},handleSubmit} = useForm<LoginPyaload>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async(data:LoginPyaload) =>{
    setIsLoading(true);
    try {
      const sessionResponse = await account.createEmailPasswordSession(
        data.email,
        data.password
      );

      if(sessionResponse){
        const user = await tablesDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: "user",
          queries: [Query.equal("email", data.email)],
        });

        if(user?.rows?.length > 0){
          fetchContext?.userData();
          const userData = user.rows[0];

          Cookies.set("token", "true");
          Cookies.set("role", userData.role);
          Cookies.set("auth_user_id", userData.auth_user_id);
          Cookies.set("user", JSON.stringify(userData));

          if(userData.role === "Admin"){
            navigate("/adminDashboard")
          }else{
            navigate("/dashboard");
          }
        }
        reset();
        toast.success("LogIn Successfull");
      }else{
        toast.error("User profile not found");
      }
        
    } catch (error:any) {
      setIsError(error.message);
      console.log(isError);
      toast.error(error.message);
    }finally{
      setIsLoading(false);
    }
  } 

  return (
    <>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{width:"100%",height:"auto",display:"flex", flexDirection:"column",justifyContent:"space-between", gap:"15px"}}>
            <TextField className="w-full" placeholder="Enter your email address" {...register(("email"))} error={!errors} helperText={errors.email?.message}/>
            <TextField className="w-full" placeholder="Enter your password" {...register(("password"))} error={!errors} helperText={errors.password?.message}/>
            <Button type="submit" variant="contained" disabled={isLoading}>{isError? <CircularProgress/> :"Log In"}</Button>
        </Box>
    </>
  )
}

export default Login