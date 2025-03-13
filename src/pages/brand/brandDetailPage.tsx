import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Edit, Mail, Trash2 } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import brandSvc from "./brand.service"
import { NavLink, useParams } from "react-router-dom"

interface User {
  _id: string,
  name: string,
  email: string,
  status: 'active' | 'inactive'
}


export interface Brand {
  _id: string;
  title: string;
  slug: string;
  image: string;
  status: 'active' | 'inactive';
  createdBy: User;
  updatedBy: User | null;
  createdAt: string;
  updatedAt: string | null;
  __v: number;
}

export default function BrandDetail() {
  // In a real app, you would fetch this data based on the ID
  // For now, we'll use the provided data
  const [brand, setBrand] = useState<Brand | null>(null)
  const { id } = useParams()

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP 'at' p")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }
  const fetchBrand = async () => {
    try {
      const response = await brandSvc.getBrandById(id as string)
      setBrand(response.data.detail)

    } catch (exception) {
      console.error(exception)
    }
  }
  useEffect(() => {
    fetchBrand()
  }, [id])

  return (

    <>
      {
        brand && (
          <div className="container mx-auto px-4 py-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <NavLink to="/admin/brand">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to brands</span>
                  </NavLink>
                </Button>
                <h1 className="text-2xl font-bold">Brand Details</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <NavLink to={``}>
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
                        This action cannot be undone. This will permanently delete the brand and remove it from our servers.
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
                  <CardTitle>Brand Logo</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative w-full aspect-square max-w-[300px] rounded-md overflow-hidden border">
                    <img
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.title}

                      className="object-contain p-4 h-full w-full"
                      sizes="(max-width: 768px) 100vw, 300px "
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Badge variant={brand.status === "active" ? "default" : "secondary"} className="capitalize">
                    {brand.status}
                  </Badge>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{brand.title}</CardTitle>
                  <CardDescription>Brand information and details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                      <p className="text-sm mt-1 break-all">{brand._id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Slug</h3>
                      <p className="text-sm mt-1">{brand.slug}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Created Information</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(brand.createdBy.name)}&background=random`}
                            />
                            <AvatarFallback>{getInitials(brand.createdBy.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{brand.createdBy.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <Mail className="h-3 w-3 mr-1" />
                              {brand.createdBy.email}
                            </p>
                          </div>
                        </div>
                        <div className="sm:ml-auto text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{formatDate(brand.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Updated Information</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(brand?.updatedBy?.name || "")}&background=random`}
                            />
                            <AvatarFallback>{getInitials(brand?.updatedBy?.name || "")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{brand?.updatedBy?.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <Mail className="h-3 w-3 mr-1" />
                              {brand?.updatedBy?.email}
                            </p>
                          </div>
                        </div>
                        <div className="sm:ml-auto text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{brand?.updatedAt ? formatDate(brand.updatedAt) : "N/A"}</span>
                          </div>
                        </div>
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

