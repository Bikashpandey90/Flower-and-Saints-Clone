"use client"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import ProductGrid from "@/pages/product/product-grid"
import ColorFilter from "@/components/Color Filter/color"
import CategoryFilter from "@/components/CategoryFilter/category"
import { NavLink } from "react-router-dom"
import SortButton from "@/components/SortButton/button"
import { useEffect, useState } from "react"
import RoundedSlideButton from "@/components/SplashButton/button"
import MagnetButton from "@/components/MagenetButton/button"
import DragCloseDrawer from "@/components/Drawer/drawer"
import { AnimatePresence, motion } from "framer-motion"

export default function ListPage() {
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [close, setClose] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Mirror the same logic as MobileNavigation
      if (currentScrollY < lastScrollY) {
        setIsNavVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  const handleResetFilters = () => {
    // Add your reset logic here
    console.log("Reset filters")
  }

  const handleApplyFilters = () => {
    // Add your apply logic here
    setIsMobileFilterOpen(false)
    console.log("Apply filters")
    setClose(true)
  }

  return (
    <main className="min-h-screen bg-white rounded-t-2xl mx-0 md:mx-6 relative">
      {/* Breadcrumb */}
      <div className="flex items-center sm:gap-2 px md:px-6 pt-6">
        <NavLink to="/" className="text-base text-black hover:opacity-70">
          <MagnetButton className="h-[30px] w-[30px]  ">
            <svg
              className="icon icon-home icon-sm h-[18px]"
              viewBox="0 0 20 21"
              stroke="currentColor"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.333 14.667v-3.713c0-1.355 0-2.033-.165-2.66a5 5 0 0 0-.818-1.702c-.387-.521-.916-.945-1.974-1.791l-.378-.303h0c-1.784-1.427-2.676-2.14-3.665-2.414a5 5 0 0 0-2.666 0c-.99.274-1.881.987-3.665 2.414h0l-.378.303c-1.058.846-1.587 1.27-1.974 1.79a5 5 0 0 0-.818 1.703c-.165.627-.165 1.305-.165 2.66v3.713a4.167 4.167 0 0 0 4.166 4.166c.92 0 1.667-.746 1.667-1.666v-3.334a2.5 2.5 0 0 1 5 0v3.334c0 .92.746 1.666 1.667 1.666a4.167 4.167 0 0 0 4.166-4.166Z"
              ></path>
            </svg>
          </MagnetButton>
        </NavLink>
        <span className="text-sm font-thin font-inter">Apparel</span>
      </div>

      {/* Page Title */}
      <div className="px-4 md:px-6 pb-6 pt-4 md:pt-6">
        <h1 className="text-5xl md:text-8xl font-inter font-semibold">Apparel</h1>
      </div>

      {/* Filter Controls - Desktop Only */}
      <div className={`${isMobile ? "hidden" : ""} px-4 md:px-6 `}>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 hide-scrollbar p-2">
            <RoundedSlideButton
              className="py-2 md:py-3 shrink-0 rounded-xl hover:text-white"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="ml-2">{isFilterVisible ? "Hide filters" : "Show filters"}</span>
            </RoundedSlideButton>
            <div
              className="flex text-base md:text-xl text-gray-500 font-semibold mt-2 ml-2 pr-4 mr-4 md:ml-10"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                overflowX: "auto",
                overflowY: "auto",
              }}
            >
              <MagnetButton>
                <NavLink to="?category=tees" className="whitespace-nowrap">
                  Tees<sup>29</sup>
                </NavLink>
              </MagnetButton>
              <span className="font-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=sweatshirts" className="whitespace-nowrap">
                  Sweatshirts<sup>8</sup>
                </NavLink>
              </MagnetButton>
              <span className="font-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=hoodies" className="whitespace-nowrap">
                  Hoodies<sup>7</sup>
                </NavLink>
              </MagnetButton>
              <span className="font-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=trackpants" className="whitespace-nowrap">
                  Trackpants<sup>2</sup>
                </NavLink>
              </MagnetButton>
              <span className="font-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=shorts" className="whitespace-nowrap">
                  Shorts<sup>2</sup>
                </NavLink>
              </MagnetButton>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="text-lg">Sort by:</span>
            <SortButton />
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="px-3 md:px-6 pb-24 md:pb-16">
        <div className="grid grid-cols-1 gap-8">
          <motion.div
            className={`grid grid-cols-1 gap-8`}
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              gridTemplateColumns: isFilterVisible && !isMobile ? "minmax(250px, 300px) 1fr" : "1fr",
            }}
          >
            {/* Desktop Filters Container - Sticky positioned */}
            <AnimatePresence mode="wait">
              {isFilterVisible && !isMobile && (
                <motion.div
                  key="filter-sidebar"
                  initial={{
                    opacity: 0,
                    x: -20,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1],
                    opacity: { duration: 0.3 },
                    x: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  className="hidden md:block"
                >
                  {/* Sticky Filter Container */}
                  <div className="sticky top-6 h-fit">
                    <motion.div
                      className="max-h-[calc(100vh-3rem)] overflow-y-auto bg-white rounded-lg border border-gray-100 shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.1,
                      }}
                      style={{
                        scrollbarWidth: "none",
                        scrollbarColor: "#e5e7eb #f9fafb",
                      }}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-6 text-gray-900 border-b border-gray-100 pb-3">
                          Filters
                        </h3>

                        {/* In Stock Filter */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-gray-700">In stock only</span>
                            <div className="relative inline-block w-10 h-6 rounded-full bg-gray-200">
                              <input type="checkbox" id="stock-toggle" className="sr-only peer" />
                              <label
                                htmlFor="stock-toggle"
                                className="absolute cursor-pointer inset-0 rounded-full bg-gray-200 peer-checked:bg-gray-400 transition-colors"
                              >
                                <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4 shadow-sm"></span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Color Filter */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-base font-medium text-gray-700">Color</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                          <ColorFilter />
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-base font-medium text-gray-700">Category</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                          <CategoryFilter />
                        </div>

                        {/* Reset Filters Button */}
                        <div className="pt-4 border-t border-gray-100">
                          <button
                            onClick={handleResetFilters}
                            className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            Reset all filters
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <motion.div layout transition={{ duration: 0.4, ease: "easeInOut" }} className="min-h-0">
              <ProductGrid isFilterVisible={isFilterVisible} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence mode="wait">
        <DragCloseDrawer open={isMobileFilterOpen} setOpen={setIsMobileFilterOpen} close={close}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 pt-0 border-b">
              <h2 className="text-2xl font-semibold">Filter and Sort</h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {/* Sort Section for Mobile */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center justify-between mb">
                  <span className="text-base font-medium">Sort by</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                {/* <SortButton /> */}
              </div>

              {/* In Stock Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">In stock only</span>
                  <div className="relative inline-block w-10 h-6 rounded-full bg-gray-200">
                    <input type="checkbox" id="mobile-stock-toggle" className="sr-only peer" />
                    <label
                      htmlFor="mobile-stock-toggle"
                      className="absolute cursor-pointer inset-0 rounded-full bg-gray-200 peer-checked:bg-gray-400 transition-colors"
                    >
                      <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-medium">Color</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <ColorFilter />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-medium">Category</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <CategoryFilter />
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="sticky bottom-0 bg-none pt-4 border-t">
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-neutral-900 text-white rounded-2xl py-3 font-medium"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </DragCloseDrawer>
      </AnimatePresence>

      {/* Mobile Filter Button */}
      <div
        className="md:hidden fixed left-1/2 -translate-x-1/2 z-20 transition-[bottom] duration-500 ease-in-out"
        style={{ bottom: isNavVisible ? "1rem" : "4rem" }}
      >
        <RoundedSlideButton
          className="bg-neutral-900 text-white rounded-2xl px-4 py-3 before:bg-white hover:text-neutral-900 flex items-center gap-2 shadow-lg"
          onClick={toggleMobileFilter}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter and sort
        </RoundedSlideButton>
      </div>
    </main>
  )
}
