import { ArrowRight, } from "lucide-react"
import HeroSection from "@/components/Hero/hero"
import RoundedSlideButton from "@/components/SplashButton/button"
import TillDeathDripsBundle from "@/components/TillDeathDrips/section"
import RevenantSacred from "@/components/RevenantSacred/revenant"
import RibbonLogos from "@/components/ScrollingSection/scroll"
import YouMayAlsoLike from "@/components/FewLeft/fewLeft"
import BestSellers from "@/components/BestSellers/bestseller"
import ResponsiveCategorySection from "@/components/Category Caraosel/category"



export default function MainHome() {




    return (
        <main>

            <HeroSection />
            <section className="py-16  px-4 md:px-16 grid md:grid-cols-2 sm:gap-16 gap-4 items-center mt-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-inter font-semibold leading-tight mb-4 ">
                        Our brand is more than just clothing
                        <br></br>
                        <span>– it's a movement.</span>
                        <svg
                            width="100%"
                            height="60"
                            viewBox="-347 -30.1947 694 96.19"
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-0"
                        >
                            <path
                                d="M-335,54 C-335,54 -171,-58 -194,-3 C-217,52 -224.1199951171875,73.552001953125 -127,11 C-68,-27 -137,50 -33,42 C31.43899917602539,37.042999267578125 147.14700317382812,-29.308000564575195 335,2"
                                stroke="#FFDDBF"
                                strokeWidth="20"
                                strokeLinecap="round"
                                fill="none"
                                pathLength="1"
                            />
                        </svg>
                    </h2>

                    <RoundedSlideButton className=" text-sm sm:text-lg rounded-xl sm:m-2 m sm:py-5 py-3 before:bg-neutral-900 group flex items-center hover:text-white">
                        Our Story
                        <span className="ml-2 inline-block">
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
                        </span>
                    </RoundedSlideButton>
                </div>
                <div>
                    <p className=" text-[1rem] sm:text-xl font-thin font-inter">
                        At Flowers & Saints, we believe in wearing your story with pride. Every product we design is crafted with
                        intention, combining style, quality, and purpose. Whether you're looking for a staple piece or something
                        that speaks to your unique journey, we've got you covered.
                    </p>
                    <div className="mt-8">
                        <h3 className=" text-[1rem] font-bold sm:text-xl mb-3">Explore Our Journey</h3>
                        <p className="text-[1rem] sm:text-xl">Discover the passion behind our designs and the community we're building together.</p>
                    </div>
                </div>
            </section>

            {/* Only few items left */}

            <YouMayAlsoLike />


            {/* Product Categories */}
            {/* <section className="py-8 px-4 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/Walnut-Back.jpg?v=1745218023&width=1080"
                        title="Essential Tees"
                        description="Comfort. Fit. Timeless."
                        count={29}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/Sand-Back_6a6aa6bb-7e82-479a-a6e2-adc16f9ea5ab.png?v=1746348227&width=1080"
                        title="Relax Crew"
                        description="Rooted. Quietly Powerful. Unshakably Grounded."
                        count={8}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/FNS_-_PYP_-_VOL_2_-Artboard_9_1.png?v=1746341933&width=1080"
                        title="Relax Hood"
                        description="Cozy. Stylish. Essential."
                        count={7}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=1080"
                        title="Drink Bottles"
                        description="Hydrate. Elevate. Sustain."
                        count={7}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/Walnut-Back.jpg?v=1745218023&width=1080"
                        title="Essential Tees"
                        description="Comfort. Fit. Timeless."
                        count={29}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/Sand-Back_6a6aa6bb-7e82-479a-a6e2-adc16f9ea5ab.png?v=1746348227&width=1080"
                        title="Relax Crew"
                        description="Rooted. Quietly Powerful. Unshakably Grounded."
                        count={8}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/FNS_-_PYP_-_VOL_2_-Artboard_9_1.png?v=1746341933&width=1080"
                        title="Relax Hood"
                        description="Cozy. Stylish. Essential."
                        count={7}
                    />
                    <CategoryCard
                        image="https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=1080"
                        title="Drink Bottles"
                        description="Hydrate. Elevate. Sustain."
                        count={7}
                    />
                </div>
            </section> */}
            <ResponsiveCategorySection />

            {/* Best Sellers Section */}
            {/* <section className="py-16 px-4 md:px-16">
                <h2 className="text-4xl md:text-6xl font-bold font-inter mb-8">Best Sellers</h2>
                <div className="flex justify-between  ">

                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
                        <RoundedSlideButton className="rounded-2xl hover:text-white border-neutral-500 text-lg py-3 bg-neutral-900 text-white font-inter m-2 ">Drink Bottles</RoundedSlideButton>
                        <RoundedSlideButton className="rounded-2xl hover:text-white border-neutral-500 text-lg py-3 font-inter m-2">Essential Tees</RoundedSlideButton>

                        <RoundedSlideButton className="rounded-2xl hover:text-white border-neutral-500 text-lg py-3 font-inter m-2">Tote Bags</RoundedSlideButton>


                    </div>
                    <div className="flex gap-2 mr-8">

                        <RoundedSlideButton disabled={false}
                            onClick={prevSlide}
                            className="rounded-full h-14 border-neutral-700 hover:text-white">
                            <ChevronLeft className="h-6 w-6 " />
                        </RoundedSlideButton>

                        <RoundedSlideButton className="rounded-full h-14  border-neutral-700 hover:text-white"
                            onClick={nextSlide}>
                            <ChevronRight className="h-6 w-6" />
                        </RoundedSlideButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        products.map((product, index) => (
                            <ProductCard
                                key={index}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                brand={product.brand}
                                colors={product.colors}


                            />
                        ))
                    }
                   
                </div>
            </section> */}
            <BestSellers />

            <RevenantSacred />

            <TillDeathDripsBundle />
            <RibbonLogos />


            {/* Newsletter Section */}
            {/* <NewsletterSignup /> */}
        </main>
    )
}


// interface ProductCardProps {
//     image: string
//     title: string
//     price: string
//     brand: string
//     colors: string[]
// }

// const ProductCard = ({ image, title, price, brand, colors }: ProductCardProps) => {
//     return (
//         <div className="product-card rounded-2xl">
//             <NavLink to={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`} className="block">
//                 <div className="relative aspect-square overflow-hidden mb-4">
//                     <img
//                         src={image || "/placeholder.svg"}
//                         alt={title}
//                         className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
//                     />
//                 </div>
//                 <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{brand}</div>
//                 <h3 className="font-medium font-inter text-2xl mb-1">{title}</h3>
//                 <div className="font-thin font-inter font-xl">{price}</div>
//                 <div className="flex mt-2 space-x-2">
//                     {colors.map((color, index) => (
//                         <div key={index} className="color-swatch" style={{ backgroundColor: color }} />
//                     ))}
//                 </div>
//             </NavLink>
//         </div>
//     )
// }
// const NewsletterSignup = () => {
//     return (
//         <section className="bg-black text-white py-16 px-4">
//             <div className="container mx-auto max-w-4xl">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-8">
//                     Stay updated about the latest releases and get exclusive deals :-)
//                 </h2>
//                 <div className="flex">
//                     <input type="email" placeholder="Enter your email" className="newsletter-input w-full" />
//                     <button className="newsletter-button">
//                         <span className="sr-only">Submit</span>
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                                 d="M5 12H19M19 12L12 5M19 12L12 19"
//                                 stroke="white"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </section>
//     )
// }


