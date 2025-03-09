import HttpService from "@/services/http.service";

class CustomerService extends HttpService{

  async  getAllCustomers(){
        try{
            const response=await this.getRequest('/chat/list-user',{auth:true})
            return response

        }catch(exception){
            throw exception
        }
    }
    async deleteUser(id:string){
        try{
            const delResponse=await this.deleteRequest('/'+id,{auth:true})
            return delResponse

        }catch(exception){
            throw exception
        }
    }
}

const customerSvc=new CustomerService();
export default customerSvc;