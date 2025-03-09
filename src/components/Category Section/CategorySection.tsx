import categorySvc, { CategoryData } from "@/pages/category/category.service";
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

const CategorySection = () => {

    const [categories, setCategories] = useState<CategoryData[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await categorySvc.getParentCategory();
            const filteredCategories = response.detail.filter((category: CategoryData) => category.parentId === null);
            setCategories(filteredCategories)


        } catch (exception) {
            console.log(exception);
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const colors = [
        { color: "bg-blue-100" },
        { color: "bg-pink-100" },
        { color: "bg-green-100" },
        { color: "bg-purple-100" },
        { color: "bg-orange-100" },
        { color: "bg-yellow-100" },
        { color: "bg-red-100" },
        { color: "bg-gray-100" },
        { color: "bg-teal-100" },
        { color: "bg-lime-100" },
        { color: "bg-amber-100" },
        { color: "bg-emerald-100" }
    ];


    return (<>
        <section className="container py-8 md:py-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
                <NavLink to="/categories" className="text-primary flex items-center gap-1 hover:underline">
                    View all <ArrowRight className="h-4 w-4" />
                </NavLink>
            </div>
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 `}>
                {categories.map((category, index) => (
                    <NavLink to={`/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`} key={index} className="group">
                        <div
                            className={` rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-transform group-hover:scale-105`}
                        >
                            <span className="text-4xl mb-2"><img className="rounded-lg p-4 flex flex-col  items-center justify-center w-32  h-32 transition-transform group-hover:scale-105 mix-blend-multiply" src={category.image} /></span>
                            <span className="font-medium text-center">{category.title}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>

    </>)
}
export default CategorySection;