import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"
import { formatDateTOYMD } from "@/lib/utils"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import brandSvc from "@/pages/brand/brand.service"
import { useState } from "react"
import { BrandEditDialog } from "../BrandDialog/BrandEditDialog"

interface Brand {
  _id: string
  image: string
  title: string
  createdAt: string
  status: string
}

interface BrandTableProps {
  brands: Brand[]
  //   onEdit: (brand: Brand) => void
  //   onDelete: (id: string) => void
}

const onDeleteClick = async (id: string) => {

  try {
    let result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      confirmButtonColor: "#0E0E0E",
      cancelButtonColor: "#ccc",

      confirmButtonText: "Delete"

    })
    if (result.isConfirmed) {
      //delete
      await brandSvc.deleteBrand(id)
      toast.success("Brand deleted successfully")


    }



  } catch (exception) {
    console.log(exception)
    toast.error("Error deleting brand")
  }

}



export function BrandTable({ brands }: BrandTableProps) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openEditDialog=(brand:Brand)=>{
    setSelectedBrand(brand)
    setIsEditDialogOpen(true)
    

  }
  return (<>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>

          <TableHead>Created By</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand._id}>
            <TableCell>
              <img

                src={brand.image || "/placeholder.svg"}
                alt={brand.title}
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
            </TableCell>
            <TableCell>{brand.title}</TableCell>
            <TableCell>{formatDateTOYMD(brand.createdAt)}</TableCell>
            <TableCell className="flex justify-center items-center text-center space-x-2 py-12 ">
              <span
                className={`w-3 h-3 rounded-full ${brand.status === "active" ? "bg-green-500" : "bg-red-200"
                  }`}
              ></span><span>{brand.status === "active" ? "Active" : "Inactive"}</span></TableCell>
            <TableCell>Bikash Pandey </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <NavLink to={`/admin/brand/${brand._id}`} >
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </NavLink>
                <Button variant="outline" size="icon" onClick={() => {
                  console.log("Button clicked!");
                  setIsEditDialogOpen(true);
                  openEditDialog(brand)
                  {
                    console.log(brand)
                  }
                }}>
                  
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={(e) => {
                  e.preventDefault()
                  console.log("deleteing the brand with id: ", brand._id)
                  onDeleteClick(brand._id)
                }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>

        ))}
      </TableBody>
    </Table>
    <BrandEditDialog
      isOpen={isEditDialogOpen}
      brand={selectedBrand}
      
      onClose={() => {
        setIsEditDialogOpen(false)
      }}
    />
  </>
  )
}

