import CategoryCard from "../Category Card/category"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const categories = [
  {
    
    image: "https://flowersandsaints.com.au/cdn/shop/files/Walnut-Back.jpg?v=1745218023&width=1080",
    title: "Essential Tees",
    description: "Comfort. Fit. Timeless.",
    count: 29,
  },
  {
    image:
      "https://flowersandsaints.com.au/cdn/shop/files/Sand-Back_6a6aa6bb-7e82-479a-a6e2-adc16f9ea5ab.png?v=1746348227&width=1080",
    title: "Relax Crew",
    description: "Rooted. Quietly Powerful. Unshakably Grounded.",
    count: 8,
  },
  {
    image: "https://flowersandsaints.com.au/cdn/shop/files/FNS_-_PYP_-_VOL_2_-Artboard_9_1.png?v=1746341933&width=1080",
    title: "Relax Hood",
    description: "Cozy. Stylish. Essential.",
    count: 7,
  },
  {
    image: "https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=1080",
    title: "Drink Bottles",
    description: "Hydrate. Elevate. Sustain.",
    count: 7,
  },
  {
    image: "https://flowersandsaints.com.au/cdn/shop/files/Walnut-Back.jpg?v=1745218023&width=1080",
    title: "Essential Tees",
    description: "Comfort. Fit. Timeless.",
    count: 29,
  },
  {
    image:
      "https://flowersandsaints.com.au/cdn/shop/files/Sand-Back_6a6aa6bb-7e82-479a-a6e2-adc16f9ea5ab.png?v=1746348227&width=1080",
    title: "Relax Crew",
    description: "Rooted. Quietly Powerful. Unshakably Grounded.",
    count: 8,
  },
  {
    image: "https://flowersandsaints.com.au/cdn/shop/files/FNS_-_PYP_-_VOL_2_-Artboard_9_1.png?v=1746341933&width=1080",
    title: "Relax Hood",
    description: "Cozy. Stylish. Essential.",
    count: 7,
  },
  {
    image: "https://flowersandsaints.com.au/cdn/shop/files/Cat8.jpg?v=1744444109&width=1080",
    title: "Drink Bottles",
    description: "Hydrate. Elevate. Sustain.",
    count: 7,
  },
]

export default function ResponsiveCategorySection() {
  return (
    <section className="py-8 px-4 md:px-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 overflow-x-auto" style={{
          scrollbarWidth: "none"
        }}>
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <CategoryCard
                image={category.image}
                title={category.title}
                description={category.description}
                count={category.count}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
