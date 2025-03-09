
import { useState } from "react"
import {
    ArrowUpDown,
    ChevronDown,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
import { OrderDetails } from "@/components/seller-dashboard-components/order-details"

// Sample order data
const initialOrders = [
    {
        id: "ORD-5723",
        customer: {
            name: "Alex Johnson",
            email: "alex@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=AJ",
        },
        date: "2023-11-14T09:45:00",
        total: 129.99,
        items: 3,
        paymentStatus: "Paid",
        fulfillmentStatus: "Shipped",
        trackingNumber: "TRK928374651",
    },
    {
        id: "ORD-5722",
        customer: {
            name: "Sarah Miller",
            email: "sarah@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=SM",
        },
        date: "2023-11-14T08:12:00",
        total: 79.95,
        items: 2,
        paymentStatus: "Paid",
        fulfillmentStatus: "Delivered",
        trackingNumber: "TRK837465192",
    },
    {
        id: "ORD-5721",
        customer: {
            name: "Michael Chen",
            email: "michael@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=MC",
        },
        date: "2023-11-13T16:30:00",
        total: 249.99,
        items: 1,
        paymentStatus: "Paid",
        fulfillmentStatus: "Shipped",
        trackingNumber: "TRK736451928",
    },
    {
        id: "ORD-5720",
        customer: {
            name: "Emily Rodriguez",
            email: "emily@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=ER",
        },
        date: "2023-11-13T14:22:00",
        total: 54.97,
        items: 3,
        paymentStatus: "Paid",
        fulfillmentStatus: "Processing",
        trackingNumber: null,
    },
    {
        id: "ORD-5719",
        customer: {
            name: "David Kim",
            email: "david@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=DK",
        },
        date: "2023-11-13T11:05:00",
        total: 199.95,
        items: 2,
        paymentStatus: "Pending",
        fulfillmentStatus: "Pending",
        trackingNumber: null,
    },
    {
        id: "ORD-5718",
        customer: {
            name: "Jessica Taylor",
            email: "jessica@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=JT",
        },
        date: "2023-11-12T17:45:00",
        total: 149.99,
        items: 1,
        paymentStatus: "Paid",
        fulfillmentStatus: "Delivered",
        trackingNumber: "TRK645192837",
    },
    {
        id: "ORD-5717",
        customer: {
            name: "Robert Wilson",
            email: "robert@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=RW",
        },
        date: "2023-11-12T15:30:00",
        total: 89.97,
        items: 3,
        paymentStatus: "Failed",
        fulfillmentStatus: "Cancelled",
        trackingNumber: null,
    },
    {
        id: "ORD-5716",
        customer: {
            name: "Amanda Brown",
            email: "amanda@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=AB",
        },
        date: "2023-11-12T10:15:00",
        total: 299.99,
        items: 1,
        paymentStatus: "Refunded",
        fulfillmentStatus: "Returned",
        trackingNumber: "TRK546192837",
    },
    {
        id: "ORD-5715",
        customer: {
            name: "Thomas Garcia",
            email: "thomas@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=TG",
        },
        date: "2023-11-11T13:20:00",
        total: 124.95,
        items: 2,
        paymentStatus: "Paid",
        fulfillmentStatus: "Shipped",
        trackingNumber: "TRK451928376",
    },
    {
        id: "ORD-5714",
        customer: {
            name: "Olivia Martinez",
            email: "olivia@example.com",
            avatar: "/placeholder.svg?height=32&width=32&text=OM",
        },
        date: "2023-11-11T09:10:00",
        total: 74.99,
        items: 1,
        paymentStatus: "Paid",
        fulfillmentStatus: "Processing",
        trackingNumber: null,
    },
]

export default function OrdersPage() {
    const [orders] = useState(initialOrders)
    const [searchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    // Filter orders based on search query and status filter
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || order.fulfillmentStatus.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesStatus
    })

    const handleViewDetails = (order: any) => {
        setSelectedOrder(order)
        setIsDetailsOpen(true)
    }

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
                                        {filteredOrders.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="h-24 text-center">
                                                    No orders found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">{order.id}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={order.customer.avatar || "/placeholder.svg"}
                                                                width={28}
                                                                height={28}
                                                                alt={order.customer.name}
                                                                className="rounded-full"
                                                            />
                                                            <div className="hidden flex-col sm:flex">
                                                                <span className="text-sm font-medium">{order.customer.name}</span>
                                                                <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {getPaymentStatusBadge(order.paymentStatus)}
                                                    </TableCell>
                                                    <TableCell>{getFulfillmentStatusBadge(order.fulfillmentStatus)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Actions</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => handleViewDetails(order)}>
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
            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="sm:max-w-xl">
                    <SheetHeader>
                        <SheetTitle>Order Details</SheetTitle>
                        <SheetDescription>Complete information about this order</SheetDescription>
                    </SheetHeader>
                    {selectedOrder && <OrderDetails order={selectedOrder} />}
                </SheetContent>
            </Sheet>
        </div>
    )
}

