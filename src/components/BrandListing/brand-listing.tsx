import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import brandSvc, { BrandData } from "@/pages/brand/brand.service"




export default function BrandsListing() {
    const [searchQuery, setSearchQuery] = useState("")
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
    const [brandsData, setBrandData] = useState<BrandData[]>([])

    const fetchBrands = async () => {
        try {
            const response = await brandSvc.getHomeBrandList(1, 40)
            setBrandData(response.data.detail)


        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchBrands()
    }, [])

    // Filter brands based on search query and featured filter
    const filteredBrands = brandsData.filter((brand) => {
        const matchesSearch = brand.title.toLowerCase().includes(searchQuery.toLowerCase())
        // const matchesFeatured = showFeaturedOnly ? brand.featured : true
        // return matchesSearch && matchesFeatured
        return matchesSearch
    })

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Shop by Brand</h1>
                <p className="text-muted-foreground">Discover products from your favorite brands</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search brands..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="featured"
                        className="mr-2"
                        checked={showFeaturedOnly}
                        onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    />
                    <label htmlFor="featured" className="text-sm">
                        Show featured brands only
                    </label>
                </div>
            </div>

            {filteredBrands.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl font-medium mb-2">No brands found</h2>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                        onClick={() => {
                            setSearchQuery("")
                            setShowFeaturedOnly(false)
                        }}
                    >
                        Reset Filters
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {filteredBrands.map((brand) => (
                        <NavLink
                            to={`/brand/${brand.slug}`}
                            key={brand._id}
                            className="group flex flex-col items-center justify-center p-4 border rounded-lg bg-background hover:shadow-md transition-all duration-200 hover:border-primary"
                        >
                            <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                                <img
                                    src={brand.image || "/placeholder.svg"}
                                    alt={`${brand.title} logo`}
                                    width={120}
                                    height={80}
                                    className="object-contain max-h-full"
                                />
                            </div>
                            <h3 className="font-medium text-center group-hover:text-primary transition-colors">{brand.title}</h3>
                            <p className="text-xs text-muted-foreground text-center mt-1">{Math.floor(Math.random() * (100 - 50 + 1)) + 50} products</p>
                            {/* {brand.featured && (
                                <span className="mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Featured</span>
                            )} */}
                        </NavLink>
                    ))}
                </div>
            )}

            <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
                <Button variant="outline">View More</Button>
            </div>
        </div>
    )
}

