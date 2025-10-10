import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Dot  } from 'lucide-react';

import {Content} from "./data/FeatureCardData";

interface CardProps {
    children: React.ReactNode;
}

export function CardLayout({children}: CardProps) {
    return (
        <div className="flex flex-col px-4 md:px-8 py-8 rounded-xl glass-container">
            {children}
        </div>
    )
}

export function CardGrid({children}: CardProps) {
    return (
        <div className="grid grid-col md:grid-cols-2 md:grid-rows-1">
            {children}
        </div>
    )
}

export function CardBlock({children}: CardProps) {
    return (
        <div className="col-span-1 row-span-1 px-4 py-4">
            {children}
        </div>
    )
}

interface ContentProps {
    content: Content
}

export function CardMainContent ({content}: ContentProps) {
    return(
        <>
            <Link href={content.link}>
                <Image 
                src={content.imgSrc}
                alt={content.imgalt}
                width={content.imgWidth}
                height={content.imgHeight}
                className="object-contain"
                /> 
                <h1 className="font-serif font-semibold leading-none lg:leading-tight text-2xl my-4 md:max-w-[500]">{content.Title}</h1>
                <div className="flex flex-row items-center">
                    <div className="w-8 h-8 bg-cover bg-center rounded-full" 
                    style={{ backgroundImage: content.authorimgURL ?? "url('/websitelogo.svg')" }}></div>
                    <div className="flex flex-col px-4">
                        <p className="font-semibold text-sm">{content.Author}</p>
                        <p className="text-xs">{content.Date}</p>
                    </div> 
                </div>
                <p className="line-clamp-3 md:max-w-[500] my-4">{content.Content}</p>
            </Link> 
            <div className="flex flex-row my-4">
                <div className="inline-flex items-center space-x-2 mr-4">
                <Heart className="w-4 h-4 hover:fill-[#FF0000] hover:stroke-[#FF0000] transition-colors duration-200 cursor-pointer"/> 
                <p className="text-xs">{content.Likes}</p>
                </div>
                <div className="inline-flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 hover:text-blue-500 transition-colors duration-200 cursor-pointer"/> 
                <p className="text-xs">{content.Comments}</p>
                </div>
            </div>
        </>
    )
}

export function CardSubContentLayout ({children}: CardProps) {
    return (
        <div className="flex flex-col h-full space-y-10">
            {children}
        </div>
    )
}

export function CardSubContent ({content}: ContentProps) {
    return (                
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <Link href={content.link}>
                    <h1 className="font-serif font-semibold leading-none text-base md:text-md lg:text-lg xl:text-xl mr-2">{content.Title}</h1>
                    <p className="hidden lg:[display:-webkit-box] lg:line-clamp-3 max-w-[300px] mr-2 my-2">{content.Content}</p>
                    <div className="flex flex-col lg:flex-row text-xs items-start my-2 lg:my-0">
                    <p>{content.Author}</p>
                        <Dot className="hidden lg:block w-4 h-4"/>
                        <p>{content.Date}</p>
                    </div>
                </Link>
                <div className="flex flex-row py-2">
                    <div className="inline-flex items-center space-x-2 mr-4">
                        <Heart className="w-4 h-4 hover:fill-[#FF0000] hover:stroke-[#FF0000] transition-colors duration-200 cursor-pointer"/> 
                        <p className="text-xs">{content.Likes}</p>
                    </div>
                    <div className="inline-flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 hover:text-blue-500 transition-colors duration-200 cursor-pointer"/> 
                        <p className="text-xs">{content.Comments}</p>
                    </div>
                </div>
            </div>
            <div>
                <Link href={content.link}>
                    <Image 
                    src={content.imgSrc}
                    alt={content.imgalt}
                    width={content.imgWidth}
                    height={content.imgHeight}
                    className="max-w-[100px] md:min-w-[100px] md:max-w-[120px] lg:min-w-[150px] lg:max-w-[200px] object-contain"
                    />
                </Link>
            </div>
        </div>
    )
}

export function SubscribeBox() {
    return (
        <div className="w-full max-w-xs space-y-2">
            <h1 className="font-serif text-lg lg:text-xl">Subscribe to my Blog</h1>
            <form className="flex flex-row items-center">
                <div className="w-full rounded-l-md border-1 border-r-0">
                    <input
                    type="email"
                    placeholder="Type your email..."
                    className="w-full flex-grow px-4 py-2 rounded-l-md bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
                <div className="rounded-r-md border-1 border-l-0">
                    <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-sm rounded-r-md cursor-pointer"
                    >Subscribe</button>
                </div>
            </form>
        </div>
    )
}
