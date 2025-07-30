import { Input } from "@/components/ui/input"
import { NavLink } from "react-router-dom"
import { LogoLarge } from "@/components/Logo/logo"
import RoundedSlideButton from "@/components/SplashButton/button"

export default function NewLoginPage() {
    return (
        <div className="min-h-screen  flex items-center justify-center sm:px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-3xl p-6 sm:p-10 pt-10 sm:pt-24 pb-16 space-y-8  m-4 sm:m-10">
                {/* Logo */}
                <div className="text-center justify-self-center items-center">
                    <LogoLarge color="zinc-950" />
                    {/* <h1 className="text-6xl font-medium text-black tracking-wide">EcomStore</h1> */}
                </div>

                {/* Sign in section */}
                <div className="space-y-5">
                    <div className="text-start space-y-2">
                        <h2 className="text-xl  font-inter font-thin  text-black">Sign in</h2>
                        <p className="text-md font-inter text-gray-600">Choose how you'd like to sign in</p>
                    </div>

                 
                    <RoundedSlideButton className="h-14  w-full text-center items-center justify-center border-gray-400 rounded-xl text-xl bg-neutral-900 text-white hover:text-neutral-900 before:bg-white">
                        Sign in with Google
                    </RoundedSlideButton>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-100 text-gray-600">Or</span>
                        </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-6 text-2xl border border-gray-400 rounded-lg focus:ring-2 focus:border-2 focus:ring-white focus:border-transparent focus:bg-white bg-transparent"
                        />

                        {/* Continue button */}
                        <RoundedSlideButton className="w-full text-center items-center justify-center border-gray-400 rounded-xl text-xl hover:text-white ">
                            Continue
                        </RoundedSlideButton>
                    </div>
                </div>

                {/* Footer NavLinks */}
                <div className="flex justify-center space-x-4 text-sm">
                    <NavLink to="/privacy" className="text-gray-600 hover:text-black text-base hover:underline">
                        Privacy
                    </NavLink>
                    <NavLink to="/terms" className="text-gray-600 hover:text-black hover:underline text-base ">
                        Terms
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
