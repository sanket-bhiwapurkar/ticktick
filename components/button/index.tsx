import React from "react";

interface buttonBaseProps {
    type?: "submit" | "reset" | "button" | undefined;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void
    props?: any

}

export const ButtonBase: React.FC<buttonBaseProps> = ({ type = "button", children, className = "", onClick, ...props }) => {
    return <button type={type} className={className} onClick={onClick} {...props}>
        {children}
    </button>
}

interface IconButtonProps extends buttonBaseProps {
    icon: any;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, className = "", ...props }) => {
    return <ButtonBase className={`ms-auto rounded-full h-8 px-4 bg-violet-600 text-white text-lg ${className}`} {...props}>
        {icon}
    </ButtonBase>
}

export const TextButton: React.FC<buttonBaseProps> = ({ children, className, ...props }) => {
    return <ButtonBase className={`text-violet-600 font-semibold uppercase ${className}`} {...props}>
        {children}
    </ButtonBase>
}

