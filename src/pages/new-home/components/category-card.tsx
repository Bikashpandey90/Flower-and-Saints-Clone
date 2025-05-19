import { ArrowRight } from "lucide-react"; 
import { NavLink } from "react-router-dom";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  count: number;
}

export default function CategoryCard({
  image,
  title,
  description,
  count,
}: CategoryCardProps) {
  return (
    // hover:shadow-xl
    <div className="group product-card rounded-3xl  transition-all duration-300">
      <NavLink
        to={`/categories/${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="block"
      >
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden rounded-t-3xl">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Text Section */}
        <div className="p-4">
          {/* Title with Superscript Count */}
          <div className="flex items-center justify-between mb-2">
            <div className="relative inline-block">
              <h3 className="text-xl md:text-2xl font-inter font-semibold text-black">
                {title}
              </h3>
              <span className="absolute -top-2 font-inter font-thin -right-3 text-xs text-neutral-600 ">
                {count}
              </span>
            </div>

            <ArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45" />
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600">{description}</p>
        </div>
      </NavLink>
    </div>
  );
}
