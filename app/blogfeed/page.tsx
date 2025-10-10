import SectionLayout from "@/components/layout/SectionLayout";
import { CardLayout } from "@/components/ui/Featured/FeatureCard";
import { MyPostCard, MyCarousel } from "@/components/ui/Blogfeed/Carousel";
import {cardData} from "@/components/ui/Blogfeed/data/CardData";
import { ArrowLeft  } from 'lucide-react';

import Link from "next/link";

function Blogfeed() {
    const postCard = cardData.map((card) => (
        <MyPostCard key={card.src} card={card} />
    ))
    return(
        <SectionLayout id="Blog-feed">
            <CardLayout>
                <Link href={"/"}>
                    <div className="flex items-center space-x-2">
                        <ArrowLeft  className="w-6 h-6 md:w-8 md:h-8"/>
                        <p className="text-sm md:text-base">Back to home</p>
                    </div>
                 </Link>
                <div className="w-full h-full px-4 py-8 md:py-10 md:px-10">
                    <h2 className="pl-4 mx-auto text-2xl md:text-5xl font-bold dark:text-neutral-200 font-serif">
                    Blog Feed
                    </h2>
                    <p className="pl-4 mt-4 mx-auto text-lg md:text-2xl dark:text-neutral-200 font-serif">Lorem ipsum blea on the contrary of course yes it is</p>
                    <MyCarousel items={postCard} />
                </div>
            </CardLayout>      
        </SectionLayout>
    )
}
export default Blogfeed;