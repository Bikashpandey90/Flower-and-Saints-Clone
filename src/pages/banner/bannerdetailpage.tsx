import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import bannerSvc from "./banner.service"
import { toast } from "react-toastify"
import { formatDateTOYMD } from "@/lib/utils"

interface Banner {
  id: string
  image: string
  title: string
  link: string
  startDate: string
  endDate: string
}

export default function BannerDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams() // Destructure id from params
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<Banner | null>(null) // Define state properly

  const getBannerDetail = async () => {
    setLoading(true)
    try {
      const response = await bannerSvc.getBannerById(id as string) // Await the API call
      setDetail(response.detail)
    } catch (exception) {
      toast.error("Error fetching banner")
      navigate('/admin/banners')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBannerDetail()
  }, [id])

  if (loading) return <p>Loading...</p> // Show loading message

  if (!detail) return <p>Banner not found</p> // Handle null case

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-1"
    >
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Banners
      </Button>
      <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.div className="relative h-64 md:h-96">
          <img src={detail.image || "/placeholder.svg"} alt={detail.title} className="w-full h-full object-cover" />
        </motion.div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{detail.title}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">URL</h2>
              <p>{detail.link}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Created At</h2>
              <p>{formatDateTOYMD(detail.startDate)}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Ending At</h2>
              <p>{formatDateTOYMD(detail.endDate)}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Created By</h2>
              <p>Bikash Pandey</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
