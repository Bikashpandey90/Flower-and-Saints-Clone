import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
// import { User } from "lucide-react";
import { useRef } from "react";

// const MagnetButtonExample = () => {
//     return (
//         <div className="grid min-h-[400px] place-content-center bg-violet-200 p-4">
//             {/* <MagnetButton /> */}
//         </div>
//     );
// };

const MagnetButton = ({ children, className }: { children: any, className?: string }) => {
    const ref = useRef<HTMLButtonElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });
    const ySpring = useSpring(y, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });

    const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

    const handleMouseMove = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!ref.current) return;

        const { height, width, left, top } = ref.current.getBoundingClientRect();

        x.set(e.clientX - (left + width / 2));
        y.set(e.clientY - (top + height / 2));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`${className} group z-10 relative grid h-[60px] w-[60px] place-content-center rounded-full  transition-colors duration-700 ease-out`}
        >
            {/* <User className="pointer-events-none relative z-10  text-3xl text-black transition-all duration-700 ease-out " /> */}
            {children}

            <div className="pointer-events-none absolute inset-0 z-0 scale-0 rounded-full bg-white transition-transform duration-700 ease-out " />

        </motion.button >
    );
};

export default MagnetButton;