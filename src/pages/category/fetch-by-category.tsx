import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavLink, useParams } from "react-router-dom"
import categorySvc from "./category.service"
import { Product } from "@/components/Shopping Cart PopOver/shopping-cart"
import { ProductCard } from "@/components/Product Card/productCard"

// Sample data - in a real app this would come from an API
const categories = [
    { id: 1, name: "Electronics", count: 1245 },
    { id: 2, name: "Clothing", count: 842 },
    { id: 3, name: "Home & Kitchen", count: 654 },
    { id: 4, name: "Books", count: 423 },
    { id: 5, name: "Sports & Outdoors", count: 321 },
]

const subCategories = {
    Electronics: ["Smartphones", "Laptops", "Tablets", "Headphones", "Cameras", "Smart Home"],
    Clothing: ["Men's", "Women's", "Kids'", "Shoes", "Accessories", "Watches"],
    "Home & Kitchen": ["Furniture", "Kitchen Appliances", "Bedding", "Decor", "Storage", "Lighting"],
    Books: ["Fiction", "Non-Fiction", "Children's", "Textbooks", "Comics", "Audiobooks"],
    "Sports & Outdoors": ["Exercise & Fitness", "Outdoor Recreation", "Team Sports", "Water Sports", "Winter Sports"],
}

const brands = [
    { id: 1, name: "Apple", count: 124 },
    { id: 2, name: "Samsung", count: 98 },
    { id: 3, name: "Sony", count: 76 },
    { id: 4, name: "Dell", count: 65 },
    { id: 5, name: "LG", count: 54 },
    { id: 6, name: "Bose", count: 43 },
    { id: 7, name: "Canon", count: 32 },
]

const priceRanges = [
    { id: 1, range: "Under $25", count: 245 },
    { id: 2, range: "$25 to $50", count: 187 },
    { id: 3, range: "$50 to $100", count: 143 },
    { id: 4, range: "$100 to $200", count: 98 },
    { id: 5, range: "$200 & Above", count: 76 },
]

// const products = [
//     {
//         id: 1,
//         name: "Wireless Noise Cancelling Headphones",
//         price: 199.99,
//         rating: 4.5,
//         reviewCount: 1245,
//         image: "/placeholder.svg?height=200&width=200",
//         category: "Electronics",
//         subCategory: "Headphones",
//         brand: "Sony",
//         bestSeller: true,
//         discount: 15,
//     },
//     {
//         id: 2,
//         name: "Ultra HD Smart TV 55-inch",
//         price: 499.99,
//         rating: 4.3,
//         reviewCount: 867,
//         image: "/placeholder.svg?height=200&width=200",
//         category: "Electronics",
//         subCategory: "TVs",
//         brand: "Samsung",
//         bestSeller: false,
//         discount: 0,
//     },
//     {
//         id: 3,
//         name: "Smartphone Pro Max",
//         price: 999.99,
//         rating: 4.7,
//         reviewCount: 2134,
//         image: "/placeholder.svg?height=200&width=200",
//         category: "Electronics",
//         subCategory: "Smartphones",
//         brand: "Apple",
//         bestSeller: true,
//         discount: 0,
//     },
//     {
//         id: 4,
//         name: "Bluetooth Portable Speaker",
//         price: 79.99,
//         rating: 4.2,
//         reviewCount: 543,
//         image: "/placeholder.svg?height=200&width=200",
//         category: "Electronics",
//         subCategory: "Speakers",
//         brand: "Bose",
//         bestSeller: false,
//         discount: 10,
//     },
//     {
//         id: 5,
//         name: "Digital SLR Camera with 18-55mm Lens",
//         price: 649.99,
//         rating: 4.6,
//         reviewCount: 321,
//         image: "/placeholder.svg?height=200&width=200",
//         category: "Electronics",
//         subCategory: "Cameras",
//         brand: "Canon",
//         bestSeller: false,
//         discount: 5,
//     },
//     {
//         id: 6,
//         name: "Gaming Laptop 15.6-inch",
//         price: 1299.99,
//         rating: 4.4,
//         reviewCount: 765,
//         image: "/placeholder.svg?height=200&width=200",
//         category: "Electronics",
//         subCategory: "Laptops",
//         brand: "Dell",
//         bestSeller: false,
//         discount: 0,
//     },
// ]




export default function CategoryListPage() {
    const [selectedCategory, setSelectedCategory] = useState("Electronics")
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [products, setProduct] = useState<Product[]>([])
    const { slug } = useParams();


    const fetchProducts = async () => {
        try {
            const response = await categorySvc.fetchProductBySlug(slug as string)

            if (response) {
                setProduct(response.detail.products)
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-6">
                <NavLink to="/" className="hover:underline">
                    Home
                </NavLink>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground">{selectedCategory}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Mobile filter button */}
                <div className="lg:hidden mb-4">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    >
                        <span className="flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                    </Button>
                </div>

                {/* Sidebar filters */}
                <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block lg:w-1/4 space-y-6`}>
                    {/* Department/Category section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Department</h3>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category.id} className="flex items-center justify-between">
                                    <button
                                        className={`text-left hover:text-primary ${selectedCategory === category.name ? "font-medium text-primary" : ""}`}
                                        onClick={() => setSelectedCategory(category.name)}
                                    >
                                        {category.name}
                                    </button>
                                    <span className="text-sm text-muted-foreground">({category.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator />

                    {/* Subcategories */}
                    {selectedCategory && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3">{selectedCategory}</h3>
                            <Accordion type="single" collapsible defaultValue="subcategories">
                                <AccordionItem value="subcategories" className="border-none">
                                    <AccordionTrigger className="py-2 hover:no-underline">
                                        <span className="text-sm font-medium">Show all subcategories</span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2 pl-2">
                                            {subCategories[selectedCategory as keyof typeof subCategories]?.map((subCategory, index) => (
                                                <li key={index} className="flex items-center justify-between">
                                                    <button className="text-left text-sm hover:text-primary">{subCategory}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}

                    <Separator />

                    {/* Customer Reviews filter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Customer Reviews</h3>
                        <ul className="space-y-2">
                            {[4, 3, 2, 1].map((rating) => (
                                <li key={rating} className="flex items-center">
                                    <Checkbox id={`rating-${rating}`} className="mr-2" />
                                    <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                        <span className="ml-1 text-sm">& Up</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator />

                    {/* Brand filter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Brand</h3>
                        <ul className="space-y-2">
                            {brands.map((brand) => (
                                <li key={brand.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox id={`brand-${brand.id}`} className="mr-2" />
                                        <label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                                            {brand.name}
                                        </label>
                                    </div>
                                    <span className="text-sm text-muted-foreground">({brand.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator />

                    {/* Price filter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Price</h3>
                        <ul className="space-y-2">
                            {priceRanges.map((range) => (
                                <li key={range.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox id={`price-${range.id}`} className="mr-2" />
                                        <label htmlFor={`price-${range.id}`} className="text-sm cursor-pointer">
                                            {range.range}
                                        </label>
                                    </div>
                                    <span className="text-sm text-muted-foreground">({range.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:w-3/4">
                    {/* Results header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h1 className="text-2xl font-bold">{selectedCategory}</h1>
                        <div className="flex items-center mt-3 sm:mt-0">
                            <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                            <Select defaultValue="featured">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Avg. Customer Review</SelectItem>
                                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        1-{products.length} of over 1,000 results for "{selectedCategory}"
                    </p>

                    {/* Products grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product, index) => (

                            <ProductCard
                                onClick={product.slug}
                                key={index}
                                name={product.title}
                                image={product.images[0]}
                                price={product.actualAmt}
                                rating={4 + (index % 2) * 0.5}
                                reviews={50 + index * 5}

                                productId={product._id}
                            />
                            // <div key={product._id} className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                            //     <div className="relative">
                            //         <NavLink to={`/product/${product._id}`}>
                            //             <div className="aspect-square relative">
                            //                 <img

                            //                     src={product.images[0] || "/placeholder.svg"}
                            //                     alt={product.title}
                            //                     className="object-contain p-4"
                            //                 />
                            //             </div>
                            //         </NavLink>
                            //         {/* {product.seller && (
                            //             <div className="absolute top-2 left-2 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded">
                            //                 Best Seller
                            //             </div>
                            //         )} */}
                            //         {product.discount > 0 && (
                            //             <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            //                 {product.discount}% off
                            //             </div>
                            //         )}
                            //     </div>
                            //     <div className="p-4">
                            //         <NavLink to={`/product/${product._id}`} className="hover:text-primary">
                            //             <h3 className="font-medium line-clamp-2 mb-1">{product.title}</h3>
                            //         </NavLink>
                            //         <div className="flex items-center mb-1">
                            //             <div className="flex">
                            //                 {/* {Array.from({ length: 5 }).map((_, i) => (
                            //                     // <Star
                            //                     //     key={i}
                            //                     //     className={`h-4 w-4 ${i < Math.floor(product.rating)
                            //                     //         ? "fill-yellow-400 text-yellow-400"
                            //                     //         : i < product.rating
                            //                     //             ? "fill-yellow-400 text-yellow-400 fill-half"
                            //                     //             : "text-gray-300"
                            //                     //         }`}
                            //                     // />
                            //                 ))} */}
                            //             </div>
                            //             {/* <span className="text-xs text-muted-foreground ml-1">({product.reviewCount.toLocaleString()})</span> */}
                            //         </div>
                            //         <div className="flex items-baseline">
                            //             <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                            //             {product.discount > 0 && (
                            //                 <span className="text-sm text-muted-foreground line-through ml-2">
                            //                     ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                            //                 </span>
                            //             )}
                            //         </div>
                            //         <p className="text-xs text-muted-foreground mt-1">
                            //             {product.price >= 35 ? (
                            //                 <span className="text-green-600">FREE Delivery</span>
                            //             ) : (
                            //                 <span>FREE delivery with orders over $35</span>
                            //             )}
                            //         </p>
                            //     </div>
                            // </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <nav className="flex items-center space-x-1">
                            <Button variant="outline" size="icon" disabled>
                                <ChevronRight className="h-4 w-4 rotate-180" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                1
                            </Button>
                            <Button variant="outline" size="sm">
                                2
                            </Button>
                            <Button variant="outline" size="sm">
                                3
                            </Button>
                            <Button variant="outline" size="sm">
                                4
                            </Button>
                            <Button variant="outline" size="sm">
                                5
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

