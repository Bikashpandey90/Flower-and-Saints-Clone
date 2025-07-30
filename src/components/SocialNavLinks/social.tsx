import { Facebook, Twitter, Instagram, Youtube, Music, SnailIcon as Snapchat, PinIcon as Pinterest } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function SocialNavLinks({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
            </NavLink>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
            </NavLink>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
            </NavLink>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
            </NavLink>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Music className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
            </NavLink>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Snapchat className="h-5 w-5" />
                <span className="sr-only">Snapchat</span>
            </NavLink>
            <NavLink to="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Pinterest className="h-5 w-5" />
                <span className="sr-only">Pinterest</span>
            </NavLink>
        </div>
    )
}