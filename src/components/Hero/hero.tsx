

export default function HeroSection() {
    return (
        <section className="relative w-full h-[80vh] sm:h-[80vh] pt-3 overflow rounded-t-2xl m-0">
            {/* Desktop Image */}

            <div className="hidden  sm:block m-4 sm:m-8 rounded-3xl overflow-hidden h-full z-0  ">
                <img
                    src="https://flowersandsaints.com.au/cdn/shop/files/banner1_02e43f14-41aa-4502-807d-e609fbfae4b3.jpg?v=1744413924&width=2000"
                    alt="Hero image desktop"
                    className="object-cover  rounded-3xl transition-transform duration-500 scale-110 sm:scale-150 z-0 "
                    sizes="(min-width: 640px) 100vw"

                />
            </div>

            {/* Mobile Image */}
            <div className="  flex sm:hidden m-4 rounded-3xl overflow-hidden h-full">
                <img
                    src="https://flowersandsaints.com.au/cdn/shop/files/aa.jpg?v=1744968366&width=800"
                    alt="Hero image mobile"
                    className="object-cover rounded-3xl transition-transform duration-500"
                    sizes="100vw"

                />

            </div>

            {/* Content Overlay */}
            {/* <div className="absolute inset-0 bg-black/20 rounded-t-2xl" /> */}

            {/* Text Content */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-24  text-white z-10">
                <h1 className="text-[2rem] xs:text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-xs p-3 sm:max-w-2xl">
                    PROTECT YOUR PEACE VOL.1
                </h1>
                <p className="mt-2 hidden sm:block sm:mt-4 text-sm sm:text-lg opacity-90 max-w-xs sm:max-w-md">
                    Discover tranquility in every moment
                </p>
            </div>



        </section>
    )
    
}
