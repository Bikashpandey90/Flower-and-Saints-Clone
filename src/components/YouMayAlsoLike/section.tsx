"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { NavLink } from "react-router-dom"
import RoundedSlideButton from "../SplashButton/button"
import TextUnderline from "../textUnderline/text"
interface Product {
    id?: number
    title: string
    price: string
    images: string[]
    brand: { title: string }
    color: string[]
}

export default function YouMayAlsoLike({ products }: { products?: Product[] }) {
    const productsRef = useRef<HTMLDivElement>(null)
    const [isScrolling, setIsScrolling] = useState(false)

    if (products?.length === 0) {
        products = [
            {
                title: "You Grow Girl - Customized Bottle",
                price: "Rs. 2,800.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Girl8.jpg?v=1744528511&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#f5e6d8"],
            },
            {
                title: "Cats Doodle - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#1e3a8a"],
            },
            {
                title: "Owl Eyes On You - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/PO8.jpg?v=1744540529&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#000000"],
            },
            {
                title: "Cosmic Trip - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/PM2.jpg?v=1744535986&width=1080"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#ffc0cb"],
            },
            {
                title: "You Grow Girl - Customized Bottle",
                price: "Rs. 2,800.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Girl8.jpg?v=1744528511&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#f5e6d8"]
            },
            {
                title: "Cats Doodle - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#1e3a8a"],
            },
            {
                title: "Cosmic Trip - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/PM2.jpg?v=1744535986&width=1080"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#1e3a8a"],
            },
            {
                title: "You Grow Girl - Customized Bottle",
                price: "Rs. 2,800.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Girl8.jpg?v=1744528511&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#f5e6d8"],
            },
            {
                title: "Cats Doodle - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#1e3a8a"],
            },
            {
                title: "Owl Eyes On You - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/PO8.jpg?v=1744540529&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#000000"],
            },
            {
                title: "Cosmic Trip - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/PM2.jpg?v=1744535986&width=1080"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#ffc0cb"],
            },
            {
                title: "You Grow Girl - Customized Bottle",
                price: "Rs. 2,800.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Girl8.jpg?v=1744528511&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#f5e6d8"]
            },
            {
                title: "Cats Doodle - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=600"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#1e3a8a"],
            },
            {
                title: "Cosmic Trip - Bottle",
                price: "Rs. 2,200.00",
                images: ["https://flowersandsaints.com.au/cdn/shop/files/PM2.jpg?v=1744535986&width=1080"],
                brand: {
                    title: "FLOWERS & SAINTS",
                },
                color: ["#1e3a8a"],
            },

        ]
    }




    const smoothScrollTo = (element: HTMLElement, targetScrollLeft: number, duration = 800) => {
        const startScrollLeft = element.scrollLeft
        const distance = targetScrollLeft - startScrollLeft
        const startTime = performance.now()

        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        }

        const animateScroll = (currentTime: number) => {
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)
            const easedProgress = easeInOutCubic(progress)

            element.scrollLeft = startScrollLeft + distance * easedProgress

            if (progress < 1) {
                requestAnimationFrame(animateScroll)
            } else {
                setIsScrolling(false)
            }
        }

        setIsScrolling(true)
        requestAnimationFrame(animateScroll)
    }

    const prevSlide = () => {
        if (productsRef.current && !isScrolling) {
            const container = productsRef.current
            const containerWidth = container.clientWidth
            const scrollAmount = containerWidth * 0.8 // Scroll 80% of container width
            const targetScroll = Math.max(0, container.scrollLeft - scrollAmount)

            smoothScrollTo(container, targetScroll, 600)
        }
    }

    const nextSlide = () => {
        if (productsRef.current && !isScrolling) {
            const container = productsRef.current
            const containerWidth = container.clientWidth
            const scrollAmount = containerWidth * 0.8 // Scroll 80% of container width
            const maxScroll = container.scrollWidth - container.clientWidth
            const targetScroll = Math.min(maxScroll, container.scrollLeft + scrollAmount)

            smoothScrollTo(container, targetScroll, 600)
        }
    }

    // Add scroll position tracking for better UX
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScrollPosition = () => {
        if (productsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = productsRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
        }
    }

    // Add this useEffect to monitor scroll position
    useEffect(() => {
        const container = productsRef.current
        if (container) {
            checkScrollPosition()
            container.addEventListener("scroll", checkScrollPosition)
            return () => container.removeEventListener("scroll", checkScrollPosition)
        }
    }, [])

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault()
                prevSlide()
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                nextSlide()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isScrolling])
    return (
        <section className="my-20 mx-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 md:mb-8">

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter mb-6 md:mb-8">You may also like</h2>
                {/* Chevron Navigation - Hidden on Mobile */}
                <div className="hidden md:flex gap-2">
                    <RoundedSlideButton
                        disabled={isScrolling || !canScrollLeft}
                        onClick={prevSlide}
                        className={`
              rounded-full h-12 md:h-14 w-12 md:w-14 border-neutral-700 p-0
              transition-all duration-300 ease-out
              ${isScrolling || !canScrollLeft
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:text-white hover:scale-110 hover:shadow-lg active:scale-95"
                            }
            `}
                    >
                        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200" />
                    </RoundedSlideButton>
                    <RoundedSlideButton
                        disabled={isScrolling || !canScrollRight}
                        className={`
              rounded-full h-12 md:h-14 w-12 md:w-14 border-neutral-700 p-0
              transition-all duration-300 ease-out
              ${isScrolling || !canScrollRight
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:text-white hover:scale-110 hover:shadow-lg active:scale-95"
                            }
            `}
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200" />
                    </RoundedSlideButton>
                </div>


            </div>

            {/* Products Container - Responsive Layout */}
            <div className="relative">
                {/* Mobile: Horizontal Scroll */}
                <div
                    ref={productsRef}
                    className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {products?.map((product, index) => (
                        <div key={index} className="min-w-[280px] snap-start p-2">
                            <ProductCard
                                image={product.images[0]}
                                title={product.title}
                                price={product.price}
                                brand={product.brand?.title}
                                color={product.color}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: Grid Layout */}
                <div
                    ref={productsRef}
                    className="hidden md:flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth"
                    style={{
                        scrollBehavior: "smooth",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",

                    }}
                >
                    {products?.map((product, index) => (
                        <div key={index} className="flex-shrink-0 w-72 lg:w-80">
                            <ProductCard
                                image={product.images[0]}
                                title={product.title}
                                price={product.price}
                                brand={product.brand?.title}
                                color={product.color}
                            />
                        </div>
                    ))}
                </div>
            </div>



            <style >{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    )
}
interface ProductCardProps {
    image: string
    title: string
    price: string
    brand: string
    color: string[]
}

const ProductCard = ({ image, title, price, brand, color }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isHovered2, setIsHovered2] = useState(false)
    return (
        <div className="product-card rounded-2xl">
            <NavLink to={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                <div className="relative aspect-square overflow-hidden mb-4">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="object-cover h-full w-full rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)}><TextUnderline isNavLinkHovered={isHovered2} className={'bg-gray-500'}>{brand}</TextUnderline></div>
                <h3 className="font-medium font-inter text-2xl mb-1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><TextUnderline isNavLinkHovered={isHovered} >{title}</TextUnderline></h3>
                <div className="font-thin font-inter font-xl">{price}</div>
                <div className="flex mt-2 space-x-2">
                    {color.map((color, index) => (
                        <div key={index} className="color-swatch" style={{ backgroundColor: color }} />
                    ))}
                </div>
            </NavLink>
        </div>
    )
}

