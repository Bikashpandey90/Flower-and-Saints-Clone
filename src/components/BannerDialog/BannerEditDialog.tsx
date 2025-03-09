import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { BannerImageUploader, InputType, TextInputField } from "../form/input-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import bannerSvc from "@/pages/banner/banner.service"
import { formatDateTOYMD } from "@/lib/utils"

interface Banner {
  _id: string
  image: string
  title: string
  link: string
  startDate: string
  endDate: string
  status: string
}

interface BannerDialogProps {
  isOpen: boolean
  onClose: () => void
  banner?: Banner | null
}

export function BannerEditDialog({ isOpen, onClose, banner }: BannerDialogProps) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const bannerDTO = Yup.object({
    title: Yup.string().min(3).max(100).required(),
    link: Yup.string().url(),
    status: Yup.string().matches(/^(active|inactive)$/).default('inactive'),
    startDate: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Start date mmust be in YYYY-MM-DD format"),
    endDate: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "End date mmust be in YYYY-MM-DD format")
      .test("is-greater", "Enda date can't be before start date", function (value) {
        const { startDate } = this.parent;
        return !startDate || !value || value >= startDate
      }).required(),
    image: Yup.mixed(),
  })

  const { control, handleSubmit, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(bannerDTO),
    defaultValues: {
      title: '',
      link: '',
      status: 'inactive',
      startDate: '',
      endDate: '',
      image: null,
    },
  })

  const submitForm = async (data: any) => {
    setLoading(true)
    try {
      //send for updating the banner
      if (banner) {
        await bannerSvc.updateBanner(banner._id, data)
      } else {
        throw new Error("Banner is undefined")
      }
      toast.success("Banner Updated Successfully")
      onClose()
    } catch (exception) {
      console.log(exception)
      toast.error("Banner cannot be created at this moment")
    } finally {
      setLoading(false)
    }
  }

  const getBannerDetail = async () => {
    if (!banner?._id) {
      console.error("Banner ID is undefined")
      return
    }
    setLoading(true)
    try {
      const response = await bannerSvc.getBannerById(banner._id)
      return response
      // Process the response here if needed
    } catch (exception) {
      toast.error("Error fetching banner")
      navigate('/admin/banners')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (banner && banner._id) {
      getBannerDetail()


      // Set default values when the banner is available
      setValue("title", banner.title || '')
      setValue("link", banner.link || '')
      setValue("status", banner.status || 'inactive')
      setValue("startDate", formatDateTOYMD(banner.startDate) as string)
      setValue("endDate", formatDateTOYMD(banner.endDate) as string)
      setValue("image", banner.image || null)
    }
  }, [banner, setValue])

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
            <Button type="submit" disabled={loading}>{banner ? "Update" : "Add"} Banner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
