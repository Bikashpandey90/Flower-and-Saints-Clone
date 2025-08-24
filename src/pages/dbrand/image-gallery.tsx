"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { StickyCards } from "."
// import WebFont from 'webfontloader';

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const colors = ["#2E4D71", "#856546", "#05625C", "#5A483E", "#886648"]

interface ImageRevealGalleryProps {
    sections: {
        title: string
        content: string
        image: string
        button?: string
    }[]
}

export default function ImageRevealGallery({ sections }: ImageRevealGalleryProps) {
    const galleryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!galleryRef.current) return

        const ctx = gsap.context(() => {
            const mediaAnimation = gsap.matchMedia()

            ScrollTrigger.defaults({
                markers: false,
            })

            mediaAnimation.add("(min-width: 666px)", () => {
                // Desktop animations
                const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
                const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")

                gsap.set(photos, { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 })

                const allPhotos = gsap.utils.toArray(".desktopPhoto")

                details.forEach((section: any, i: number) => {
                    const bgColor = colors[i + 1]
                    ScrollTrigger.create({
                        trigger: section,
                        start: "200 bottom",
                        end: "+=100%",
                        onToggle: (self) => {
                            if (self.isActive) {
                                gsap.to(".gallery", { backgroundColor: bgColor })
                            } else if ((i === 0 && self.direction < 0) || (i === details.length - 1 && self.direction > 0)) {
                                gsap.to(".gallery", { backgroundColor: "#2E4D71" })
                            }
                        },
                    })
                })

                details.forEach((detail: any, index: number) => {
                    const headline = detail.querySelector(".reveal")
                    const animation = gsap
                        .timeline()
                        .to(photos[index], { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 2.5 })
                        .set(allPhotos[index], { autoAlpha: 1, duration: 1.5 })

                    ScrollTrigger.create({
                        trigger: headline,
                        start: "top 120%",
                        end: "top 60%",
                        animation: animation,
                        scrub: true,
                        markers: false,
                    })
                })
            })

            mediaAnimation.add("(max-width: 665px)", () => {
                // Mobile animations
                const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")

                details.forEach((section: any, i: number) => {
                    const bgColor = colors[i + 1]
                    ScrollTrigger.create({
                        trigger: section,
                        start: "200 bottom",
                        end: "+=100%",
                        onToggle: (self) => {
                            if (self.isActive) {
                                gsap.to(".gallery", { backgroundColor: bgColor })
                            } else if ((i === 0 && self.direction < 0) || (i === details.length - 1 && self.direction > 0)) {
                                gsap.to(".gallery", { backgroundColor: "#2E4D71" })
                            }
                        },
                    })
                })
            })

            return () => {
                mediaAnimation.kill()
            }
        }, galleryRef)

        return () => {
            ctx.revert()
        }
    }, [])

   

    const isMobile = useIsMobile();

    return (
        <>
            {isMobile ? <><StickyCards /></> : <div ref={galleryRef} className="gallery min-h-screen bg-slate-100" >
                <div className="right fixed top-0 right-0 w-1/2 h-screen overflow-hidden hidden md:block">
                    {sections.map((section, index) => (
                        <div key={index} className="desktopPhoto absolute inset-0 w-full h-full">
                            <img src={section.image || "/placeholder.svg"} alt={section.title} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <div className="desktopContent md:mr-[50%] md:w-1/2 w-full">
                    {sections.map((section, index) => (
                        <div key={index} className="desktopContentSection min-h-screen flex items-center justify-center p-8 md:p-16">
                            <div className="max-w-lg p-4">
                                <h2 className="reveal text-4xl md:text-7xl font-bold text-black mb-6" >{section.title}</h2>
                                <p className="text-lg md:text-4xl text-black leading-relaxed">{section.content}</p>
                                <Button className="h-24 text-2xl p-8 capitalize mt-10 bg-black">{section?.button}</Button>

                                {/* Mobile image */}
                                <div className="md:hidden mt-8">
                                    <img
                                        src={section.image || "/placeholder.svg"}
                                        alt={section.title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}
