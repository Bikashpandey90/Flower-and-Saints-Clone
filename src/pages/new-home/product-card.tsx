"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import RoundedSlideButton from "./splash-button"

interface ProductCardProps {
    name: string
    price: number
    image: string
    color: string
    slug: string
}

export default function ProductCard({ name, price, image, color, slug }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isNavLinkHovered, setIsNavLinkHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    console.log(isHovered)

    // Check if mobile on mount and window resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)

        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(price)

    return (
        <div className="group relative mb-6 md:mb-8 ">
            <div className="relative overflow-hidden rounded-2xl bg-gray-50">
                <NavLink to={`/products/${slug}`} className="block">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        width={600}
                        height={600}
                        className="w-full rounded-2xl aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </NavLink>

                {/* Add to Cart Button - Hidden on mobile, shown on hover for desktop */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <RoundedSlideButton
                        className={`py-0 rounded-xl bg-white text-black h-10 shadow-md transition-all duration-300 before:bg-neutral-900 before:text-white hover:text-white border-none
              ${isMobile ? "opacity-100 translate-y-0 text-sm h-8 " : "group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-4"}
            `}
                    >
                        Add to Cart
                    </RoundedSlideButton>
                </div>
            </div>

            <div className="mt-3 px-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">FLOWERS & SAINTS</div>

                <div className="mt-1 flex flex-wrap items-baseline justify-between">
                    <span
                        className="text-base md:text-xl font-semibold font-sans relative overflow-hidden pb-1"
                        style={{ display: "inline-block" }}
                    >
                        <NavLink
                            to={`/products/${slug}`}
                            className="relative inline-block text-black"
                            onMouseEnter={() => setIsNavLinkHovered(true)}
                            onMouseLeave={() => setIsNavLinkHovered(false)}
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            <span className="relative line-clamp-1">
                                {name}
                                <span
                                    className={`pointer-events-none absolute left-0 -bottom-[2px] h-[1px] w-full bg-black transform transition-transform duration-500 ease-in-out ${isNavLinkHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right"
                                        }`}
                                />
                            </span>
                        </NavLink>
                    </span>

                    <div className="font-medium">{formattedPrice}</div>
                </div>

                <div className="mt-2 flex items-center">
                    <button
                        className="w-5 h-5 rounded-full border border-gray-300 mr-2"
                        style={{ backgroundColor: color }}
                        aria-label={`Color: ${color}`}
                    ></button>
                    <span className="text-xs text-gray-500 capitalize">{color}</span>
                </div>
            </div>
        </div>
    )
}
