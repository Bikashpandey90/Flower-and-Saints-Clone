import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { IconType } from "react-icons";
import { LogoSmall } from "../Logo/logo";
import { NAV_LINKS } from "@/lib/constants";
import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="bg-neutral-900 rounded-b-2xl">
            <footer className="relative mx-auto max-w-6xl overflow-hidden py-12">
                <div className="md:px4 grid grid-cols-12 gap-x-1.5 gap-y-6 px-2">
                    <LogoColumn />
                    <GenericColumn title="Product" links={NAV_LINKS[0].sublinks} />
                    <GenericColumn
                        title="Company"
                        links={[...NAV_LINKS[3].sublinks]}
                    />
                    <GenericColumn
                        title="Legal"
                        links={[
                            {
                                title: "Terms & Conditions",
                                href: "/#",
                            },
                            {
                                title: "Privacy Policy",
                                href: "/#",
                            },
                            {
                                title: "Refund Policy",
                                href: "/#",
                            },
                        ]}
                    />

                    <GenericColumn
                        title="Socials"
                        links={[
                            {
                                title: "Twitter",
                                href: "/#",
                                Icon: SiX,
                            },
                            {
                                title: "Instagram",
                                href: "/#",
                                Icon: SiInstagram,
                            },
                            {
                                title: "Youtube",
                                href: "/#",
                                Icon: SiYoutube,
                            },
                        ]}
                    />
                </div>
            </footer>
        </div>
    );
};

const LogoColumn = () => {
    return (
        <div className="col-span-6 md:col-span-4">
            <LogoSmall />
            <span className="mt-3 inline-block text-xs text-white">
                © EcomStore - All rights reserved.
            </span>
        </div>
    );
};

const GenericColumn = ({
    title,
    links,
}: {
    title: string;
    links: { title: string; href: string; Icon?: IconType }[];
}) => {
    return (
        <div className="col-span-6 space-y-2 text-sm md:col-span-2">
            <span className="block font-bold text-white">{title}</span>
            {links.map((l) => (
                <NavLink
                    key={l.title}
                    to={l.href}
                    className="flex text-white items-center gap-1.5 transition-colors hover:text-indigo-600 hover:underline"
                >
                    {l.Icon && <l.Icon />}
                    {l.title}
                </NavLink>
            ))}
        </div>
    );
};
