"use client"

import { motion } from "framer-motion"
import { X, Search, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import styles from "./search.module.scss"

const sidebarSlide = {
    initial: {
        x: "100%",
    },
    enter: {
        x: "0%",
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
        x: "100%",
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
}

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

export default function SearchSidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
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
            image: "https://flowersandsaints.com.au/cdn/shop/files/White-Black.png?v=1745204398&width=540"
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
        const results = products.filter(
            (product) => product.name.toLowerCase().includes(query),
        )

        setSearchResults(results)
        setShowResults(true)
    }, [searchQuery])

    const clearSearch = () => {
        setSearchQuery("")
        setShowResults(false)
    }

    if (!isOpen) return null

    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <motion.div className={styles.sidebar} variants={sidebarSlide} initial="initial" animate="enter" exit="exit">
                <div className={styles.header}>
                    <h2 className={styles.title}>Search</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchInputWrapper}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search for ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {searchQuery && (
                            <button className={styles.clearButton} onClick={clearSearch}>
                                Clear
                            </button>
                        )}
                    </div>

                    {showResults ? (
                        <div className={styles.searchResults}>
                            <h3 className={styles.resultsTitle}>PRODUCTS</h3>
                            <div className={styles.productList}>
                                {searchResults.map((product) => (
                                    <div key={product.id} className={styles.productItem}>
                                        <div
                                            className={styles.productImage}
                                        //   style={{
                                        //     backgroundColor:
                                        //       product.color === "white"
                                        //         ? "#f5f5f5"
                                        //         : product.color === "navy"
                                        //           ? "#1a2456"
                                        //           : product.color === "burgundy"
                                        //             ? "#800020"
                                        //             : product.color === "yellow"
                                        //               ? "#ffc107"
                                        //               : "#ccc",
                                        //   }}
                                        >
                                            <img src={product.image || "/placeholder.svg"} alt={product.name} className="rounded-2xl" />
                                        </div>
                                        <div className={styles.productDetails}>
                                            <h4 className={styles.productName}>{product.name}</h4>
                                            <p className={styles.productPrice}>Rs. {product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.seeAllButton}>
                                See all results <ArrowRight size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <h3 className={styles.categoryTitle}>APPAREL</h3>
                                <ul className={styles.categoryLinks}>
                                    {apparelLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.category}>
                                <h3 className={styles.categoryTitle}>ACCESSORIES</h3>
                                <ul className={styles.categoryLinks}>
                                    {accessoriesLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.category}>
                                <h3 className={styles.categoryTitle}>EXCLUSIVE</h3>
                                <ul className={styles.categoryLinks}>
                                    {exclusiveLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    )
}
