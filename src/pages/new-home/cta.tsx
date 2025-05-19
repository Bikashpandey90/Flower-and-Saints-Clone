import { SectionHeading } from "./sectionHeading";
import { LogoLarge } from "./logo";
import { Button } from "./shared-button";

export const FinalCTA = () => {
    return (
        <section className=" bg-neutral-900 px-2 py-24 md:px-4 rounded-t-2xl">
            <div className="mx-auto flex max-w-5xl flex-col items-center">
                <LogoLarge />
                <SectionHeading>Ready to go?</SectionHeading>
                <p className=" text-white mx-auto mb-8 text-center text-base leading-relaxed md:text-xl md:leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
                    blanditiis?
                </p>
                <Button intent="primary">
                    <span className="font-bold text-white">Get started - </span> no CC required
                </Button>
            </div>
        </section>
    );
};
