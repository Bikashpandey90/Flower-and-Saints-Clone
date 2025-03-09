
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartBarStacked, DollarSign, Home, Images, MessageCircle, Package, ShoppingBagIcon, ShoppingCart, Star, Ticket, Users, Warehouse } from 'lucide-react'
import { MainNav } from "../Main Nav/main-nav"
import { Search } from "../search/search"
import { UserNav } from "../user-nav/user-nav"
import { NavLink } from "react-router-dom"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            {/* header */}
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/products">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Products</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/order">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/customers">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Customers</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/banners">
                        <Images className="mr-2 h-4 w-4" />
                        <span>Banners</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/category">
                        <ChartBarStacked className="mr-2 h-4 w-4" />
                        <span>Category</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/brand">
                        <ShoppingBagIcon className="mr-2 h-4 w-4" />
                        <span>Brand</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/transaction">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>Transactions</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/inventory">
                        <Warehouse className="mr-2 h-4 w-4" />
                        <span>Inventory</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/offers">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>Offers and vouchers</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/reviews">
                        <Star className="mr-2 h-4 w-4" />
                        <span>Reviews</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/chat">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Chat</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <SidebarTrigger />
              <MainNav />
              <div className="ml-auto flex items-center space-x-4">

                <Search />
                <UserNav />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

