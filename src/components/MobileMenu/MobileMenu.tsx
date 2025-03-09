import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden ">
      <Button variant="ghost" size="sm" onClick={toggleMenu} className="inline-flex items-center justify-center p-2">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              onClick={toggleMenu}
            >
              About Us
            </NavLink>
            <NavLink
              to="/category/electronics"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              onClick={toggleMenu}
            >
              Electronics
            </NavLink>

          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu

