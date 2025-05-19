export default function ColorFilter() {
    const colors = [
        { id: "red", color: "#c25b4a" },
        { id: "yellow", color: "#f0b93a" },
        { id: "gray", color: "#8c8c8c" },
        { id: "brown", color: "#5d4a3c" },
        { id: "white", color: "#ffffff" },
        { id: "cream", color: "#f5f0e5" },
        { id: "green", color: "#1a472a" },
        { id: "tan", color: "#c2b280" },
        { id: "navy", color: "#1a2f4b" },
        { id: "olive", color: "#556b2f" },
        { id: "teal", color: "#2a4c4c" },
        { id: "beige", color: "#e8dac5" },
        { id: "black", color: "#000000" },
        { id: "burgundy", color: "#800020" },
        { id: "darkblue", color: "#0f1e38" },
    ]

    return (
        <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
                <button
                    key={color.id}
                    className="w-10 h-10 rounded-full border border-gray-300 hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all "
                    style={{ backgroundColor: color.color }}
                    aria-label={`Filter by ${color.id} color`}
                ></button>
            ))}
        </div>
    )
}
