import { ArrowUpRight, Facebook, Github, Instagram, Linkedin } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function BlogPage() {
    return (
        <div className="flex items-center justify-center min-h-screen p-0 m-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2 m-4 max-w-6xl w-full">
                {/* Navigation Column */}
                <div className="col-span-1 row-span-2 sm:col-start-1 sm:row-start-1 lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-4 bg-[#F07B10] rounded-3xl p-4">
                    <nav className="space-y-2 sm:space-y-3 lg:space-y-4">
                        <NavLink to="#lifestyle" className="flex items-center justify-between text-white hover:opacity-80">
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold hover:underline">
                                LIFESTYLE
                            </span>
                            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                        </NavLink>
                        <NavLink to="#clothes" className="flex items-center justify-between text-white hover:opacity-80">
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold hover:underline">CLOTHES</span>
                            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                        </NavLink>
                        <NavLink to="#news" className="flex items-center justify-between text-white hover:opacity-80">
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold hover:underline">NEWS</span>
                            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                        </NavLink>
                        <NavLink to="/all" className="text-white hover:opacity-80 block pt-2 sm:pt-3 lg:pt-4">
                            All
                        </NavLink>
                    </nav>
                </div>

                {/* Coffee Break Card */}
                <div className="col-span-1 row-span-1 sm:col-start-1 sm:row-start-3 lg:col-start-1 lg:row-start-5 lg:col-span-1 lg:row-span-3 rounded-md">
                    <NavLink to="#" className="group relative overflow-hidden block h-full">
                        <img
                            src="https://images.stockcake.com/public/5/7/9/57988272-fa7d-4e87-9443-eee095287844_large/refreshing-mojito-drink-stockcake.jpg"
                            alt="Lifestyle"
                            className="aspect-square object-cover h-full w-full rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col justify-end p-3 sm:p-4 lg:p-6">
                            <div className="flex items-start justify-between backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8">
                                <div className="text-white">
                                    <h3 className="text-lg sm:text-xl font-bold">Coffee Break</h3>
                                    <p className="text-xs sm:text-sm opacity-90">Give to yourself a break</p>
                                </div>
                                <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                            </div>
                        </div>
                    </NavLink>
                </div>

                {/* Header with Social Icons */}
                <div className="col-span-1 row-span-1 sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-2 rounded-3xl p-2">
                    <div className="p-0 m-0 relative flex justify-center items-center h-full">
                        <div className="flex justify-between items-center absolute bottom-0 right-0 bg-[#333333] h-8 sm:h-10 lg:h-12 w-32 sm:w-36 lg:w-44 mr-3 rounded-xl p-2 sm:p-3 lg:p-4 z-10">
                            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                            <Facebook className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                            <Github className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div
                            className="bg-[#F07B10] w-full max-w-xs sm:max-w-sm lg:w-96 h-16 sm:h-20 lg:h-28 flex p-2 sm:p-3 lg:p-4"
                            style={{
                                clipPath:
                                    "path('M 0,14 A 14,14 0,0,1 14,0 L 340,0 A 14,14 0,0,1 354,14 L 354,42 A 14,14 0,0,1 340,56 L 178,56 A 14,14 0,0,0 164,70 L 164,98 A 14,14 0,0,1 149,112 L 14,112 A 14,14 0,0,1 0,98 L 0,14 Z')",
                            }}
                        >
                            <nav className="flex space-x-3 sm:space-x-4 lg:space-x-6 text-white font-semibold justify-end text-xs sm:text-sm lg:text-base">
                                <a href="#" className="underline">
                                    HOME
                                </a>
                                <a href="#">STORES</a>
                                <a href="#">CONTACT</a>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Women's Fashion Card */}
                <div className="col-span-1 row-span-2 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:col-start-2 lg:row-start-3 lg:col-span-1 lg:row-span-5 rounded-md">
                    <NavLink to="#" className="group relative overflow-hidden block h-full">
                        <img
                            src="https://media.istockphoto.com/id/1497624425/photo/summer-beach-vacation-concept-young-woman-with-hat-relaxing-with-her-arms-raised-to-her-head.jpg?s=612x612&w=0&k=20&c=ZJuzU5AX5MPe_MqF1hErS64R1oCmawDy0FTGtNsaUa4="
                            alt="Lifestyle"
                            className="aspect-square sm:aspect-auto sm:h-full object-cover w-full rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 sm:p-4 lg:p-6 rounded-3xl">
                            <div className="flex items-start justify-between backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8">
                                <div className="text-white">
                                    <h3 className="text-lg sm:text-xl font-bold">Women like clothes</h3>
                                    <p className="text-xs sm:text-sm opacity-90">Clothes make every women happy</p>
                                </div>
                                <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                            </div>
                        </div>
                    </NavLink>
                </div>

                {/* Men's Fashion Card */}
                <div className="col-span-1 row-span-3 sm:col-start-3 sm:row-start-1 sm:row-span-3 lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-7 rounded-md">
                    <NavLink to="#" className="group relative overflow-hidden block h-full">
                        <img
                            src="https://i.pinimg.com/736x/1d/fa/e5/1dfae54734bfe781220ebfa206d5ce2b.jpg"
                            alt="Lifestyle"
                            className="aspect-square sm:aspect-auto sm:h-full object-cover w-full rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col rounded-3xl justify-end p-3 sm:p-4 lg:p-6">
                            <div className="flex items-start justify-between backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8">
                                <div className="text-white">
                                    <h3 className="text-lg sm:text-xl font-bold">Be like a Sun</h3>
                                    <p className="text-xs sm:text-sm opacity-90">Every man should be stylish</p>
                                </div>
                                <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

