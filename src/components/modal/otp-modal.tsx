import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { DialogFooter, DialogHeader } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import authSvc from "@/pages/auth/auth.service"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const OTPModal = ({ open, user = {} }: { open: boolean, user?: any }) => {

  const [otp, setOtp] = useState<string>('');
  const navigate = useNavigate();

  const submitOTP = async () => {
    try {
      await authSvc.activateUserAccount({
        otp: otp,
        email: user.email
      })
      toast.success("Your account has been activated successfully")
      navigate('/login')



    } catch (exception) {
      toast.error("Your account could not be created at this moment")
      open = true

    }

  }

  return (

    <Dialog open={open}>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Activate your account</DialogTitle>
          <DialogDescription>
            Check your mail inbox for OTP with "Registration Sucess"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="OTP" className="text-right">
              Your  OTP
            </Label>
            <Input
              id="otp"
              placeholder="Enter your OTP"
              className="col-span-3"
              required
              onChange={(e) => {
                setOtp(e.target.value)
              }}

            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div> */}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitOTP} >Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
export default OTPModal