import { useEffect, useState, useRef } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"
import bannerSvc, { type BannerData } from "@/pages/banner/banner.service"

const CarouselSlider = () => {
  const [autoplay] = useState(true)
  const [banners, setBanners] = useState<BannerData[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchBanners = async () => {
    try {
      const response = await bannerSvc.getHomeBannerList()
      setBanners(response.detail)
    } catch (exception) {
      console.log(exception)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  // Setup autoplay when the carousel API is available
  useEffect(() => {
    if (!api || !autoplay) {
      // Clear any existing interval if autoplay is turned off or API isn't ready
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Start the autoplay interval
    intervalRef.current = setInterval(() => {
      api.scrollNext()
    }, 2000)

    // Cleanup function to clear the interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [api, autoplay])

  // // Toggle autoplay function
  // const toggleAutoplay = () => {
  //   setAutoplay((current) => !current)
  // }

  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        data-carousel="main-banner"
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] w-full ">
                <a href={banner.link}
                  target="_banner"
                >
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-full object-cover"

                  />
                </a>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-16">
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-md"></p>
                </div> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          {/* <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={toggleAutoplay}
          >
            {autoplay ? <Pause className="h-4 w-4 text-white" /> : <ChevronRight className="h-4 w-4 text-white" />}
          </Button>
          <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/20 backdrop-blur-sm hover:bg-white/40" />
          <CarouselNext className="relative inset-0 translate-y-0 bg-white/20 backdrop-blur-sm hover:bg-white/40" /> */}
        </div>
      </Carousel>
    </section>
  )
}

export default CarouselSlider

