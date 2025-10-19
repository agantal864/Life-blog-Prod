// UI components
import SectionLayout from "@/components/layout/SectionLayout";
import { CardLayout } from "@/components/featured/FeatureCard"
import { MyPostCard, MyCarousel } from "@/components/blogFeed/Carousel";
import { ArrowLeft  } from 'lucide-react';
// UI navigation
import Link from "next/link";
// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';

async function Blogfeed() {
    // Fetch Posts' Info
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            slug: true,
            title: true,
            content: true,
            thumbnailUrl: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                    image: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    // Map info per post to PostCard component
    const postCard = posts.map((card) => (
        <MyPostCard key={card.id} card={card} />
    ))
    return(
        <SectionLayout id="Blog-feed">
            <CardLayout>
                <Link href={"/"}>
                    <div className="flex items-center space-x-2 hover:scale-[1.01] transition-all duration-200 ease-in-out">
                        <ArrowLeft  className="w-6 h-6 md:w-8 md:h-8"/>
                        <p className="text-sm md:text-base">Back to home</p>
                    </div>
                 </Link>
                <div className="w-full h-full px-4 py-8 md:py-10 md:px-10">
                    <h2 className="pl-4 mx-auto text-2xl md:text-5xl font-bold dark:text-neutral-200 font-serif">
                    Blog Feed
                    </h2>
                    <p className="pl-4 mt-4 mx-auto text-lg md:text-2xl dark:text-neutral-200 font-serif">Nothing to see here... Just a bunch of nonesense.</p>
                    <MyCarousel items={postCard} />
                </div>
            </CardLayout>      
        </SectionLayout>
    )
}
export default Blogfeed;