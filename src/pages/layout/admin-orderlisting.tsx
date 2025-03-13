
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Download, Eye, MoreHorizontal, Package, Search, SlidersHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import orderSvc from "../orders/order.service"
import { OrderDetail } from "../orders/checkout"
import { useNavigate } from "react-router-dom"
import { formatNumber } from "@/lib/utils"

// Sample data based on the provided structure


export default function OrderListing() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedOrder] = useState<OrderDetail | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [orders, setOrders] = useState<OrderDetail[]>([])
    const navigate = useNavigate()

    const fetchOrders = async () => {
        try {
            const response = await orderSvc.listOrders();
            setOrders(response.data.detail)

        } catch (exception) {
            console.log(exception)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    // Filter orders based on search query and status
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order?._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order?.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.buyer.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || order.status === statusFilter

        return matchesSearch && matchesStatus
    })



    interface OrderStatusBadgeColors {
        [key: string]: string;
    }

    const getStatusBadgeColor = (status: string): string => {
        const statusColors: OrderStatusBadgeColors = {
            pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
            shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
            completed: "bg-green-100 text-green-800 hover:bg-green-100",
            cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
        };

        return statusColors[status] || "bg-gray-100 text-gray-800 hover:bg-gray-100";
    };

    interface FormatCurrencyOptions {
        style: 'currency';
        currency: string;
        minimumFractionDigits: number;
    }

    const formatCurrency = (amount: number): string => {
        const options: FormatCurrencyOptions = {
            style: "currency",
            currency: "NPR",
            minimumFractionDigits: 2,
        };
        return new Intl.NumberFormat("en-US", options).format(amount);
    };








    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
                    <p className="text-muted-foreground">Manage and track customer orders</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="hidden sm:flex">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="sr-only">Advanced filters</span>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="processing" className="hidden sm:inline-flex">
                        Processing
                    </TabsTrigger>
                    <TabsTrigger value="shipped" className="hidden md:inline-flex">
                        Shipped
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="hidden md:inline-flex">
                        Completed
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <Card>
                        <CardHeader className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <CardTitle>Order List</CardTitle>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                            <CardDescription>
                                Showing {filteredOrders.length} of {orders.length} orders
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden md:table-cell">Date</TableHead>
                                            <TableHead className="hidden lg:table-cell">Amount</TableHead>
                                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                                            <TableHead className="hidden sm:table-cell">Payment</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                    No orders found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredOrders.map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell className="font-medium">
                                                        {/* {order._id.substring(order._id.length - 8)} */}
                                                        <Package className="items-center justify-center ml-4 h-10 w-10  text-gray-300" />

                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">{order.buyer.name}</div>
                                                        <div className="text-xs text-muted-foreground hidden md:block">{order.buyer.email}</div>
                                                        <div className="flex items-center gap-1 sm:hidden">
                                                            <Badge
                                                                variant="outline"
                                                                className={`${getStatusBadgeColor(order.status)} capitalize text-xs`}
                                                            >
                                                                {order.status}
                                                            </Badge>
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    order.isPaid
                                                                        ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs"
                                                                        : "bg-red-100 text-red-800 hover:bg-red-100 text-xs"
                                                                }
                                                            >
                                                                {order.isPaid ? "Paid" : "Unpaid"}
                                                            </Badge>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {format(new Date(order.orderDate), "MMM dd, yyyy")}
                                                    </TableCell>
                                                    <TableCell className="hidden lg:table-cell">{formatNumber(order.total)}</TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge variant="outline" className={`${getStatusBadgeColor(order.status)} capitalize`}>
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                order.isPaid
                                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                                                            }
                                                        >
                                                            {order.isPaid ? "Paid" : "Unpaid"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Actions</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => navigate('/admin/order-detail/' + order._id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                                <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                                                                <DropdownMenuItem>Print Order</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                {/* Other tab contents would be similar but filtered by status */}
            </Tabs>

            Order Detail Dialog
            {selectedOrder && (
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                                Order ID: {selectedOrder._id.substring(selectedOrder._id.length - 8)}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Customer Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <dl className="grid grid-cols-1 gap-2 text-sm">
                                            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                                                <dt className="font-medium text-muted-foreground">Name:</dt>
                                                <dd className="truncate">{selectedOrder.buyer.name}</dd>
                                            </div>
                                            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                                                <dt className="font-medium text-muted-foreground">Email:</dt>
                                                <dd className="truncate">{selectedOrder.buyer.email}</dd>
                                            </div>
                                            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                                                <dt className="font-medium text-muted-foreground">Phone:</dt>
                                                <dd>{selectedOrder.buyer ? selectedOrder.buyer.phone : "Phone number not available"}</dd>
                                            </div>
                                        </dl>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Order Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <dl className="grid grid-cols-1 gap-2 text-sm">
                                            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                                                <dt className="font-medium text-muted-foreground">Order Date:</dt>
                                                <dd>{format(new Date(selectedOrder.orderDate), "MMM dd, yyyy HH:mm")}</dd>
                                            </div>
                                            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                                                <dt className="font-medium text-muted-foreground">Status:</dt>
                                                <dd>
                                                    <Badge
                                                        variant="outline"
                                                        className={`${getStatusBadgeColor(selectedOrder.status)} capitalize`}
                                                    >
                                                        {selectedOrder.status}
                                                    </Badge>
                                                </dd>
                                            </div>
                                            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                                                <dt className="font-medium text-muted-foreground">Payment:</dt>
                                                <dd>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            selectedOrder.isPaid
                                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                : "bg-red-100 text-red-800 hover:bg-red-100"
                                                        }
                                                    >
                                                        {selectedOrder.isPaid ? "Paid" : "Unpaid"}
                                                    </Badge>
                                                </dd>
                                            </div>
                                        </dl>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-1 gap-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <dt className="font-medium text-muted-foreground">Subtotal:</dt>
                                            <dd className="text-right">{formatNumber(selectedOrder.subTotal)}</dd>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <dt className="font-medium text-muted-foreground">Discount:</dt>
                                            <dd className="text-right">-{formatCurrency(selectedOrder.discount)}</dd>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <dt className="font-medium text-muted-foreground">Tax:</dt>
                                            <dd className="text-right">{formatCurrency(selectedOrder.tax)}</dd>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <dt className="font-medium text-muted-foreground">Service Charge:</dt>
                                            <dd className="text-right">{formatCurrency(selectedOrder.serviceCharge)}</dd>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <dt className="font-medium text-muted-foreground">Delivery Charge:</dt>
                                            <dd className="text-right">{formatCurrency(selectedOrder.deliveryCharge)}</dd>
                                        </div>
                                        <div className="grid grid-cols-2 border-t pt-2 font-medium">
                                            <dt>Total:</dt>
                                            <dd className="text-right">{formatCurrency(selectedOrder.total)}</dd>
                                        </div>
                                    </dl>
                                </CardContent>
                            </Card>

                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Print Invoice
                                </Button>
                                <Button className="w-full sm:w-auto">Update Status</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* {selectedOrderId ? (
                <>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={handleBackClick}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="font-semibold text-lg md:text-xl">
                            Order #{selectedOrderId.slice(-8)} -
                            <span className="font-normal text-muted-foreground"> {orderDetails?.detail[0]?.buyer.name}</span>
                        </h1>
                        <div className="ml-auto flex items-center gap-2">
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Previous</span>
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next</span>
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : orderDetails ? (
                        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Items</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px]">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Quantity</TableHead>
                                                        <TableHead>Total</TableHead>
                                                        <TableHead>Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {orderDetails.detail.map((item) => (
                                                        <TableRow key={item._id} className="cursor-pointer hover:bg-muted/50">
                                                            <TableCell>
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img
                                                                            className="h-10 w-10 rounded-full"
                                                                            src={item.product.images[0] || "/placeholder.svg?height=40&width=40"}
                                                                            alt={item.product.title}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-medium">{item.product.title}</div>
                                                                        <div className="text-sm text-muted-foreground">
                                                                            ID: {item.product._id.slice(-8)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{formatCurrency(item.product.actualAmt)}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell>{formatCurrency(item.totalAmt)}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={item.status === "cart" ? "outline" : "default"}>
                                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        {orderDetails.detail.map((item, index) => (
                                            <div key={item._id} className="flex items-center">
                                                <div className="flex-1">
                                                    <span className="font-medium">{item.product.title}</span>
                                                    <span className="text-muted-foreground"> (x{item.quantity})</span>
                                                </div>
                                                <div className="ml-auto">{formatCurrency(item.totalAmt)}</div>
                                            </div>
                                        ))}
                                        <Separator />
                                        <div className="flex items-center font-medium">
                                            <div>Total</div>
                                            <div className="ml-auto">
                                                {formatCurrency(orderDetails.detail.reduce((sum, item) => sum + item.totalAmt, 0))}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex items-center gap-2">
                                        <Button size="sm">Process Order</Button>
                                        <Button variant="outline" size="sm">
                                            Send Invoice
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Timeline</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {orderDetails.detail.map((item) => (
                                                <div key={`created-${item._id}`} className="flex">
                                                    <div className="mr-4 flex flex-col items-center">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                                                            <img
                                                                src={item.product.images[0] || "/placeholder.svg?height=40&width=40"}
                                                                alt={item.product.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="h-full w-px bg-border"></div>
                                                    </div>
                                                    <div className="space-y-1 pt-1.5">
                                                        <p className="text-sm font-medium">{item.product.title} Added to Cart</p>
                                                        <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            {orderDetails.detail.map((item) => (
                                                <div key={`updated-${item._id}`} className="flex">
                                                    <div className="mr-4 flex flex-col items-center">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                                                            <img
                                                                src={item.product.images[0] || "/placeholder.svg?height=40&width=40"}
                                                                alt={item.product.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 pt-1.5">
                                                        <p className="text-sm font-medium">{item.product.title} Updated</p>
                                                        <p className="text-xs text-muted-foreground">{formatDate(item.updatedAt)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-1 flex flex-col gap-6">
                                <Card>
                                    <div>
                                        <CardHeader className="flex flex-row items-center space-y-0">
                                            <CardTitle>Customer</CardTitle>
                                            <Button variant="secondary" className="ml-auto">
                                                Edit
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <div className="flex items-center gap-4 mb-4">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage
                                                        src={orderDetails.detail[0]?.buyer.image}
                                                        alt={orderDetails.detail[0]?.buyer.name}
                                                    />
                                                    <AvatarFallback>{orderDetails.detail[0]?.buyer.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{orderDetails.detail[0]?.buyer.name}</h3>
                                                    <p className="text-muted-foreground">Customer since Dec 2024</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                    <Separator />
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Contact Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Email:</span>
                                                    <NavLink to={`mailto:${orderDetails.detail[0]?.buyer.email}`} className="text-primary">
                                                        {orderDetails.detail[0]?.buyer.email}
                                                    </NavLink>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Phone:</span>
                                                    <NavLink to={`tel:${orderDetails.detail[0]?.buyer.phone}`} className="text-primary">
                                                        {orderDetails.detail[0]?.buyer.phone}
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                    <Separator />
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Shipping Address</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <div className="whitespace-pre-line">
                                                {orderDetails.detail[0]?.buyer.name}
                                                <br />
                                                {orderDetails.detail[0]?.buyer.address}
                                            </div>
                                        </CardContent>
                                    </div>
                                    <Separator />
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Order Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <div className="grid gap-2">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Order ID:</span>
                                                    <span>{selectedOrderId}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Created:</span>
                                                    <span>{formatDate(orderDetails.detail[0]?.createdAt)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Last Updated:</span>
                                                    <span>{formatDate(orderDetails.detail[0]?.updatedAt)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Status:</span>
                                                    <Badge variant={orderDetails.detail[0]?.status === "cart" ? "outline" : "default"}>
                                                        {orderDetails.detail[0]?.status.charAt(0).toUpperCase() +
                                                            orderDetails.detail[0]?.status.slice(1)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-2">
                                        <Button className="w-full">Update Order Status</Button>
                                        <Button variant="outline" className="w-full">
                                            Send Notification
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            Print Invoice
                                        </Button>
                                        <Button variant="destructive" className="w-full">
                                            Cancel Order
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-muted-foreground">No order details found</p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Orders</h1>
                        <Button>
                            <Package className="mr-2 h-4 w-4" />
                            New Order
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockOrders.map((order) => (
                                        <TableRow
                                            key={order.id}
                                            className="cursor-pointer hover:bg-muted/50"
                                            onClick={() => handleOrderClick(order.id)}
                                        >
                                            <TableCell className="font-medium">{order.id.slice(-8)}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.total}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        order.status === "Processing"
                                                            ? "outline"
                                                            : order.status === "Shipped"
                                                                ? "secondary"
                                                                : "default"
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <ChevronRight className="h-4 w-4" />
                                                    <span className="sr-only">View details</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>3</strong> of <strong>15</strong> orders
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </>
            )} */}
        </div>
    )
}

