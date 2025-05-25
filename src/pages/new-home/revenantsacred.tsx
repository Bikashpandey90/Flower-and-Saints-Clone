"use client"

import { useEffect, useRef, useState } from "react"
import { Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function RevenantSacred() {
    const isMobile = useIsMobile()
    const [activeSlide, setActiveSlide] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    const products = [
        {
            id: 1,
            name: "Revenant Relax Crew - Sacred Sand",
            price: "Rs. 4,500.00",
            image: "https://flowersandsaints.com.au/cdn/shop/files/Back.png?v=1746357846&width=1080",
            color: "Sacred Sand",
            defaultSize: "XS",
            sizes: ["XS", "S", "M"],
        },
        {
            id: 2,
            name: "Revenant Relax Hood - Sacred Sand",
            price: "Rs. 5,000.00",
            image:
                "https://flowersandsaints.com.au/cdn/shop/files/Back_30b943c3-4eef-481f-82f3-8c34e0902bcc.png?v=1746358515&width=1080",
            color: "Sacred Sand",
            defaultSize: "XS",
            sizes: ["XS", "S", "M"],
        },
        {
            id: 3,
            name: "Flowers & Saints Relax Cuffless Track Pants - Sacred Sand",
            price: "Rs. 4,500.00",
            image:
                "https://flowersandsaints.com.au/cdn/shop/files/Bone-Front_c545d735-1ed2-433f-aab5-b1ac2e61b1f0.png?v=1746354045&width=1080",
            color: "Sacred Sand",
            defaultSize: "S",
            sizes: ["S", "M", "L"],
        },
    ]

    // const nextSlide = () => {
    //     setActiveSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1))
    // }

    // const prevSlide = () => {
    //     setActiveSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1))
    // }

    useEffect(() => {
        if (sliderRef.current && isMobile) {
            sliderRef.current.scrollTo({
                left: activeSlide * sliderRef.current.offsetWidth,
                behavior: "smooth",
            })
        }
    }, [activeSlide, isMobile])

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider || !isMobile) return

        let startX: number
        let scrollLeft: number

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (!startX) return
            const x = e.touches[0].pageX - slider.offsetLeft
            const walk = (x - startX) * 2
            slider.scrollLeft = scrollLeft - walk
        }

        const handleTouchEnd = () => {
            startX = 0

            // Snap to closest slide after touch end
            const itemWidth = slider.offsetWidth
            const scrollPosition = slider.scrollLeft
            const targetIndex = Math.round(scrollPosition / itemWidth)

            setActiveSlide(targetIndex)
            slider.scrollTo({
                left: targetIndex * itemWidth,
                behavior: "smooth",
            })
        }

        slider.addEventListener("touchstart", handleTouchStart)
        slider.addEventListener("touchmove", handleTouchMove)
        slider.addEventListener("touchend", handleTouchEnd)

        return () => {
            slider.removeEventListener("touchstart", handleTouchStart)
            slider.removeEventListener("touchmove", handleTouchMove)
            slider.removeEventListener("touchend", handleTouchEnd)
        }
    }, [isMobile, setActiveSlide])

    return (
        <section className="revenant-sacred-section relative w-full overflow-hidden" style={{ isolation: "isolate" }}>
            {/* Background Image */}
            <div className={` revenant-sacred-bg absolute inset-0 w-full h-full z-0`}>
                <img
                    src="https://flowersandsaints.com.au/cdn/shop/files/banner-about-us.jpg?v=1745029928&width=2000"
                    alt="Background"
                    className={`w-full h-full object-cover scale-150`}
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Desktop Layout */}
            <div className={`${isMobile ? "hidden" : "block"} relative z-10 py-16 px-4`}>
                {/* Content Container */}
                <div className=" mx-8">
                    {/* Two Column Layout */}
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Left Column - Text */}
                        <div className="w-full lg:w-1/3 ">
                            <div className="text-white max-w-xl justify-center">
                                <h2 className="text-3xl   lg:text-4xl xl:text-5xl font-bold mb-4">Revenant Sacred Sand Set</h2>
                                <p className="text-xl font-medium mb-2">Effortlessly United. Perfectly Expressive.</p>
                                <p className="text-base mb-6">
                                    Embrace the essence of calm rebellion with the
                                    <span className="italic"> Revenant Sacred Sand Bundle</span>—a head-to-toe statement built for those
                                    who live at the intersection of art and attitude. Crafted with precision and purpose, this trio brings
                                    together the Relax Crew, Relax Hood, and Cuffless Track Pants in our exclusive Sacred Sand colorway.
                                    Every piece is soft yet structured, loud yet minimal, iconic yet unmistakably you.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Product Cards and Add to Cart Button */}
                        <div className="w-full lg:w-2/3">
                            {/* Product Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white pb-10 p-2 pt-4 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border w-full"
                                    >
                                        <div className="relative pt-4 px-4 pb-2">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-auto object-contain"
                                            />

                                        </div>

                                        <div className="p-4">
                                            <div className="uppercase text-base text-gray-500 mb-1">FLOWERS & SAINTS</div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-lg font-inter font-medium ">{product.name}</h3>
                                                <span className="text-sm font-inter whitespace-nowrap">{product.price}</span>
                                            </div>

                                            <div className="mb-4 m-2">
                                                <div className="mb-2 text-sm">Color: {product.color}</div>
                                                <div className="h-8 w-8 rounded-full bg-[#f0e6d2] border border-gray-300"></div>
                                            </div>

                                            <div className="m-2">
                                                <div className="mb-2 text-sm">Size: {product.defaultSize}</div>
                                                <div className="flex gap-2">
                                                    {product.sizes.map((size) => (
                                                        <button
                                                            key={size}
                                                            className={`h-12 w-12 border rounded-xl ${size === product.defaultSize
                                                                ? "border-black border-[2px]"
                                                                : size === "S" && product.id === 1
                                                                    ? "border-gray-300 bg-gray-100 text-gray-400"
                                                                    : "border-gray-300"
                                                                } flex items-center justify-center text-sm`}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add to Cart Button - Same width as product cards */}
                            <div className="w-full mt-8">
                                <button className="w-full py-4 bg-transparent text-white backdrop-blur-lg border border-white font-inter rounded-2xl text-center font-medium">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className={`${isMobile ? "block" : "hidden"} relative z-10 py-12 px-4`}>
                {/* Mobile Content */}
                <div className="max-w-md mx-auto">
                    {/* Mobile Hero */}
                    {/* <div className="mb-8">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-2">Revenant Sacred Sand Set</h2>
                            <p className="text-lg font-medium mb-4">Effortlessly United. Perfectly Expressive.</p>
                            <p className="text-sm mb-6">
                                Embrace the essence of calm rebellion with the
                                <span className="italic"> Revenant Sacred Sand Bundle</span>—a head-to-toe statement built for those who
                                live at the intersection of art and attitude. Crafted with precision and purpose, this trio brings
                                together the Relax Crew, Relax Hood, and Cuffless Track Pants in our exclusive Sacred Sand colorway.
                            </p>
                        </div>
                    </div> */}

                    {/* Mobile Product Slider */}
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-white">Products</h3>
                            {/* <div className="flex items-center space-x-2">
                                <button
                                    onClick={prevSlide}
                                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div> */}
                        </div>

                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto snap-x snap-mandatory touch-pan-x"
                            style={{
                                scrollBehavior: "smooth",
                                WebkitOverflowScrolling: "touch",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {/* <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style> */}

                            {products.map((product, index) => (
                                <div key={index} className="min-w-full w-full flex-shrink-0 snap-center pr-4">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border">
                                        <div className="relative pt-4 px-4 pb-2">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-auto object-contain"
                                            />
                                            <button className="absolute top-4 right-4 p-1 bg-white/80 rounded-full">
                                                <Plus className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="p-4">
                                            <div className="uppercase text-xs text-gray-500 mb-1">FLOWERS & SAINTS</div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-sm font-medium">{product.name}</h3>
                                                <span className="text-sm">{product.price}</span>
                                            </div>

                                            <div className="mb-4">
                                                <div className="mb-2 text-sm">Color: {product.color}</div>
                                                <div className="h-8 w-8 rounded-full bg-[#f0e6d2] border border-gray-300"></div>
                                            </div>

                                            <div>
                                                <div className="mb-2 text-sm">Size: {product.defaultSize}</div>
                                                <div className="flex gap-2">
                                                    {product.sizes.map((size) => (
                                                        <button
                                                            key={size}
                                                            className={`h-10 w-10 border ${size === product.defaultSize
                                                                ? "border-black"
                                                                : size === "S" && product.id === 1
                                                                    ? "border-gray-300 bg-gray-100 text-gray-400"
                                                                    : "border-gray-300"
                                                                } flex items-center justify-center text-sm`}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center space-x-2 mt-4">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`h-2 w-2 rounded-full ${activeSlide === index ? "bg-white" : "bg-white/50"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-6">
                            <button className="w-full py-4 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg text-center font-medium">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
