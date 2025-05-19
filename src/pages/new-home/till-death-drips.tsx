"use client"

import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Facebook,
    Instagram,
    PinIcon as Pinterest,
    SnailIcon as Snapchat,
    TwitterIcon as TikTok,
    Twitter,
    Youtube,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import RoundedSlideButton from "./splash-button"

export default function TillDeathDripsHotBundle() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)

        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const handleNext = () => {
        if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1)
        }
    }

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    useEffect(() => {
        if (sliderRef.current && isMobile) {
            sliderRef.current.scrollTo({
                left: currentSlide * sliderRef.current.offsetWidth,
                behavior: "smooth",
            })
        }
    }, [currentSlide, isMobile])

    return (
        <div className="relative min-h-screen bg-white">

            <section className="relative">
                <div className="container mx-auto px-4 py-8">
                    <div className="md:grid md:grid-cols-3 md:gap-8">
                        {/* Left - Product Description */}
                        <div className="md:col-span-1 relative mb-8 md:mb-0 h-full">
                            <div className="relative w-full h-full md:sticky md:top-8">
                                <img
                                    src="https://flowersandsaints.com.au/cdn/shop/files/FNS_-_PYP_-_VOL_2_-Artboard_2_1.png?v=1746341933&width=1080"
                                    alt="Till Death Drips Hot Bundle"
                                    className="object-cover w-full h-full rounded-3xl"
                                    style={{ height: "100%", objectFit: "cover" }}
                                />

                                {/* Overlay Text */}
                                <div className="absolute top-0 left-0 p-8 text-white w-full h-full flex flex-col justify-center">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                            Till Death Drips
                                            <br />
                                            Hot Bundle
                                        </h1>
                                        <p className="font-medium mb-4">Bold by Design. Built to Last.</p>
                                    </div>

                                    <div className="space-y-4 overflow-hidden">
                                        <p>
                                            Unapologetically expressive, the <span className="italic">Till Death Drips Hot Bundle</span> is
                                            more than just utility—it's a ritual in motion. This limited duo features the{" "}
                                            <span className="italic">Eco Canvas Tote Bag</span> in Blood Oath and the{" "}
                                            <span className="italic">Signature Bottle</span> in Sacred Shadow.
                                        </p>
                                        <p>
                                            Whether you're on a quick city run or deep in creative flow, these everyday icons are engineered
                                            to turn heads and inspire presence.
                                        </p>
                                        <p>
                                            Lightweight. Durable. Fierce. Each piece drips with conviction—carrying not just your essentials,
                                            but your identity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            {/* Mobile Slider Navigation */}
                            {isMobile && (
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        onClick={handlePrev}
                                        className={cn(
                                            "p-2 rounded-full bg-gray-100",
                                            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200",
                                        )}
                                        disabled={currentSlide === 0}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <div className="text-sm">{currentSlide + 1} / 2</div>
                                    <button
                                        onClick={handleNext}
                                        className={cn(
                                            "p-2 rounded-full bg-gray-100",
                                            currentSlide === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200",
                                        )}
                                        disabled={currentSlide === 1}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Product Cards Container - Slidable on Mobile */}
                            <div
                                ref={sliderRef}
                                className="flex md:grid md:grid-cols-2 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                                {/* Center - Bottle Product */}
                                <div className="min-w-full md:min-w-0 snap-start rounded-3xl border border-gray-100 shadow-sm border-none">
                                    <div className="relative aspect-square mb-4">
                                        <img
                                            src="https://flowersandsaints.com.au/cdn/shop/files/SB8.jpg?v=1744542414&width=1080"
                                            alt="Till Death Drips Hot - Bottle"
                                            className="object-cover w-full h-full rounded-t-3xl"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">FLOWERS & SAINTS</div>
                                        <h2 className="font-medium mb-1 text-xl">Till Death Drips Hot - Bottle</h2>
                                        <div className="mb-4 font-light">Rs. 2,200.00</div>

                                        <div className="mb-4">
                                            <div className="font-medium mb-2">Color</div>
                                            <div className="relative">
                                                <select className="w-full border border-none p-4 bg-[#F5F5F5] pr-10 appearance-none rounded-2xl">
                                                    <option className="font-inter font-light text-xl">Sacred Shadow</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="font-medium mb-2">Volume</div>
                                            <div className="relative">
                                                <select className="w-full border border-none p-4 bg-[#F5F5F5] pr-10 appearance-none rounded-2xl">
                                                    <option className="font-inter font-light text-xl">500ml</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - Tote Bag Product */}
                                <div className="min-w-full md:min-w-0 snap-start rounded-3xl border border-gray-100 shadow-sm border-none">
                                    <div className="relative aspect-square mb-4">
                                        <img
                                            src="https://flowersandsaints.com.au/cdn/shop/files/SK1.jpg?v=1745136233&width=1080"
                                            alt="Till Death Drips Hot - Eco Canvas Tote Bag"
                                            className="object-cover w-full h-full rounded-t-3xl"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">FLOWERS & SAINTS</div>
                                        <h2 className="font-medium mb-1 text-xl">Till Death Drips Hot - Eco Canvas Tote Bag</h2>
                                        <div className="mb-4 font-light">Rs. 1,100.00</div>

                                        <div className="mb-4">
                                            <div className="font-medium mb-2">Color</div>
                                            <div className="relative">
                                                <select className="w-full border border-none p-4 bg-[#F5F5F5] pr-10 appearance-none rounded-2xl">
                                                    <option className="font-inter font-light text-xl">Blood Oath</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="font-medium mb-2">Bag/Case material</div>
                                            <div className="relative">
                                                <select className="w-full border border-none p-4 bg-[#F5F5F5] pr-10 appearance-none rounded-2xl">
                                                    <option className="font-inter font-light text-xl">Canvas</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="mt-8 w-full">
                                <RoundedSlideButton className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-semibold before:bg-white hover:text-black  transition-colors justify-center items-center text-md">Add to cart</RoundedSlideButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
