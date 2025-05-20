import { AnimatePresence } from "framer-motion"
import { RoundedDrawerNav } from "./header"
// import ProductDetail from "./product-detail"
import NewNav from "./nav-header"
import { useState } from "react"
import { Footer } from "./footer"
import { FinalCTA } from "./cta"
import { Outlet } from "react-router-dom"
import RibbonLogos from "./components/last-sec"
import CartSidebar from "./cart-sidebar"
import SearchSidebar from "./search-sidebar"
const NewLandingPage = () => {
    const [isActive, setIsActive] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(true)
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
                >
                    {/* <div className="flex flex-col items-center justify-center px-12 py-32"> */}

                    <AnimatePresence mode='wait'>
                        {
                            isActive && <NewNav isActive={isActive} setIsActive={setIsActive} />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} setIsOpen={setIsCartOpen} />}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isSearchOpen && <SearchSidebar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
                    </AnimatePresence>
                    <Outlet />
                    <FinalCTA />
                    <Footer />

                </RoundedDrawerNav>
            </div>
        </div>
    </>)
}
export default NewLandingPage