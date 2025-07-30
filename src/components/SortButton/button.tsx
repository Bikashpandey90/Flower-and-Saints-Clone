"use client"

import { useState } from "react"
import { AnimatePresence, motion, LayoutGroup } from "framer-motion"
import { ArrowUpDown, X } from "lucide-react"

export default function SortButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState("Alphabetically, A-Z")

    const toggleOpen = () => setIsOpen(!isOpen)

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)
        setIsOpen(false)
    }

    const sortOptions = [
        "Featured",
        "Best selling",
        "Alphabetically, A-Z",
        "Alphabetically, Z-A",
        "Price, low to high",
        "Price, high to low",
        "Date, old to new",
        "Date, new to old",
    ]

    return (
        <div className="relative z-50">
            <LayoutGroup id="sort-container">
                {/* Closed Button or Open Header */}
                {!isOpen ? (
                    <motion.button
                        layoutId="sort-container"
                        onClick={toggleOpen}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-black hover:bg-black transition-colors"
                        whileTap={{ scale: 0.97 }}
                        initial={false}
                    >
                        <motion.div layoutId="icon" className="flex items-center">
                            <ArrowUpDown className="h-4 w-4 text-white" />
                        </motion.div>
                        <motion.span layoutId="text" className="text-white">
                            {/* {selectedOption} */}
                            {selectedOption}

                        </motion.span>

                    </motion.button>
                ) : (
                    <motion.div
                        layoutId="sort-container"
                        className="fixed inset-x-4 top-4 md:absolute md:inset-auto md:right-0 md:top-0 md:w-64 rounded-3xl bg-black text-white shadow-lg z-50 overflow-hidden"
                        initial={false}
                    >
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <motion.div layoutId="icon" className="flex items-center">
                                    <ArrowUpDown className="h-4 w-4" />
                                </motion.div>
                                <motion.span className="text-gray-400 text-sm font-medium">SORT BY</motion.span>
                            </div>
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full bg-white p-1 text-black hover:bg-gray-200 transition-colors"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="h-4 w-4" />
                            </motion.button>
                        </div>

                        <motion.div className="py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            {sortOptions.map((option) => (
                                <motion.button
                                    key={option}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors flex items-center justify-between ${selectedOption === option ? "font-medium" : "text-gray-300"
                                        }`}
                                    onClick={() => handleOptionSelect(option)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.1 + sortOptions.indexOf(option) * 0.05,
                                            duration: 0.3,
                                        },
                                    }}
                                >
                                    {selectedOption === option ? (
                                        <motion.span layoutId="text">{option}</motion.span>
                                    ) : (
                                        <span>{option}</span>
                                    )}

                                    {selectedOption === option && (
                                        <motion.span
                                            className="h-2 w-2 rounded-full bg-white"
                                            layoutId="indicator"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {/* Backdrop */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </div>
    )
}