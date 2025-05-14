"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Send, MessageSquare } from "lucide-react"
import ProductDescription from "./product-description"
import HurryUpSection from "./hurry-up-section"
import YouMayAlsoLike from "./you-may-also-like"
import MagnetButton from "./magnet-button"

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)
    const thumbnailsRef = useRef<HTMLDivElement>(null)
    const mainImageRef = useRef<HTMLDivElement>(null)

    // Images for the product
    const productImages = ["https://flowersandsaints.com.au/cdn/shop/files/FNS1.jpg?v=1744530624&width=600", "https://flowersandsaints.com.au/cdn/shop/files/FNS2.jpg?v=1744530624&width=600", "https://flowersandsaints.com.au/cdn/shop/files/FNS3.jpg?v=1744530624&width=600", "https://flowersandsaints.com.au/cdn/shop/files/FNS4.jpg?v=1744530624&width=600", 'https://flowersandsaints.com.au/cdn/shop/files/FNS5.jpg?v=1744530624&width=600', 'https://flowersandsaints.com.au/cdn/shop/files/FNS6.jpg?v=1744530624&width=600', 'https://flowersandsaints.com.au/cdn/shop/files/FNS7.jpg?v=1744530624&width=600']

    // Handle sticky scroll for thumbnails
    useEffect(() => {
        const handleScroll = () => {
            if (thumbnailsRef.current && mainImageRef.current) {
                const mainRect = mainImageRef.current.getBoundingClientRect()
                const mainBottom = mainRect.bottom
                const mainTop = mainRect.top

                if (mainTop < 100 && mainBottom > window.innerHeight) {
                    thumbnailsRef.current.style.position = "fixed"
                    thumbnailsRef.current.style.top = "300px"
                    thumbnailsRef.current.style.width = "300px" // Set width to prevent layout shift
                } else if (mainBottom <= window.innerHeight) {
                    thumbnailsRef.current.style.position = "absolute"
                    thumbnailsRef.current.style.top = `${mainBottom - thumbnailsRef.current.offsetHeight}px`
                    thumbnailsRef.current.style.width = "300px"
                } else {
                    thumbnailsRef.current.style.position = "absolute"
                    thumbnailsRef.current.style.top = "0"
                    thumbnailsRef.current.style.width = "300px"
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 mb-16">
                {/* Product Images - Main image on left, thumbnails on right */}
                <div className="relative flex-1 order-1 rounded-4xl overflow-hidden">
                    <div ref={mainImageRef} className="relative  ">
                        <img
                            src={"https://flowersandsaints.com.au/cdn/shop/files/FNS8.jpg?v=1744530624&width=600"}
                            alt="Flowers & Saints Signature Bottle"
                            width={600}
                            height={600}
                            className="w-[600] aspect-square object-cover rounded-3xl bg-black "
                        // priority
                        />
                    </div>
                </div>

                {/* Thumbnails - Sticky on scroll */}
                <div className="relative order-2 overflow-hidden md:block" style={{ width: "300px" }}>
                    <div
                        ref={thumbnailsRef}
                        className="flex flex-col gap-4 border-none"
                        style={{ position: "absolute", top: "0", width: "300px" }}
                    >
                        {productImages.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer ${activeImage === index ? "border border-gray-500" : "border border-transparent"}`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Product view ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="aspect-square object-cover rounded-2xl bg-black"
                                />
                            </div>
                        ))}
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

                {/* Product Details */}
                <div className="grid gap-4 md:gap-6 items-start order-3 md:w-1/3">
                    <div>
                        <p className="text-lg font-sans text-gray-500 mt-2 hover:underline  ">Flowers & Saints</p>
                        <h1 className="text-4xl font-sans md:text-5xl font-semibold mt-8 mb-2">
                            Flowers & Saints Signature Bottle – Stealth Edition
                        </h1>
                    </div>

                    <div className="text-2xl font-sans font-semibold">Rs. 2,200.00</div>

                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1  w-fit rounded-xl">
                        <div className="w-2 h-2  bg-green-500 rounded-full"></div>
                        <p className="text-base p">In stock, ready to ship</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="rounded-none h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(quantity + 1)}
                            className="rounded-none h-8 w-8"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        <Button className="w-full bg-black text-white hover:bg-gray-900 h-16 rounded-xl">Add to cart</Button>

                    </div>


                    <Button
                        variant="outline"
                        className="w-full rounded-xl h-16 bg-indigo-600 text-white hover:bg-indigo-700 border-none"
                    >
                        Buy with ShopPay
                    </Button>

                    <Button variant="link" className="w-full justify-center">
                        More payment options
                    </Button>

                    <div className="flex items-center gap-4 justify-start">
                        <p className="text-sm">Share:</p>
                        <div className="flex gap-4">
                            <MagnetButton className="h-full w-full p-2"> <Facebook className="h-5 w-5" /></MagnetButton>
                            <MagnetButton className="h-full w-full p-2"><Twitter className="h-5 w-5" /></MagnetButton>
                            <MagnetButton className="h-full w-full p-2"> <Instagram className="h-5 w-5" /></MagnetButton>
                            <MagnetButton className="h-full w-full p-2"><Send className="h-5 w-5" /></MagnetButton>
                            <MagnetButton className="h-full w-full p-2"> <MessageSquare className="h-5 w-5" /> </MagnetButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <ProductDescription />

            {/* Hurry Up Section */}
            <HurryUpSection />

            {/* You May Also Like */}
            <YouMayAlsoLike />
        </div>
    )
}
