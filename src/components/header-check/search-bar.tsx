import { useState, useRef, useEffect, useCallback } from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { getSearchSuggestions, popularSearches } from "./search-services"
import { useNavigate } from "react-router-dom"
import productSvc from "@/pages/products/products.service"
import { Product } from "@/pages/products/admin-products.page"
import { formatNumber } from "@/lib/utils"

interface SearchBarProps {
    className?: string
    onClose?: () => void
    isMobile?: boolean
}

export default function SearchBar({ className = "", onClose, isMobile = false }: SearchBarProps) {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    // const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }

        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Update suggestions and results as user types
    useEffect(() => {
        if (query.trim() === "") {
            setSuggestions(popularSearches)
            // setResults([])
            return
        }

        const delayDebounceFn = setTimeout(() => {
            setSuggestions(getSearchSuggestions(query))
            // setResults(searchProducts(query))
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    const handleSearch = (searchQuery: string) => {
        if (searchQuery.trim() === "") return

        // In a real app, you would navigate to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        setIsOpen(false)
        if (onClose) onClose()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(query)
        }
    }
    const loadSearchProducts = useCallback(async ({ page = 1 }) => {
        try {
            const response = await productSvc.getProductForHome(page, 5, search)
            setProducts(response.data.detail)

        } catch (exception) {
            console.log(exception)
        }
    }, [search])
    useEffect(() => {
        const timeout = setTimeout(() => {
            loadSearchProducts({ page: 1 })
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }

    }, [loadSearchProducts])

    return (
        <div ref={searchRef} className={`relative w-full ${className}`}>
            <div className="relative">
                <Input
                    placeholder="Search for products..."
                    className={`w-full ${isMobile ? "pl-4" : "pl-10"} pr-4 py-2 ${isMobile ? "" : "rounded-full"}`}
                    value={query}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-full bg-background border rounded-md shadow-lg max-h-[80vh] overflow-y-auto">
                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="p-2">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h3>
                            <ul>
                                {suggestions.map((suggestion, index) => (
                                    <li key={index}>
                                        <button
                                            className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm flex items-center"
                                            onClick={() => {
                                                setQuery(suggestion)
                                                handleSearch(suggestion)
                                            }}
                                        >
                                            <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                                            {suggestion}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {products.length > 0 && (
                        <div className="border-t pt-2">
                            <h3 className="text-xs font-medium text-muted-foreground px-3 mb-1">Products</h3>
                            <ul className="space-y-1 max-h-[50vh] overflow-y-auto px-1">
                                {products.map((product) => (
                                    <li key={product._id}>
                                        <button
                                            className="w-full text-left p-2 hover:bg-accent/40 rounded-md transition-colors duration-200 group"
                                            onClick={() => {
                                                navigate(`/products/${product.slug}`)
                                                setIsOpen(false)
                                                if (onClose) onClose()
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-muted">
                                                    <img
                                                        src={product.images[0] || "/placeholder.svg"}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-200">
                                                        {product.title}
                                                    </div>
                                                    <div className="flex items-center justify-between mt-0.5">
                                                        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded-full">
                                                            {product.category[0].title}
                                                        </span>
                                                        <span className="font-medium text-xs text-primary">Nrs {formatNumber(product.actualAmt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    )
                    }


                    {/* No results */}
                    {query.trim() !== "" && products.length === 0 && suggestions.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">No results found for "{query}"</div>
                    )}
                </div>
            )
            }
        </div >
    )
}

