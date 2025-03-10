
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { BannerImageUploader, InputType, TextInputField } from "../form/input-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"
import bannerSvc from "@/pages/banner/banner.service"
import { useState } from "react"

interface Banner {
  id: string
  image: string
  title: string
  url: string
  createdAt: string
  endingAt: string
}

interface BannerDialogProps {
  isOpen: boolean
  onClose: () => void
  //   onAdd: (newBanner: Omit<Banner, "id">) => void
  //   onUpdate: (updatedBanner: Banner) => void
  banner?: Banner | null
  onSuccess: () => void
}

export function BannerDialog({ isOpen, onClose, onSuccess, banner }: BannerDialogProps) {
  const [loading, setLoading] = useState(false);

  const bannerDTO = Yup.object({
    title: Yup.string().min(3).max(100).required(),
    link: Yup.string().url(),
    status: Yup.string().matches(/^(active|inactive)$/).default('inactive'),
    startDate: Yup.date(),
    endDate: Yup.date().min(Yup.ref('startDate')),
    image: Yup.mixed().required()
  });

  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(bannerDTO),
    defaultValues: {
      title: banner?.title || '',
      link: banner?.url || '',
      status: 'inactive',
      startDate: new Date(),
      endDate: new Date(),
    }
  });






  const submitForm = async (data: any) => {
    setLoading(true);
    try {

      if (!banner) {
        console.log("submitting data", data)
        const response = await bannerSvc.createBanner(data);
        toast.success("Banner Created Successfully")
        console.log(response)
      }
      onClose();
      onSuccess()


    } catch (exception) {
      console.log(exception)
      toast.error("Banner cannot be created at this moment")
    }
    finally {
      setLoading(false)
    }

  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{banner ? "Edit Banner" : "Add New Banner"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="image" className="text-right">
                Banner Title
              </Label>
              {/* <Input id="image" name="image" value={formData.image} onChange={handleChange} className="col-span-3" /> */}
              <TextInputField
                className="col-span-3"
                placeholder="Enter banner Title"
                name="title"
                control={control}
                errMsg={errors?.title?.message as string}

              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="title" className="text-right">
                Banner URL
              </Label>
              {/* <Input id="title" name="title" value={formData.title} onChange={handleChange} className="col-span-3" /> */}
              <TextInputField
                className="col-span-3"
                placeholder="Enter banner Url"


                type={InputType.URL}
                name="link"
                control={control}
                errMsg={errors?.link?.message as string}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="url" className="text-right">
                Image
              </Label>
              {/* <Input id="url" name="url" value={formData.url} onChange={handleChange} className="col-span-3" /> */}
              <BannerImageUploader
                name="image"
                className="col-span-3 bg-white"
                setError={setError}
                control={control}
                errMsg={errors?.image?.message as string}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="createdAt" className="text-right">
                Created At
              </Label>
              {/* <Input
                id="createdAt"
                name="createdAt"
                type="date"
                value={formData.createdAt}
                onChange={handleChange}
                className="col-span-3"
              /> */}
              <TextInputField
                className="col-span-3"

                name="startDate"
                type={InputType.DATE}
                control={control}
                errMsg={errors?.startDate?.message as string}

              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="endingAt" className="text-right">
                Ending At
              </Label>
              {/* <Input
                id="endingAt"
                name="endingAt"
                type="date"
                value={formData.endingAt}
                onChange={handleChange}
                className="col-span-3"
              /> */}
              <TextInputField
                className="col-span-3"

                name="endDate"
                type={InputType.DATE}
                control={control}
                errMsg={errors?.endDate?.message as string}
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
            <Button type="submit" disabled={loading}>{banner ? "Update" : "Add"} Banner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

