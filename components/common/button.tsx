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
    disabled
}: ButtonProps) {
    const IconComponent = iconName ? icons[iconName] : undefined
    if (iconName) {
        return (
                <button
                    disabled={disabled}
                    type="submit"
                    className={`bg-black text-white text-sm rounded-md cursor-pointer inline-flex justify-between items-center
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
                    className={`bg-black text-white text-sm rounded-md cursor-pointer 
                    ${pxDefault} ${pyDefault} ${pxXl} ${pxLg} ${pxMd} ${pyXl} ${pyLg} ${pyMd} ${mxDefault} ${myDefault} ${mxXl}
                    ${mxLg} ${mxMd} ${myXl} ${myLg} ${myMd}
                    `}
                >
                    {content}
                </button>
        )
    }
}