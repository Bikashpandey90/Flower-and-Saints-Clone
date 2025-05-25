"use client"

import { Search, ShoppingBag, ChevronDown, SlidersHorizontal, X } from "lucide-react"
import ProductGrid from "./product-grid"
import ColorFilter from "./color-filter"
import CategoryFilter from "./category-filter"
import { NavLink } from "react-router-dom"
import SortButton from "./sort-button"
import { useState } from "react"
import RoundedSlideButton from "./splash-button"
import { HiMiniHome } from "react-icons/hi2"
import MagnetButton from "./magnet-button"

export default function ListPage() {
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <main className="min-h-screen bg-white rounded-t-2xl mx-0 md:mx-6 relative">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4 md:px-6 pt-6">
        <NavLink to="/" className="text-base text-black hover:opacity-70">
          <MagnetButton className="h-[30px] w-[30px]">
            <HiMiniHome size={20} />
          </MagnetButton>
        </NavLink>
        <span className="text-sm font-thin font-inter">Apparel</span>
      </div>

      {/* Page Title */}
      <div className="px-4 md:px-6 pb-6 pt-4 md:pt-6">
        <h1 className="text-4xl md:text-7xl font-inter font-normal">Apparel</h1>
      </div>

      {/* Filter Controls - NOT sticky */}
      <div className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 hide-scrollbar p-2">
            <RoundedSlideButton
              className="py-2 md:py-3 shrink-0 rounded-xl"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="ml-2">{isFilterVisible ? "Hide filters" : "Show filters"}</span>
            </RoundedSlideButton>

            <div className="flex text-base md:text-xl text-gray-500 font-semibold mt-2 ml-2 pr-4 mr-4 md:ml-10">
              <MagnetButton>
                <NavLink to="?category=tees" className="whitespace-nowrap">
                  Tees<sup>29</sup>
                </NavLink>
              </MagnetButton>
              <span className="text-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=sweatshirts" className="whitespace-nowrap">
                  Sweatshirts<sup>8</sup>
                </NavLink>
              </MagnetButton>
              <span className="text-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=hoodies" className="whitespace-nowrap">
                  Hoodies<sup>7</sup>
                </NavLink>
              </MagnetButton>
              <span className="text-thin mt-4 mx-10">/</span>
              <MagnetButton>
                <NavLink to="?category=trackpants" className="whitespace-nowrap">
                  Trackpants<sup>2</sup>
                </NavLink>
              </MagnetButton>
              <span className="text-thin mt-4 mx-10">/</span>
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
      <div className="px-4 md:px-6 pb-24 md:pb-16">
        <div
          className={`grid grid-cols-1 ${isFilterVisible ? "md:grid-cols-[minmax(250px,300px)_1fr]" : "md:grid-cols-1"} gap-8`}
        >
          {/* Filters Container - Desktop */}
          <div className={`${isFilterVisible ? "block" : "hidden"}`}>
            {/* This is the sticky filter content */}
            <div
              className={`${isMobileFilterOpen ? "fixed inset-0 bg-white z-50 p-6 overflow-auto" : "hidden md:block"}`}
              style={{
                position: isMobileFilterOpen ? "fixed" : "sticky",
                top: isMobileFilterOpen ? 0 : 0,
                height: isMobileFilterOpen ? "100%" : "auto",
                maxHeight: isMobileFilterOpen ? "100%" : "calc(100vh - 2rem)",
                overflowY: "auto",
              }}
            >
              {isMobileFilterOpen && (
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="pr-4 pb-8 mt-10">
                {/* In Stock Filter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">In stock only</span>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-200">
                      <input type="checkbox" id="stock-toggle" className="sr-only peer" />
                      <label
                        htmlFor="stock-toggle"
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

                {isMobileFilterOpen && (
                  <div className="mt-8 sticky bottom-4 bg-white pt-4">
                    <div className="flex gap-4">
                      <button
                        className="flex-1 border border-black text-black rounded-2xl py-3 font-medium"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        Reset
                      </button>
                      <button
                        className="flex-1 bg-black text-white rounded-2xl py-3 font-medium"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid - Pass isFilterVisible as a prop */}
          <ProductGrid isFilterVisible={isFilterVisible} />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-between px-4 py-2 z-10">
        <NavLink to="/" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <button className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="text-xs mt-1">Menu</span>
        </button>

        <button className="flex flex-col items-center">
          <Search className="w-5 h-5" />
          <span className="text-xs mt-1">Search</span>
        </button>

        <NavLink to="/shop" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect width="7" height="7" x="3" y="3" rx="1"></rect>
            <rect width="7" height="7" x="14" y="3" rx="1"></rect>
            <rect width="7" height="7" x="14" y="14" rx="1"></rect>
            <rect width="7" height="7" x="3" y="14" rx="1"></rect>
          </svg>
          <span className="text-xs mt-1">Shop</span>
        </NavLink>

        <NavLink to="/cart" className="flex flex-col items-center">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs mt-1">Cart</span>
        </NavLink>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-20">
        <button
          className="bg-black text-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg"
          onClick={toggleMobileFilter}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter and sort
        </button>
      </div>
    </main>
  )
}
