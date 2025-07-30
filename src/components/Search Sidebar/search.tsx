"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Search, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import RoundedSlideButton from "../SplashButton/button"
import { menuSlide } from "@/lib/anim"
import { useIsMobile } from "@/hooks/use-mobile"
import DragCloseDrawer from "../Drawer/drawer"

type CategoryLink = {
    name: string
    href: string
}

type Product = {
    id: string
    name: string
    price: number
    image: string
}

export default function SearchSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [searchResults, setSearchResults] = useState<Product[]>([])

    const apparelLinks: CategoryLink[] = [
        { name: "Tees", href: "#" },
        { name: "Sweatshirts", href: "#" },
        { name: "Hoodies", href: "#" },
        { name: "Trackpants", href: "#" },
        { name: "Shorts", href: "#" },
    ]
    const accessoriesLinks: CategoryLink[] = [
        { name: "Drink Bottles", href: "#" },
        { name: "Tote Bags", href: "#" },
    ]
    const exclusiveLinks: CategoryLink[] = [
        { name: "The Art of Boundaries", href: "#" },
        { name: "Stay Humble", href: "#" },
    ]

    // Mock products data
    const products: Product[] = [
        {
            id: "1",
            name: "Stay Humble Tee - Halo White",
            price: 2200.0,
            image: "https://flowersandsaints.com.au/cdn/shop/files/White-Black.png?v=1745204398&width=540",
        },
        {
            id: "2",
            name: "Stay Humble Tee - Twilight Pulse",
            price: 2200.0,
            image: "https://flowersandsaints.com.au/cdn/shop/files/Cobalt-Back.png?v=1745203237&width=540",
        },
        {
            id: "3",
            name: "Stay Humble Tee - Saint's Flame",
            price: 2200.0,
            image: "https://flowersandsaints.com.au/cdn/shop/files/Cardinal-Back.png?v=1745202919&width=540",
        },
        {
            id: "4",
            name: "Stay Humble Tee - Divine Glow",
            price: 2200.0,
            image: "https://flowersandsaints.com.au/cdn/shop/files/Yellow-Back.png?v=1745204299&width=540",
        },
    ]

    // Search functionality
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setShowResults(false)
            setSearchResults([])
            return
        }
        const query = searchQuery.toLowerCase()
        const results = products.filter((product) => product.name.toLowerCase().includes(query))
        setSearchResults(results)
        setShowResults(true)
    }, [searchQuery])

    const clearSearch = () => {
        setSearchQuery("")
        setShowResults(false)
    }

    const isMobile = useIsMobile()

    const sidebarContent = (
        <>
            {/* Header */}
            <div className="sm:m-4 m mb-4 flex justify-between items-center sm:p-6 p border-b border-neutral-200">
                <h2 className="text-2xl font-semibold">Search</h2>
                <RoundedSlideButton
                    className={`${isMobile ? 'hidden' : ' '} border-none h-14 rounded-full cursor-pointer flex items-center justify-center hover:text-white p-2`}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 90 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <X size={24} />
                    </motion.div>
                </RoundedSlideButton>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Search Input Container */}
                <div className="flex items-center justify-between gap-4 py-3 px-4 bg-neutral-100 rounded-[18px]">
                    <div className="relative flex items-center flex-1">
                        <Search className="absolute left-0 text-neutral-500" size={20} />
                        <input
                            type="text"
                            className="w-full border-none outline-none text-base sm:py-2 pl-8 pr-0 bg-transparent placeholder:text-neutral-500"
                            placeholder="Search for ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchQuery && (
                        <button
                            className="bg-none border-none cursor-pointer text-sm text-neutral-600 py-1 px-2 hover:underline"
                            onClick={clearSearch}
                        >
                            Clear
                        </button>
                    )}
                </div>
                {/* Search Results or Categories */}
                {showResults ? (
                    <>
                        <div className="flex flex-col gap-6">
                            <h3 className="text-base text-neutral-500 tracking-wider">PRODUCTS</h3>
                            <div className="flex flex-col gap-6">
                                {searchResults.map((product) => (
                                    <div key={product.id} className="group flex gap-4 items-center cursor-pointer">
                                        <div className="w-[100px] h-[100px] rounded-[18px] overflow-hidden flex items-center justify-center">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-contain rounded-2xl"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-medium mb-1 group-hover:underline">{product.name}</h4>
                                            <p className="text-sm text-neutral-600">Rs. {product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <RoundedSlideButton className="sticky bottom-0 mx-auto text-xl flex items-center justify-center gap-2 z-10 p-4 bg-neutral-900 text-white hover:text-black before:bg-white border rounded-xl h-14 mt-4">
                            See all Results <ArrowRight size={24} />
                        </RoundedSlideButton>
                    </>
                ) : (
                    <div className="flex flex-col gap-8">
                        {/* Apparel Category */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-base text-neutral-500 tracking-wider">APPAREL</h3>
                            <ul className="list-none p-0 m-0 flex flex-col gap-1">
                                {apparelLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="no-underline text-black text-xl font-inter transition-colors duration-200 ease-in-out hover:text-neutral-600"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Accessories Category */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-base text-neutral-500 tracking-wider">ACCESSORIES</h3>
                            <ul className="list-none p-0 m-0 flex flex-col gap-1">
                                {accessoriesLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="no-underline text-black text-xl font-inter transition-colors duration-200 ease-in-out hover:text-neutral-600"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Exclusive Category */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-base text-neutral-500 tracking-wider">EXCLUSIVE</h3>
                            <ul className="list-none p-0 m-0 flex flex-col gap-1">
                                {exclusiveLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="no-underline text-black text-xl font-inter transition-colors duration-200 ease-in-out hover:text-neutral-600"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

    return (
        <AnimatePresence>
            {isMobile
                ? isOpen && (
                    <DragCloseDrawer open={isOpen} setOpen={(open) => { if (!open) onClose(); }}>
                        {sidebarContent}
                    </DragCloseDrawer>
                )
                : isOpen && (
                    <motion.div
                        className="fixed top-0 right-0 w-full md:w-[550px] h-screen bg-white z-[999] flex flex-col shadow-[-5px_0_15px_rgba(0,0,0,0.1)] rounded-bl-[48px] rounded-tl-[48px]"
                        variants={menuSlide}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                    >
                        {sidebarContent}
                    </motion.div>
                )}
        </AnimatePresence>
    )
}
