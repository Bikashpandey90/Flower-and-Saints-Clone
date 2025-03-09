

import { DashboardShell } from "@/components/Dashboard-Shell/dashboard-shell"
import { Outlet } from "react-router-dom"




export default function AdminPage(){

    
    return <>
 
     <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
      <Outlet/>
      
      </div>
    </DashboardShell>

 
</>
}

