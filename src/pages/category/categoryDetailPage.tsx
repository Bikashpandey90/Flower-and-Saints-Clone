import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Edit, Eye, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { NavLink, useParams } from "react-router-dom"
import categorySvc from "./category.service"

export interface ParentCategory {
  _id: string;
  title: string;
  slug: string;
}
interface User {
  _id: string,
  name: string,
  email: string,
  status: 'active' | 'inactive'
}

/**
 * Interface for the complete category data
 */
export interface Category {
  _id: string;
  title: string;
  parentId: ParentCategory | null;
  slug: string;
  image: string;
  status: 'active' | 'inactive';
  createdBy: User;
  updatedBy: User | null;
  createdAt: string;
  updatedAt: string | null;
  __v: number;
}


export default function CategoryDetail() {
  // In a real app, you would fetch this data based on the ID
  // For now, we'll use the provided data
  const [category, setCategory] = useState<Category | null>(null)
  const { id } = useParams()

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP 'at' p")
  }
  const getCategoryDetail = async () => {
    try {
      const response = await categorySvc.getCategoryById(id as string)
      setCategory(response.data.detail)

    } catch (exception) {
      console.log(exception)
    }
  }
  useEffect(() => {
    getCategoryDetail()
  }, [id])

  return (

    <>
      {category && (
        <div className="container mx-auto px-4 py-6 max-w-5xl" >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <NavLink to="/admin/category">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to categories</span>
                </NavLink>
              </Button>
              <h1 className="text-2xl font-bold">Category Details</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <NavLink to={`/admin/categories/${category._id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </NavLink>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the category and remove it from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Category Image</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-full aspect-square max-w-[300px] rounded-md overflow-hidden border">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}

                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Badge variant={category.status === "active" ? "default" : "secondary"} className="capitalize">
                  {category.status}
                </Badge>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>Category information and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                    <p className="text-sm mt-1 break-all">{category._id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Slug</h3>
                    <p className="text-sm mt-1">{category.slug}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Parent Category</h3>
                  <div className="flex items-center mt-1">
                    <NavLink
                      to={category?.parentId ? `/admin/category/${category?.parentId?._id}` : ''}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      {category?.parentId?.title ? category.parentId.title : "Parent"}
                    </NavLink>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" /> Created At
                      </h3>
                      <p className="text-sm mt-1">{formatDate(category.createdAt)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                        <User className="h-3.5 w-3.5 mr-1" /> Created By
                      </h3>
                      <p className="text-sm mt-1">{category.createdBy.name}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" /> Updated At
                      </h3>
                      <p className="text-sm mt-1">{category?.updatedAt ? formatDate(category.updatedAt) : "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                        <User className="h-3.5 w-3.5 mr-1" /> Updated By
                      </h3>
                      <p className="text-sm mt-1">{category?.updatedBy?.name}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
      }

    </>
  )
}

