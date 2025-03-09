import { BarChart3, Box, HelpCircle,LayoutDashboard, Package, Settings, ShoppingCart, Users } from 'lucide-react'

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    title: "Inventory",
    icon: Box,
    href: "/admin/inventory",
  },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[280px] flex-col border-r bg-muted/10 ">
      <div className="h-16 border-b flex items-center gap-2 px-6">
        <Package className="h-6 w-6" />
        <span className="font-semibold">Admin Panel</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {sidebarLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <link.icon className="h-5 w-5" />
            {link.title}
          </a>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground">
          <Settings className="h-5 w-5" />
          Settings
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground">
          <HelpCircle className="h-5 w-5" />
          Help & Support
        </div>
      </div>
    </aside>
  )
}

