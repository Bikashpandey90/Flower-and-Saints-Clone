"use client"

import type React from "react"

import { useContext, useEffect, useState } from "react"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { NavLink } from "react-router-dom"
import orderSvc from "./order.service"
import { AuthContext } from "@/context/auth-context"
import { v4 as uuidv4 } from "uuid"
import CryptoJS from "crypto-js"
import type { Product } from "../products/admin-products.page"
// Types
interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

export interface OrderData {
    detail: OrderDetail[]
    message: string
    options: any | null
    status: string
}

export interface OrderDetail {
    _id: string
    buyer: Buyer
    createdAt: string
    createdBy: string | null
    deliveryCharge: number
    discount: number
    isPaid: boolean
    product?: Product
    totalAmt?: number
    orderDate: string
    serviceCharge: number
    status: string
    subTotal: number
    tax: number
    total: number
    updatedAt: string
    updatedBy: string | null
    __v: number
}

interface Buyer {
    _id: string
    name: string
    email: string
    phone?: string
    image?: string
    // Add more properties if necessary
}

export default function EsewaCheckoutPage() {
    // Mock data - in a real app, this would come from your state management or API
    const [cartItems] = useState<CartItem[]>([])

    const [orderData, setOrderData] = useState<OrderDetail[]>([])

    // State for form
    const [deliveryOption, setDeliveryOption] = useState("standard")

    const [order_id, setOrderId] = useState<string | "">("")
    const auth = useContext(AuthContext) as { loggedInUser: any }

    // Calculate totals
    const subtotal = orderData.length ? orderData[orderData.length - 1].subTotal : 0
    const estimatedTax = orderData.length ? orderData[orderData.length - 1].tax / 100 : 0 // 13 % VAT for Nepal
    const shipping = deliveryOption === "express" ? 500 : subtotal > 5000 ? 0 : 200 // Shipping in NPR
    const total = orderData.length ? orderData[orderData.length - 1].total : 0

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would initiate the eSewa payment process here
        alert("Redirecting to eSewa for payment...")
    }

    const fetchOrders = async () => {
        try {
            const response = await orderSvc.listOrders()
            setOrderData(response.data.detail)
        } catch (exception) {
            console.log(exception)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const latestOrderTotal = orderData.length ? orderData[orderData.length - 1].total.toString() : "10"
    const orderId = orderData.length ? orderData[orderData.length - 1]?._id : ""
    console.log("Order Id Check :", order_id)
    useEffect(() => {
        setOrderId(orderId)
    }, [orderId])
    console.log("Last check", order_id)

    const [formData, setFormData] = useState({
        amount: latestOrderTotal,
        tax_amount: "0",
        total_amount: latestOrderTotal,
        transaction_uuid: uuidv4(), // Use a generated UUID as default
        product_service_charge: "0",
        product_delivery_charge: "0",
        product_code: "EPAYTEST",
        success_url: "http://localhost:5173/payment-success",
        failure_url: "http://localhost:5173/payementfailed",
        signature: "",
        secret: import.meta.env.VITE_APP_ESEWA_SECRET,
        orderId: "",
        signed_field_names: "total_amount,transaction_uuid,product_code",
    })
    console.log(formData)
    console.log("Order Id : ", order_id)

    interface SignatureParams {
        total_amount: string
        transaction_uuid: string
        product_code: string
        secret: string
        // orderId: string;
    }

    const generateSignature = ({ total_amount, transaction_uuid, product_code, secret }: SignatureParams): string => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
        const hash = CryptoJS.HmacSHA256(hashString, secret)
        const hashedSignature = CryptoJS.enc.Base64.stringify(hash)
        return hashedSignature
    }
    useEffect(() => {
        if (orderData.length > 0) {
            const totalAmount = orderData[orderData.length - 1].total.toString()
            const latestOrder = orderData[orderData.length - 1]
            setOrderId(latestOrder._id)

            // Only update transaction_uuid when order_id is not empty
            if (latestOrder._id) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    amount: totalAmount,
                    total_amount: totalAmount,
                    transaction_uuid: latestOrder._id, // Only set this when we have a valid ID
                    signature: generateSignature({
                        total_amount: totalAmount,
                        transaction_uuid: latestOrder._id, // Use the ID directly from latestOrder
                        product_code: prevFormData.product_code,
                        secret: prevFormData.secret,
                    }),
                }))
            } else {
                // Just update the amounts if we don't have an order ID yet
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    amount: totalAmount,
                    total_amount: totalAmount,
                }))
            }
        }
    }, [orderData])

    return (
        <>
            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="hidden">
                <input type="hidden" id="amount" name="amount" required value={formData.amount} />
                <input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount} required />
                <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} required />
                <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
                <input type="hidden" id="product_code" name="product_code" value={formData.product_code} required />
                <input
                    type="hidden"
                    id="product_service_charge"
                    name="product_service_charge"
                    value={formData.product_service_charge}
                    required
                />
                <input
                    type="hidden"
                    id="product_delivery_charge"
                    name="product_delivery_charge"
                    value={formData.product_delivery_charge}
                    required
                />
                <input type="hidden" id="success_url" name="success_url" value={formData.success_url} required />
                {/* <input type="text" id="orderId" name="orderId" value={formData.orderId} required /> */}
                <input
                    type="hidden"
                    id="failure_url"
                    name="failure_url"
                    value="https://developer.esewa.com.np/failure"
                    required
                />
                <input
                    type="hidden"
                    id="signed_field_names"
                    name="signed_field_names"
                    value={formData.signed_field_names}
                    required
                />
                <input type="hidden" id="signature" name="signature" value={formData.signature} required />
                <input value="Submit" id="payment-initiate-button" type="submit" className="hidden" />
            </form>

            <div className="container mx-auto px-4 py-4 max-w-7xl">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Order Summary - Visible at the top on mobile, sticky on the side for desktop */}
                    <div className="lg:col-span-1 lg:order-2">
                        <div className="lg:sticky lg:top-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-md object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-medium">NPR {(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}

                                        <Separator />

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal</span>
                                                <span>NPR {subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Shipping</span>
                                                <span>{shipping === 0 ? "FREE" : `NPR ${shipping.toFixed(2)}`}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>VAT (13%)</span>
                                                <span>NPR {estimatedTax.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>NPR {total.toFixed(2)}</span>
                                        </div>

                                        <div className="mt-4 p-3 bg-green-50 rounded-md">
                                            <p className="text-sm text-green-700">You will pay using eSewa after confirming your order.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="mt-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Lock className="h-4 w-4 text-green-600" />
                                            <span>Secure checkout. Your information is protected.</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Main Checkout Form */}
                    <div className="mt-8 lg:mt-0 lg:col-span-2 lg:order-1">
                        <form onSubmit={handleSubmit}>
                            {/* Shipping Address Section */}
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Shipping Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an address" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={auth.loggedInUser?.address}>{auth.loggedInUser?.address}</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="mt-4">
                                        <Button variant="outline" type="button" className="w-full" onClick={() => { }}>
                                            Add a new address
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Delivery Options Section */}
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Delivery Options</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="standard" id="standard" />
                                            <Label htmlFor="standard">
                                                <div className="font-medium">Standard Delivery</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {subtotal > 5000 ? "FREE" : "NPR 200"} - Get it in 3-5 business days
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="express" id="express" />
                                            <Label htmlFor="express">
                                                <div className="font-medium">Express Delivery</div>
                                                <div className="text-sm text-muted-foreground">NPR 500 - Get it in 1-2 business days</div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            {/* eSewa Payment Information */}
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="https://cdn.esewa.com.np/ui/images/logos/esewa-icon-large.png"
                                            alt="eSewa Logo"
                                            width={40}
                                            height={40}
                                            className="rounded-md"
                                        />
                                        <div>
                                            <p className="font-medium">Pay with eSewa</p>
                                            <p className="text-sm text-muted-foreground">
                                                You will be redirected to eSewa to complete your payment securely.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Place Order Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                onClick={() => {
                                    document.getElementById("payment-initiate-button")?.click()
                                }}
                            >
                                Place Order and Pay with eSewa
                            </Button>

                            <p className="text-sm text-center mt-4 text-muted-foreground">
                                By placing your order, you agree to our{" "}
                                <NavLink to="#" className="text-primary underline">
                                    Terms of Service
                                </NavLink>{" "}
                                and{" "}
                                <NavLink to="#" className="text-primary underline">
                                    Privacy Policy
                                </NavLink>
                                .
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

