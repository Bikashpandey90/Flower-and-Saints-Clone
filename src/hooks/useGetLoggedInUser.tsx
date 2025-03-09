import { useQuery } from "@tanstack/react-query"
import { get } from "@/config/axios.config"

export const useGetLoggedInUser=()=>{

    return useQuery({
        queryKey:["get-logged-in-user"],
        queryFn:()=>get('/me',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        }),
        retry:false,
        enabled:false,
        staleTime:360000
    })
}
export const useRefreshToken=()=>{

    return useQuery({
        queryKey:["refresh-token"],
        queryFn:()=>get('/refresh',{
            headers:{
                "Refresh":"Bearer "+localStorage.getItem('refToken')
            }
        }),
        retry:false,
        enabled:true,
        staleTime:360000
    })
}