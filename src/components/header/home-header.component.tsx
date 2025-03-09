
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar"
import { AuthContext } from "@/context/auth-context"
import { ShoppingCart, User, ChevronDown } from "lucide-react"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MobileMenu from "../MobileMenu/MobileMenu"

const HomeHeader = () => {
  const auth = useContext(AuthContext) as { loggedInUser: any }

  const result = useSelector((root: any) => {
    return root.chat.hello
  })
  console.log(result)
  console.log(auth)

  return (
    <nav className="bg-custom-gray dark:bg-gray-800 antialiased shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <img
                src="https://www.allaboutlean.com/wp-content/uploads/2019/10/Amazon-Logo.png"
                alt="logo"
                className="h-8 w-auto"
              />
            </NavLink>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 px-3 py-2 rounded-md"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about-us"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 px-3 py-2 rounded-md"
                >
                  About Us
                </NavLink>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 ">
                      Category
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <NavLink to="/product/electronics">Electronics</NavLink>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>Clothing</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem>
                            <NavLink to="/category/mens-clothing">Men's Clothing</NavLink>
                          </MenubarItem>
                          <MenubarItem>
                            <NavLink to="/category/womens-clothing">Women's Clothing</NavLink>
                          </MenubarItem>
                          <MenubarItem>
                            <NavLink to="/category/child-clothing">Child's Clothing</NavLink>
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                My Cart
              </Button>
              {auth && auth.loggedInUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                    >
                      <User className="h-5 w-5 mr-2" />
                      {auth.loggedInUser.name}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <NavLink to={`/${auth.loggedInUser.role}`}>My Account</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 px-3 py-2"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 px-3 py-2"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <Button variant="ghost" size="sm" className="inline-flex items-center justify-center p-2">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HomeHeader

