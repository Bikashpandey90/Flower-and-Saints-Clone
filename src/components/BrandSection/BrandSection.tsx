import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import brandSvc, { BrandData } from "@/pages/brand/brand.service"
import { useNavigate } from "react-router-dom"

const BrandSection = () => {

    const [brands, setBrand] = useState<BrandData[]>([])
    const navigate = useNavigate()

    const fetchBrand = async () => {
        try {
            const response = await brandSvc.getHomeBrandList()
            setBrand(response.data.detail)
        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchBrand()
    }, [])



    return (<>
        <section className="bg-muted py-8 md:py-12">
            <div className="container">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Top Brands</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {brands.map((brand, index) => (
                            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4">
                                <div className="bg-background rounded-lg p-4 h-24 flex items-center justify-center">
                                    <img

                                        onClick={() => {
                                            navigate(`/brand/` + brand.slug)
                                        }}
                                        src={brand.image ? brand.image : ""}
                                        alt={brand.title}
                                        width={100}
                                        height={50}
                                        className="max-h-12 w-auto object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    </>)
}
export default BrandSection
