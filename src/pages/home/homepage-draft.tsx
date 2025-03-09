import CarouselSlider from "@/components/caraousel/carousel"
import CategorySection from "@/components/Category Section/CategorySection"
import DealSection from "@/components/Deals/deals"
import BannerGrid from "@/components/Banner Grid/BannerGrid"
import PopularProducts from "@/components/Popular Products/Popularproducts"
import BrandSection from "@/components/BrandSection/BrandSection"
import FeaturedCollections from "@/components/Featured/FeaturedCollections"
import RecentlyViewed from "@/components/Recently Viewed/RecentlyViewed"
import { Lock, MessageSquareDot, Repeat, Truck } from "lucide-react"

export default function HomePageDraft() {



    // Handle scroll for sticky header


    return (
        <div className="flex flex-col min-h-screen">



            {/* Main Banner Carousel */}

            <CarouselSlider />


            {/* Categories Section */}

            <CategorySection />

            {/* Deals Section */}
            <DealSection />


            {/* Banner Grid */}
            <BannerGrid />


            {/* Popular Products */}
            <PopularProducts />


            {/* Brands Section */}
            <BrandSection />

            {/* Featured Collections */}
            <FeaturedCollections />

            {/* Recently Viewed */}
            <RecentlyViewed />


            {/* Services Banner */}
            <section className="bg-muted py-8 md:py-12">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: <Truck className="transform scale-x-[-1]" />, title: "Free Shipping", description: "On orders over $50" },
                            { icon: <Repeat />, title: "Easy Returns", description: "30-day return policy" },
                            { icon: <Lock />, title: "Secure Payment", description: "100% secure checkout" },
                            { icon: <MessageSquareDot />, title: "24/7 Support", description: "We're here to help" },
                        ].map((service, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                                <div className="text-3xl">{service.icon}</div>
                                <div>
                                    <h3 className="font-semibold">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




        </div>
    )
}

