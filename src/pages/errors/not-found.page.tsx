import { LucideHome, LucideLaptop, LucideSearch, LucideShirt, LucideShoppingBag, LucideWatch } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const NotFound=()=>{
    return <>
     <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <LucideShoppingBag className="w-20 h-20 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
      </p>

      <div className="flex items-center space-x-2 mb-8 w-full max-w-md">
        <Input type="search" placeholder="Search for products..." className="flex-grow" />
        <Button type="submit" size="icon">
          <LucideSearch className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
        <Button variant="outline" className="flex flex-col items-center justify-center p-4 h-24">
          <LucideShirt className="h-8 w-8 mb-2" />
          <span>Clothing</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center p-4 h-24">
          <LucideWatch className="h-8 w-8 mb-2" />
          <span>Accessories</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center p-4 h-24">
          <LucideLaptop className="h-8 w-8 mb-2" />
          <span>Electronics</span>
        </Button>
      </div>

      <Button asChild className="flex items-center">
        <a href="/">
          <LucideHome className="mr-2 h-4 w-4" /> Go to Homepage
        </a>
      </Button>
    </div>
    </>;
}

export default NotFound;