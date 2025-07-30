export default function CategoryFilter() {
    const categories = [
        { id: "hoodies", name: "Hoodies", count: 7 },
        { id: "shorts", name: "Shorts", count: 2 },
        { id: "sweatshirts", name: "Sweatshirts", count: 8 },
        { id: "tshirts", name: "T-Shirts", count: 29 },
        { id: "trackpants", name: "Track Pants", count: 2 },
    ]

    return (
        <div className="space-y-2">
            {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                    <input type="checkbox" id={`category-${category.id}`} className="w-4 h-4 border-gray-300 rounded-2xl" />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-lg ">
                        {category.name} ({category.count})
                    </label>
                </div>
            ))}
        </div>
    )
}

