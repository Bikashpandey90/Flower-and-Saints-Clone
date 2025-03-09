import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

export default function CustomerProfile({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the customer data based on the ID
  const customer = {
    id: params.id,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "January 2022",
    totalOrders: 15,
    totalSpent: 1250.75,
  }

  const orders = [
    { id: "1", date: "2023-05-15", total: 125.99, status: "Delivered" },
    { id: "2", date: "2023-04-22", total: 89.5, status: "Shipped" },
    { id: "3", date: "2023-03-10", total: 210.25, status: "Delivered" },
  ]

  const reviews = [
    { id: "1", productName: "Wireless Headphones", rating: 5, comment: "Great sound quality!" },
    { id: "2", productName: "Smart Watch", rating: 4, comment: "Good features, but battery life could be better." },
  ]

  const wishlist = [
    { id: "1", name: "Ultra HD TV", price: 799.99 },
    { id: "2", name: "Gaming Laptop", price: 1299.99 },
    { id: "3", name: "Noise-Canceling Earbuds", price: 199.99 },
  ]

  return (
    <div className="container mx-auto py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={customer.avatar} alt={customer.name} />
              <AvatarFallback>
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{customer.name}</CardTitle>
              <CardDescription>{customer.email}</CardDescription>
              <p className="text-sm text-muted-foreground">Customer since {customer.joinDate}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold">{customer.totalOrders}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Spent</p>
                <p className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="orders">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Previous Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <Badge>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{review.productName}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <p className="font-medium">{item.name}</p>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

