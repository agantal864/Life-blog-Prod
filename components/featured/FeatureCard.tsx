'use client';
// UI
import Image from "next/image";
import {  Dot  } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
// UI Navigation
import Link from "next/link";
import { toast } from 'react-hot-toast';
// UX
import { useState } from "react";
// FeaturedLatest Data Type
import { Post } from "@/components/dataType/featuredLatest/types"

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    )
}

export function CardBlock({children}: CardProps) {
    return (
        <div className="flex flex-col justify-start h-full px-4 py-4">
            {children}
        </div>
    )
}

interface ContentProps {
    content: Post 
}

export function CardMainContent ({content}: ContentProps) {
    return(
        <>
            <Link href={`/post/${content.slug}`}>
                <div className="relative w-full aspect-[5/3] overflow-hidden rounded-md">
                    <Image 
                        src={content.thumbnailUrl}
                        alt={content.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
                <h1 className="font-serif font-semibold leading-none lg:leading-tight text-lg md:text-2xl my-4 md:max-w-[500]">{content.title}</h1>
                <div className="flex flex-row items-center">
                    <div className="w-8 h-8 bg-cover bg-center rounded-full" 
                    style={{ backgroundImage: `url(${content.author.image || '/default.jpg'})`}}></div>
                    <div className="flex flex-col px-4">
                        <p className="font-semibold text-sm">{content.author.name}</p>
                        <p className="text-xs">{formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}</p>
                    </div> 
                </div>
                
                <ReactMarkdown 
                className="line-clamp-3 md:max-w-[500] my-4"
                components={{
                blockquote: ({ node, ...props }) => (
                    <blockquote {...props} className="border-l-4 pl-4 italic text-gray-600 mb-4" />
                )
                }}>
                    {content.content}
                </ReactMarkdown>
               
            
                {/* <div className="flex flex-row my-4">
                    <div className="inline-flex items-center space-x-2 mr-4">
                    <Heart className="w-4 h-4 hover:fill-[#FF0000] hover:stroke-[#FF0000] transition-colors duration-200 cursor-pointer"/> 
                    <p className="text-xs">{content.likesCount}</p>
                    </div>
                    <div className="inline-flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 hover:text-blue-500 transition-colors duration-200 cursor-pointer"/> 
                    <p className="text-xs">{content.commentsCount}</p>
                    </div>
                </div> */}
            </Link> 
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
        <Link href={`/post/${content.slug}`}>
            <div className="flex flex-row justify-between items-start gap-4">
                <div className="flex flex-col flex-grow min-w-0">                    
                        <h1 className="font-serif font-semibold leading-none text-base md:text-md lg:text-lg xl:text-xl mr-2">{content.title}</h1>
                        <p className="hidden lg:[display:-webkit-box] line-clamp-3 max-w-[300px] mr-2 my-2">{content.content}</p>
                        <div className="flex flex-wrap items-center gap-x-1 text-xs my-2">
                            <p className="whitespace-nowrap">{content.author.name}</p>
                            <Dot className="w-4 h-4"/>
                            <p className="whitespace-nowrap">{formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}</p>
                        </div>
                </div>
                <div className="relative shrink-0 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] aspect-[4/3] overflow-hidden rounded-md">                
                        <Image 
                        src={content.thumbnailUrl}
                        alt={content.title}
                        fill
                        sizes="(max-width: 768px) 100px, (max-width: 1024px) 150px, 180px"
                        className="object-cover"
                        />                
                </div>
            </div>
        </Link>
    )
}

export function SubscribeBox() {
    
    const [email, setEmail] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
         e.preventDefault();
        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email.");
            return;
        }
        toast.loading("Subscribing...");
        await new Promise((r) => setTimeout(r, 1000)); 
        toast.dismiss();
        const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (res.ok) {
            setEmail(""); 
            toast.success("You're subscribed!");
        } else {
            setEmail(""); 
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="w-full max-w-xs space-y-2">
            <h1 className="font-serif text-lg lg:text-xl">Subscribe to my Blog</h1>
            <form onSubmit={handleSubscribe} className="flex w-full">
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email..."
                className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-black placeholder-gray-500 dark:placeholder-white border border-gray-300 dark:border-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                type="submit"
                className="px-4 py-2 text-sm bg-black dark:bg-[#ffffff4d] dark:hover:bg-neutral-700 text-white border border-gray-300 dark:border-white border-l-0 rounded-r-md"
                >
                Subscribe
                </button>
            </form>
        </div>
    )
}
