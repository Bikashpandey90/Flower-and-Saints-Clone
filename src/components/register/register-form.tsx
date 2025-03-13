import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputType, SingleImageUploader, TextAreaField, TextInputField } from "../form/input-field"
import { toast } from "react-toastify"
import authSvc from "@/pages/auth/auth.service"
import { useState } from "react"
import OTPModal from "../modal/otp-modal"
import { LucideEye, LucideEyeOff } from "lucide-react"




export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const registerUserDTO = Yup.object({
    name: Yup.string().min(2).max(50).required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),   //define regex similar to backend
    confirmPassword: Yup.string().equals([Yup.ref('password')], "Confirm password and password must be same").required("Confirm password is required"),
    role: Yup.string().matches(/^(customer|seller)$/).default('customer'),
    gender: Yup.string().matches(/^(male|female|other)$/),
    address: Yup.string().max(200).default(''),
    phone: Yup.string().max(15),
    image: Yup.mixed()

  })
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  }

  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(registerUserDTO)
  })

  // const [profileImage, setProfileImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState();



  const onSubmit = async (data: any) => {
    setLoading(true)

    try {
      let response = await authSvc.registerApi(data)
      setLoading(false)
      setShowOtpModal(true)
      console.log(response)
      setRegisteredUser(response.data)

    } catch (exception) {
      toast.error("Your account cannot be created at this moment")
      console.error(exception)
      setLoading(false)
    }
  }

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result as string)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
  console.log(errors)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <TextInputField
                type={InputType.TEXT}
                name="name"
                control={control}
                placeholder="Enter your full name"
                errMsg={errors?.name?.message as string}

              />
            </div>

            <div className="grid gap-2">

              <Label htmlFor="email">Email</Label>
              <TextInputField
                type={InputType.EMAIL}
                name="email"
                control={control}
                placeholder="Enter your email"
                errMsg={errors?.email?.message as string}

              />


            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <TextInputField
                  type={showPassword ? InputType.TEXT : InputType.PASSWORD}
                  name="password"
                  control={control}
                  placeholder="Enter your password"
                  errMsg={errors?.password?.message as string}

                />
                <button type="button" className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50" onClick={togglePasswordVisibility}>
                  {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative" >
                <TextInputField
                  type={showConfirmPassword ? InputType.TEXT : InputType.PASSWORD}
                  name="confirmPassword"
                  control={control}
                  placeholder="Confirm your password"
                  errMsg={errors?.confirmPassword?.message as string}

                />
                <button type="button" className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                </button>

              </div>
            </div>
            {/* -------------------------------------------------------------------------------- */}

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <span className="text-red-500 text-sm">{errors?.role.message}</span>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              {/* <Textarea id="address" rows={2} {...register("address", { required: "Address is required" })} placeholder="Enter your address" />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>} */}
              <TextAreaField
                control={control}
                placeholder="Enter your address"
                name="address"
                errMsg={errors?.address?.message as string}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <TextInputField
                type={InputType.TEXT}
                name="phone"
                control={control}
                placeholder="Enter your phone number"
                errMsg={errors?.phone?.message as string}

              />
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Label htmlFor="image">Add profile Image</Label>
                {/* <Avatar className="w-24 h-24">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback>Upload</AvatarFallback>
                </Avatar> */}
                {/* <Input id="profileImage" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageUpload} />  */}


                <SingleImageUploader
                  className=""
                  control={control}
                  name="image"
                  setError={setError}

                />

              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full disabled:cursor-not-allowed ">Sign Up</Button>
          </form>
          <OTPModal open={showOtpModal} user={registeredUser} />
        </CardContent>
      </Card>
    </div>
  )
}
