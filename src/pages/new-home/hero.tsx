export default function HeroSection() {
    return (
        <section className="relative w-full h-screen sm:h-[80vh] overflow-hidden rounded-t-2xl m-0">
            <div className="m-4 sm:m-10 rounded-3xl overflow-hidden">
                <img
                    src="https://flowersandsaints.com.au/cdn/shop/files/banner1_02e43f14-41aa-4502-807d-e609fbfae4b3.jpg?v=1744413924&width=2000"
                    alt="Hero image"
                    className="object-cover w-full h-full rounded-3xl transition-transform duration-500 scale-110 sm:scale-150"
                />
            </div>
            <div className="absolute bottom-6 sm:bottom-16 left-6 sm:left-24 text-white">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-inter font-bold leading-tight max-w-xs sm:max-w-2xl">
                    PROTECT YOUR PEACE VOL.1
                </h1>
            </div>
        </section>
    );
}
