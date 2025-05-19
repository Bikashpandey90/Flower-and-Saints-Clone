"use client"
// import {  useTransform, motion, MotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Send, MessageSquare } from "lucide-react"
import ProductDescription from "./product-description"
import HurryUpSection from "./hurry-up-section"
import YouMayAlsoLike from "./you-may-also-like"
import MagnetButton from "./magnet-button"
import RoundedSlideButton from "./splash-button";

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
        <div className="container mx-auto px-4 py-8 overflow-hidden">
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
                                className={`cursor-pointer  ${activeImage === index ? "border border-gray-500" : "border border-transparent"}`}
                                onClick={() => setActiveImage(index)}
                            >
                                {/* <Carousel> */}

                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Product view ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="aspect-square object-cover rounded-2xl bg-black"
                                />
                                {/* </Carousel> */}

                            </div>
                        ))}

                    </div>


                </div>




                {/* Mobile thumbnails */}
                <div className="flex gap-4 overflow-x-auto md:hidden order-2 ">
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
                <div className="grid gap-4 md:gap-6 items-start order-3 md:w-1/3 ">
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

                    <div className="flex items-center gap-4 m-4 ">
                        <div className="flex border-[2px] p-4 rounded-2xl justify-between ">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="rounded-full p-0  h-8 w-8 border-none bg-transparent "
                            >
                                <ChevronLeft className="h-6 w-6 " />
                            </Button>
                            <span className="w-8 text-xl text-center">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                                className="rounded-full h-8 w-8 border-none bg-transparent "
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* <Button className="w-full bg-black text-white hover:bg-gray-900 h-16 rounded-xl"> */}
                        <RoundedSlideButton className="h-16 rounded-xl w-full justify-center items-center bg-black text-white hover:text-black before:bg-white ">
                            Add to Cart
                        </RoundedSlideButton>
                        {/* </Button> */}

                    </div>


                    {/* <Button
                        variant="outline"
                        className="w-full flex rounded-xl h-16 bg-indigo-600 text-white text-xl hover:bg-indigo-700 border-none "
                    >
                        Buy now
                    </Button> */}
                    <RoundedSlideButton className="h-16 rounded-xl w-full justify-center  items-center bg-indigo-600 border-none text-white hover:text-black before:bg-indigo-700 ">
                        Buy now
                    </RoundedSlideButton>

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
        </div >
    )
}

// const Carousel = ({ children }: { children: any }) => {
//     const ref = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start start", "end start"],
//     });

//     return (
//         <div className="relative ">

//             <div ref={ref} className="relative z-0 flex flex-col gap-6 md:gap-12">
//                 <CarouselItem
//                     scrollYProgress={scrollYProgress}
//                     position={1}
//                     numItems={4}
//                 >{children}</CarouselItem>
//                 <CarouselItem
//                     scrollYProgress={scrollYProgress}
//                     position={2}
//                     numItems={4}
//                 >{children}</CarouselItem>
//                 <CarouselItem
//                     scrollYProgress={scrollYProgress}
//                     position={3}
//                     numItems={4}
//                 >{children}</CarouselItem>
//                 <CarouselItem
//                     scrollYProgress={scrollYProgress}
//                     position={4}
//                     numItems={4}
//                 >{children}</CarouselItem>
//             </div>

//             <Buffer />
//         </div>
//     );
// };

// const CarouselItem = ({
//     scrollYProgress,
//     position,
//     numItems,
//     children
// }: {
//     scrollYProgress: MotionValue<number>;
//     position: number;
//     numItems: number;
//     children: any
// }) => {
//     const stepSize = 1 / numItems;
//     const end = stepSize * position;
//     const start = end - stepSize;

//     const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
//     const scale = useTransform(scrollYProgress, [start, end], [1, 0.75]);

//     return (
//         <motion.div
//             style={{
//                 opacity,
//                 scale,
//             }}
//             className="grid aspect-video  shrink-0 place-content-center rounded-2xl bg-neutral-900"
//         >
//             {/* <span className="text-lg text-neutral-600">Feature demo here</span> */}
//             {children}
//         </motion.div>
//     );
// };



// const Buffer = () => <div className="h-24 w-full md:h-48" />;

