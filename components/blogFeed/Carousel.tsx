"use client";
// UI
import {IconArrowNarrowLeft,IconArrowNarrowRight} from "@tabler/icons-react";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
// UI navigation
import Link from "next/link";
// UX
import React, {useEffect} from "react";
// Blog Feed Data Type
import {Post} from "@/components/dataType/blogFeed/types"

// Post Data as Card Props
interface CardProps {
  card: Post;
}

export function MyPostCard({ card }: CardProps) {
    return(
        <Link href={`/post/${card.slug}`}>
            <button className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out">
                {/* Gradient to Highlight Text */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Author Information */}
                <div className="absolute top-0 left-0 z-40 px-4 py-4">
                    <div className="flex items-center py-1 md:py-2 gap-1 md:gap-2">
                        <div className="items-start w-8 h-8 bg-cover bg-center rounded-full cursor-pointer" role="button" style={{ backgroundImage: `url(${card.author.image || '/default.jpg'})`}} />
                        <div className="flex flex-col">
                            <p className="text-left text-white font-light text-xs md:text-sm">{card.author.name}</p>
                            <p className="text-left text-gray-50 font-light text-xs">{formatDistanceToNow(new Date(card.createdAt), { addSuffix: true })}</p>
                        </div>                  
                    </div>
                </div>
                {/* Post Title and Content */}
                <div className="absolute bottom-0 left-0 z-40 px-4 py-6 sm:px-6 sm:py-8 space-y-3 w-full">
                    <p className="text-white font-sans font-semibold leading-tight text-sm sm:text-base md:text-lg lg:text-xl [text-wrap:balance] text-left">
                        {card.title}
                    </p>
                    <p className="text-white font-medium line-clamp-2 text-xs sm:text-sm md:text-base text-left">
                        {card.content}
                    </p>
                </div>
                {/* Post Thumbnail */}
                <Image 
                    src={card.thumbnailUrl}
                    alt={card.title}
                    fill
                    className="absolute inset-0 z-10 object-cover"
                />
            </button>
        </Link>
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
                    <div className="flex flex-row justify-start gap-4 pl-4 mx-auto max-w-7xl">  
                        {items.map((item, index) => (
                            <div key={"card" + index} className="rounded-3xl last:pr-[5%] md:last:pr-[10%]">
                                {item}
                            </div>
                        ))}
                    </div>
            </div>
            <div className="mr-10 flex justify-center gap-2">
                <button className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 cursor-pointer" onClick={scrollLeft} disabled={!canScrollLeft}>
                    <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 " />
                </button>
                <button className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 cursor-pointer" onClick={scrollRight} disabled={!canScrollRight}>
                    <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                </button>
            </div>
        </div>
    )
}