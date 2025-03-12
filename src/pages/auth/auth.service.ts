import { AxiosCustomResponse } from "@/config/axios.config";
import HttpService from "@/services/http.service";
export interface UserType {
    name: string;
    email: string;
    role: string;
    _id: string
}
class AuthService extends HttpService {

    loginApi = async (data: { email: string, password: string }): Promise<UserType> => {
        try {
            const response: AxiosCustomResponse = await this.postRequest('/login', data);

            //  setCookie('token',response.detail.accessToken,1);
            localStorage.setItem("token", response.data.detail.accessToken);
            localStorage.setItem("refToken", response.data.detail.refreshToken)
            return response.data.detail.user;

        }
        catch (exception) {
            console.error(exception);
            throw exception
        }

    }
    registerApi = async (data: any) => {
        try {
            const response: AxiosCustomResponse = await this.postRequest('/register', data, {
                file: true,

            })
            return response


        }
        catch (exception) {
            throw exception
        }
    }
    activateUserAccount = async (data: any) => {
        try {
            const response = await this.postRequest('/activate', data)
            return response

        } catch (exception) {
            throw exception
        }

    }

}


const authSvc = new AuthService();
export default authSvc;