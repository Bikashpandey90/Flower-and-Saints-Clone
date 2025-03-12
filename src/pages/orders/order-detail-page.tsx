"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle, Clock, Download, Package, ShoppingCart, Truck, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import orderSvc from "./order.service"
import { formatDateTOYMD } from "@/lib/utils"
import { useNavigate, useParams } from "react-router-dom"

// This would come from your authentication system
const userRole = "admin" // or "seller"

export default function OrderDetailPage() {
    // Sample data based on the provided JSON
    interface OrderData {
        _id: string
        orderId: string
        buyer: {
            _id: string
            name: string
            email: string
            image: string
            phone: string
            address: string
        }
        product: {
            _id: string
            title: string
            slug: string
            price: number
            discount: number
            actualAmt: number
            images: any
        }
        price: number
        quantity: number
        totalAmt: number
        status: string
        seller: string
        createdBy: string
        updatedBy: string | null
        createdAt: string
        updatedAt: string
    }

    const [orderDatas, setOrderData] = useState<OrderData[]>([])
    const [orderStatus, setOrderStatus] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    // Function to handle status change
    const handleStatusChange = (value: string) => {
        setOrderStatus(value)
        // Here you would typically make an API call to update the status
        console.log(`Status updated to: ${value}`)
    }

    const fetchOrderData = async () => {
        try {
            setIsLoading(true)
            const response = await orderSvc.getOrderDetail(id as string)
            if (response && response.data.detail) {
                setOrderData(response.data.detail)
                setOrderStatus(response.data.detail[0]?.status || "")
            }
        } catch (exception) {
            console.log(exception)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchOrderData()
        }
    }, [id])

    // Function to get status badge color
    const getStatusBadge = (status: string) => {
        if (!status) return <Badge variant="outline">Unknown</Badge>

        switch (status) {
            case "cart":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        In Cart
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                        Pending
                    </Badge>
                )
            case "processing":
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                        Processing
                    </Badge>
                )
            case "shipped":
                return (
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
                        Shipped
                    </Badge>
                )
            case "delivered":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Delivered
                    </Badge>
                )
            case "cancelled":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        Cancelled
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    // Format currency
    const formatCurrency = (amount = 0) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NPR",
        }).format(amount)
    }

    // Get order ID display
    const getOrderIdDisplay = () => {
        if (!orderDatas[0]?.orderId) return "Loading..."
        return `Order #${orderDatas[0].orderId.length > 8 ? orderDatas[0].orderId.slice(-8) : orderDatas[0].orderId}`
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-4 flex items-center justify-center min-h-[300px]">
                <p>Loading order details...</p>
            </div>
        )
    }

    if (orderDatas.length === 0) {
        return (
            <div className="container mx-auto py-4 flex items-center justify-center min-h-[300px]">
                <p>No order data found</p>
            </div>
        )
    }

    return (
        <>
            {orderDatas.map((orderData, index) => (
                <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4 md:px-6" key={index}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                        <Button variant="ghost" size="sm" className="h-8 px-2"
                            onClick={() => {
                                navigate(-1)
                            }}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
                        <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="h-8 text-xs sm:text-sm flex-1 sm:flex-initial">
                                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Export
                            </Button>
                            {userRole === "admin" && (
                                <Button size="sm" className="h-8 text-xs sm:text-sm flex-1 sm:flex-initial">
                                    <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Approve Order
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Order Summary Card */}
                        <Card className="md:col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>{getOrderIdDisplay()}</CardTitle>
                                    <CardDescription>
                                        {orderData.createdAt ? (
                                            <>Created on {formatDateTOYMD(orderData.createdAt)}</>
                                        ) : (
                                            "Date not available"
                                        )}
                                    </CardDescription>
                                </div>
                                {getStatusBadge(orderStatus)}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Product Details */}
                                    <div className="border rounded-lg p-3 sm:p-4">
                                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden border">
                                                <img
                                                    src={
                                                        orderData.product?.images && orderData.product.images[0]
                                                            ? orderData.product.images[0]
                                                            : "/placeholder.svg"
                                                    }
                                                    alt={orderData.product?.title || "Product image"}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 w-full">
                                                <h3 className="font-medium text-sm sm:text-base">
                                                    {orderData.product?.title || "Product name"}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground">Quantity: {orderData.quantity || 0}</p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs sm:text-sm text-muted-foreground line-through">
                                                            {formatCurrency((orderData.product?.price || 0))}
                                                        </p>
                                                        <p className="font-medium text-sm sm:text-base">{formatCurrency(orderData.price || 0)}</p>
                                                    </div>
                                                    <p className="text-xs sm:text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                                        {orderData.product?.discount || 0}% OFF
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Timeline */}
                                    <div>
                                        <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Order Timeline</h3>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-full">
                                                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-xs sm:text-sm">Added to Cart</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {orderData.createdAt ? formatDateTOYMD(orderData.createdAt) : "Date not available"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 sm:gap-3 opacity-50">
                                                <div className="bg-muted text-muted-foreground p-1.5 sm:p-2 rounded-full">
                                                    <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-xs sm:text-sm">Processing</p>
                                                    <p className="text-xs text-muted-foreground">Pending</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 sm:gap-3 opacity-50">
                                                <div className="bg-muted text-muted-foreground p-1.5 sm:p-2 rounded-full">
                                                    <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-xs sm:text-sm">Shipped</p>
                                                    <p className="text-xs text-muted-foreground">Pending</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 sm:gap-3 opacity-50">
                                                <div className="bg-muted text-muted-foreground p-1.5 sm:p-2 rounded-full">
                                                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-xs sm:text-sm">Delivered</p>
                                                    <p className="text-xs text-muted-foreground">Pending</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between border-t pt-4 sm:pt-6">
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Total Amount</p>
                                    <p className="text-xl sm:text-2xl font-bold">{formatCurrency(orderData.totalAmt || 0)}</p>
                                </div>
                                {(userRole === "admin" || userRole === "seller") && (
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <p className="text-xs sm:text-sm font-medium">Update Status:</p>
                                        <Select value={orderStatus} onValueChange={handleStatusChange}>
                                            <SelectTrigger className="w-full sm:w-[180px] h-9 text-xs sm:text-sm">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cart">In Cart</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="processing">Processing</SelectItem>
                                                <SelectItem value="shipped">Shipped</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>

                        {/* Customer Information */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        Customer Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border">
                                            <img
                                                src={orderData.buyer?.image || "/placeholder.svg"}
                                                alt={orderData.buyer?.name || "Customer"}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm sm:text-base">{orderData.buyer?.name || "Customer name"}</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                Customer ID: {orderData.buyer?._id ? orderData.buyer._id.slice(-6) : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p>{orderData.buyer?.email || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p>{orderData.buyer?.phone || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Shipping Address</p>
                                            <p className="whitespace-pre-line">{orderData.buyer?.address || "N/A"}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                {userRole === "admin" && (
                                    <CardFooter>
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Customer Profile
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>

                            {/* Payment Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        Payment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs sm:text-sm text-muted-foreground">Payment Status</p>
                                            <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 text-xs">
                                                Pending
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-xs sm:text-sm text-muted-foreground">Payment Method</p>
                                            <p className="text-xs sm:text-sm">Cash on Delivery</p>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between">
                                            <p className="text-xs sm:text-sm text-muted-foreground">Subtotal</p>
                                            <p className="text-xs sm:text-sm">
                                                {formatCurrency((orderData?.price || 0) * (orderData?.quantity || 0))}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-xs sm:text-sm text-muted-foreground">Discount</p>
                                            <p className="text-xs sm:text-sm text-green-600">
                                                -
                                                {formatCurrency(
                                                    ((orderData.product?.price || 0) / 100) * (orderData.quantity || 0) -
                                                    (orderData?.totalAmt || 0),
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-xs sm:text-sm text-muted-foreground">Shipping</p>
                                            <p className="text-xs sm:text-sm">Free</p>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between font-medium">
                                            <p className="text-sm">Total</p>
                                            <p className="text-sm">{formatCurrency(orderData.totalAmt || 0)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Admin-only section */}
                    {userRole === "admin" && (
                        <div className="mt-4 sm:mt-6">
                            <Tabs defaultValue="notes">
                                <TabsList className="w-full sm:w-auto">
                                    <TabsTrigger value="notes" className="text-xs sm:text-sm flex-1 sm:flex-initial">
                                        Admin Notes
                                    </TabsTrigger>
                                    <TabsTrigger value="logs" className="text-xs sm:text-sm flex-1 sm:flex-initial">
                                        Activity Logs
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="notes" className="p-3 sm:p-4 border rounded-md mt-2">
                                    <p className="text-muted-foreground text-xs sm:text-sm">No admin notes for this order yet.</p>
                                </TabsContent>
                                <TabsContent value="logs" className="p-3 sm:p-4 border rounded-md mt-2">
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm">
                                            <p>Order created</p>
                                            <p className="text-muted-foreground">
                                                {orderData.createdAt ? formatDateTOYMD(orderData.createdAt) : "Date not available"}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm">
                                            <p>Order updated</p>
                                            <p className="text-muted-foreground">
                                                {orderData.updatedAt ? formatDateTOYMD(orderData.updatedAt) : "Date not available"}
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

