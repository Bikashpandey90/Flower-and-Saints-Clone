export default function HeroSection() {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden rounded-t-2xl m-0">
            <div className="m-10  rounded-3xl ">
                <img
                    src="https://flowersandsaints.com.au/cdn/shop/files/banner1_02e43f14-41aa-4502-807d-e609fbfae4b3.jpg?v=1744413924&width=2000"
                    alt="Hero image"
                    className="object-cover w-full h-full  rounded-3xl"
                />
            </div>
            <div className="absolute bottom-16 left-24  text-white">
                <h1 className="text-6xl font-inter font-bold leading-tight max-w-2xl">PROTECT YOU PEACE VOL.1</h1>
            </div>
        </section>
    )
}
