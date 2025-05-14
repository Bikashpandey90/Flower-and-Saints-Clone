"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ProductDescription() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="border-t border-gray-200 py-8 mb-16 max-w-6xl justify-self-center">
            <div className="flex justify-between items-center mb-6" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="text-xl font-medium">Description</h2>
                <button>{isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</button>
            </div>

            {isOpen && (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <p className="text-gray-600">
                            Elevate your essentials with the <strong>Flowers & Saints Signature Bottle</strong>, where{" "}
                            <strong>bold identity meets ultra-minimal sophistication</strong>. Designed in deep matte black and
                            wrapped with a <strong>full-gloss "Flowers & Saints" logo</strong>, this bottle delivers{" "}
                            <em>understated luxury</em> in every detail.
                        </p>

                        <div className="space-y-4">
                            <p className="flex gap-2">
                                <span>❤️</span>
                                <span>
                                    <strong>Sleek, Stealth Design:</strong> The seamless, full-wrap gloss branding contrasts with the
                                    matte surface for a powerful, tactile finish that's both modern and iconic.
                                </span>
                            </p>

                            <p className="flex gap-2">
                                <span>👊</span>
                                <span>
                                    <strong>Boldly Branded:</strong> No labels. No distractions. Just a commanding presence — the Flowers
                                    & Saints ethos embedded directly into the form.
                                </span>
                            </p>

                            <p className="flex gap-2">
                                <span>🎯</span>
                                <span>
                                    <strong>Designed for Impact:</strong> Whether it's on your desk, in your bag, or part of your everyday
                                    carry — this is more than a bottle. It's a statement of{" "}
                                    <strong>discipline, detail, and design-forward thinking</strong>.
                                </span>
                            </p>

                            {/* <MagnetButton /> */}

                            <p className="flex gap-2">
                                <span>⚪</span>
                                <span>
                                    <strong>Street-Ready. Studio-Worthy.</strong> A perfect blend of utility and identity — crafted for
                                    creators, thinkers, and those who move with intention.
                                </span>
                            </p>
                        </div>

                        <p>
                            Make it your signature.
                            <br />
                            Only from <strong>Flowers & Saints</strong>.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8">
                        <h3 className="text-2xl font-bold mb-8">Specifications</h3>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="mb-2">
                                    <img src="https://flowersandsaints.com.au/cdn/shop/files/Volume.svg?v=1744449520&width=192" alt="Capacity" width={50} height={50} />
                                </div>
                                <p className="text-center font-medium">
                                    500ml
                                    <br />
                                    Capacity
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="mb-2">
                                    <img src="https://flowersandsaints.com.au/cdn/shop/files/star.svg?v=1744508027&width=192" alt="Premium" width={50} height={50} />
                                </div>
                                <p className="text-center font-medium">
                                    Premium
                                    <br />
                                    Gloss Finishing
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="mb-2">
                                    <img src="https://flowersandsaints.com.au/cdn/shop/files/snowflake.svg?v=1744508026&width=192" alt="Cold" width={50} height={50} />
                                </div>
                                <p className="text-center font-medium">12 Hours Cold</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="mb-2">
                                    <img src="https://flowersandsaints.com.au/cdn/shop/files/hot.svg?v=1744508027&width=192" alt="Hot" width={50} height={50} />
                                </div>
                                <p className="text-center font-medium">24 Hours Hot</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
