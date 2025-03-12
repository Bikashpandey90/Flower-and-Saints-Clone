
import { useCallback, useEffect, useState } from "react"
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { EditProductForm } from "./edit-form"
import productSvc from "@/pages/products/products.service"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export interface ProductData {

  _id: string,
  title: string,
  slug: string,
  category: [
    {
      _id: string,
      title: string,
      slug: string,
    }
  ] | any,
  brand: [
    {
      _id: string,
      title: string,
      slug: string,
    }
  ] | null,
  price: number,
  discount: number,
  actualAmt: number,
  stock: number,
  description: string,
  seller: {
    _id: string,
    name: string,
    email: string,
    phone: string
  },
  images: [
    string
  ],
  status: string
  createdBy: {
    _id: string,
    name: string,
    email: string,
    status: string
  },
  updatedBy: {
    _id: string,
    name: string,
    email: string,
    status: string
  } | null,
  createdAt: Date,
  updatedAt: Date | null,
  __v: 0

}


export function ProductTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [editProductId, setEditProductId] = useState<string | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)


  const [data, setData] = useState<ProductData[]>([])
  const navigate = useNavigate()

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(data.map((data: ProductData) => data._id))
    }
  }

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id)
    if (productToDelete) {
      handleDeleteConfirm(productToDelete)
    }
    setDeleteDialogOpen(true)
  }

  // const handleDeleteConfirm = () => {
  //   if (productToDelete) {
  //     setProducts(data.filter((dat) => dat._id !== productToDelete))
  //     setSelectedRows(selectedRows.filter((id) => id !== productToDelete))
  //     setDeleteDialogOpen(false)
  //     setProductToDelete(null)
  //   }
  // }

  const handleEditClick = (id: string) => {
    setEditProductId(id)
    setIsEditSheetOpen(true)
  }

  // const handleUpdateProduct = (updatedProduct: any) => {
  //   setData(data.map((dat) => (dat._id === updatedProduct._id ? updatedProduct : product)))
  //   setIsEditSheetOpen(false)
  //   setEditProductId(null)
  // }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
      case "Low Stock":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Low Stock
          </Badge>
        )
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const loadAllProducts = useCallback(
    async ({ page = 1 }) => {
      try {
        const response = await productSvc.getMyProducts(page, 10)
        setData(response.data.detail)

      } catch (exception) {
        console.log(exception)
      }
    }, []
  )
  useEffect(() => {
    loadAllProducts({ page: 1 })

  }, [])





  // const productToEdit: ProductData | null = editProductId ? data.find((p) => p._id === editProductId) || null : null


  const handleDeleteConfirm = async (id: string) => {
    try {
      await productSvc.deleteProduct(id)
      loadAllProducts({ page: 1 })
      toast.success("Product deleted successfully")

    } catch (exception) {
      console.log(exception)
      toast.error("Error deleting product !")
    }
  }



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products ({data.length})</h2>
        {selectedRows.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setProductToDelete(selectedRows.join(","))
              setDeleteDialogOpen(true)
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected ({selectedRows.length})
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === data.length && data.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Product</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((dat) => (
                <TableRow key={dat._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(dat._id)}
                      onCheckedChange={() => handleSelectRow(dat._id)}
                      aria-label={`Select ${dat.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={dat.images[0] || "/placeholder.svg"}
                      width={50}
                      height={50}
                      alt={dat.title}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{dat.title}</TableCell>
                  <TableCell>{dat.category[0].title}</TableCell>
                  <TableCell>${dat.price.toFixed(2)}</TableCell>
                  <TableCell>{dat.stock}</TableCell>
                  <TableCell>{getStatusBadge(dat.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(dat._id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() =>

                          navigate('/seller/products/' + dat._id)

                        }>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(dat._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the selected product(s).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive"
              onClick={() => handleDeleteConfirm(productToDelete!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>Make changes to your product here.</SheetDescription>
          </SheetHeader>

          <EditProductForm
            productId={editProductId!}

          />
        </SheetContent>
      </Sheet>
    </div>
  )
}

