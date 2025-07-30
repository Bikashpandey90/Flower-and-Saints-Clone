"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import RoundedSlideButton from "@/components/SplashButton/button"
import TextUnderline from "@/components/textUnderline/text"

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
    const [isFSHovered, setIsFSHovered] = useState(false)
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
            <div className="relative overflow-hidden rounded-t-2xl bg-gray-50">
                <NavLink to={`/products/${slug}`} className="block">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        width={600}
                        height={600}
                        className="w-full rounded-t-2xl aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </NavLink>

                {/* Add to Cart Button - Hidden on mobile, shown on hover for desktop */}
                {isMobile ? <div className="absolute inset-x-0 bottom-2 flex justify-end">
                    <button className="flex p-2 mr-2 h-8 bg-red-500 text-white rounded-xl">
                        <svg className="icon icon-cart icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-miterlimit="10" d="M7.1802 7.58C7.1802 4.36 9.2402 1.75 11.7902 1.75C14.3402 1.75 16.4002 4.36 16.4002 7.58M11.7902 7.58C2.0402 7.58 0.690197 6.97 2.3502 16.18C3.3002 21.48 3.9802 22.22 11.7902 22.22C19.6002 22.22 20.2802 21.47 21.2302 16.18C22.8902 6.97 21.5502 7.58 11.7902 7.58Z"></path>
                        </svg>
                    </button>
                </div> : <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <RoundedSlideButton
                        className={`py-0 rounded-xl bg-white text-black h-10 shadow-md transition-all duration-300 before:bg-neutral-900 before:text-white hover:text-white border-none
              ${isMobile ? "opacity-100 translate-y-0 text-sm h-8 " : "group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-4"}
            `}
                    >
                        Add to Cart
                    </RoundedSlideButton>
                </div>}
            </div>

            <div className="mt-3 px-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider"
                    onMouseEnter={() => setIsFSHovered(true)}
                    onMouseLeave={() => setIsFSHovered(false)}
                ><TextUnderline isNavLinkHovered={isFSHovered} className='bg-gray-500'>FLOWERS & SAINTS</TextUnderline></div>

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
                            {/* <span className="relative font-thin font-inter">
                                {name}
                                <span
                                    className={`bg-repeat-x pointer-events-none absolute left-0 -bottom-[2px] h-[1px] w-full bg-black transform transition-transform duration-500 ease-in-out ${isNavLinkHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right"
                                        }`}
                                />
                            </span> */}
                            <TextUnderline isNavLinkHovered={isNavLinkHovered}>{name}</TextUnderline>
                        </NavLink>
                    </span>

                    <div className="font-medium">{formattedPrice}</div>
                </div>

                <div className={`${isMobile ? "hidden" : ' '} mt-2 flex items-center`}>
                    <button
                        className="w-5 h-5 rounded-full border border-gray-300 mr-2"
                        style={{ backgroundColor: color }}
                        aria-label={`Color: ${color}`}
                    ></button>
                    {/* <span className="text-xs text-gray-500 capitalize">{color}</span> */}
                </div>
            </div>
        </div>
    )
}
