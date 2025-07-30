import { ReactNode } from "react";

const TextUnderline = ({ children, isNavLinkHovered, className = '' }: { children: ReactNode, isNavLinkHovered: boolean, className?: String }) => {
    return (<>
        <span className={`relative font-thin font-inter `}>
            {children}
            <span
                className={`bg-repeat-x pointer-events-none absolute left-0 -bottom-[1px] h-[1px] w-full bg-black transform transition-transform duration-500 ease-in-out ${className} ${isNavLinkHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right"
                    }`}
            />
        </span></>)
}
export default TextUnderline;