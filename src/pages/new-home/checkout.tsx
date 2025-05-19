"use client"

import { useState } from "react"
import { X, ChevronUp, ChevronDown, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export function ShoppingCart() {
    const [activeTab, setActiveTab] = useState("cart")
    const [quantity, setQuantity] = useState(1)

    const incrementQuantity = () => setQuantity((prev) => prev + 1)
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

    const cartItem = {
        name: "Premium T-Shirt",
        subtitle: "Black / Cotton",
        size: "Medium",
        price: 4500,
        image: "/placeholder.svg?height=80&width=80",
    }

    return (
        <div className="relative w-full  h-full bg-white shadow-lg flex flex-col rounded-l-3xl sm:rounded-l-[48px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-3 sm:p-4">
                <div className="flex space-x-3 sm:space-x-6 text-base sm:text-xl font-medium">
                    <button
                        className={cn("pb-2 relative", activeTab === "cart" ? "text-black" : "text-gray-400")}
                        onClick={() => setActiveTab("cart")}
                    >
                        Cart<sup className="text-xs ml-0.5">1</sup>
                        {activeTab === "cart" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                    </button>
                    <button
                        className={cn("pb-2 relative", activeTab === "recently" ? "text-black" : "text-gray-400")}
                        onClick={() => setActiveTab("recently")}
                    >
                        <span className="hidden xs:inline">Recently viewed</span>
                        <span className="xs:hidden">Recent</span>
                        {activeTab === "recently" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                    </button>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                    <X size={20} className="sm:h-6 sm:w-6" />
                </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
                {/* Free Shipping Notice */}
                <div className="mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base mb-2">You are eligible for free shipping.</p>
                    <div className="w-full h-1 bg-black rounded-full" />
                </div>

                {/* Cart Item */}
                <div className="flex gap-3 sm:gap-4 py-3 sm:py-4 border-b">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                            src={cartItem.image || "/placeholder.svg"}
                            alt={cartItem.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                            <div>
                                <h3 className="font-medium text-sm sm:text-base">{cartItem.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{cartItem.subtitle}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{cartItem.size}</p>
                                <p className="font-medium mt-1 text-sm sm:text-base">Rs. {cartItem.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between sm:flex-col sm:items-center mt-1 sm:mt-0">
                                <div className="flex border rounded h-8 sm:h-auto">
                                    <button onClick={incrementQuantity} className="px-1.5 sm:p-1 hover:bg-gray-100">
                                        <ChevronUp size={14} className="sm:h-4 sm:w-4" />
                                    </button>
                                    <div className="px-2 sm:px-3 py-1 text-center text-sm min-w-[24px] sm:min-w-[32px] flex items-center justify-center">
                                        {quantity}
                                    </div>
                                    <button onClick={decrementQuantity} className="px-1.5 sm:p-1 hover:bg-gray-100">
                                        <ChevronDown size={14} className="sm:h-4 sm:w-4" />
                                    </button>
                                </div>
                                <button className="text-xs sm:text-sm text-gray-600 ml-2 sm:ml-0 sm:mt-2 hover:underline">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Actions */}
            <div className="p-3 sm:p-4 md:p-6 border-t">
                <div className="flex justify-between mb-3 sm:mb-4 gap-2">
                    <button className="flex items-center gap-1 sm:gap-2 text-gray-700 border rounded-md px-2 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 text-xs sm:text-sm">
                        <span className="text-base sm:text-lg">📝</span>
                        <span>Order note</span>
                    </button>
                    <button className="flex items-center gap-1 sm:gap-2 text-gray-700 border rounded-md px-2 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 text-xs sm:text-sm">
                        <span className="text-base sm:text-lg">🚚</span>
                        <span>Shipping</span>
                    </button>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-700">
                            Taxes and <span className="underline">shipping</span> calculated
                        </p>
                        <p className="text-xs sm:text-sm text-gray-700">at checkout</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs sm:text-sm text-gray-700">Subtotal</p>
                        <p className="text-base sm:text-xl font-medium">Rs. 4,500.00</p>
                    </div>
                </div>

                {/* Checkout Buttons */}
                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                    <button className="w-full bg-black text-white py-2.5 sm:py-3 rounded-md font-medium flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-800 text-sm sm:text-base">
                        <ShoppingBag size={16} className="sm:h-5 sm:w-5" />
                        Check out
                    </button>
                    <button className="w-full border border-black py-2.5 sm:py-3 rounded-md font-medium hover:bg-gray-50 text-sm sm:text-base">
                        View cart
                    </button>
                </div>
            </div>
        </div>
    )
}
