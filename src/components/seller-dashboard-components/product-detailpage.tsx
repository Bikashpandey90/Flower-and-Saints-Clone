
import { useContext, useEffect, useState } from "react"
import {
    ArrowLeft,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Package,
    Tag,
    DollarSign,
    Layers,
    User,
    Calendar,
    Phone,
    Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { formatDateTOYMD } from "@/lib/utils"
import productSvc from "@/pages/products/products.service"
import { AuthContext } from "@/context/auth-context"
interface Category {
    _id: string;
    title: string;
    slug: string;
}
interface Brand {
    _id: string;
    title: string;
    slug: string;
}

interface Seller {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface CreatedBy {
    _id: string;
    name: string;
    email: string;
    status: string;
}

interface Product {
    _id: string;
    title: string;
    slug: string;
    category: Category[];
    brand: Brand[] | null;
    price: number;
    discount: number;
    actualAmt: number;
    stock: number;
    description: string;
    seller: Seller;
    images: string[];
    status: string;
    createdBy: CreatedBy;
    updatedBy: CreatedBy | null;
    createdAt: string;
    updatedAt: string | null;
    __v: number;
}


export default function ProductDetail() {
    const [productStatus, setProductStatus] = useState("inactive")
    const [product, setProduct] = useState<Product | null>(null);
    const auth = useContext(AuthContext) as { loggedInUser: any }
    const navigate = useNavigate()

    const { id } = useParams()

    const getProductDetails = async () => {
        try {
            const response = await productSvc.getProductById(id as string)
            setProduct(response.detail)
        } catch (exception) {
            console.error(exception)
        }
    }
    useEffect(() => {

        getProductDetails()
    }, [id])



    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US").format(price)
    }

    const handleStatusToggle = () => {
        setProductStatus(product?.status === "active" ? "inactive" : "active")
        console.log(productStatus)
    }

    return (
        <div className="container mx-auto py-6 px-4 max-w-7xl">
            {/* Header with navigation and actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <NavLink to={`/${auth.loggedInUser.role}/products`}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to products</span>
                        </NavLink>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{product?.title}</h1>
                        <p className="text-sm text-muted-foreground">Product ID: {product?._id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex items-center space-x-2 mr-4">
                        <Switch id="status-toggle" checked={product?.status === "active"} onCheckedChange={handleStatusToggle} />
                        <Label htmlFor="status-toggle" className="text-sm font-medium">
                            {product?.status === "active" ? "Active" : "Inactive"}
                        </Label>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant='default' size="sm" className="flex items-center gap-1">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the product and remove the data from our
                                    servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-primary text-destructive-foreground">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Image */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Product Image
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                            {product?.images && product?.images.length > 0 ? (
                                <img
                                    src={product?.images[0] || "/placeholder.svg"}
                                    alt={product?.title}
                                    className="object-cover h-full w-full"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-secondary">
                                    <span className="text-muted-foreground">No image available</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Badge variant={product?.status === "active" ? "default" : "secondary"} className="text-xs">
                                {product?.status === "active" ? <Eye className="mr-1 h-3 w-3" /> : <EyeOff className="mr-1 h-3 w-3" />}
                                {product?.status === "active" ? "Visible to customers" : "Hidden from customers"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Details */}
                <Card className="lg:col-span-2">
                    <Tabs defaultValue="details">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Product Information</CardTitle>
                                <TabsList>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="seller">Seller</TabsTrigger>
                                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                                </TabsList>
                            </div>
                            <CardDescription>View and manage product information</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <TabsContent value="details" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <Tag className="h-4 w-4" />
                                                Category
                                            </h3>
                                            <p>{product?.category.map((cat) => cat.title).join(", ")}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <DollarSign className="h-4 w-4" />
                                                Price
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                <p className="text-2xl font-bold">${formatPrice((product?.actualAmt ?? 0) / 1000)}</p>
                                                {(product?.discount ?? 0) > 0 && (
                                                    <p className="text-sm line-through text-muted-foreground">
                                                        ${formatPrice((product?.price ?? 0) / 1000)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <Layers className="h-4 w-4" />
                                                Stock
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{product?.stock}</p>
                                                <Badge variant={(product?.stock ?? 0) > 0 ? "outline" : "destructive"} className="text-xs">
                                                    {(product?.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Slug</h3>
                                            <p className="font-mono text-sm">{product?.slug}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                                            <p>{product?.description || "No description provided"}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Brand</h3>
                                            <p>{product?.brand ? product.brand?.title : "No brand specified"}</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="seller" className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                            <User className="h-4 w-4" />
                                            Seller Name
                                        </h3>
                                        <p className="font-medium">{product?.seller.name}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <Mail className="h-4 w-4" />
                                                Email
                                            </h3>
                                            <p className="font-mono text-sm">{product?.seller.email}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <Phone className="h-4 w-4" />
                                                Phone
                                            </h3>
                                            <p className="font-mono text-sm">{product?.seller.phone}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button variant="outline" size="sm" asChild>
                                            <NavLink to={`/sellers/${product?.seller._id}`}>View Seller Profile</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="metadata" className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <Calendar className="h-4 w-4" />
                                                Created At
                                            </h3>
                                            <p>{product ? formatDateTOYMD(product.createdAt) : "N/A"}</p>
                                            {/* "PPP 'at' p" */}
                                            <p className="text-sm text-muted-foreground mt-1">by {product?.createdBy.name}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                                                <Calendar className="h-4 w-4" />
                                                Last Updated
                                            </h3>
                                            {product?.updatedBy ? (
                                                <>
                                                    <p>{product?.updatedAt ? formatDateTOYMD(product.updatedAt) : "N/A"}</p>
                                                    <p className="text-sm text-muted-foreground mt-1">by {product?.updatedBy.name}</p>
                                                </>
                                            ) : (
                                                <p className="text-muted-foreground">No updates yet</p>
                                            )}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Product ID</h3>
                                        <p className="font-mono text-sm">{product?._id}</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </CardContent>
                    </Tabs>

                    <CardFooter className="flex justify-between border-t p-4">
                        <Button variant="outline" asChild>
                            <NavLink to="/products">Back to Products</NavLink>
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline"
                                onClick={() => {
                                    navigate('/products/' + product?.slug)

                                }}

                            >Preview</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

