
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import RoundedSlideButton from "../SplashButton/button"
import { NavLink } from "react-router-dom"
import TextUnderline from "../textUnderline/text"




export default function BestSellers() {
    const [activeCategory, setActiveCategory] = useState("Drink Bottles")
    const productsRef = useRef<HTMLDivElement>(null)
    // const [isScrolling, setIsScrolling] = useState(false)

    const products = [
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/Cat6.jpg?v=1744444109&width=1080",
            title: "Cats Doodle - Bottle",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#f5e6d8"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/PM8.jpg?v=1744535986&width=600",
            title: "Cosmic Trip - Bottle",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#1e3a8a"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/FNS8.jpg?v=1744530624&width=600",
            title: "Flowers & Saints Signature Bottle - Stealth Edition",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#000000"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/CFP8.jpg?v=1744533406&width=600",
            title: "Meow Mode - Bottle",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#ffc0cb"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/Cat6.jpg?v=1744444109&width=1080",
            title: "Cats Doodle - Bottle",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#f5e6d8"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/PM8.jpg?v=1744535986&width=600",
            title: "Cosmic Trip - Bottle",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#1e3a8a"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/FNS8.jpg?v=1744530624&width=600",
            title: "Flowers & Saints Signature Bottle - Stealth Edition",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#000000"],
        },
        {
            image: "https://flowersandsaints.com.au/cdn/shop/files/CFP8.jpg?v=1744533406&width=600",
            title: "Meow Mode - Bottle",
            price: "Rs. 2,200.00",
            brand: "FLOWERS & SAINTS",
            colors: ["#ffc0cb"],
        },
        // Add more products as needed
    ];

    const categories = ["Drink Bottles", "Essential Tees", "Tote Bags"]

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

            }
        }

        requestAnimationFrame(animateScroll)
    }

    const prevSlide = () => {
        if (productsRef.current) {
            const container = productsRef.current
            const containerWidth = container.clientWidth
            const scrollAmount = containerWidth * 0.8 // Scroll 80% of container width
            const targetScroll = Math.max(0, container.scrollLeft - scrollAmount)

            smoothScrollTo(container, targetScroll, 600)
        }
    }

    const nextSlide = () => {
        if (productsRef.current) {
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
    }, [])

    return (
        <section className="pt-8 pb-0 md:py-16 px-4 md:px-16">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-inter mb-6 md:mb-8">Best Sellers</h2>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
                {/* Category Buttons - Responsive */}
                <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {categories.map((category) => (
                        <RoundedSlideButton
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                rounded-2xl hover:text-white border-neutral-500 text-sm md:text-lg 
                py-2 md:py-3 px-4 md:px-6 font-inter whitespace-nowrap flex-shrink-0 mx-2
                ${activeCategory === category ? "bg-neutral-900 text-white" : "bg-transparent text-neutral-900"}
              `}
                        >
                            {category}
                        </RoundedSlideButton>
                    ))}
                </div>

                {/* Chevron Navigation - Hidden on Mobile */}
                <div className="hidden md:flex gap-2">
                    <RoundedSlideButton
                        disabled={!canScrollLeft}
                        onClick={prevSlide}
                        className={`
              rounded-full h-12 md:h-14 w-12 md:w-14 border-neutral-700 p-0
              transition-all duration-300 ease-out
              ${!canScrollLeft
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:text-white hover:scale-110 hover:shadow-lg active:scale-95"
                            }
            `}
                    >
                        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200" />
                    </RoundedSlideButton>
                    <RoundedSlideButton
                        disabled={!canScrollRight}
                        className={`
              rounded-full h-12 md:h-14 w-12 md:w-14 border-neutral-700 p-0
              transition-all duration-300 ease-out
              ${!canScrollRight
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
                    {products.map((product, index) => (
                        <div key={index} className="min-w-[280px] snap-start p-2">
                            <ProductCard
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                brand={product.brand}
                                colors={product.colors}
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
                    {products.map((product, index) => (
                        <div key={index} className="flex-shrink-0 w-72 lg:w-80">
                            <ProductCard
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                brand={product.brand}
                                colors={product.colors}
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
    colors?: string[]
}

const ProductCard = ({ image, title, price, brand, colors }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isNavLinkHovered, setIsNavLinkHovered] = useState(false)
    console.log(colors)
    return (
        <div className="product-card rounded-2xl">
            <NavLink to={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                <div className="relative aspect-square overflow-hidden mb-4">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1" onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}><TextUnderline isNavLinkHovered={isHovered}>{brand}</TextUnderline></div>
                <h3 className="font-medium font-inter text-2xl mb-1" onMouseEnter={() => { setIsNavLinkHovered(true) }} onMouseLeave={() => { setIsNavLinkHovered(false) }}>
                    <TextUnderline isNavLinkHovered={isNavLinkHovered} >{title}</TextUnderline>
                </h3>
                <div className="font-thin font-inter font-xl">{price}</div>
                <div className="flex mt-2 space-x-2">
                    {/* {colors.map((color, index) => (
                        <div key={index} className="color-swatch" style={{ backgroundColor: color }} />
                    ))} */}
                </div>
            </NavLink>
        </div>
    )
}
