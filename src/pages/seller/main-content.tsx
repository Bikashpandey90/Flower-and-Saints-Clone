import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AddProductForm } from "@/components/seller-dashboard-components/add-product-form"
import { ProductTable } from "@/components/seller-dashboard-components/products-table"
import customerSvc from "../customers/customer-servicepage"
import { User } from "../layout/admin-chat-page"
import { useCallback, useEffect, useState } from "react"
import { BarChart3, Package, Plus, ShoppingBag, Users } from "lucide-react"


const MainContent = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)
    const [users, setUser] = useState<User[] | null>(null)


    const loadMyCustomers = useCallback(async () => {
        try {
            const response = await customerSvc.getAllCustomers();
            setUser(response.data.data)

        } catch (exception) {
            console.log(exception)
        }
    }, [])

    useEffect(() => {
        loadMyCustomers();
    }, [])
    return (<>  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Your Shop Dashboard</h1>
            <Sheet open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <SheetTrigger asChild>
                    <Button className="ml-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                        <SheetDescription>Fill in the details to add a new product to your store.</SheetDescription>
                    </SheetHeader>
                    <AddProductForm onSuccess={() => setIsAddProductOpen(false)} />
                </SheetContent>
            </Sheet>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+48</div>
                            <p className="text-xs text-muted-foreground">+2 added this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">-3 from yesterday</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">573</div>
                            <p className="text-xs text-muted-foreground">+201 since last year</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {users && users.map((user, index) => (
                                    <div key={index} className="flex items-center">
                                        <img
                                            src={user.image}
                                            width={40}
                                            height={40}
                                            alt={`Customer ${index}`}
                                            className="rounded-full"
                                        />
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="ml-auto font-medium">+${(Math.random() * 100).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Popular Products</CardTitle>
                            <CardDescription>Your top selling items this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {["Premium Headphones", "Wireless Keyboard", "Smart Watch", "Bluetooth Speaker"].map(
                                    (product, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                                <Package className="h-5 w-5" />
                                            </div>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium">{product}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {Math.floor(Math.random() * 100)} units sold
                                                </p>
                                            </div>
                                            <Badge className="ml-auto" variant="secondary">
                                                Trending
                                            </Badge>
                                        </div>
                                    ),
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
                <ProductTable />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Analytics</CardTitle>
                        <CardDescription>Your sales performance over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Detailed analytics charts would appear here</p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </main></>)
}
export default MainContent