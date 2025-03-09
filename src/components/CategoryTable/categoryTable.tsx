import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"
import { formatDateTOYMD } from "@/lib/utils"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import categorySvc from "@/pages/category/category.service"
import { useState } from "react"
import { CategoryEditDialog } from "../CategoryDialog/CategoryEditDialog"

interface Category {
  _id: string
  image: string
  title: string
  createdAt:string
  status: string
  parentId: string
}

interface CategoryTableProps {
  categorys: Category[]
  //   onEdit: (category: Category) => void
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
      await categorySvc.deleteCategory(id)
      toast.success("Category deleted successfully")


    }



  } catch (exception) {
    console.log(exception)
    toast.error("Error deleting category")
  }

}



export function CategoryTable({ categorys }: CategoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openEditDialog=(category:Category)=>{
    setSelectedCategory(category)
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
        {categorys.map((category) => (
          <TableRow key={category._id}>
            <TableCell>
              <img

                src={category.image || `https://placehold.co/400x400?text=${category.title}`}
                alt={category.title}
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
            </TableCell>
            <TableCell>{category.title}</TableCell>
            <TableCell>{formatDateTOYMD(category.createdAt)}</TableCell>
            <TableCell className="flex justify-center items-center text-center space-x-2 py-12 ">
              <span
                className={`w-3 h-3 rounded-full ${category.status === "active" ? "bg-green-500" : "bg-red-200"
                  }`}
              ></span><span>{category.status === "active" ? "Active" : "Inactive"}</span></TableCell>
            <TableCell>Bikash Pandey </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <NavLink to={`/admin/category/${category._id}`} >
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </NavLink>
                <Button variant="outline" size="icon" onClick={() => {
                  console.log("Button clicked!");
                  setIsEditDialogOpen(true);
                  openEditDialog(category)
                  {
                    console.log(category)
                  }
                }}>
                  
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={(e) => {
                  e.preventDefault()
                  console.log("deleteing the category with id: ", category._id)
                  onDeleteClick(category._id)
                }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>

        ))}
      </TableBody>
    </Table>
    <CategoryEditDialog
      isOpen={isEditDialogOpen}
      category={selectedCategory}
      
      onClose={() => {
        setIsEditDialogOpen(false)
      }}
    />
  </>
  )
}

