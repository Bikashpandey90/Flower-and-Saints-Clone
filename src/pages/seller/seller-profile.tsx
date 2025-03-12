
import { useContext, useEffect, useState } from "react"
import {
    Box,
    Edit,
    ExternalLink,
    MapPin,
    Settings,
    Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/context/auth-context"
import { Product } from "../products/admin-products.page"
import productSvc from "../products/products.service"
import { useNavigate } from "react-router-dom"

export default function SellerProfile() {

    const auth = useContext(AuthContext) as { loggedInUser: any }
    const [myproducts, setMyProducts] = useState<Product[]>([])
    const navigate = useNavigate()

    const fetchMyProducts = async () => {
        try {
            const response = await productSvc.getMyProducts()
            setMyProducts(response.data.detail)


        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchMyProducts()
    }, [])

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col">

                <main className="flex-1 p-4 md:p-6">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 h-40 bg-gradient-to-r from-primary/20 to-primary/40 md:h-60"></div>
                        <div className="relative mx-auto max-w-6xl px-4 py-4 md:px-6">
                            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:gap-6">
                                <Avatar className="h-24 w-24 border-4 border-background md:h-32 md:w-32">
                                    <AvatarImage src={auth.loggedInUser.image} alt="Shop Logo" />
                                    <AvatarFallback className="text-2xl"></AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h1 className="text-2xl font-bold md:text-3xl">{auth.loggedInUser.name.split(' ')[0]}'s Shop</h1>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span>{auth.loggedInUser.address ? auth.loggedInUser.address : "Kathmandu"} </span>
                                                <span className="text-sm">•</span>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="ml-1">4.8</span>
                                                    <span className="ml-1 text-sm">(243 reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex gap-2 md:mt-0">
                                            <Button size="sm" variant="outline">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View Shop
                                            </Button>
                                            <Button size="sm">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto  max-w-6xl">
                        <Tabs defaultValue="overview" className="w-full" >
                            <div className="flex items-center justify-between">
                                {/* <TabsList className="grid w-full max-w-md grid-cols-3">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="products">Products</TabsTrigger>
                                    <TabsTrigger value="settings">Settings</TabsTrigger> 
                                </TabsList> */}
                            </div>

                            <TabsContent value="overview" className="mt-10 space-y-6">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {/* <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">$12,543.00</div>
                                            <p className="text-xs text-muted-foreground">+15% from last month</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">Products</CardTitle>
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">48</div>
                                            <p className="text-xs text-muted-foreground">+2 new this week</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">Customers</CardTitle>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">1,205</div>
                                            <p className="text-xs text-muted-foreground">+18% from last month</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">3.2%</div>
                                            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                                        </CardContent>
                                    </Card>  */}
                                </div>

                                <Card >
                                    <CardHeader>
                                        <CardTitle>Shop Details</CardTitle>
                                        <CardDescription>Information about your shop that customers will see</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Shop Description</h3>
                                            <p className="mt-1">
                                                {auth.loggedInUser.name.split(' ')[0]}'s Shop offers handmade crafts, custom gifts, and DIY kits for all ages.
                                                Specializing in paper crafts, knitting, and personalized home decor, we bring creativity to your
                                                doorstep with carefully curated materials and detailed instructions.
                                            </p>
                                        </div>
                                        <Separator />
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Business Information</h3>
                                                <ul className="mt-2 space-y-2">
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-medium">Business Type:</span>
                                                        <span>Sole Proprietorship</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-medium">Established:</span>
                                                        <span>2018</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-medium">Tax ID:</span>
                                                        <span>XX-XXXXXXX</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                                                <ul className="mt-2 space-y-2">
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-medium">Email:</span>
                                                        <span>{auth.loggedInUser.email}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-medium">Phone:</span>
                                                        <span>{auth.loggedInUser.phone}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-medium">Address:</span>
                                                        <span>{auth.loggedInUser.address}</span>
                                                        {/* //123 Craft St, Portland, OR 97201 */}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Shipping & Returns</h3>
                                            <ul className="mt-2 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="font-medium">Processing Time:</span>
                                                    <span>1-3 business days</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="font-medium">Shipping Methods:</span>
                                                    <span>USPS, FedEx, UPS</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="font-medium">Return Policy:</span>
                                                    <span>30-day returns for unused items</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Store Listing's</CardTitle>
                                        <CardDescription>Your best-selling and featured products</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {myproducts.map((item, index) => (
                                                <div key={index} className="group overflow-hidden rounded-lg border">
                                                    <div className="aspect-square relative overflow-hidden">
                                                        <img


                                                            src={item.images[0]}
                                                            alt={`${item.title}`}
                                                            onClick={() => {
                                                                navigate(`/products/${item.slug}`)
                                                            }}


                                                            className="object-contain  transition-transform group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="p-3">
                                                        <h3 className="font-medium">{item.title}</h3>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <span className="text-sm text-muted-foreground">Nrs {item.actualAmt}</span>
                                                            <Badge variant="secondary">{item.category[0].title}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="products" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Your Products</CardTitle>
                                            <Button>Add Product</Button>
                                        </div>
                                        <CardDescription>Manage your product inventory and listings</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-12">
                                            <Box className="mx-auto h-12 w-12 text-muted-foreground" />
                                            <h3 className="mt-4 text-lg font-medium">Switch to the Products tab to manage your inventory</h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Add, edit, and manage your product listings from the dedicated Products section
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="settings" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Shop Settings</CardTitle>
                                            <Button variant="outline">Save Changes</Button>
                                        </div>
                                        <CardDescription>Manage your shop preferences and settings</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-12">
                                            <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
                                            <h3 className="mt-4 text-lg font-medium">Switch to the Settings tab to configure your shop</h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Update your shop details, payment methods, and notification preferences
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    )
}

