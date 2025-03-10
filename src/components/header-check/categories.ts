export interface Category {
    id: string
    name: string
    to: string
    megaMenu?: boolean
    subcategories?: SubCategory[]
    featured?: {
        image: string
        title: string
        link: string
    }
}

export interface SubCategory {
    id: string
    name: string
    items: {
        name: string
        to: string
    }[]
}

export const categories: Category[] = [
    { id: "home", name: "Home", to: "/" },
    {
        id: "electronics",
        name: "Electronics",
        to: "/categories/electronics",
        megaMenu: true,
        subcategories: [
            {
                id: "electronics-devices",
                name: "Devices",
                items: [
                    { name: "Smartphones", to: "/categories/electronics/smartphones" },
                    { name: "Laptops", to: "/categories/electronics/laptops" },
                    { name: "Tablets", to: "/categories/electronics/tablets" },
                    { name: "Headphones", to: "/categories/electronics/headphones" },
                    { name: "Cameras", to: "/categories/electronics/cameras" },
                    { name: "Smart Watches", to: "/categories/electronics/smart-watches" },
                ],
            },
        ],
        featured: {
            image:
                "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "New Tech Arrivals",
            link: "/categories/electronics/new",
        },
    },
    {
        id: "fashion",
        name: "Fashion",
        to: "/categories/fashion",
        megaMenu: true,
        subcategories: [
            {
                id: "fashion-clothing",
                name: "Clothing",
                items: [
                    { name: "Men's Clothing", to: "/categories/fashion/mens" },
                    { name: "Women's Clothing", to: "/categories/fashion/womens" },
                    { name: "Shoes", to: "/categories/fashion/shoes" },
                    { name: "Accessories", to: "/categories/fashion/accessories" },
                    { name: "Jewelry", to: "/categories/fashion/jewelry" },
                    { name: "Watches", to: "/categories/fashion/watches" },
                ],
            },
        ],
        featured: {
            image:
                "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Summer Collection",
            link: "/categories/fashion/summer",
        },
    },
    {
        id: "home-kitchen",
        name: "Home & Kitchen",
        to: "/categories/home-kitchen",
        megaMenu: true,
        subcategories: [
            {
                id: "home-items",
                name: "Home Items",
                items: [
                    { name: "Furniture", to: "/categories/home-kitchen/furniture" },
                    { name: "Appliances", to: "/categories/home-kitchen/appliances" },
                    { name: "Cookware", to: "/categories/home-kitchen/cookware" },
                    { name: "Bedding", to: "/categories/home-kitchen/bedding" },
                    { name: "Decor", to: "/categories/home-kitchen/decor" },
                    { name: "Lighting", to: "/categories/home-kitchen/lighting" },
                ],
            },
        ],
    },
    {
        id: "beauty-health",
        name: "Beauty & Health",
        to: "/categories/beauty-health",
        megaMenu: true,
        subcategories: [
            {
                id: "beauty-products",
                name: "Beauty Products",
                items: [
                    { name: "Skincare", to: "/categories/beauty-health/skincare" },
                    { name: "Makeup", to: "/categories/beauty-health/makeup" },
                    { name: "Hair Care", to: "/categories/beauty-health/hair-care" },
                    { name: "Fragrances", to: "/categories/beauty-health/fragrances" },
                    { name: "Personal Care", to: "/categories/beauty-health/personal-care" },
                    { name: "Health Supplements", to: "/categories/beauty-health/supplements" },
                ],
            },
        ],
    },
    { id: "deals", name: "Deals", to: "/deals" },
    { id: "new-arrivals", name: "New Arrivals", to: "/new" },
    { id: "brands", name: "Brands", to: "/brands" },
    { id: "clearance", name: "Clearance", to: "/clearance" },
    { id: "blog", name: "Blog", to: "/blog" },
    { id: "contact", name: "Contact", to: "/contact" },
]

