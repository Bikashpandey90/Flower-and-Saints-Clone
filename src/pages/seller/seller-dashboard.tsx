
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/user-nav/user-nav"
import { BarChart3, Package, Search, Settings, ShoppingBag, Store, Users } from "lucide-react"

import { NavLink, Outlet } from "react-router-dom"


export default function SellerDashboard() {




    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <NavLink to="" className="flex items-center gap-2 text-lg font-semibold">
                        <Store className="h-6 w-6" />
                        <span>SellerHub</span>
                    </NavLink>
                    <NavLink to="" className="text-foreground/60 transition-colors hover:text-foreground">
                        Dashboard
                    </NavLink>
                    <NavLink to="products" className="text-foreground transition-colors hover:text-foreground">
                        Products
                    </NavLink>
                    <NavLink to="orders" className="text-foreground/60 transition-colors hover:text-foreground">
                        Orders
                    </NavLink>
                    <NavLink to="customers" className="text-foreground/60 transition-colors hover:text-foreground">
                        Customers
                    </NavLink>
                    <NavLink to="chat" className="text-foreground/60 transition-colors hover:text-foreground">
                        Chats
                    </NavLink>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="md:hidden">
                            <Store className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72">
                        <SheetHeader className="pb-6">
                            <SheetTitle>
                                <NavLink to="" className="flex items-center gap-2 text-lg font-semibold">
                                    <Store className="h-6 w-6" />
                                    <span>SellerHub</span>
                                </NavLink>
                            </SheetTitle>
                            <SheetDescription>Manage your e-commerce store</SheetDescription>
                        </SheetHeader>
                        <nav className="grid gap-4 text-lg font-medium">
                            <NavLink
                                to=""
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary"
                            >
                                <BarChart3 className="h-5 w-5" />
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="products"
                                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
                            >
                                <Package className="h-5 w-5" />
                                Products
                            </NavLink>
                            <NavLink
                                to="orders"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/60 transition-all hover:text-primary"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Orders
                            </NavLink>
                            <NavLink
                                to="customers"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/60 transition-all hover:text-primary"
                            >
                                <Users className="h-5 w-5" />
                                Customers
                            </NavLink>
                            <NavLink
                                to="chat"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/60 transition-all hover:text-primary"
                            >
                                <Settings className="h-5 w-5" />
                                Chat
                            </NavLink>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full rounded-lg bg-background pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>

                    <UserNav />
                </div>
            </header>
            <Outlet />
        </div>
    )
}

