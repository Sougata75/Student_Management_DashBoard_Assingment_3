import { Box, Button, CircularProgress, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { SignupPayload } from "../typescript/interface/interface";
import { signupSchema } from "../services/validation/signup.validation";
import { useState } from "react";
import { account, ID, tablesDB } from "../lib/appwrite.config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const Registration = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(""); 

    const {register,reset,formState:{errors},handleSubmit} = useForm<SignupPayload>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Student",
        isBlocked: false,
    },
});

const onSubmit = async (data: SignupPayload) => {
    setIsLoading(true);
    try {
        const user = await account.create(
         ID.unique(),
         data.email,
         data.password,
         data.name
        );

        const userID = user.$id;

        await account.createEmailPasswordSession(data.email,data.password);

        const response = await tablesDB.createRow({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
            tableId: "user",
            rowId: ID.unique(),
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "Student",
                isBlocked: false,
                auth_user_id: userID,
            },
        });
        if(response){
            toast.success("Registration Successfull");
            reset();
            navigate("/dashboard")
        }
    } catch (error:any) {
        setIsError(error.message);
        console.log(isError);
        toast.error(error.message);
    } finally{
        setIsLoading(false);
    }
};



  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{width:"100%",height:"auto",display:"flex", flexDirection:"column",justifyContent:"space-between", gap:"15px"}}>
            <TextField label="Full Name" className="w-full" placeholder="Enter your name" {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}/>
            <TextField label="Email address" className="w-full" placeholder="Enter your email address" {...register("email")}
        error={!!errors.name}
        helperText={errors.name?.message}/>
            <TextField label="Phone number" className="w-full" placeholder="Enter your phone number" {...register("phone")}
        error={!!errors.name}
        helperText={errors.name?.message}/>
            <TextField label="Password" className="w-full" placeholder="Enter your password" {...register("password")}
        error={!!errors.name}
        helperText={errors.name?.message}/>
            <Button type="submit" variant="contained" disabled={isLoading}>{isError? <CircularProgress/> :"Register"}</Button>
        </Box>
  )
}

export default Registration