
import { useCallback, useContext, useEffect, useState } from "react"
import {
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,

  ChevronLeft,
  ChevronRight,

} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AuthContext } from "@/context/auth-context"
import { toast } from "react-toastify"
import productSvc from "./products.service"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export interface Product {
  _id: string,
  title: string,
  slug: string,
  category: any,
  price: number,
  brand: {
    _id: string,
    title: string,
    slug: string
  },
  stock: number,

  discount: number,
  actualAmt: number,
  description: string,
  seller: {
    _id: string,
    name: string,
    email: string,
    phone: string,
    image: string
  },
  images: any,
  status: string,
  createdBy: {
    _id: string,
    name: string,
    email: string
    status: string
  }
  updatedBy: {
    _id: string,
    name: string,
    email: string
    status: string
  } | null,
  createdAt: Date | null,
  updatedAt: Date | null



}

export default function AdminProductsPage() {
  const navigate = useNavigate()
  const [datas, setData] = useState<Product[]>([]);
  const [item, selectedItem] = useState<string>();

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const auth = useContext(AuthContext) as { loggedInUser: any }

  // Toggle selection of a product
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  // Toggle selection of all products
  const toggleAllProducts = () => {
    if (selectedProducts.length === datas.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(datas.map((datas) => datas._id))
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  // ------------------------MY Functions--------------------------------



  const loadAllProducts = useCallback(
    async ({ page = 1 }) => {
      try {
        const response = await productSvc.getAllProductList(page, 30)
        setData(response?.detail || [])

      } catch (exception) {
        console.log(exception);
        toast.error("Error loading products !")
      } finally {
        console.log("Done")
      }
    },
    []
  )
  useEffect(() => {
    loadAllProducts({ page: 1 })
  }, [])


  const deleteProductItem = async (id: string) => {
    try {
      let result = await Swal.fire({
        title: 'Are you sure ?',
        text: 'You will not be able to recover this!',
        icon: 'warning',
        confirmButtonColor: "#0E0E0E",
        cancelButtonColor: "#ccc",

        confirmButtonText: "Delete"

      })
      if (result.isConfirmed) {
        await productSvc.deleteProduct(id)
        loadAllProducts({ page: 1 })
        toast.success("Product deleted successfully !")
      }


    } catch (exception) {
      console.log(exception)
      toast.error("Error deleting product!")
    }
  }







  return (
    <div className="flex h-screen bg-background">

      {/* Main content */}
      <main className={`flex-1 transition-all duration-200 `}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <h1 className="text-xl font-semibold">Products</h1>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    src={auth.loggedInUser.image}
                    alt="Admin"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  navigate('/admin/profile')
                }}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Products content */}
        <div className="p-4 sm:p-6">
          {/* Actions bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">All Products</h2>
              <Badge variant="outline">{datas?.length}</Badge>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="home">Home Goods</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-name" className="text-right">
                        Name
                      </Label>
                      <Input id="product-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-category" className="text-right">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="apparel">Apparel</SelectItem>
                          <SelectItem value="home">Home Goods</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-price" className="text-right">
                        Price
                      </Label>
                      <Input id="product-price" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-stock" className="text-right">
                        Stock
                      </Label>
                      <Input id="product-stock" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="product-description" className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea id="product-description" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile search */}
          <div className="mb-4 block md:hidden">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-8" />
            </div>
          </div>

          {/* Products table */}
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedProducts.length === datas.length && datas.length > 0}
                      onCheckedChange={toggleAllProducts}
                      aria-label="Select all products"
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datas.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(data._id)}
                        onCheckedChange={() => toggleProductSelection(data._id)}
                        aria-label={`Select ${data.title}`}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={data.images[0] || "/placeholder.svg"}
                        alt={data.title}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{data?.title}</span>
                        <span className="text-xs text-muted-foreground">{data._id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{data?.category?.length > 0 ? data.category[0].title : "Parent"}</TableCell>
                    <TableCell className="hidden sm:table-cell">{data?.stock || 40}</TableCell>
                    <TableCell>${data.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className={getStatusColor(data.status)}>
                        {data.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu onOpenChange={() => {
                        selectedItem(data._id)
                        console.log(data._id)
                      }} >
                        <DropdownMenuTrigger asChild  >
                          <Button variant="secondary" size="icon" >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              navigate('/admin/products/' + data._id)

                            }}>View</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"
                            onClick={() => {
                              if (item) {
                                deleteProductItem(item);
                                console.log(item)
                              } else {
                                toast.error("No user selected");
                              }
                            }}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-8</strong> of <strong>24</strong> products
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

