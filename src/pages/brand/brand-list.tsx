
import { useState, useEffect, useCallback } from "react"
import { Plus, SearchIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"

import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import brandSvc from "./brand.service"
import { BannerListTableSkeleton } from "@/components/skeleton/table-skeleton"
import { BrandTable } from "@/components/BrandTable/brandTable"
import { BrandDialog } from "@/components/BrandDialog/BrandDialog"

interface Brand {
    id: string 
    image: string
    title: string
    createdAt: string
    status: string
 
}

export default function BrandsPage() {
  const [data, setData] = useState([])
  const [loading, isLoading] = useState(false)

  const [search, setSearch] = useState<string>("")
  console.log(search)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalNoPages: 1,
  })

  const loadAllData = useCallback(
    async ({ page = 3 }) => {
      isLoading(true)
      try {
        const response = await brandSvc.getAllBrandList(page, 10, search)
        console.log("API Response:", response); 
        setData(response.detail )
        setPagination({
          page: +response.options.currentPage,
          limit: +response.options.limit,
          total: response.options.total,
          totalNoPages: Math.ceil(+response.options.totalData / +response.options.limit),
        })
        
      } catch (exception) {
        console.error(exception)
        toast.warning("Error fetching brands")
      } finally {
        isLoading(false)
      }
    },
    [search],
  )

  useEffect(() => {
    loadAllData({ page: 1 })
  }, [loadAllData])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadAllData({ page: 1 })
    }, 1500)
    return () => {
      clearTimeout(timeout)
    }
  }, [loadAllData])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalNoPages) {
      loadAllData({ page: newPage })
    }
  }
  
  

  return (
    <AnimatePresence>
      <div className="container mx-auto py-0">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Brands</h1>
          <div className="flex w-full sm:w-auto items-center space-x-2">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search brands..."
                className="pl-10 pr-4 py-2 w-full"
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Brand
            </Button>
          </div>
        </div>
        {loading ? (
          <BannerListTableSkeleton />
        ) : (
          <>{data && data.length ? <BrandTable brands={data} /> : <> No Brands to Show</>}</>
        )}
        <BrandDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false)
          }}
        />
        <div className="flex justify-center items-center mt-6 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {pagination.page} of {pagination.totalNoPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalNoPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AnimatePresence>
  )
}

