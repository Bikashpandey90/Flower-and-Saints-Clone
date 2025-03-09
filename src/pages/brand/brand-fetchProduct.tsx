import { useEffect, useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useParams } from "react-router-dom"
import { Product } from "@/components/Shopping Cart PopOver/shopping-cart"
import brandSvc, { BrandData } from "./brand.service"
import { ProductCard } from "@/components/Product Card/productCard"

// // Sample brand data


// Sample product categories
const categories = ["All Products", "Smartphones", "Laptops", "Tablets", "Wearables", "Audio", "Smart Home"]

// Sample products data
// const products = [
//     {
//         id: 1,
//         name: "TechVision Pro Smartphone",
//         price: 799.99,
//         rating: 4.7,
//         reviewCount: 1245,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Smartphones",
//     },
//     {
//         id: 2,
//         name: "TechVision Ultra Laptop",
//         price: 1299.99,
//         rating: 4.5,
//         reviewCount: 867,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Laptops",
//     },
//     {
//         id: 3,
//         name: "TechVision Tab 10",
//         price: 499.99,
//         rating: 4.3,
//         reviewCount: 532,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Tablets",
//     },
//     {
//         id: 4,
//         name: "TechVision SmartWatch X",
//         price: 299.99,
//         rating: 4.6,
//         reviewCount: 978,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Wearables",
//     },
//     {
//         id: 5,
//         name: "TechVision Noise-Cancelling Headphones",
//         price: 249.99,
//         rating: 4.8,
//         reviewCount: 1532,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Audio",
//     },
//     {
//         id: 6,
//         name: "TechVision Smart Speaker",
//         price: 129.99,
//         rating: 4.4,
//         reviewCount: 765,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Smart Home",
//     },
//     {
//         id: 7,
//         name: "TechVision Wireless Earbuds",
//         price: 159.99,
//         rating: 4.5,
//         reviewCount: 1023,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Audio",
//     },
//     {
//         id: 8,
//         name: "TechVision Smart Thermostat",
//         price: 179.99,
//         rating: 4.2,
//         reviewCount: 456,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Smart Home",
//     },
// ]

//  const brandData = {
//      name: s,
//      logo: "/placeholder.svg?height=60&width=120",
//      description:
// //          "TechVision: Innovating for a smarter tomorrow. Our cutting-edge consumer electronics blend style with functionality to enhance your daily life.",
//      foundedYear: 2005,
//      headquarters: "Silicon Valley, CA",
//      keyFeatures: [
//          "Industry-leading 5-year warranty",
//          "30-day money-back guarantee",
//          "24/7 customer support",
//          "Eco-friendly packaging",
//          "Free software updates for life",
//      ],
//  }

export default function BrandProductListing() {
    const [selectedCategory, setSelectedCategory] = useState("All Products")

    const [products, setProduct] = useState<Product[]>([])
    const [brandData, setBrand] = useState<BrandData | null>(null)
    const { slug } = useParams()

    // const filteredProducts =
    // selectedCategory === "All Products" ? products : products.filter((product) => product.category === selectedCategory)

    const fetchProductBySlug = async () => {
        try {
            const response = await brandSvc.fetchBySlug(slug as string)
            setProduct(response.detail.products)
            setBrand(response.detail.brand)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchProductBySlug()
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Brand information sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-muted p-4 rounded-lg lg:sticky lg:top-4">
                            <Accordion type="single" collapsible className="lg:hidden">
                                <AccordionItem value="brand-info">
                                    <AccordionTrigger className="flex items-center">
                                        <img
                                            src={brandData?.image || "/placeholder.svg"}
                                            alt={brandData?.title}
                                            width={80}
                                            height={40}
                                            className="mr-2 mix-blend-multiply"
                                        />
                                        <h1 className="text-xl font-bold">{brandData?.title}</h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <BrandInfo brandData={brandData} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="hidden lg:block">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={brandData?.image || "/placeholder.svg"}
                                        alt={brandData?.title}
                                        width={120}
                                        height={60}
                                        className="mr-4 mix-blend-multiply"
                                    />
                                    <h1 className="text-2xl font-bold">{brandData?.title}</h1>
                                </div>
                                <BrandInfo brandData={brandData} />
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:w-3/4">
                        {/* Results header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                            <h2 className="text-2xl font-bold mb-2 sm:mb-0">{brandData?.title} Products</h2>
                            <div className="flex items-center">
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

                        {/* Categories */}
                        <div className="mb-6 overflow-x-auto">
                            <div className="flex flex-nowrap gap-2 pb-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category)}
                                        className="whitespace-nowrap"
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Products grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
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
                                //     <NavLink to={`/product/${product._id}`}>
                                //         <div className="aspect-square relative">
                                //             <img
                                //                 src={product.images[0] || "/placeholder.svg"}
                                //                 alt={product.title}

                                //                 className="object-cover"
                                //             />
                                //         </div>
                                //     </NavLink>
                                //     <div className="p-4">
                                //         <NavLink to={`/product/${product._id}`} className="hover:text-primary">
                                //             <h3 className="font-medium line-clamp-2 mb-1 text-sm sm:text-base">{product.title}</h3>
                                //         </NavLink>
                                //         <div className="flex items-center mb-1">
                                //             <div className="flex">
                                //                 {/* {Array.from({ length: 5 }).map((_, i) => (
                                //                     <Star
                                //                         key={i}
                                //                         className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.rating)
                                //                             ? "fill-yellow-400 text-yellow-400"
                                //                             : i < product.rating
                                //                                 ? "fill-yellow-400 text-yellow-400 fill-half"
                                //                                 : "text-gray-300"
                                //                             }`}
                                //                     />
                                //                 ))} */}
                                //             </div>
                                //             <span className="text-xs text-muted-foreground ml-1">
                                //                 {/* ({product.reviewCount.toLocaleString()}) */}
                                //             </span>
                                //         </div>
                                //         <div className="text-base sm:text-lg font-bold">${product.price.toFixed(2)}</div>
                                //     </div>
                                // </div>
                            ))}
                        </div>

                        {/* Load more button */}
                        <div className="mt-8 text-center">
                            <Button variant="outline">Load More Products</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BrandInfo({ brandData }: { brandData: BrandData | null }) {

    const brandDatas =
    {
        keyFeatures: [
            "Industry-leading 5-year warranty",
            "30-day money-back guarantee",
            "24/7 customer support",
            "Eco-friendly packaging",
            "Free software updates for life",
        ],
    }


    return (
        <>
            <p className="text-sm text-muted-foreground mb-4">

                {brandData?.title}: Innovating for a smarter tomorrow. Our cutting-edge consumer electronics blend style with functionality to enhance your daily life.

            </p>
            <div className="mb-4">
                <p className="text-sm">
                    <strong>Founded:</strong> 2005
                </p>
                <p className="text-sm">
                    <strong>Headquarters:</strong> Silicon Valley, CA
                </p>
            </div>
            <h2 className="font-semibold mb-2">Why Choose {brandData?.title}?</h2>
            <ul className="space-y-2">
                {brandDatas.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
            <Button className="w-full mt-6">Visit Brand Website</Button>
        </>
    )
}

