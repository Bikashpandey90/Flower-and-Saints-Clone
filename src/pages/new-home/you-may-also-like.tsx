"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { NavLink } from "react-router-dom"
import RoundedSlideButton from "./splash-button"

export default function YouMayAlsoLike() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const products = [
        {
            id: 1,
            name: "You Grow Girl - Customized Bottle",
            price: "Rs. 2,800.00",
            image: "https://flowersandsaints.com.au/cdn/shop/files/Girl8.jpg?v=1744528511&width=600",
            brand: "FLOWERS & SAINTS",
            color: "pink",
        },
        {
            id: 2,
            name: "Cats Doodle - Bottle",
            price: "Rs. 2,200.00",
            image: "https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=600",
            brand: "FLOWERS & SAINTS",
            color: "cream",
        },
        {
            id: 3,
            name: "Owl Eyes On You - Bottle",
            price: "Rs. 2,200.00",
            image: "https://flowersandsaints.com.au/cdn/shop/files/PO8.jpg?v=1744540529&width=600",
            brand: "FLOWERS & SAINTS",
            color: "white",
        },
        {
            id: 4,
            name: "Cosmic Trip - Bottle",
            price: "Rs. 2,200.00",
            image: "https://flowersandsaints.com.au/cdn/shop/files/PM2.jpg?v=1744535986&width=1080",
            brand: "FLOWERS & SAINTS",
            color: "blue",
        },
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 4))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4))
    }

    const visibleProducts = products.slice(currentSlide * 4, currentSlide * 4 + 4)

    return (
        <div className="mb-16">
            {/* <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold">You may also like</h2>
            </div> */}
            <div className="mb-10 flex justify-between items-center mt-40 ">
                <div>
                    {/* <p className="text- md:text:4xl font-inter  text-gray-500 mb-3">Only a Few Pieces Left</p> */}
                    <h2 className="text-4xl font-inter  md:text-5xl font-bold">You may also like</h2>
                </div>

                <div className="flex  gap-2 mr-8">
                    {/* <Button
                                    variant="outline"
                                    size="icon"
                                    className="  rounded-full h-14 w-14 bg-red-950"
                                    onClick={prevSlide}
                                >
            
                                </Button> */}
                    <RoundedSlideButton disabled={false}
                        onClick={prevSlide}
                        className="rounded-full h-14 border-neutral-700">
                        <ChevronLeft className="h-6 w-6 " />
                    </RoundedSlideButton>


                    {/* <Button
                                    variant="outline"
                                    size="icon"
                                    className="  rounded-full h-14 w-14 bg-red-950"
                                    onClick={nextSlide}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button> */}
                    <RoundedSlideButton className="rounded-full h-14  border-neutral-700"
                        onClick={nextSlide}>
                        <ChevronRight className="h-6 w-6" />
                    </RoundedSlideButton>
                </div>
            </div>

            <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {visibleProducts.map((product) => (
                        <NavLink to="#" key={product.id} className="group">
                            <div className="overflow-hidden rounded-2xl aspect-square mb-4">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-full rounded-2xl object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
                                <h3 className="font-medium line-clamp-2 h-auto mt-2 text-2xl">{product.name}</h3>
                                <p className="font-medium mt-1">{product.price}</p>
                                <div className="mt-2">
                                    <div
                                        className={`w-4 h-4 rounded-full ${product.color === "pink"
                                            ? "bg-pink-300"
                                            : product.color === "cream"
                                                ? "bg-amber-50"
                                                : product.color === "white"
                                                    ? "bg-white border border-gray-400"
                                                    : "bg-blue-800"
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>

                {/* <Button
                    variant="outline"
                    size="icon"
                    className="absolute -left-5 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 bg-white"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute -right-5 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 bg-white"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button> */}
            </div>
        </div>
    )
}
