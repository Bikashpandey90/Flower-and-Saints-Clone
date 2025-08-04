"use client"

import { motion } from "framer-motion"
import { X, ShoppingBag, FileText, Truck, ChevronDown, ChevronUp } from "lucide-react"
import { useState, type Dispatch, type SetStateAction } from "react"
import { cn } from "@/lib/utils"
import RoundedSlideButton from "../SplashButton/button"
import DragCloseDrawer from "../Drawer/drawer"
import { useIsMobile } from "@/hooks/use-mobile"

// Framer Motion animation variants for desktop sidebar
const menuSlide = {
    initial: { x: "100%" },
    enter: { x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
}

type CartItem = {
    id: string
    name: string
    brand: string
    size: string
    price: number
    quantity: number
    image: string
}

// This component encapsulates the actual cart/recently viewed content
function CartContent({
    activeTab,
    setActiveTab,
    cartItems,
    updateQuantity,
    removeItem,
    subtotal,
    RecentlyViewedItems,
    onClose,
}: {
    activeTab: "cart" | "recent"
    setActiveTab: (tab: "cart" | "recent") => void
    cartItems: CartItem[]
    updateQuantity: (id: string, newQuantity: number) => void
    removeItem: (id: string) => void
    subtotal: number
    RecentlyViewedItems: CartItem[]
    onClose: () => void
}) {
    const isMobile = useIsMobile()
    return (
        <div className="h-full flex flex-col " >
            <div className="flex items-center justify-between border-b border-gray-200 ml-7 p-6 max-sm:ml-4 max-sm:p-2">
                <div className="flex gap-6 max-sm:gap-4" >
                    <button
                        className={cn(
                            "relative cursor-pointer border-none bg-transparent p-0 text-3xl font-semibold text-gray-300 max-sm:text-xl",
                            activeTab === "cart" && "text-black",
                        )}
                        onClick={() => setActiveTab("cart")}
                    >
                        Cart<sup className="ml-0.5 text-lg max-sm:text-base">{cartItems.length}</sup>
                    </button>
                    <button
                        className={cn(
                            "relative cursor-pointer border-none bg-transparent p-0 text-3xl font-semibold text-gray-300 max-sm:text-xl",
                            activeTab === "recent" && "text-black",
                        )}
                        onClick={() => setActiveTab("recent")}
                    >

                        Recently viewed
                    </button>
                </div>
                <RoundedSlideButton
                    className={`${isMobile ? 'hidden' : ' '} flex h-14 cursor-pointer items-center justify-center rounded-full border-none hover:text-white max-sm:h-10 max-sm:w-10`}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 90 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <X size={24} className="max-sm:size-5" />
                    </motion.div>
                </RoundedSlideButton>
            </div>
            {/* Main content area - now handles its own scrolling */}
            <div className="flex flex-1 flex-col gap-6 m-5 p-3 max-sm:m-2 max-sm:p-2 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                {activeTab === "cart" ? (
                    <>
                        <div className="py-2">
                            <p className="mb-2 max-sm:text-sm">You are eligible for free shipping.</p>
                            <div className="h-1 rounded-sm bg-gray-200 overflow-hidden">
                                <div className="h-full bg-black" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="relative flex gap-4 items-center max-sm:gap-2">
                                    <div className="h-[100px] w-[100px] flex-shrink-0 max-sm:h-[70px] max-sm:w-[70px]">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="h-full w-full rounded-2xl sm:p-2 p-0 object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-inter font-thin text-base  sm:mb-1 truncate max-sm:text-xs">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 sm:mb-1 truncate max-sm:text-[10px]">{item.brand}</p>
                                        <p className="text-sm text-gray-600 sm:mb-1 truncate max-sm:text-[10px]">{item.size}</p>
                                        <p className="font-inter font-thin  max-sm:text-xs">Rs. {item.price.toLocaleString()}</p>
                                    </div>
                                    {/* Added flex-shrink-0 here */}
                                    <div className="flex flex-col items-end justify-between max-sm:gap-1 flex-shrink-0">
                                        <div className="flex flex-row items-center justify-between p-2 font-inter font-thin max-sm:p-0">
                                            <div>
                                                <span className="max-sm:text-xs">{item.quantity}</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    aria-label="Decrease quantity"
                                                    className="flex h-7 w-7 cursor-pointer items-center justify-center border-none bg-transparent max-sm:h-5 max-sm:w-5"
                                                >
                                                    <ChevronUp size={16} className="max-sm:size-3" />
                                                </button>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label="Increase quantity"
                                                    className="flex h-7 w-7 cursor-pointer items-center justify-center border-none bg-transparent max-sm:h-5 max-sm:w-5"
                                                >
                                                    <ChevronDown size={16} className="max-sm:size-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="cursor-pointer border-none bg-transparent p-0 text-sm text-gray-600 hover:underline max-sm:text-xs"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 max-sm:gap-2">
                            <button className="flex flex-1 items-center justify-center gap-2 rounded border-t border-gray-200 bg-transparent p-3 cursor-pointer hover:bg-gray-50 max-sm:p-2 max-sm:text-sm">
                                <FileText size={20} className="max-sm:size-4" />
                                <span>Order note</span>
                            </button>
                            <button className="flex flex-1 items-center justify-center gap-2 rounded border-t border-gray-200 bg-transparent p-3 cursor-pointer hover:bg-gray-50 max-sm:p-2 max-sm:text-sm">
                                <Truck size={20} className="max-sm:size-4" />
                                <span>Shipping</span>
                            </button>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex w-full justify-between">
                                <span className="font-inter font-thin text-[1rem] max-sm:text-xs">
                                    Taxes and{" "}
                                    <a href="#" className="text-black underline">
                                        shipping
                                    </a>{" "}
                                    calculated at checkout
                                </span>
                            </div>
                            <div className="flex w-full flex-col items-end justify-between">
                                <span className="font-medium max-sm:text-sm">Subtotal</span>
                                <span className="text-xl font-semibold max-sm:text-base">Rs. {subtotal.toLocaleString()}.00</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-row justify-between gap-4 px-4 max-sm:px-0 max-sm:gap-2">
                            <RoundedSlideButton className="h-14 w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 p-4 text-white hover:text-neutral-900 before:bg-white font-medium cursor-pointer max-sm:h-10 max-sm:p-2 max-sm:text-sm">
                                <ShoppingBag size={20} className="max-sm:size-4" />
                                <span>Check out</span>
                            </RoundedSlideButton>
                            <RoundedSlideButton className="h-14 w-full items-center justify-center gap-2 rounded-2xl p-4 hover:border-none hover:text-white bg-white text-black border border-gray-300 text-center font-medium cursor-pointer max-sm:h-10 max-sm:p-2 max-sm:text-sm">
                                View cart
                            </RoundedSlideButton>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-start">
                        {RecentlyViewedItems.length > 0 ? (
                            <div className="flex flex-col gap-5 w-full ">
                                {RecentlyViewedItems.map((item) => (
                                    <div key={item.id} className="relative flex gap-4 items-center max-sm:gap-2">
                                        <div className="h-[100px] w-[100px] flex-shrink-0 max-sm:h-[80px] max-sm:w-[80px]">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="h-full w-full rounded-xl sm:rounded-2xl sm:p-2 object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-inter font-thin text-base  sm:mb-1 truncate max-sm:text-xs">
                                                {item.name.split(" ").map((word, idx, arr) => (
                                                    <>
                                                        {word}
                                                        {(idx + 1) % 3 === 0 && idx !== arr.length - 1 ? <br /> : " "}
                                                    </>
                                                ))}
                                                {/* Saintly Rose Signature */}
                                            </h3>
                                            <p className="text-sm text-gray-600 sm:mb-1 truncate max-sm:text-[10px]">{item.brand}</p>
                                            <p className="text-sm text-gray-600 sm:mb-1 truncate max-sm:text-[10px]">{item.size}</p>
                                            <p className="font-inter font-thin  max-sm:text-xs">
                                                Rs. {item.price.toLocaleString()}
                                            </p>
                                        </div>
                                        {/* Added flex-shrink-0 here */}
                                        <div className="flex items-center justify-center flex-shrink-0">
                                            <div className="flex flex-row items-center justify-center p-2 font-inter font-thin">
                                                <div className="flex flex-col items-center justify-center">
                                                    <RoundedSlideButton className="flex h-8  items-center justify-center rounded-lg sm:rounded-xl bg-neutral-900 font-thin text-white hover:text-neutral-900 before:bg-white max-sm:h-7 text-xl max-sm:text-xs">
                                                        {isMobile ? "+" : "+ Add"}
                                                    </RoundedSlideButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="self-center text-sm text-gray-600 max-sm:text-xs">No recently viewed items</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function CartSidebar({
    isOpen,
    onClose,
    setIsOpen,
}: {
    isOpen: boolean
    onClose: () => void
    setIsOpen: Function
}) {
    const isMobile = useIsMobile()
    const [activeTab, setActiveTab] = useState<"cart" | "recent">("cart")
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "Stay Humble Relax Crew - Covenant Clay",
            brand: "Covenant Clay",
            size: "2XL",
            price: 4500.0,
            quantity: 1,
            image: "https://flowersandsaints.com.au/cdn/shop/files/Clay-Black.png?v=1746355905&width=540",
        },
        {
            id: "2",
            name: "Meow Mode - Bottle",
            brand: "Saintly Rose",
            size: "500ml",
            price: 2200.0,
            quantity: 1,
            image: "https://flowersandsaints.com.au/cdn/shop/files/CFP8.jpg?v=1744533406&width=540",
        },
    ])
    const [RecentlyViewedItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "Stay Humble Relax Crew",
            brand: "Covenant Clay",
            size: "2XL",
            price: 4500.0,
            quantity: 1,
            image: "https://flowersandsaints.com.au/cdn/shop/files/Clay-Black.png?v=1746355905&width=540",
        },
        {
            id: "2",
            name: "Meow Mode - Bottle",
            brand: "Saintly Rose",
            size: "500ml",
            price: 2200.0,
            quantity: 1,
            image: "https://flowersandsaints.com.au/cdn/shop/files/CFP8.jpg?v=1744533406&width=540",
        },
    ])

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (!isOpen) return null

    const cartContentProps = {
        activeTab,
        setActiveTab,
        cartItems,
        updateQuantity,
        removeItem,
        subtotal,
        RecentlyViewedItems,
        onClose,
    }

    return (
        <>
            {isMobile ? (
                <DragCloseDrawer open={isOpen} setOpen={setIsOpen as Dispatch<SetStateAction<boolean>>}>
                    <CartContent {...cartContentProps} />
                </DragCloseDrawer>
            ) : (
                <>
                    {/* Overlay for desktop */}
                    <div className="fixed inset-0 h-full w-full bg-black/50 z-[998]" onClick={onClose} />
                    <motion.div
                        className="fixed top-0 right-0 flex h-screen w-full max-w-[550px] flex-col overflow-hidden rounded-bl-[48px] rounded-tl-[48px] bg-white shadow-lg z-[999] md:max-w-[450px] lg:max-w-[550px]"
                        variants={menuSlide}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                    >
                        <CartContent {...cartContentProps} />
                    </motion.div>
                </>
            )}
        </>
    )
}
