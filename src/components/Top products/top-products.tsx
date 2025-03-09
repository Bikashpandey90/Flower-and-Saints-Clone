import { Badge } from "@/components/ui/badge"

const products = [
  {
    name: "Maneki Neko Poster",
    sold: 1249,
    change: "+15.2%",
    image: "/placeholder.svg",
  },
  {
    name: "Echoes Necklace",
    sold: 1145,
    change: "+13.9%",
    image: "/placeholder.svg",
  },
  {
    name: "Spiky Ring",
    sold: 1073,
    change: "+9.5%",
    image: "/placeholder.svg",
  },
  {
    name: "Pastel Petals Poster",
    sold: 1022,
    change: "+2.3%",
    image: "/placeholder.svg",
  },
  {
    name: "Il Limone",
    sold: 992,
    change: "-0.7%",
    image: "/placeholder.svg",
  },
]

export function TopProducts() {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.name} className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">Sold: {product.sold}</p>
          </div>
          <Badge variant={product.change.startsWith("+") ? "default" : "destructive"}>
            {product.change}
          </Badge>
        </div>
      ))}
    </div>
  )
}

