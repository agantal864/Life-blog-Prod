"use client";
import React, {useEffect,useRef,useState,createContext,useContext} from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {IconArrowNarrowLeft,IconArrowNarrowRight} from "@tabler/icons-react";


type Card = {
  src: string;
  title: string;
  category: string;
};

interface CardProps {
  card: Card;
}

export function MyPostCard({ card }: CardProps) {
    return(
        <button className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute top-0 left-0 z-40 px-6 py-4 md:px-8">
                <div className="flex items-center py-1 md:py-2 gap-1 md:gap-2">
                    <div className="items-start w-8 h-8 bg-cover bg-center rounded-full cursor-pointer" role="button" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/a/ACg8ocK70FAg1dYHI9ITGOTa9czh9PinJTIGZeatig06g2LkDUDACLE_=s96-c')` }} />
                    <div className="flex flex-col">
                        <p className="text-left text-white font-light text-xs md:text-sm">Azis Agantal</p>
                        <p className="text-left text-gray-50 font-light text-xs">08/10/2025</p>
                    </div>                  
                </div>
            </div>

            <div className="absolute bottom-0 left-0 z-40 p-6 md:p-8 space-y-4 md:space-y-6">
                <p className="max-w-xs text-left font-sans font-semibold [text-wrap:balance] leading-tight text-white text-sm md:text-xl">{card.title}</p>
                <p className="mt-2 text-left font-medium text-white line-clamp-2 text-xs md:text-base">{card.category}</p>         
            </div>

            <Image 
                src={card.src}
                alt={card.title}
                fill
                className="absolute inset-0 z-10 object-cover"
            />
        </button>
    )
}

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

export function MyCarousel({items, initialScroll=0}: CarouselProps) {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    useEffect(() => {
    if (carouselRef.current) {
        carouselRef.current.scrollLeft = initialScroll;
        checkScrollability();
    }
    }, [initialScroll]);

    const checkScrollability = () => {
    if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
    };

    const scrollLeft = () => {
    if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
    };

    const scrollRight = () => {
    if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
    };

    return (
        <div className="relative w-full">
            <div className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-10" ref={carouselRef} onScroll={checkScrollability}>
                {/* <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")} /> */}
                    <div className="flex flex-row justify-start gap-4 pl-4 mx-auto max-w-7xl">  
                        {items.map((item, index) => (
                            <div key={"card" + index} className="rounded-3xl last:pr-[5%] md:last:pr-[10%]">
                                {item}
                            </div>
                        ))}
                    </div>
            </div>
            <div className="mr-10 flex justify-center gap-2">
                <button className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50" onClick={scrollLeft} disabled={!canScrollLeft}>
                    <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                </button>
                <button className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50" onClick={scrollRight} disabled={!canScrollRight}>
                    <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                </button>
            </div>
        </div>
    )
}