
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { BrandImageUploader,   TextInputField } from "../form/input-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"
import brandSvc from "@/pages/brand/brand.service"
import { useState } from "react"

interface Brand {
  id: string
  image: string
  title: string
}

interface BrandDialogProps {
  isOpen: boolean
  onClose: () => void
//   onAdd: (newBrand: Omit<Brand, "id">) => void
//   onUpdate: (updatedBrand: Brand) => void
  brand?: Brand | null
}

export function BrandDialog({ isOpen, onClose, brand }: BrandDialogProps) {
    const [loading,setLoading]=useState(false);

    const brandDTO=Yup.object({
        title:Yup.string().min(3).max(100).required(),
        status:Yup.string().matches(/^(active|inactive)$/).default('inactive'),
        image:Yup.mixed().required()
    });

    const {control,handleSubmit,setError,formState:{errors}}=useForm({
        resolver:yupResolver(brandDTO),
        defaultValues:{
            title:brand?.title||'',
            status:'inactive',
           

        }
    });
 

 



  const submitForm=async(data:any)=>{
    setLoading(true);
    try{

        console.log("submitting data",data)
        const response= await brandSvc.createBrand(data);
        toast.success("Brand Created Successfully")
        console.log(response)
        onClose();

    }catch(exception){
        console.log(exception)
        toast.error("Brand cannot be created at this moment")
    }
    finally{
        setLoading(false)
    }

  }


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
              {/* <Input id="image" name="image" value={formData.image} onChange={handleChange} className="col-span-3" /> */}
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
              {/* <Input id="url" name="url" value={formData.url} onChange={handleChange} className="col-span-3" /> */}
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
                  <Select onValueChange={field.onChange} value={field.value} >
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

