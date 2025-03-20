import { RegisterForm } from "@/components/register/new-register";
import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext) as { loggedInUser: any, setLoggedInUser: Function }
  const navigate = useNavigate()
  useEffect(() => {
    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
      toast.info("You are alreafy logged in")
      navigate('/' + loggedInUser.role)
    }
  }, [])
  return (<>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />

      </div>
    </div></>)

}
export default RegisterPage;