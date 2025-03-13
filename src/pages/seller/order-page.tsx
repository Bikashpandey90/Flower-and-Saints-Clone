
import { useEffect, useState } from "react"
import {
    ArrowUpDown,
    ChevronDown,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Package,
    Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import orderSvc from "../orders/order.service"
import { OrderDetail } from "../orders/checkout"
import { useNavigate } from "react-router-dom"
import { formatNumber } from "@/lib/utils"
// import { OrderDetails } from "@/components/seller-dashboard-components/order-details"



export default function OrdersPage() {
    // const [orders] = useState(initialOrders)
    const [statusFilter, setStatusFilter] = useState("all")
    // const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [orders, setOrders] = useState<OrderDetail[]>([])
    const navigate = useNavigate()

    // Filter orders based on search query and status filter
    // const filteredOrders = orders.filter((order) => {
    //     const matchesSearch =
    //         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    //     const matchesStatus = statusFilter === "all" || order.fulfillmentStatus.toLowerCase() === statusFilter.toLowerCase()

    //     return matchesSearch && matchesStatus
    // })
    console.log(statusFilter)



    const getPaymentStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
            case "Pending":
                return (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Pending
                    </Badge>
                )
            case "Failed":
                return <Badge variant="destructive">Failed</Badge>
            case "Refunded":
                return (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Refunded
                    </Badge>
                )
            default:
                return <Badge>{status}</Badge>
        }
    }

    const getFulfillmentStatusBadge = (status: string) => {
        switch (status) {
            case "Delivered":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
            case "Shipped":
                return <Badge variant="secondary">Shipped</Badge>
            case "Processing":
                return (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Processing
                    </Badge>
                )
            case "Pending":
                return <Badge variant="outline">Pending</Badge>
            case "Cancelled":
                return <Badge variant="destructive">Cancelled</Badge>
            case "Returned":
                return (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Returned
                    </Badge>
                )
            default:
                return <Badge>{status}</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const fetchOrders = async () => {
        try {
            const response = await orderSvc.listOrders()
            setOrders(response.data.detail)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchOrders()
    }, [])


    return (
        <div className="flex min-h-screen w-full flex-col">

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <Filter className="h-3.5 w-3.5" />
                                    <span>Filter</span>
                                    <ChevronDown className="h-3.5 w-3.5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Orders</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("processing")}>Processing</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>Shipped</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>Delivered</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("returned")}>Returned</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" className="h-8">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Export
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
                            All Orders
                        </TabsTrigger>
                        <TabsTrigger value="pending" onClick={() => setStatusFilter("pending")}>
                            Pending
                        </TabsTrigger>
                        <TabsTrigger value="processing" onClick={() => setStatusFilter("processing")}>
                            Processing
                        </TabsTrigger>
                        {/* <TabsTrigger value="shipped" onClick={() => setStatusFilter("shipped")}>
                            Shipped
                        </TabsTrigger>
                        <TabsTrigger value="delivered" onClick={() => setStatusFilter("delivered")}>
                            Delivered
                        </TabsTrigger> */}
                    </TabsList>
                    <TabsContent value="all" className="space-y-4">
                        <Card>
                            <CardHeader className="p-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">Recent Orders</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Select defaultValue="newest">
                                            <SelectTrigger className="h-8 w-[180px]">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Sort by</SelectLabel>
                                                    <SelectItem value="newest">Newest first</SelectItem>
                                                    <SelectItem value="oldest">Oldest first</SelectItem>
                                                    <SelectItem value="total-high">Highest total</SelectItem>
                                                    <SelectItem value="total-low">Lowest total</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                <div className="flex items-center space-x-1">
                                                    <span>Order</span>
                                                    <ArrowUpDown className="h-4 w-4" />
                                                </div>
                                            </TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                <div className="flex items-center space-x-1">
                                                    <span>Date</span>
                                                    <ArrowUpDown className="h-4 w-4" />
                                                </div>
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">Items</TableHead>
                                            <TableHead>
                                                <div className="flex items-center space-x-1">
                                                    <span>Total</span>
                                                    <ArrowUpDown className="h-4 w-4" />
                                                </div>
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">Payment</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="h-24 text-center">
                                                    No orders found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            orders.map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell className="font-medium">

                                                        <Package className="ml-4 h-8 w-8 text-gray-300" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={order.buyer?.image || "/placeholder.svg"}
                                                                width={28}
                                                                height={28}
                                                                alt={order.buyer.name}
                                                                className="rounded-full object-cover h-8 w-8 "
                                                            />
                                                            <div className="hidden flex-col sm:flex">
                                                                <span className="text-sm font-medium">{order.buyer.name}</span>
                                                                <span className="text-xs text-muted-foreground">{order.buyer.email}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">{formatDate(order.createdAt)}</TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={order.product?.images[0] || "/placeholder.svg"}
                                                                width={28}
                                                                height={28}
                                                                alt={order.product?.title}
                                                                className="rounded-sm object-cover h-8 w-8"
                                                            />
                                                            <span>{order.product?.title}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        Nrs {formatNumber(order?.totalAmt ?? 0)}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {getPaymentStatusBadge(order.status)}
                                                    </TableCell>
                                                    <TableCell>{getFulfillmentStatusBadge(order.status)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Actions</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => navigate('/seller/order-detail/' + order._id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Truck className="mr-2 h-4 w-4" />
                                                                    Update Status
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download Invoice
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="pending" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Orders</CardTitle>
                                <CardDescription>Orders that are awaiting processing</CardDescription>
                            </CardHeader>
                            <CardContent>{/* Same table structure as above, filtered for pending orders */}</CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="processing" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Processing Orders</CardTitle>
                                <CardDescription>Orders that are currently being processed</CardDescription>
                            </CardHeader>
                            <CardContent>{/* Same table structure as above, filtered for processing orders */}</CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="shipped" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipped Orders</CardTitle>
                                <CardDescription>Orders that have been shipped to customers</CardDescription>
                            </CardHeader>
                            <CardContent>{/* Same table structure as above, filtered for shipped orders */}</CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="delivered" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Delivered Orders</CardTitle>
                                <CardDescription>Orders that have been successfully delivered</CardDescription>
                            </CardHeader>
                            <CardContent>{/* Same table structure as above, filtered for delivered orders */}</CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Order Details Sheet */}
            {/* <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="sm:max-w-xl">
                    <SheetHeader>
                        <SheetTitle>Order Details</SheetTitle>
                        <SheetDescription>Complete information about this order</SheetDescription>
                    </SheetHeader>
                    {/* {selectedOrder && <OrderDetails order={selectedOrder} />} 
                </SheetContent>
            </Sheet> */}

        </div>
    )
}

