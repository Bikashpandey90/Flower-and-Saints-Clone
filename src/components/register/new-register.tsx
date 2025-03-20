import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputType, SingleImageUploader, TextAreaField, TextInputField } from "../form/input-field"
import { toast } from "react-toastify"
import authSvc from "@/pages/auth/auth.service"
import { useState } from "react"
import OTPModal from "../modal/new-otp-modal"
import { LucideArrowLeft, LucideArrowRight, LucideEye, LucideEyeOff } from "lucide-react"

// Step indicators component
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                currentStep === step
                                    ? "bg-primary text-primary-foreground"
                                    : currentStep > step
                                        ? "bg-primary/20 text-primary"
                                        : "bg-muted text-muted-foreground",
                            )}
                        >
                            {step}
                        </div>
                        {step < 3 && <div className={cn("w-10 h-1 mx-1", currentStep > step ? "bg-primary" : "bg-muted")} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const [currentStep, setCurrentStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [registeredUser, setRegisteredUser] = useState()

    const registerUserDTO = Yup.object({
        name: Yup.string().min(2).max(50).required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .equals([Yup.ref("password")], "Confirm password and password must be same")
            .required("Confirm password is required"),
        role: Yup.string()
            .matches(/^(customer|seller)$/)
            .default("customer"),
        gender: Yup.string().matches(/^(male|female|other)$/),
        address: Yup.string().max(200).required("Address is required"),
        phone: Yup.string().max(15),
        image: Yup.mixed(),
    })

    const {
        control,
        handleSubmit,
        setError,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerUserDTO),
        mode: "onChange",
    })

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev)
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const response = await authSvc.registerApi(data)
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

    const nextStep = async () => {
        let fieldsToValidate: Array<
            "role" | "name" | "address" | "image" | "email" | "password" | "confirmPassword" | "gender" | "phone"
        > = []

        if (currentStep === 1) {
            fieldsToValidate = ["name", "email", "password", "confirmPassword"]
        } else if (currentStep === 2) {
            fieldsToValidate = ["role", "gender", "address"]
        }

        const isStepValid = await trigger(fieldsToValidate)

        if (isStepValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 3))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const skipToSubmit = () => {
        // Only manually submit the form, don't trigger automatic submission
        handleSubmit(onSubmit)()
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Create an account</CardDescription>
                    <StepIndicator currentStep={currentStep} />
                </CardHeader>
                <CardContent>
                    <form
                        id="registration-form"
                        onSubmit={(e) => {
                            if (currentStep < 3) {
                                e.preventDefault()
                                return false
                            }
                            return handleSubmit(onSubmit)(e)
                        }}
                        className="space-y-6"
                    >
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
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
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <TextInputField
                                            type={showConfirmPassword ? InputType.TEXT : InputType.PASSWORD}
                                            name="confirmPassword"
                                            control={control}
                                            placeholder="Confirm your password"
                                            errMsg={errors?.confirmPassword?.message as string}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            {showConfirmPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Role and Gender */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Controller
                                        name="role"
                                        control={control}
                                        rules={{ required: "Role is required" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value || "customer"}>
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
                                    <TextAreaField
                                        control={control}
                                        placeholder="Enter your address"
                                        name="address"
                                        errMsg={errors?.address?.message as string}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Optional Information */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div className="bg-muted/30 p-3 rounded-md mb-4">
                                    <p className="text-sm text-muted-foreground font-medium">Optional Information</p>
                                    <p className="text-xs text-muted-foreground mt-1">You can skip this step if you prefer.</p>
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
                                        <div className="grid gap-2">
                                            <Label htmlFor="image" className="block mb-2">
                                                Profile Picture
                                            </Label>
                                            <div className="flex justify-center mb-4">
                                                <div className="relative group">
                                                    <SingleImageUploader
                                                        className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 hover:border-primary transition-colors"
                                                        control={control}
                                                        name="image"
                                                        setError={setError}
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-white text-xs font-medium">Upload</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                    <OTPModal open={showOtpModal} user={registeredUser} />
                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-1">
                            <LucideArrowLeft size={16} />
                            Back
                        </Button>
                    )}
                    {currentStep === 1 && <div />}

                    <div className="flex gap-2">
                        {currentStep === 3 && (
                            <Button type="button" variant="outline" onClick={skipToSubmit}>
                                Skip & Submit
                            </Button>
                        )}

                        {currentStep < 3 ? (
                            <Button type="button" onClick={nextStep} className="flex items-center gap-1">
                                Next
                                <LucideArrowRight size={16} />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit(onSubmit)} disabled={loading} className="disabled:cursor-not-allowed">
                                Sign Up
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

