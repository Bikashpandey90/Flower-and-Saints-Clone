
import type React from "react"

import { useContext, useState } from "react"
import { ArrowLeft, Camera, Edit, Eye, EyeOff, Home, Plus, Save, Trash, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "react-router-dom"
import { AuthContext } from "@/context/auth-context"

export default function ManageAccount() {
    const [showPassword, setShowPassword] = useState(false)
    const [editingPersonalInfo, setEditingPersonalInfo] = useState(false)
    const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")
    const [isUploading, setIsUploading] = useState(false)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setIsUploading(true)
            // In a real app, you would upload the file to your server/storage here
            // For this example, we'll just use a setTimeout to simulate the upload
            setTimeout(() => {
                // Create a URL for the file
                const imageUrl = URL.createObjectURL(file)
                setProfileImage(imageUrl)
                setIsUploading(false)
            }, 1000)
        }
    }

    const auth = useContext(AuthContext) as { loggedInUser: any }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="mb-6">
                <NavLink
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </NavLink>
                <h1 className="text-2xl font-bold tracking-tight">Manage Your Account</h1>
                <p className="text-muted-foreground">Update your personal information and preferences</p>
            </div>

            <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Manage your personal details</CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => setEditingPersonalInfo(!editingPersonalInfo)}
                        >
                            {editingPersonalInfo ? (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                </>
                            ) : (
                                <>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </>
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                            <div className="relative">
                                <Avatar className="h-24 w-24 border-2 border-muted">
                                    <AvatarImage src={auth.loggedInUser.image} alt="Profile picture" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                {editingPersonalInfo && (
                                    <div className="absolute -right-2 -top-2">
                                        <label
                                            htmlFor="profile-image-upload"
                                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                                        >
                                            <Camera className="h-5 w-5" />
                                            <span className="sr-only">Upload profile picture</span>
                                        </label>
                                        <input
                                            id="profile-image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2 text-center sm:text-left">
                                <h3 className="text-lg font-medium">Profile Picture</h3>
                                <p className="text-sm text-muted-foreground">Upload a photo of yourself for your profile</p>
                                {editingPersonalInfo && (
                                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            type="button"
                                            disabled={isUploading}
                                            onClick={() => document.getElementById("profile-image-upload")?.click()}
                                            className="h-10 px-4 py-2"
                                        >
                                            {isUploading ? "Uploading..." : "Change Image"}
                                        </Button>
                                        {profileImage !== "/placeholder.svg?height=200&width=200" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                type="button"
                                                className="h-10 px-4 py-2 text-destructive hover:bg-destructive/10"
                                                onClick={() => setProfileImage("/placeholder.svg?height=200&width=200")}
                                            >
                                                <X className="mr-2 h-4 w-4" />
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-base">
                                    First Name
                                </Label>
                                <Input id="firstName" defaultValue={auth.loggedInUser.name.split(' ')[0]} disabled={!editingPersonalInfo} className="h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-base">
                                    Last Name
                                </Label>
                                <Input id="lastName" defaultValue={auth.loggedInUser.name.split(' ')[1]} disabled={!editingPersonalInfo} className="h-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-base">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={auth.loggedInUser.email}
                                disabled={!editingPersonalInfo}
                                className="h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                defaultValue={auth.loggedInUser.phone}
                                disabled={!editingPersonalInfo}
                                className="h-12"
                            />
                        </div>


                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your password and account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Change Password</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword" className="text-base">
                                        Current Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-12 pr-12"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-muted-foreground" />
                                            )}
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword" className="text-base">
                                        New Password
                                    </Label>
                                    <Input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="h-12 pr-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-base">
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="h-12 pr-12"
                                    />
                                </div>
                            </div>
                            <Button className="h-12 w-full sm:w-auto">Update Password</Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div className="space-y-0.5">
                                    <div className="font-medium">Two-factor authentication</div>
                                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                                </div>
                                <Switch className="ml-auto mt-2 sm:mt-0" />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Login Sessions</h3>
                            <div className="rounded-md border">
                                <div className="flex flex-col p-4 sm:flex-row sm:items-center">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">Current Session</p>
                                        <p className="text-xs text-muted-foreground">Windows 11 • Chrome • New York, USA</p>
                                    </div>
                                    <div className="mt-2 text-xs text-muted-foreground sm:mt-0">Active now</div>
                                </div>
                                <Separator />
                                <div className="flex flex-col p-4 sm:flex-row sm:items-center">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">Previous Session</p>
                                        <p className="text-xs text-muted-foreground">macOS • Safari • New York, USA</p>
                                    </div>
                                    <div className="mt-2 text-xs text-muted-foreground sm:mt-0">2 days ago</div>
                                </div>
                            </div>
                            <Button variant="outline" className="h-12 w-full sm:w-auto">
                                Sign out of all devices
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Shipping Addresses */}
                <Card>
                    <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div>
                            <CardTitle>Shipping Addresses</CardTitle>
                            <CardDescription>Manage your shipping addresses</CardDescription>
                        </div>
                        <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Address
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Address 1 */}
                        <div className="rounded-lg border p-4">
                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <Home className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">Home</p>
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                Default
                                            </span>
                                        </div>
                                        <p className="text-sm">{auth.loggedInUser.name}</p>
                                        {/* <p className="text-sm text-muted-foreground">123 Main Street, Apt 4B</p>
                                        <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                                        <p className="text-sm text-muted-foreground">United States</p>
                                        <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p> */}
                                        <p className="text-sm text-muted-foreground">{auth.loggedInUser.address}</p>
                                        <p className="text-sm text-muted-foreground">Nepal</p>
                                        <p className="text-sm text-muted-foreground">Phone: {auth.loggedInUser.phone}</p>



                                    </div>
                                </div>
                                <div className="flex gap-2 sm:flex-col">
                                    <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 text-destructive hover:bg-destructive/10 sm:flex-none"
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Address 2 */}
                        {/* <div className="rounded-lg border p-4">
                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Work</p>
                                        <p className="text-sm">John Doe</p>
                                        <p className="text-sm text-muted-foreground">456 Business Ave, Suite 200</p>
                                        <p className="text-sm text-muted-foreground">New York, NY 10002</p>
                                        <p className="text-sm text-muted-foreground">United States</p>
                                        <p className="text-sm text-muted-foreground">Phone: (555) 987-6543</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 sm:flex-col">
                                    <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 text-destructive hover:bg-destructive/10 sm:flex-none"
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button variant="outline" size="sm" className="h-10 w-full sm:w-auto">
                                    Set as default
                                </Button>
                            </div>
                        </div> */}
                    </CardContent>
                </Card>

                {/* Communication Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Communication Preferences</CardTitle>
                        <CardDescription>Manage how we contact you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Email Notifications</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Order confirmations</div>
                                        <div className="text-sm text-muted-foreground">Receive emails when you place an order</div>
                                    </div>
                                    <Switch className="ml-auto mt-2 sm:mt-0" defaultChecked />
                                </div>
                                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Shipping updates</div>
                                        <div className="text-sm text-muted-foreground">Receive emails about your shipments</div>
                                    </div>
                                    <Switch className="ml-auto mt-2 sm:mt-0" defaultChecked />
                                </div>
                                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Promotional emails</div>
                                        <div className="text-sm text-muted-foreground">Receive emails about new products and deals</div>
                                    </div>
                                    <Switch className="ml-auto mt-2 sm:mt-0" />
                                </div>
                                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Account updates</div>
                                        <div className="text-sm text-muted-foreground">Receive emails about your account activity</div>
                                    </div>
                                    <Switch className="ml-auto mt-2 sm:mt-0" defaultChecked />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">SMS Notifications</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Order updates</div>
                                        <div className="text-sm text-muted-foreground">Receive text messages about your orders</div>
                                    </div>
                                    <Switch className="ml-auto mt-2 sm:mt-0" defaultChecked />
                                </div>
                                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Promotional messages</div>
                                        <div className="text-sm text-muted-foreground">Receive text messages about promotions</div>
                                    </div>
                                    <Switch className="ml-auto mt-2 sm:mt-0" />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Marketing Preferences</h3>
                            <div className="space-y-2">
                                <Label htmlFor="marketing-preferences" className="text-base">
                                    How would you like to receive marketing communications?
                                </Label>
                                <Textarea
                                    id="marketing-preferences"
                                    placeholder="Tell us about your preferences..."
                                    className="min-h-[100px]"
                                />
                            </div>
                            <Button className="h-12 w-full sm:w-auto">Save Preferences</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

