import { AuthContext } from "@/context/auth-context"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface PermissionCheckProps{
    allowedRole:string,
    children:React.ReactNode
}
const PermissionCheck=({allowedRole,children}:PermissionCheckProps)=>{

    const auth=useContext<any>(AuthContext);
    const [loading,setLoading]=useState(true);
    // const navigate =useNavigate();

    //auth.loggedInUser

    useEffect(()=>{
        setLoading(false)
        // if(auth.loggedInUser){
        //     setLoading(false)
        // }else{
        //     //login redirect
        //     toast.warning("Please login to access !")
        //     navigate('login')
        // }

    },[auth])

    if(loading) return<></>;
    if(auth.loggedInUser && auth.loggedInUser.role===allowedRole){
        return <>{children}</>
    }else if(auth.loggedInUser && auth.loggedInUser.role !== allowedRole){
        toast.warning("No permission to access !")
        return<Navigate to={'/'+auth.loggedInUser.role} />
    }
    else{
        toast.warning("Please login to access !")
        return<><Navigate to={'/login'}/></>
    }







}
export default PermissionCheck