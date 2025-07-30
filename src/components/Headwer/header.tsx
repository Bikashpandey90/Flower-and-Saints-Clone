import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import MagnetButton from "../MagenetButton/button";
import { useNavigate } from "react-router-dom";


export const RoundedDrawerNavExample = () => {


    return (
        <div className="bg-neutral-950">
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
                isActive={false}
                setIsActive={() => { }}
                setIsCartOpen={() => { }}
                isCartOpen={false}
                isSearchOpen={false}
                setIsSearchOpen={() => { }}

            >
                <div className="flex flex-col items-center justify-center px-12 py-32">
                    <p className="text-center">
                        Your hero section content goes here {":)"}
                    </p>
                </div>
            </RoundedDrawerNav>



        </div>
    );
};

type LinkType = {
    title: string;
    sublinks: { title: string; href: string }[];
};

export const RoundedDrawerNav = ({
    children,
    navBackground,
    bodyBackground,
    links,
    isActive,
    setIsActive,
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen


}: {
    navBackground: string;
    bodyBackground: string;
    children?: ReactNode;
    links: LinkType[];
    isActive: boolean;
    setIsActive: Function;
    isCartOpen: boolean;
    setIsCartOpen: Function;
    isSearchOpen: boolean;
    setIsSearchOpen: Function;



}) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);


    const activeSublinks = useMemo(() => {
        if (!hovered) return [];
        const link = links.find((l) => l.title === hovered);

        return link ? link.sublinks : [];
    }, [hovered]);

    return (
        <>
            <nav
                onMouseLeave={() => setHovered(null)}
                className={`${navBackground} p-4 `}
            >
                <div className="flex items-start justify-between ">
                    <div className="flex items-start mt-2">
                        <Logo />
                        <DesktopLinks
                            links={links}
                            setHovered={setHovered}
                            hovered={hovered}
                            activeSublinks={activeSublinks}
                        />
                    </div>
                    <div className="flex gap-1 items-end mr-2 ">

                        <MagnetButton>
                            <button className="hidden rounded-md bg-transparent  text-sm text-neutral-50  md:block" onClick={() => {
                                setIsSearchOpen(!isSearchOpen)
                            }}>
                                <svg className="icon icon-search h-6 w-6 icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" d="m21 21-3.636-3.636m0 0A9 9 0 1 0 4.636 4.636a9 9 0 0 0 12.728 12.728Z"></path>
                                </svg>
                            </button>
                        </MagnetButton>
                        <MagnetButton>
                            <button className="hidden rounded-md bg-transparent  text-sm text-neutral-50  md:block" onClick={() => {
                                  setIsActive(!isActive)
                            }}>
                                <svg className="icon icon-account icon-lg h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10.5" height="10.5" x="6.75" y="1.75" rx="5.25"></rect>
                                    <path stroke-linecap="round" d="M12 15.5c1.5 0 4 .333 4.5.5.5.167 3.7.8 4.5 2 1 1.5 1 2 1 4m-10-6.5c-1.5 0-4 .333-4.5.5-.5.167-3.7.8-4.5 2-1 1.5-1 2-1 4"></path>
                                </svg>

                            </button>
                        </MagnetButton>
                        <MagnetButton>
                            <button className="hidden rounded-md bg-transparent  text-sm text-neutral-50  md:block" onClick={() => {
                             setIsCartOpen(!isCartOpen)
                            }}>
                                <svg className="icon icon-cart icon-lg h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-miterlimit="10" d="M7.1802 7.58C7.1802 4.36 9.2402 1.75 11.7902 1.75C14.3402 1.75 16.4002 4.36 16.4002 7.58M11.7902 7.58C2.0402 7.58 0.690197 6.97 2.3502 16.18C3.3002 21.48 3.9802 22.22 11.7902 22.22C19.6002 22.22 20.2802 21.47 21.2302 16.18C22.8902 6.97 21.5502 7.58 11.7902 7.58Z"></path>
                                </svg>
                            </button>
                        </MagnetButton>


                    </div>
                    <button
                        onClick={() => setMobileNavOpen((pv) => !pv)}
                        className="mt-0.5 block text-2xl text-neutral-50 md:hidden"
                    >
                        <FiMenu />
                    </button>
                </div>
                <MobileLinks links={links} open={mobileNavOpen} />
            </nav>
            <motion.main layout className={`${navBackground} px-2 pb-2`}>
                <div className={`${bodyBackground} rounded-3xl`}>{children}</div>
            </motion.main>
        </>
    );
};

const Logo = () => {
    const navigate = useNavigate();
    // Temp logo from https://logoipsum.com/
    return (
        <svg
            width="40"
            height="auto"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-neutral-50"
            onClick={() => {
                navigate('/')
            }}
        >
            <path
                d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                stopColor="#000000"
            ></path>
            <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                stopColor="#000000"
            ></path>
        </svg>
    );
};

const DesktopLinks = ({
    links,
    setHovered,
    hovered,
    activeSublinks,
}: {
    links: LinkType[];
    setHovered: Dispatch<SetStateAction<string | null>>;
    hovered: string | null;
    activeSublinks: LinkType["sublinks"];
}) => {
    return (
        <div className="ml-9 mt-0.5 hidden md:block ">
            <div className="flex gap-6">
                {links.map((l) => (
                    <TopLink key={l.title} setHovered={setHovered} title={l.title}>
                        {l.title}
                    </TopLink>
                ))}
            </div>
            <AnimatePresence mode="popLayout">
                {hovered && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="space-y-4 py-6 "
                    >
                        {activeSublinks.map((l) => (
                            <a
                                className="block text-2xl font-semibold text-neutral-50 transition-colors hover:text-neutral-400"
                                href={l.href}
                                key={l.title}
                            >
                                {l.title}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileLinks = ({ links, open }: { links: LinkType[]; open: boolean }) => {
    return (
        <AnimatePresence mode="popLayout">
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="grid grid-cols-2 gap-6 py-6 md:hidden"
                >
                    {links.map((l) => {
                        return (
                            <div key={l.title} className="space-y-1.5">
                                <span className="text-md block font-semibold text-neutral-50">
                                    {l.title}
                                </span>
                                {l.sublinks.map((sl) => (
                                    <a
                                        className="text-md block text-neutral-300"
                                        href={sl.href}
                                        key={sl.title}
                                    >
                                        {sl.title}
                                    </a>
                                ))}
                            </div>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const TopLink = ({
    children,
    setHovered,
    title,
}: {
    children: string;
    setHovered: Dispatch<SetStateAction<null | string>>;
    title: string;
}) => (
    <span
        onMouseEnter={() => setHovered(title)}
        className="cursor-pointer text-neutral-50 transition-colors hover:text-neutral-400"
    >
        {children}
    </span>
);