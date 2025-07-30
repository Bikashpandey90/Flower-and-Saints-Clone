"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

interface CollapsibleSectionProps {
    title: string
    isOpen: boolean
    onToggle: () => void
    children: React.ReactNode
}

function CollapsibleSection({ title, isOpen, onToggle, children }: CollapsibleSectionProps) {
    return (
        <div className="border-t border-gray-200 py-4 sm:py-6">
            <div
                className="flex justify-between items-center mb-4 sm:mb-6 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                onClick={onToggle}
            >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-medium transition-colors duration-300">{title}</h2>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110">
                    <div
                        className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? "rotate-[135deg]" : "rotate-0"}`}
                    >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen ? "max-h-[2000px] opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform -translate-y-4"
                    }`}
            >
                <div
                    className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-100 ${isOpen ? "transform translate-y-0 opacity-100" : "transform translate-y-8 opacity-0"
                        }`}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function ProductDescription() {
    const [openSection, setOpenSection] = useState<string | null>("description")
    

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Left Side - Multiple Collapsible Sections */}
                <div className="space-y-0">
                    {/* Description Section */}
                    <CollapsibleSection
                        title="Description"
                        isOpen={openSection === "description"}
                        onToggle={() => toggleSection("description")}
                    >
                        <div className="space-y-4 sm:space-y-6 font-inter">
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Elevate your essentials with the <strong>Flowers & Saints Signature Bottle</strong>, where{" "}
                                <strong>bold identity meets ultra-minimal sophistication</strong>. Designed in deep matte black and
                                wrapped with a <strong>full-gloss "Flowers & Saints" logo</strong>, this bottle delivers{" "}
                                <em>understated luxury</em> in every detail.
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex gap-3 sm:gap-4 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                    <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">❤️</span>
                                    <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        <strong>Sleek, Stealth Design:</strong> The seamless, full-wrap gloss branding contrasts with the
                                        matte surface for a powerful, tactile finish that's both modern and iconic.
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:gap-4 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                    <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">👊</span>
                                    <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        <strong>Boldly Branded:</strong> No labels. No distractions. Just a commanding presence — the
                                        Flowers & Saints ethos embedded directly into the form.
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:gap-4 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                    <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">🎯</span>
                                    <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        <strong>Designed for Impact:</strong> Whether it's on your desk, in your bag, or part of your
                                        everyday carry — this is more than a bottle. It's a statement of{" "}
                                        <strong>discipline, detail, and design-forward thinking</strong>.
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:gap-4 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                    <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">⚪</span>
                                    <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        <strong>Street-Ready. Studio-Worthy.</strong> A perfect blend of utility and identity — crafted for
                                        creators, thinkers, and those who move with intention.
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2 sm:pt-4">
                                Make it your signature.
                                <br />
                                Only from <strong>Flowers & Saints</strong>.
                            </p>
                        </div>
                    </CollapsibleSection>

                    {/* Shipping & Returns Section */}
                    <CollapsibleSection
                        title="Shipping & Returns"
                        isOpen={openSection === "shipping"}
                        onToggle={() => toggleSection("shipping")}
                    >
                        <div className="space-y-4 text-sm sm:text-base text-gray-600">
                            <div className="transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                <h4 className="font-semibold text-gray-900 mb-2">Shipping Information</h4>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Free shipping on orders over $75</li>
                                    <li>Standard delivery: 3-5 business days</li>
                                    <li>Express delivery: 1-2 business days</li>
                                    <li>International shipping available</li>
                                </ul>
                            </div>
                            <div className="transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                <h4 className="font-semibold text-gray-900 mb-2">Returns Policy</h4>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>30-day return window</li>
                                    <li>Items must be unused and in original packaging</li>
                                    <li>Free returns for defective items</li>
                                    <li>Return shipping costs apply for exchanges</li>
                                </ul>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Warranty Section */}
                    <CollapsibleSection
                        title="Warranty & Care"
                        isOpen={openSection === "warranty"}
                        onToggle={() => toggleSection("warranty")}
                    >
                        <div className="space-y-4 text-sm sm:text-base text-gray-600">
                            <div className="transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                <h4 className="font-semibold text-gray-900 mb-2">Warranty Coverage</h4>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>2-year manufacturer warranty</li>
                                    <li>Covers manufacturing defects</li>
                                    <li>Temperature retention guarantee</li>
                                    <li>Logo durability assurance</li>
                                </ul>
                            </div>
                            <div className="transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1">
                                <h4 className="font-semibold text-gray-900 mb-2">Care Instructions</h4>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Hand wash recommended</li>
                                    <li>Use mild soap and warm water</li>
                                    <li>Avoid abrasive cleaners</li>
                                    <li>Air dry completely before storage</li>
                                </ul>
                            </div>
                        </div>
                    </CollapsibleSection>
                </div>

                {/* Right Side - Always Visible Specifications */}
                <div className="lg:sticky lg:top-4 lg:self-start">
                    <div className="py-4 sm:py-6">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 border-t border-gray-200 pt-4 sm:pt-6">
                            Specifications
                        </h2>

                        <div className="bg-white transform transition-all duration-500 ">
                            <div className="sm:px-32">
                                <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-10  sm:p-6 lg:p-8 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                    {/* Bottle Icon */}
                                    <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
                                        <svg
                                            className="w-32 sm:w-40 lg:w-48 h-auto text-gray-800 transform transition-all duration-700 "
                                            viewBox="0 0 234 74"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0 20C0 8.95431 8.95431 0 20 0H214C225.046 0 234 8.9543 234 20V74H0V20Z"
                                                fill="currentColor"
                                                className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                            ></path>
                                            <rect
                                                x="58"
                                                y="32"
                                                width="118"
                                                height="19"
                                                rx="9.5"
                                                className="fill-white transition-all duration-300"
                                                fill="white"
                                            ></rect>
                                            <circle
                                                cx="117.5"
                                                cy="32.5"
                                                r="11.5"
                                                className="fill-white transition-all duration-300"
                                                fill="white"
                                            ></circle>
                                        </svg>
                                    </div>

                                    {/* Specifications Grid */}
                                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                        {[
                                            {
                                                icon: "https://flowersandsaints.com.au/cdn/shop/files/Volume.svg?v=1744449520&width=192",
                                                alt: "Capacity",
                                                text: "500ml\nCapacity",
                                            },
                                            {
                                                icon: "https://flowersandsaints.com.au/cdn/shop/files/star.svg?v=1744508027&width=192",
                                                alt: "Premium",
                                                text: "Premium\nGloss Finishing",
                                            },
                                            {
                                                icon: "https://flowersandsaints.com.au/cdn/shop/files/snowflake.svg?v=1744508026&width=192",
                                                alt: "Cold",
                                                text: "12 Hours Cold",
                                            },
                                            {
                                                icon: "https://flowersandsaints.com.au/cdn/shop/files/hot.svg?v=1744508027&width=192",
                                                alt: "Hot",
                                                text: "24 Hours Hot",
                                            },
                                            {
                                                icon: "https://flowersandsaints.com.au/cdn/shop/files/biodegradable.svg?v=1744508027&width=192",
                                                alt: "Cold",
                                                text: "BPA Free",
                                            },
                                            {
                                                icon: "https://flowersandsaints.com.au/cdn/shop/files/steel-beam.svg?v=1745138474&width=192",
                                                alt: "Hot",
                                                text: "Double Wall, Stainless Steel",
                                            },
                                        ].map((spec, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center text-center transform transition-all duration-500  "
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div className="mb-2 sm:mb-3 transform transition-all duration-300 ">
                                                    <img
                                                        src={spec.icon || "/placeholder.svg"}
                                                        alt={spec.alt}
                                                        width={40}
                                                        height={40}
                                                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                                                    />
                                                </div>
                                                <p className="text-xs sm:text-sm lg:text-base font-medium leading-tight">
                                                    {spec.text.split("\n").map((line, i) => (
                                                        <span key={i}>
                                                            {line}
                                                            {i < spec.text.split("\n").length - 1 && <br />}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
