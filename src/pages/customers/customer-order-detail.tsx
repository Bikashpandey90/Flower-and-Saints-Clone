"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    ExternalLink,
    HelpCircle,
    MapPin,
    Package,
    Phone,
    ShoppingCart,
    Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { formatDateTOYMD } from "@/lib/utils"
import { useParams } from "react-router-dom"
import orderSvc from "../orders/order.service"

export default function CustomerOrderDetailPage() {
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

    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()

    const fetchOrderData = async () => {
        try {
            setIsLoading(true)
            const response = await orderSvc.getOrderDetail(id as string)
            if (response && response.data.detail && response.data.detail.length > 0) {
                setOrderData(response.data.detail[0])
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

    // Format currency
    const formatCurrency = (amount = 0) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NPR",
        }).format(amount)
    }

    // Get order status progress
    const getOrderProgress = () => {
        const statusMap: Record<string, number> = {
            cart: 0,
            pending: 25,
            processing: 50,
            shipped: 75,
            delivered: 100,
            cancelled: 0,
        }
        return statusMap[orderData?.status || "cart"] || 0
    }

    // Get status badge
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

    // Get estimated delivery date (just for demo purposes)
    const getEstimatedDelivery = () => {
        if (!orderData?.createdAt) return "Unknown"

        const createdDate = new Date(orderData.createdAt)
        const deliveryDate = new Date(createdDate)
        deliveryDate.setDate(deliveryDate.getDate() + 5) // Assuming 5 days delivery time

        return formatDateTOYMD(deliveryDate.toISOString())
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-4 flex items-center justify-center min-h-[300px]">
                <p>Loading your order details...</p>
            </div>
        )
    }

    if (!orderData) {
        return (
            <div className="container mx-auto py-4 flex flex-col items-center justify-center min-h-[300px] gap-4">
                <HelpCircle className="h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Order Not Found</h2>
                <p className="text-muted-foreground">We couldn't find the order you're looking for.</p>
                <Button variant="outline" className="mt-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to My Orders
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6 px-4 max-w-4xl">
            {/* Header with back button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to My Orders
                    </Button>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Button variant="outline" size="sm" className="h-8">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Need Help?
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                    </Button>
                </div>
            </div>

            {/* Order Status Card */}
            <Card className="mb-6">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <CardTitle className="text-xl">Order #{orderData.orderId.slice(-8)}</CardTitle>
                            <CardDescription>Placed on {formatDateTOYMD(orderData.createdAt)}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">{getStatusBadge(orderData.status)}</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Progress bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Order Placed</span>
                                <span>Delivered</span>
                            </div>
                            <Progress value={getOrderProgress()} className="h-2" />
                        </div>

                        {/* Order Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className={`rounded-full p-3 ${orderData.status !== "cancelled" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                </div>
                                <h3 className="mt-2 font-medium text-sm">Order Placed</h3>
                                <p className="text-xs text-muted-foreground">{formatDateTOYMD(orderData.createdAt)}</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div
                                    className={`rounded-full p-3 ${["processing", "shipped", "delivered"].includes(orderData.status) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                >
                                    <Package className="h-5 w-5" />
                                </div>
                                <h3 className="mt-2 font-medium text-sm">Processing</h3>
                                <p className="text-xs text-muted-foreground">
                                    {orderData.status === "processing"
                                        ? "In progress"
                                        : ["shipped", "delivered"].includes(orderData.status)
                                            ? formatDateTOYMD(orderData.updatedAt)
                                            : "Pending"}
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div
                                    className={`rounded-full p-3 ${["shipped", "delivered"].includes(orderData.status) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                >
                                    <Truck className="h-5 w-5" />
                                </div>
                                <h3 className="mt-2 font-medium text-sm">Shipped</h3>
                                <p className="text-xs text-muted-foreground">
                                    {orderData.status === "shipped"
                                        ? "On the way"
                                        : orderData.status === "delivered"
                                            ? formatDateTOYMD(orderData.updatedAt)
                                            : "Pending"}
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div
                                    className={`rounded-full p-3 ${orderData.status === "delivered" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                >
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <h3 className="mt-2 font-medium text-sm">Delivered</h3>
                                <p className="text-xs text-muted-foreground">
                                    {orderData.status === "delivered"
                                        ? formatDateTOYMD(orderData.updatedAt)
                                        : orderData.status === "cancelled"
                                            ? "Cancelled"
                                            : `Est. ${getEstimatedDelivery()}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                {orderData.status === "pending" && (
                    <CardFooter className="border-t pt-4">
                        <Button variant="outline" className="w-full sm:w-auto" size="sm">
                            Cancel Order
                        </Button>
                    </CardFooter>
                )}
                {orderData.status === "shipped" && (
                    <CardFooter className="border-t pt-4">
                        <Button className="w-full sm:w-auto" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Track Package
                        </Button>
                    </CardFooter>
                )}
            </Card>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="relative h-24 w-24 rounded-md overflow-hidden border">
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
                                    <div className="flex-1">
                                        <h3 className="font-medium">{orderData.product?.title || "Product name"}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Quantity: {orderData.quantity || 0}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground line-through">
                                                    {formatCurrency((orderData.product?.price || 0) / 100)}
                                                </p>
                                                <p className="font-medium">{formatCurrency(orderData.price || 0)}</p>
                                            </div>
                                            <p className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                                {orderData.product?.discount || 0}% OFF
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Delivery Address</h3>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line mt-1">
                                            {orderData.buyer?.address || "Address not available"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Contact Number</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {orderData.buyer?.phone || "Phone not available"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Estimated Delivery</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{getEstimatedDelivery()}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Subtotal</p>
                                    <p className="text-sm">{formatCurrency((orderData.price || 0) * (orderData.quantity || 0))}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Discount</p>
                                    <p className="text-sm text-green-600">
                                        -
                                        {formatCurrency(
                                            ((orderData.product?.price || 0) / 100) * (orderData.quantity || 0) - (orderData.totalAmt || 0),
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Shipping</p>
                                    <p className="text-sm">Free</p>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-medium">
                                    <p>Total</p>
                                    <p>{formatCurrency(orderData.totalAmt || 0)}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex-col items-start gap-3">
                            <div className="flex justify-between w-full">
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="text-sm font-medium">Cash on Delivery</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="text-sm text-muted-foreground">Payment Status</p>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                                    Pending
                                </Badge>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Need Help Section */}
                    <div className="mt-6 bg-muted/30 rounded-lg p-4 border">
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <h3 className="font-medium">Need Help?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    If you have any questions about your order, please contact our customer support.
                                </p>
                                <Button variant="link" className="px-0 h-auto text-sm mt-1">
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

