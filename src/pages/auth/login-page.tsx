"use client"

import { LoginForm } from "@/components/login/login-form"
import { AuthContext } from "@/context/auth-context"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ChevronDown, ChevronUp, X, User } from "lucide-react"
import { CiShop } from "react-icons/ci"

const LoginPage = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext) as { loggedInUser: any; setLoggedInUser: Function }
  const navigate = useNavigate()

  // Credentials panel state
  const [showCredentials, setShowCredentials] = useState(true)
  const [isCredentialsExpanded, setIsCredentialsExpanded] = useState(true)

  //check if user is logged in or not
  useEffect(() => {
    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
      toast.info("You are already logged in!")
      navigate("/" + loggedInUser?.role)
    }
  }, [])

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
        {/* Credentials Panel - Toast Style */}
        {showCredentials && (
          <div
            className={`fixed right-4 top-32 z-50 w-80 max-w-[calc(100vw-2rem)] transition-all duration-300 ease-in-out ${isCredentialsExpanded ? "translate-x-0" : "translate-x-72"} sm:w-80 sm:max-w-none`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Demo Credentials</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsCredentialsExpanded(!isCredentialsExpanded)}
                    className="p-1 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded transition-colors"
                    aria-label={isCredentialsExpanded ? "Collapse" : "Expand"}
                  >
                    {isCredentialsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button
                    onClick={() => setShowCredentials(false)}
                    className="p-1 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              {isCredentialsExpanded && (
                <div className="p-4 space-y-3">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Use these credentials to test the application:
                  </div>

                  {/* Customer Credentials */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-medium text-sm text-blue-800 dark:text-blue-300">Customer Account</h4>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span className="font-mono text-blue-700 dark:text-blue-300 select-all">bikashpandey835+customer@gmail.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Password:</span>
                        <span className="font-mono text-blue-700 dark:text-blue-300 select-all">Bikash@34</span>
                      </div>
                    </div>
                  </div>

                  {/* Rider Credentials */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CiShop className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <h4 className="font-medium text-sm text-green-800 dark:text-green-300">Seller Account</h4>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span className="font-mono text-green-700 dark:text-green-300 select-all">
                          bikashpandey835+seller@gmail.com
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Password:</span>
                        <span className="font-mono text-green-700 dark:text-green-300 select-all">Bikash@34</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Credentials */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-4 bg-purple-600 dark:bg-purple-400 rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <h4 className="font-medium text-sm text-purple-800 dark:text-purple-300">Admin Account</h4>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span className="font-mono text-purple-700 dark:text-purple-300 select-all">
                          bikashpandey835@gmail.com
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Password:</span>
                        <span className="font-mono text-purple-700 dark:text-purple-300 select-all">Admin123#</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    Click credentials to copy • Demo purposes only
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Show credentials button when hidden */}
        {!showCredentials && (
          <button
            onClick={() => setShowCredentials(true)}
            className="fixed right-4 top-20 z-50 bg-primary hover:bg-primary-700 text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-200 text-sm font-medium"
          >
            Show Demo Credentials
          </button>
        )}

        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default LoginPage
