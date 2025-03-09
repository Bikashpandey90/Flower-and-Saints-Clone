
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 pl-14", className)}
      {...props}
    >
      <a
        href="/admin/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </a>
      <a
        href="/admin/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </a>
      <a
        href="/admin/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </a>
      <a
        href="/admin/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </a>
    </nav>
  )
}

