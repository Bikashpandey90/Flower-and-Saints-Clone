import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { LucideEye, LucideEyeOff } from "lucide-react"
import { useContext, useState } from "react"
import { InputType, TextInputField } from "../form/input-field"
import authSvc, { UserType } from "@/pages/auth/auth.service"
import { toast } from "react-toastify"
import { AuthContext } from "@/context/auth-context"
import { useDispatch } from "react-redux"
import { setLoggedInUser as setUserDatRedux } from "@/reducer/chat-reducer"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const dispatch = useDispatch();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext) as { loggedInUser: any; setLoggedInUser: Function }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  const LoginDTO = Yup.object({
    username: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();



  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(LoginDTO) });

  // TOdo : define types
  const submitForm = async (data: { username: string, password: string }) => {
    try {
      setloading(true);
      let payload = {
        email: data.username,
        password: data.password,
      }
      let response: UserType = await authSvc.loginApi(payload);
      setLoggedInUser(response)
      console.log(loggedInUser)
      console.log(response)

      dispatch(setUserDatRedux(response))

      toast.success("Welcome to your dashboard");
      //redirect to user dashboard

      navigate("/" + response.role);


    } catch (exception) {
      console.log(exception);

    }
    finally {
      setloading(false)

    }

    //submit data to api and get access
    //url definition
    // REST API=> get post put patch delete
    //GraphQl
    //SOAP API
    // XHR=> XMLHTTPREQUESt=> default  API calling technique =>providers fetch,axios,XHR


  }

  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <TextInputField
                  type={InputType.EMAIL}
                  name="username"
                  control={control}
                  placeholder="Enter your email"
                  errMsg={errors?.username?.message as string}

                />
                {/* <Input
                 {...register('username',{required:true})}
                  type="email"
                  placeholder="m@example.com"
                  
                /> */}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <TextInputField
                    // type={InputType.PASSWORD}
                    type={showPassword ? InputType.TEXT : InputType.PASSWORD}
                    name="password"
                    control={control}
                    placeholder="Enter your password"
                    errMsg={errors?.password?.message as string}

                  />
                  {/* <Input  type={showPassword ? "text" : "password"}  placeholder="Enter your password" {...register('password',{required:true})}/> */}
                  <button type="button" className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50" onClick={togglePasswordVisibility}>
                    {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                  </button>
                </div>



              </div>
              <Button type="submit" disabled={loading} className="w-full">
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink to={'/register'} className="underline underline-offset-4">
                Sign up
              </NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
