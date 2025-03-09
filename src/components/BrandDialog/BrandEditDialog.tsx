import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { BrandImageUploader,  TextInputField } from "../form/input-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import brandSvc from "@/pages/brand/brand.service"

interface Brand {
  _id: string
  image: string
  title: string
  status:string
}

interface BrandDialogProps {
  isOpen: boolean
  onClose: () => void
  brand?: Brand | null
}

export function BrandEditDialog({ isOpen, onClose, brand }: BrandDialogProps) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const brandDTO = Yup.object({
    title: Yup.string().min(3).max(100).required(),
    status: Yup.string().matches(/^(active|inactive)$/).default('inactive'),
    image: Yup.mixed(),
  })

  const { control, handleSubmit, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(brandDTO),
    defaultValues: {
      title: '', 
      status: 'inactive', 
      image: null, 
    },
  })

  const submitForm = async (data: any) => {
    setLoading(true)
    try {
       //send for updating the brand
       if (brand) {
         await brandSvc.updateBrand(brand._id, data)
       } else {
         throw new Error("Brand is undefined")
       }
      toast.success("Brand Created Successfully")
      onClose()
    } catch (exception) {
      console.log(exception)
      toast.error("Brand cannot be created at this moment")
    } finally {
      setLoading(false)
    }
  }

  const getBrandDetail = async () => {
    if (!brand?._id) {
      console.error("Brand ID is undefined")
      return
    }
    setLoading(true)
    try {
      const response = await brandSvc.getBrandById(brand._id)
      return response 
      // Process the response here if needed
    } catch (exception) {
      toast.error("Error fetching brand")
      navigate('/admin/brands')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (brand && brand._id) {
      getBrandDetail()

      
      // Set default values when the brand is available
      setValue("title", brand.title || '')
      setValue("status", brand.status || 'inactive')
      setValue("image", brand.image || null)
    }
  }, [brand, setValue])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{brand ? "Edit Brand" : "Add New Brand"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="image" className="text-right">
                Brand Title
              </Label>
              <TextInputField
                className="col-span-3"
                placeholder="Enter brand Title"
                name="title"
                control={control}
                errMsg={errors?.title?.message as string}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="url" className="text-right">
                Image
              </Label>
              <BrandImageUploader 
                name="image"
                className="col-span-3 bg-white"
                setError={setError}
                control={control}
                errMsg={errors?.image?.message as string}
              />
            </div>
            
           
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Publish</SelectItem>
                      <SelectItem value="inactive">UnPublish</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <span className="text-red-500 text-sm">{errors?.status?.message}</span>}
            </div> 
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{brand ? "Update" : "Add"} Brand</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
