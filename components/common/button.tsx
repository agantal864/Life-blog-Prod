import { CirclePlus, ChevronRight, Eye, ShieldUser  } from "lucide-react";


const icons = {
  CirclePlus,
  ChevronRight, 
  Eye,
  ShieldUser 
};

interface ButtonProps {
    content: string
    iconName?: keyof typeof icons;
    iconPos?: string
    hidden?: "icon" | "content"
    pxDefault?: string
    pyDefault?: string
    pxXl?: string
    pxLg?: string
    pxMd?: string
    pyXl?: string
    pyLg?: string
    pyMd?: string
    mxDefault?: string
    myDefault?: string
    mxXl?: string
    mxLg?: string
    mxMd?: string
    myXl?: string
    myLg?: string
    myMd?: string
    mrDefault?: string
    mrMd?: string
    disabled?: boolean
    onClick?: () => void;
    loading?: boolean;
}

export function Mybutton ({
    content,
    iconName,
    iconPos,
    hidden,
    pxDefault,
    pyDefault,
    pxXl,
    pxLg,
    pxMd,
    pyXl,
    pyLg,
    pyMd,
    mxDefault,
    myDefault,
    mxXl,
    mxLg,
    mxMd,
    myXl,
    myLg,
    myMd,
    mrDefault,
    mrMd,
    disabled,
    onClick,
    loading
}: ButtonProps) {
    const IconComponent = iconName ? icons[iconName] : undefined
    const isDisabled = disabled || loading; 

    if (iconName) {
        return (
                <button
                    disabled={isDisabled}
                    type="submit"
                    onClick={onClick}
                    className={`bg-black text-white text-sm rounded-md cursor-pointer inline-flex justify-between items-center transition-all duration-200 ease-in-out dark:bg-[#ffffff4d] dark:hover:bg-neutral-700
                    hover:bg-neutral-800 hover:scale-[1.02] hover:shadow-md 
                    ${pxDefault} ${pyDefault} ${pxXl} ${pxLg} ${pxMd} ${pyXl} ${pyLg} ${pyMd} ${mxDefault} ${myDefault} ${mxXl}
                    ${mxLg} ${mxMd} ${myXl} ${myLg} ${myMd} ${mrDefault} ${mrMd}
                    `}>
                    {iconPos === "left" && (
                        <>
                            {hidden === "icon" && (
                                <>
                                    {IconComponent && <IconComponent className="hidden md:block w-4 h-4 md:mr-2" />}
                                    <span>{content}</span>
                                </>
                            )}
                            {hidden === "content" && (
                                <>
                                    {IconComponent && <IconComponent className="w-4 h-4 md:mr-2" />}
                                    <span className="hidden md:block">{content}</span>
                                </>
                            )}
                            {!hidden && (
                                <>
                                    {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                                    <span>{content}</span>
                                </>
                            )}
                        </>
                    )}
                    {iconPos === "right" && (
                        <>
                            {hidden === "icon" && (
                                <>
                                    <span>{content}</span>
                                    {IconComponent && <IconComponent className="hidden md:block w-4 h-4 md:ml-2" />}
                                </>
                            )}
                            {hidden === "content" && (
                                <>
                                    <span className="hidden md:block">{content}</span>
                                    {IconComponent && <IconComponent className="w-4 h-4 md:ml-2" />}
                                </>
                            )}
                            {!hidden && (
                                <>
                                    <span>{content}</span>
                                    {IconComponent && <IconComponent className="w-4 h-4 ml-2" />}
                                </>
                            )}
                        </>
                    )}
                </button>
        )
    } else {
        return (
                <button
                    type="submit"
                    onClick={onClick}
                    className={`bg-black text-white text-sm rounded-md cursor-pointer transition-all duration-200 ease-in-out dark:bg-[#ffffff4d] dark:hover:bg-neutral-700
                    hover:bg-neutral-800 hover:scale-[1.02] hover:shadow-md 
                    ${pxDefault} ${pyDefault} ${pxXl} ${pxLg} ${pxMd} ${pyXl} ${pyLg} ${pyMd} ${mxDefault} ${myDefault} ${mxXl}
                    ${mxLg} ${mxMd} ${myXl} ${myLg} ${myMd}
                    `}
                >
                    {loading ? "Loading..." : content}
                </button>
        )
    }
}