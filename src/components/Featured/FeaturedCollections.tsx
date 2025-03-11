import { NavLink } from "react-router-dom"
import { Button } from "../ui/button"

const FeaturedCollections = () => {
    return (<>
        <section className="container py-8 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "New Arrivals", image: "https://d2731avvelbbmh.cloudfront.net/whetstone-products/jeevee_erp/2025-03-06/bd/bdd531628b1841651d65f0d339631598c13ef7fe" },
                    { title: "Most Popular", image: "https://www.stuff.tv/wp-content/uploads/sites/2/2022/06/iOS-16-best-features.jpg?w=1024" },
                    { title: "Bestsellers", image: "/src/components/Featured/image.jpg" },
                ].map((collection, index) => (
                    <NavLink
                        to={`/collection/${collection.title.toLowerCase().replace(/\s+/g, "-")}`}
                        key={index}
                        className="group"
                    >
                        <div className="relative h-[300px] rounded-lg overflow-hidden">
                            <img
                                src={collection.image || "/placeholder.svg"}
                                alt={collection.title}
                                className="object-cover transition-transform group-hover:scale-105 h-full w-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold mb-2">{collection.title}</h3>
                                <Button variant="secondary" size="sm" className="w-fit">
                                    View Collection
                                </Button>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section></>)
}
export default FeaturedCollections