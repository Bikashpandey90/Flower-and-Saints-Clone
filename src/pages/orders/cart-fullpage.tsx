
import { useContext, useEffect } from "react"

import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { NavLink, useNavigate } from "react-router-dom"
import orderSvc from "./order.service"
import { toast } from "react-toastify"
import { CartContext } from "@/context/cart-context"

// Types for our cart items


export default function CartPage() {
    // Initial cart items - in a real app, this would come from a state management solution or API
    const navigate = useNavigate()

    const cartContext = useContext(CartContext);
    if (!cartContext) {
        return null
    }

    const { carts, removeItemFromCart, addToCart } = cartContext



    useEffect(() => {

    }, []);

    const proceedToPay = async () => {
        try {
            const cartIds = carts.map(item => item._id)
            const deliveryCharge = shipping
            const discount = 0
            const serviceCharge = 0

            const orderData = {
                cartId: cartIds,
                discount,
                deliveryCharge,
                serviceCharge

            }
            const response = await orderSvc.placeOrder(orderData);
            console.log("Order API Response:", response);
        } catch (exception) {
            console.error("Error placing order:", exception);
            toast.error("Error placing order")
        }
    }



    // Calculate subtotal
    const subtotal = carts.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Estimated tax (example: 8%)
    const estimatedTax = subtotal * 0.13

    // Shipping (free over $35)
    const shipping = subtotal > 35 ? 0 : 5.99

    // Total
    const total = subtotal + estimatedTax + shipping

    const updateQuantityDecrease = (id: string, quantity: number) => {
        if (quantity < 1) return
        removeItemFromCart(id, quantity)

    }
    const updateQuantityIncrecase = (id: string, quantity: number) => {
        addToCart(id, quantity)


    }

    // Remove item function
    const removeItem = (id: string, quantity: number) => {
        removeItemFromCart(id, quantity)
    }

    // If cart is empty
    if (carts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 ">
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold mb-4">Your Ecom Cart is empty</h2>
                    <p className="text-muted-foreground mb-8">
                        Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies,
                        electronics, and more.
                    </p>
                    <Button asChild size="lg">
                        <NavLink to="/products">Continue shopping</NavLink>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-4 max-w-7xl">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items Section */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between mb-4">
                                <h2 className="font-semibold">Cart ({carts.length} items)</h2>
                                <span className="text-right font-semibold">Price</span>
                            </div>

                            <Separator className="mb-6" />

                            {carts.map((item) => (
                                <div key={item._id} className="mb-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.product.images[0] || "/placeholder.svg"}
                                                alt={item.product.title}
                                                width={120}
                                                height={120}
                                                className="rounded-md object-cover"
                                            />
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="font-medium text-lg">{item.product.title}</h3>

                                            <div className="text-sm text-green-600 mt-1">In Stock</div>



                                            <div className="flex items-center mt-3">
                                                <div className="flex items-center border rounded-md">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantityDecrease(item._id, 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="px-2">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantityIncrecase(item.product._id, 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <Separator orientation="vertical" className="mx-3 h-6" />

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-primary h-8"
                                                    onClick={() => removeItem(item._id, item.quantity)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-right font-medium">Nrs {item.price.toFixed(2)}</div>
                                    </div>

                                    {carts.indexOf(item) < carts.length - 1 && <Separator className="mt-6" />}
                                </div>
                            ))}

                            <div className="text-right text-lg font-semibold mt-4">
                                Subtotal ({carts.reduce((sum, item) => sum + item.quantity, 0)} items):
                                <span className="ml-2">Nrs {subtotal.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span>Items ({carts.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                                    <span>Nrs {subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping & handling:</span>
                                    <span>{shipping === 0 ? "FREE" : `Nrs ${shipping.toFixed(2)}`}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Estimated tax:</span>
                                    <span>Nrs {estimatedTax.toFixed(2)}</span>
                                </div>

                                <Separator className="my-3" />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Order total:</span>
                                    <span>Nrs {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button className="w-full" size="lg" onClick={() => {

                                proceedToPay()
                                navigate('/checkout')
                            }}>
                                Proceed to checkout
                            </Button>

                            <div className="mt-4 text-sm text-center text-muted-foreground">
                                By placing your order, you agree to our{" "}
                                <NavLink to="#" className="text-primary underline">
                                    Terms of Service
                                </NavLink>{" "}
                                and{" "}
                                <NavLink to="#" className="text-primary underline">
                                    Privacy Policy
                                </NavLink>
                                .
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-medium mb-2">Have a gift card or promotional code?</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <Button variant="outline">Apply</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

