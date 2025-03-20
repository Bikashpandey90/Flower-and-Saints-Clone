
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Download, Filter, Search, ShoppingBag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavLink } from "react-router-dom"
import orderSvc from "../orders/order.service"
import { OrderDetail } from "../orders/checkout"
import { formatDateTOYMD, formatNumber } from "@/lib/utils"




export default function CustomerOrderListing() {
    const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({})
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [orders, setOrder] = useState<OrderDetail[]>([])

    // Toggle order expansion
    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }))
    }

    // // Filter orders based on search term and status
    // const filteredOrders = orders.filter((order) => {
    //     const matchesSearch =
    //         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    //     const matchesStatus = statusFilter === "all" || order.status === statusFilter

    //     return matchesSearch && matchesStatus
    // })

    // Get status badge color
    const getStatusColor = (status: OrderDetail["status"]) => {
        switch (status) {
            case "pending":
                return "bg-blue-100 text-blue-800"
            case "shipped":
                return "bg-amber-100 text-amber-800"
            case "delivered":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await orderSvc.getMyOrders()
            setOrder(response.data.detail)


        } catch (exception) {
            console.log(exception)
        }

    }
    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Orders</h1>
                    <p className="text-muted-foreground mt-1">View and manage your order history</p>
                </div>
                <Button variant="outline">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders by number or product name..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Orders</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders found</h3>
                    <p className="mt-1 text-muted-foreground">
                        {searchTerm || statusFilter !== "all"
                            ? "Try adjusting your search or filter criteria"
                            : "You haven't placed any orders yet"}
                    </p>
                    {!searchTerm && statusFilter === "all" && (
                        <Button className="mt-4" variant="outline">
                            Start Shopping
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardHeader className="bg-muted/50">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Order #{order._id}</CardTitle>
                                        <CardDescription>Placed on {formatDateTOYMD(order.orderDate)}</CardDescription>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0">
                                        <Badge className={`${getStatusColor(order.status)} capitalize`}>{order.status}</Badge>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Invoice
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-medium">
                                            {/* {order.items.length} {order.items.length === 1 ? "item" : "items"} */}
                                        </p>
                                        <p className="text-muted-foreground text-sm">Total: Nrs {formatNumber(order.subTotal)}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleOrderExpansion(order._id)}
                                        className="flex items-center gap-1"
                                    >
                                        {expandedOrders[order._id] ? (
                                            <>
                                                Hide Details
                                                <ChevronUp className="h-4 w-4" />
                                            </>
                                        ) : (
                                            <>
                                                Show Details
                                                <ChevronDown className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {expandedOrders[order._id] && (
                                    <>
                                        {/* <Separator className="my-4" />
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex gap-4">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            width={80}
                                                            height={80}
                                                            className="rounded-md border object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{item.name}</h4>
                                                        <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                                                        <p className="text-sm">${item.price.toFixed(2)} each</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                                        <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                                                            Buy Again
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                                    </>
                                )}
                            </CardContent>
                            <CardFooter className="bg-muted/30 flex justify-between">
                                <Button variant="outline" size="sm">
                                    Track Order
                                </Button>
                                <NavLink to={`/order-detail/${order._id}`} >
                                    <Button size="sm">View Order Details</Button>
                                </NavLink>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

