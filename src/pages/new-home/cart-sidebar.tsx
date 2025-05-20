"use client"

import { motion } from "framer-motion"
import { X, ShoppingBag, FileText, Truck, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import styles from "./cart.module.scss"

type CartItem = {
    id: string
    name: string
    brand: string
    size: string
    price: number
    quantity: number
    image: string
}

const sidebarSlide = {
    
    initial: {
        x: "100%"
    },
    enter: {
        x: '0 %',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        x: "100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }


    }
}

export default function CartSidebar({
    isOpen,
    onClose,
    setIsOpen
}: {
    isOpen: boolean
    onClose: () => void
    setIsOpen: Function
}) {
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

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (!isOpen) return null

    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <motion.div className={styles.sidebar} variants={sidebarSlide} initial="initial" animate="enter" exit="exit">
                <div className={styles.header}>
                    <div className={styles.tabs}>
                        <button
                            className={cn(styles.tab, activeTab === "cart" && styles.active)}
                            onClick={() => setActiveTab("cart")}
                        >
                            Cart<sup>{cartItems.length}</sup>
                        </button>
                        <button
                            className={cn(styles.tab, activeTab === "recent" && styles.active)}
                            onClick={() => setActiveTab("recent")}
                        >
                            Recently viewed
                        </button>
                    </div>
                    <button className={styles.closeButton} onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === "cart" ? (
                        <>
                            <div className={styles.freeShipping}>
                                <p>You are eligible for free shipping.</p>
                                <div className={styles.progressBar}>
                                    <div className={styles.progress} style={{ width: "100%" }} />
                                </div>
                            </div>

                            <div className={styles.cartItems}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <div className={styles.itemImage}>
                                            <img src={item.image || "/placeholder.svg"} alt={item.name} className="rounded-2xl" />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h3>{item.name}</h3>
                                            <p className={styles.brand}>{item.brand}</p>
                                            <p className={styles.size}>{item.size}</p>
                                            <p className={styles.price}>Rs. {item.price.toLocaleString()}</p>
                                        </div>
                                        <div className={styles.itemActions}>
                                            <div className={styles.quantityControl}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button className={styles.removeButton} onClick={() => removeItem(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.cartActions}>
                                <button className={styles.actionButton}>
                                    <FileText size={20} />
                                    <span>Order note</span>
                                </button>
                                <button className={styles.actionButton}>
                                    <Truck size={20} />
                                    <span>Shipping</span>
                                </button>
                            </div>

                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span>
                                        Taxes and{" "}
                                        <a href="#" className={styles.link}>
                                            shipping
                                        </a>{" "}
                                        calculated at checkout
                                    </span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span className={styles.subtotalLabel}>Subtotal</span>
                                    <span className={styles.subtotalValue}>Rs. {subtotal.toLocaleString()}.00</span>
                                </div>
                            </div>

                            <div className={styles.checkoutActions}>
                                <button className={styles.checkoutButton}>
                                    <ShoppingBag size={20} />
                                    <span>Check out</span>
                                </button>
                                <button className={styles.viewCartButton}>View cart</button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.recentlyViewed}>
                            <p className={styles.emptyMessage}>No recently viewed items</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    )
}
