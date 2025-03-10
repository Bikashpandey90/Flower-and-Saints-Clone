export interface SearchResult {
    id: string
    name: string
    category: string
    price: number
    image: string
}

// Sample product data for search
const sampleProducts: SearchResult[] = [
    {
        id: "1",
        name: "iPhone 15 Pro",
        category: "Electronics",
        price: 999,
        image:
            "https://images-cdn.ubuy.co.id/65c9809c76c8e0726937b1a2-restored-apple-iphone-15-pro-max-256gb.jpg",
    },
    {
        id: "2",
        name: "Samsung Galaxy S24",
        category: "Electronics",
        price: 899,
        image:
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
        id: "3",
        name: "Nike Air Max",
        category: "Fashion",
        price: 129,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
        id: "4",
        name: "Leather Jacket",
        category: "Fashion",
        price: 199,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
        id: "5",
        name: "Coffee Maker",
        category: "Home & Kitchen",
        price: 79,
        image:
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
        id: "6",
        name: "Skincare Set",
        category: "Beauty & Health",
        price: 49,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
        id: "7",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 149,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
        id: "8",
        name: "Smart Watch",
        category: "Electronics",
        price: 299,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
]

// Popular search terms
export const popularSearches = ["iPhone", "Samsung", "Headphones", "Nike", "Dress", "Coffee Maker", "Skincare"]

// Search function that returns results based on query
export const searchProducts = (query: string): SearchResult[] => {
    if (!query || query.trim() === "") return []

    const normalizedQuery = query.toLowerCase().trim()

    return sampleProducts.filter(
        (product) =>
            product.name.toLowerCase().includes(normalizedQuery) || product.category.toLowerCase().includes(normalizedQuery),
    )
}

// Function to get search suggestions as you type
export const getSearchSuggestions = (query: string): string[] => {
    if (!query || query.trim() === "") return popularSearches

    const normalizedQuery = query.toLowerCase().trim()

    // Filter popular searches first
    const matchingPopular = popularSearches.filter((term) => term.toLowerCase().includes(normalizedQuery))

    // Then add product names that match
    const matchingProducts = sampleProducts
        .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
        .map((product) => product.name)

    // Combine and remove duplicates
    return [...new Set([...matchingPopular, ...matchingProducts])].slice(0, 5)
}

