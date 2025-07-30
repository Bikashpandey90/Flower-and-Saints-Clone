import { AnimatePresence } from "framer-motion"
import { RoundedDrawerNav } from "@/components/Headwer/header"
// import ProductDetail from "./product-detail"
// import NewNav from "../home/mainpage"
import { useState } from "react"
import { Footer } from "@/components/Footwer/footer"
import { FinalCTA } from "@/components/CTA/cta"
import { Outlet } from "react-router-dom"
// import RibbonLogos from "./components/last-sec"
import CartSidebar from "@/components/CartSideBar/cart"
import SearchSidebar from "@/components/Search Sidebar/search"
import MobileNavigation from "@/components/MobileNavgiation/nav"
const NewLandingPage = () => {
    const [isActive, setIsActive] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isNavVisible, setIsNavVisible] = useState(true)
    console.log(isNavVisible)
    return (<>
        <div className="flex min-h-screen flex-col ">
            <div className="bg-neutral-950 ">
                <RoundedDrawerNav

                    links={[
                        {
                            title: "Product",
                            sublinks: [
                                {
                                    title: "Issues",
                                    href: "#",
                                },
                                {
                                    title: "Kanban",
                                    href: "#",
                                },
                                {
                                    title: "Gantt",
                                    href: "#",
                                },
                                {
                                    title: "Mind Maps",
                                    href: "#",
                                },
                            ],
                        },
                        {
                            title: "Solutions",
                            sublinks: [
                                {
                                    title: "Product Management",
                                    href: "#",
                                },
                                {
                                    title: "Marketing",
                                    href: "#",
                                },
                                {
                                    title: "IT",
                                    href: "#",
                                },
                            ],
                        },
                        {
                            title: "Documentation",
                            sublinks: [
                                {
                                    title: "API Docs",
                                    href: "#",
                                },
                                {
                                    title: "University",
                                    href: "#",
                                },
                            ],
                        },
                        {
                            title: "Media",
                            sublinks: [
                                {
                                    title: "Videos",
                                    href: "#",
                                },
                                {
                                    title: "Socials",
                                    href: "#",
                                },
                                {
                                    title: "Blog",
                                    href: "#",
                                },
                            ],
                        },
                        {
                            title: "Pricing",
                            sublinks: [
                                {
                                    title: "Startup",
                                    href: "#",
                                },
                                {
                                    title: "Smalls Business",
                                    href: "#",
                                },
                                {
                                    title: "Enterprise",
                                    href: "#",
                                },
                            ],
                        },
                    ]}
                    navBackground="bg-neutral-950"
                    bodyBackground="bg-white"
                    isActive={isActive}
                    setIsActive={setIsActive}
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                >
                    {/* <div className="flex flex-col items-center justify-center px-12 py-32"> */}
{/* 
                    <AnimatePresence mode='wait'>
                        {
                            isActive && <NewNav isActive={isActive} setIsActive={setIsActive} />
                        }
                    </AnimatePresence> */}
                    <AnimatePresence mode="wait">
                        {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} setIsOpen={setIsCartOpen} />}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        {isSearchOpen && <SearchSidebar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
                    </AnimatePresence>
                    <Outlet />
                    <FinalCTA />
                    <Footer />
                    <MobileNavigation onVisibilityChange={setIsNavVisible} />

                </RoundedDrawerNav>
            </div>
        </div>
    </>)
}
export default NewLandingPage