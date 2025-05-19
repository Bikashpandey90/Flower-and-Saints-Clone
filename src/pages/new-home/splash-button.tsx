
// const ButtonWrapper = () => {
//     return (
//         <div className="flex min-h-[200px] items-center justify-center bg-neutral-900">
//             {/* <RoundedSlideButton /> */}
//         </div>
//     );
// };

import React from "react";

const RoundedSlideButton = ({
    children,
    onClick,
    className,
    disabled
}: {
    children: any;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean
}) => {
    return (
        <button
            className={`${className}
        relative z-0 flex items-center gap-2 overflow-hidden  border-[1px] 
        border-black px-4 py-2 font-semibold
         text-black-300 transition-all duration-500
        
      ${disabled ? '' : `  before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-neutral-900
        before:transition-transform before:duration-1000
        before:content-[""]
        
         hover:scale-105 hover:text-white
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95`}

       `}
            onClick={onClick}
            disabled={disabled}
        >
            {/* <FiLogIn />
            <span>Sign up free</span> */}
            {children}
        </button>
    );
};

export default RoundedSlideButton;