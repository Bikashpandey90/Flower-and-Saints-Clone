import { useQuery } from "@tanstack/react-query"
import { get } from "@/config/axios.config"

 export const useGetAllBannerList=(page=1,limit=10,search=null)=>{
    return useQuery({
         queryKey:["get-all-banners"],
                queryFn:()=>get('/banner',{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem('token')
                    },
                    params:{
                        page:page,
                        limit:limit,
                        search:search

                    
                    }
                }),
               
    })
}
