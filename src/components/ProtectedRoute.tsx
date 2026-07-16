import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import type { StudentListType } from "../typescript/interface/interface";
import { useEffect, useState } from "react";
import { account } from "../lib/appwrite.config";
import { toast } from "sonner";

const ProtectedRoute = ({allowedRole}:{allowedRole:string}) => {

    const [actualUser, setactualUser] = useState<StudentListType | null>(null);

    const token = Boolean(Cookies.get("token"));
    const role = Cookies.get("role");
    const isAdmin = token && role === "Admin"
    const isStudent = token && role === "Student"
    const user = Cookies.get("user");

    const navigation = useNavigate()

    useEffect(() => {
        if(user){
        const realuser = JSON.parse(user);
        setactualUser(realuser);

        const handleLogout = async () => {
    try {
      await account.deleteSession("current");

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("auth_user_id");
      Cookies.remove("user");
      navigation("/accessDenied");
      toast.error("Access denied");
    } catch (error) {
      toast.error("Someting is going wrong");
      console.log(error);
    }
  };

   if(isStudent && actualUser?.isBlocked === true || !token){
    handleLogout();
   }
    }

    },[isStudent, actualUser?.isBlocked, token]);

    if(isStudent && actualUser?.isBlocked === true){
            return null;
    };

    if(!token){
        return <Navigate to="/"/>;
    };

    if(isAdmin){
        if(allowedRole === "Admin"){
            return <Outlet/>;
        }
        return <Navigate to="/adminDashboard"/>;
    };

    if(isStudent){
        if(allowedRole === "Student"){
            return <Outlet/>;
        }
        return <Navigate to="/dashboard"/>;
    };

}

export default ProtectedRoute;