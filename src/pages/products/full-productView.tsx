import { useContext, useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Heart, MessageCircle, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ChatInterface from "@/components/Chat-interface/Chat-interface"
import { Product } from "./admin-products.page"
import { useNavigate, useParams } from "react-router-dom"
import productSvc from "./products.service"
import { formatNumber } from "@/lib/utils"
import { User } from "@/components/Chat-view/chat-view"
import { CartContext } from "@/context/cart-context"
import { AuthContext } from "@/context/auth-context"
import { toast } from "react-toastify"

// Mock data for related products

// Format price to currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price / 100)
}

export default function ProductView() {

  const [product, setProduct] = useState<Product | null>(null)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const navigate = useNavigate()
  const [loading] = useState(false)

  const [relatedProducts, setRelatedProduct] = useState<Product[]>([])
  // Get the first paragraph of description for the preview
  const { slug } = useParams()
  const cartContext = useContext(CartContext)
  const auth = useContext(AuthContext) as { loggedInUser: any }

  if (!cartContext) {
    return null
  }
  const { addToCart } = cartContext

  const fetchProduct = async () => {
    try {
      const response = await productSvc.fetchProductBySlug(slug as string)
      setProduct(response.data.detail.product)
      console.log("Fetched Product", product)
      setRelatedProduct(response.data.detail.related)

    } catch (exception) {
      console.log(exception)
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [slug])



  const descriptionPreview = product ? product?.description?.split("\n\n")[0] : ""



  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <div className="mb-4 rounded-lg overflow-hidden border border-border">
            <img
              src={product ? product.images[selectedImage] : "/placeholder.svg"}
              alt={product ? product.title : "Product image"}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product && product.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-md overflow-hidden ${selectedImage === product.images[index] ? "border-primary" : "border-border"}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - view ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product?.title}</h1>
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-4 w-4 fill-muted text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">4.0 (128 reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              {(product?.brand?.title) ? <Badge variant="outline" className="capitalize">
                {product?.brand?.title}
              </Badge> : null}
              {product?.category.map((cat: { _id: string; title: string }) => (
                <Badge key={cat._id} variant="outline">
                  {cat.title}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold">{product?.actualAmt !== undefined ? formatNumber(product.actualAmt) : "N/A"}</span>
              {(product?.discount ?? 0) > 0 && (
                <>
                  {product && <span className="text-xl text-muted-foreground line-through">{formatNumber(product.price)}</span>}
                  <Badge className="bg-red-500 hover:bg-red-600">{product?.discount}% OFF</Badge>
                </>
              )}
            </div>
            <p
              className={`text-sm ${product?.stock ?? 0 > 10 ? "text-green-600" : product?.stock ?? 0 > 0 ? "text-amber-600" : "text-red-600"}`}
            >
              {(product?.stock ?? 0) > 10
                ? "In Stock"
                : (product?.stock ?? 0) > 0
                  ? `Only ${product?.stock} left in stock`
                  : "Out of Stock"}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-2 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-3 py-2 border-l"
                  onClick={() => setQuantity(Math.min(product?.stock ?? 0, quantity + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <Button className="flex-1" disabled={product?.stock === 0 || loading}
                onClick={() => {
                  if (!auth.loggedInUser) {
                    navigate('/login')
                    toast.info("You need to login first")
                  }
                  if (auth.loggedInUser.role === 'seller') {
                    toast.info("Access denied for seller")
                  }
                  if (product?._id) {
                    const id: string = product._id;
                    const quantity = 1;
                    addToCart(id, quantity);
                  }

                }}

              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" aria-label="Add to wishlist">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Sold by</h3>
                <p>{product?.seller.name}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{showFullDescription ? product?.description : descriptionPreview}</p>
                  {product?.description && product.description.length > descriptionPreview.length && (
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 font-medium flex items-center"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? (
                        <>
                          Show less <ChevronUp className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Read more <ChevronDown className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Seller/Shop Information */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={product?.seller?.image} alt={product?.seller.name} />
                <AvatarFallback>
                  {product?.seller.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{product?.seller.name}'s Shop</h3>
                <p className="text-sm text-muted-foreground">Trusted seller since 2020</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">(203 reviews)</span>
              </div>
              <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Seller
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-[95vw]">
                  <DialogHeader>
                    <DialogTitle>Chat with {product?.seller.name}</DialogTitle>
                  </DialogHeader>
                  <ChatInterface seller={{ ...product?.seller, role: "seller" } as User} onClose={() => setIsChatOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product: Product) => (
            <Card key={product?._id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  onClick={() => {

                    navigate(`/products/${product.slug}`)
                    fetchProduct()

                  }}
                  src={product?.images[0] || "/placeholder.svg"}
                  alt={product?.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <CardContent className="p-2 sm:p-4">
                <h3 className="font-medium text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2">{product?.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="font-bold text-sm sm:text-base">{formatNumber(product?.actualAmt)}</span>
                  {product?.discount > 0 && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      {formatPrice(product?.price)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {relatedProducts.map((product: Product) => (
            <Card key={product?._id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  onClick={() => {

                    navigate(`/products/${product.slug}`)
                    fetchProduct()

                  }}
                  src={product?.images[0] || "/placeholder.svg"}
                  alt={product?.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <CardContent className="p-2 sm:p-4">
                <h3 className="font-medium text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2">{product?.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="font-bold text-sm sm:text-base">{formatNumber(product?.actualAmt)}</span>
                  {product?.discount > 0 && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      {formatPrice(product?.price)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div >
  )
}

