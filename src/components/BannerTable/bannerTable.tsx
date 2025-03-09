import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"
import { formatDateTOYMD } from "@/lib/utils"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import bannerSvc from "@/pages/banner/banner.service"
import { useState } from "react"
import { BannerEditDialog } from "../BannerDialog/BannerEditDialog"

interface Banner {
  _id: string
  image: string
  title: string
  link: string
  startDate: string
  endDate: string
  status: string
  id: string
  url: string
  createdAt: string
  endingAt: string
}

interface BannerTableProps {
  banners: Banner[]
  onSuccess: () => void
  //   onEdit: (banner: Banner) => void
  //   onDelete: (id: string) => void
}





export function BannerTable({ banners, onSuccess }: BannerTableProps) {
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openEditDialog = (banner: Banner) => {
    setSelectedBanner(banner)
    setIsEditDialogOpen(true)


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
        await bannerSvc.deleteBanner(id)
        toast.success("Banner deleted successfully")
        onSuccess()



      }

    } catch (exception) {
      console.log(exception)
      toast.error("Error deleting banner")
    }

  }
  return (<>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Ending At</TableHead>
          <TableHead>Status</TableHead>

          <TableHead>Created By</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners.map((banner) => (
          <TableRow key={banner._id}>
            <TableCell>
              <img

                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                width={300}
                height={150}
                className="object-cover rounded-md"
              />
            </TableCell>
            <TableCell>{banner.title}</TableCell>
            <TableCell className="whitespace-pre-wrap">{banner.link}</TableCell>
            <TableCell>{formatDateTOYMD(banner.startDate)}</TableCell>
            <TableCell>{formatDateTOYMD(banner.endDate)}</TableCell>
            <TableCell className="flex justify-center items-center text-center space-x-2 py-12 ">
              <span
                className={`w-3 h-3 rounded-full ${banner.status === "active" ? "bg-green-500" : "bg-red-200"
                  }`}
              ></span><span>{banner.status === "active" ? "Active" : "Inactive"}</span></TableCell>
            <TableCell>Bikash Pandey </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <NavLink to={`/admin/banner/${banner._id}`} >
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </NavLink>
                <Button variant="outline" size="icon" onClick={() => {
                  console.log("Button clicked!");
                  setIsEditDialogOpen(true);
                  openEditDialog(banner)
                  {
                    console.log(banner)
                  }
                }}>

                  <Pencil className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={(e) => {
                  e.preventDefault()
                  console.log("deleteing the banner with id: ", banner._id)
                  onDeleteClick(banner._id)
                }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>

        ))}
      </TableBody>
    </Table>
    <BannerEditDialog
      isOpen={isEditDialogOpen}
      banner={selectedBanner}

      onClose={() => {
        setIsEditDialogOpen(false)
      }}
    />
  </>
  )
}

