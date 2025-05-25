"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Send, MessageSquare } from "lucide-react"
import ProductDescription from "./product-description"
import HurryUpSection from "./hurry-up-section"
import YouMayAlsoLike from "./you-may-also-like"
import MagnetButton from "./magnet-button"
import RoundedSlideButton from "./splash-button"

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)
    const [imagesScrolled, setImagesScrolled] = useState(false)
    const [mainImageHeight, setMainImageHeight] = useState(0)
    console.log(mainImageHeight)

    // Refs
    const containerRef = useRef<HTMLDivElement>(null)
    const sideImagesRef = useRef<HTMLDivElement>(null)
    const sideImagesContainerRef = useRef<HTMLDivElement>(null)
    const lastImageRef = useRef<HTMLDivElement>(null)
    const mainImageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const spacerRef = useRef<HTMLDivElement>(null)

    // Images for the product
    const productImages = [
        "https://flowersandsaints.com.au/cdn/shop/files/FNS1.jpg?v=1744530624&width=600",
        "https://flowersandsaints.com.au/cdn/shop/files/FNS2.jpg?v=1744530624&width=600",
        "https://flowersandsaints.com.au/cdn/shop/files/FNS3.jpg?v=1744530624&width=600",
        "https://flowersandsaints.com.au/cdn/shop/files/FNS4.jpg?v=1744530624&width=600",
        "https://flowersandsaints.com.au/cdn/shop/files/FNS5.jpg?v=1744530624&width=600",
        "https://flowersandsaints.com.au/cdn/shop/files/FNS6.jpg?v=1744530624&width=600",
        "https://flowersandsaints.com.au/cdn/shop/files/FNS7.jpg?v=1744530624&width=600",
    ]

    // Measure main image height and adjust spacer
    useEffect(() => {
        if (mainImageRef.current) {
            const updateHeight = () => {
                const height = mainImageRef.current?.offsetHeight || 0
                setMainImageHeight(height)

                // Calculate total height of side images
                if (sideImagesContainerRef.current) {
                    const sideImagesHeight = sideImagesContainerRef.current.offsetHeight - (spacerRef.current?.offsetHeight || 0)

                    // Calculate how much spacer we need
                    // We want the last image to be at the bottom of the main image when scrolled
                    const spacerHeight = Math.max(0, height - sideImagesHeight)

                    if (spacerRef.current) {
                        spacerRef.current.style.height = `${spacerHeight}px`
                    }
                }
            }

            // Update on mount and window resize
            updateHeight()
            window.addEventListener("resize", updateHeight)

            // Update again after images have loaded
            const timer = setTimeout(updateHeight, 1000)

            return () => {
                window.removeEventListener("resize", updateHeight)
                clearTimeout(timer)
            }
        }
    }, [])

    // Use IntersectionObserver to detect when the last image is scrolled
    useEffect(() => {
        if (!lastImageRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                // When the last image is visible, set imagesScrolled to true
                if (entries[0].isIntersecting) {
                    setImagesScrolled(true)
                }
            },
            {
                threshold: 0.8, // Trigger when 80% of the element is visible
                rootMargin: "0px", // No margin
            },
        )

        observer.observe(lastImageRef.current)

        return () => {
            if (lastImageRef.current) {
                observer.unobserve(lastImageRef.current)
            }
        }
    }, [])

    return (
        <div className="relative">
            {/* Main product section */}
            <div ref={containerRef} className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Main image - sticky */}
                    <div ref={mainImageRef} className=" flex-1 order-1 sticky top-8 h-fit">
                        <div className="relative">
                            <img
                                src="https://flowersandsaints.com.au/cdn/shop/files/FNS8.jpg?v=1744530624&width=600"
                                alt="Flowers & Saints Signature Bottle"
                                width={600}
                                height={600}
                                className="w-full aspect-square object-cover rounded-3xl bg-black"
                            />
                        </div>
                    </div>

                    {/* Side images - scrollable */}
                    <div ref={sideImagesRef} className="relative order-2 md:block" style={{ width: "300px" }}>
                        <div ref={sideImagesContainerRef} className="space-y-4">
                            <AnimatePresence>
                                {productImages.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        ref={index === productImages.length - 1 ? lastImageRef : null}
                                        className={`cursor-pointer ${activeImage === index ? " border-none" : "border border-transparent"}`}
                                        onClick={() => setActiveImage(index)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Product view ${index + 1}`}
                                            width={300}
                                            height={300}
                                            className="aspect-square object-cover rounded-2xl bg-black"
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Dynamic spacer that adjusts to match main image height */}
                            <div ref={spacerRef} style={{ height: "0px" }}></div>
                        </div>
                    </div>

                    {/* Mobile thumbnails */}
                    <div className="flex gap-4 overflow-x-auto md:hidden order-2">
                        {productImages.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer ${activeImage === index ? "border border-gray-500" : "border border-transparent"}`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Product view ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="aspect-square object-cover bg-black"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Product Details - sticky */}
                    <div className="grid gap-4 md:gap-6 items-start order-3 md:w-1/3 sticky top-8 h-fit">
                        <div>
                            <p className="text-lg font-sans text-gray-500 mt-2 hover:underline">Flowers & Saints</p>
                            <h1 className="text-4xl font-sans md:text-5xl font-semibold mt-8 mb-2">
                                Flowers & Saints Signature Bottle – Stealth Edition
                            </h1>
                        </div>

                        <div className="text-2xl font-sans font-semibold">Rs. 2,200.00</div>

                        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 w-fit rounded-xl">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-base">In stock, ready to ship</p>
                        </div>

                        <div className="flex items-center gap-4 m-4">
                            <div className="flex border-[2px] p-4 rounded-2xl justify-between">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded-full p-0 h-8 w-8 border-none bg-transparent"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <span className="w-8 text-xl text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="rounded-full h-8 w-8 border-none bg-transparent"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>

                            <RoundedSlideButton className="h-16 rounded-xl w-full justify-center items-center bg-black text-white hover:text-black before:bg-white">
                                Add to Cart
                            </RoundedSlideButton>
                        </div>

                        <RoundedSlideButton className="h-16 rounded-xl w-full justify-center items-center bg-indigo-600 border-none text-white hover:text-black before:bg-indigo-700">
                            Buy now
                        </RoundedSlideButton>

                        <Button variant="link" className="w-full justify-center">
                            More payment options
                        </Button>

                        <div className="flex items-center gap-4 justify-start">
                            <p className="text-sm">Share:</p>
                            <div className="flex gap-4">
                                <MagnetButton className="h-full w-full p-2">
                                    <Facebook className="h-5 w-5" />
                                </MagnetButton>
                                <MagnetButton className="h-full w-full p-2">
                                    <Twitter className="h-5 w-5" />
                                </MagnetButton>
                                <MagnetButton className="h-full w-full p-2">
                                    <Instagram className="h-5 w-5" />
                                </MagnetButton>
                                <MagnetButton className="h-full w-full p-2">
                                    <Send className="h-5 w-5" />
                                </MagnetButton>
                                <MagnetButton className="h-full w-full p-2">
                                    <MessageSquare className="h-5 w-5" />
                                </MagnetButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content sections */}
            <div
                ref={contentRef}
                className="container mx-auto px-4 py-8"
                style={{
                    opacity: imagesScrolled ? 1 : 0,
                    transition: "opacity 0.5s ease-out",
                    pointerEvents: imagesScrolled ? "auto" : "none",
                }}
            >
                {/* Product Description */}
                <ProductDescription />

                {/* Hurry Up Section */}
                <HurryUpSection />

                {/* You May Also Like */}
                <YouMayAlsoLike />
            </div>
        </div>
    )
}
