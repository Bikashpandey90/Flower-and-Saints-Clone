import { LoginForm } from "@/components/login/login-form";
import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {


  const { loggedInUser, setLoggedInUser } = useContext(AuthContext) as { loggedInUser: any; setLoggedInUser: Function }

  const navigate = useNavigate();

  //check if user is logged in or not
  useEffect(() => {

    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
      toast.info("You are already logged in!")
      navigate('/' + loggedInUser?.role)
    }

  }, [])



  return (<>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div></>)

}
export default LoginPage;