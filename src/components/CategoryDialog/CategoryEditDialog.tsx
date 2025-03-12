import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { CategoryImageUploader, TextInputField } from "../form/input-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import categorySvc from "@/pages/category/category.service"

interface Category {
  _id: string
  image: string
  title: string
  status:string
  parentId?:string
}

interface CategoryDialogProps {
  isOpen: boolean
  onClose: () => void
  category?: Category | null
}

export function CategoryEditDialog({ isOpen, onClose, category }: CategoryDialogProps) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
    const [categories,setCategories]=useState<Category[]>([])
  

  const categoryDTO = Yup.object({
    title: Yup.string().min(3).max(100).required(),
    status: Yup.string().matches(/^(active|inactive)$/).default('inactive'),
    image: Yup.mixed().notRequired(),
    parentId:Yup.string().nullable()
  })

  const { control, handleSubmit, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(categoryDTO),
    defaultValues: {
      title: '', 
      status: 'inactive', 
      image: null, 
      parentId: null
    },
  })

  const submitForm = async (data: any) => {
    setLoading(true)
    try {
       //send for updating the category
       if (category) {
         await categorySvc.updateCategory(category._id, data)
       } else {
         throw new Error("Category is undefined")
       }
      toast.success("Category Created Successfully")
      onClose()
    } catch (exception) {
      console.log(exception)
      toast.error("Category cannot be created at this moment")
    } finally {
      setLoading(false)
    }
  }

  const getCategoryDetail = async () => {
    if (!category?._id) {
      console.error("Category ID is undefined")
      return
    }
    setLoading(true)
    try {
      const response = await categorySvc.getCategoryById(category._id)
      return response 
      // Process the response here if needed
    } catch (exception) {
      toast.error("Error fetching category")
      navigate('/admin/categorys')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (category && category._id) {
      getCategoryDetail()

      
      // Set default values when the category is available
      setValue("title", category.title || '')
      setValue("status", category.status || 'inactive')
      setValue("image", category.image || null)
      setValue("parentId",category.parentId||null)
    }
  }, [category, setValue])
  const fetchCategories=useCallback(
    async ({page=1}) => {
      try{
        const response=await categorySvc.getAllCategoryList(page,40)
        setCategories(response.data.detail)

      }catch(exception){
        console.error(exception)
      }
    },
    []
  )
  
  useEffect(()=>{
   
    fetchCategories({page:1})
  },[])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="image" className="text-right">
                Category Title
              </Label>
              <TextInputField
                className="col-span-3"
                placeholder="Enter category Title"
                name="title"
                control={control}
                errMsg={errors?.title?.message as string}
              />
            </div>
         
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="url" className="text-right">
                Image
              </Label>
              <CategoryImageUploader 
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
             {/* Parent Category Dropdown */}
             <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="parentId" className="text-right">Parent</Label>
              <Controller
                name="parentId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value)=>field.onChange(value==='null'?null:value)} value={field.value ?? "null"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.parentId && <span className="text-red-500 text-sm">{errors.parentId.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{category ? "Update" : "Add"} Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
