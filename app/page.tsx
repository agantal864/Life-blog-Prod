// UI
import SectionLayout from "@/components/layout/SectionLayout";
import { CardLayout, CardBlock, CardGrid, CardMainContent, CardSubContentLayout, CardSubContent, SubscribeBox } from "@/components/featured/FeatureCard";
import { Mybutton } from "@/components/common/button";
// UI Navigation
import Link from "next/link";
// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';

export default async function Home() {
    // Parallelize three queries
    const [featuredFirst, subContents, latestPosts] = await Promise.all([
        // Query Latest Featured Post
        prisma.post.findFirst({
            where: { isFeatured: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                slug: true,
                title: true,
                content: true,
                thumbnailUrl: true,
                createdAt: true,
                likesCount: true,
                commentsCount: true,
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                likes: true
            }
        }),
        // Query 2nd and 3rd Latest Featured Post
        prisma.post.findMany({
            where: { isFeatured: true },
            orderBy: { createdAt: 'desc' },
            skip: 1,
            take: 2,
            select: {
                id: true,
                slug: true,
                title: true,
                content: true,
                thumbnailUrl: true,
                createdAt: true,
                likesCount: true,
                commentsCount: true,
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                likes: true
            }
        }),
        // Query 4 Latest Post
        prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            take: 4,
            select: {
                id: true,
                slug: true,
                title: true,
                content: true,
                thumbnailUrl: true,
                createdAt: true,
                likesCount: true,
                commentsCount: true,
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                likes: true
            }
        })
    ]);
    return (
        <SectionLayout>
            <div className="py-5 xl:py-0"></div>
            <CardLayout>
                <h1 className="font-serif font-semibold text-3xl px-4 py-2">
                    Featured
                </h1>
                <CardGrid>
                    <CardBlock>
                        {featuredFirst ? (
                            <CardMainContent content={featuredFirst} />
                        ) : (
                            <div className="p-4 text-gray-500">No featured post yet.</div>
                        )}
                    </CardBlock>
                    <CardBlock>
                        <CardSubContentLayout>
                            {subContents.length > 0 ? (
                                subContents.map((item, index) => (
                                    <CardSubContent key={index} content={item} />
                                ))
                                ) : (
                                <div className="p-4 text-gray-500">No additional featured posts.</div>
                            )}
                            <SubscribeBox />
                        </CardSubContentLayout>
                    </CardBlock>
                </CardGrid>
            </CardLayout>

            <div className="py-5"></div>

            <CardLayout>
                <h1 className="font-serif font-semibold text-3xl px-4 py-2">
                    Latest
                </h1>
                {latestPosts.length > 0 ? (
                    <>
                        <CardGrid>
                        {latestPosts[0] && (
                            <CardBlock>
                            <CardMainContent content={latestPosts[0]} />
                            </CardBlock>
                        )}
                        {latestPosts[1] && (
                            <CardBlock>
                            <CardMainContent content={latestPosts[1]} />
                            </CardBlock>
                        )}
                        </CardGrid>
                        <CardGrid>
                        {latestPosts[2] && (
                            <CardBlock>
                            <CardMainContent content={latestPosts[2]} />
                            </CardBlock>
                        )}
                        {latestPosts[3] && (
                            <CardBlock>
                            <CardMainContent content={latestPosts[3]} />
                            </CardBlock>
                        )}
                        </CardGrid>
                    </>
                    ) : (
                    <div className="p-4 text-gray-500">No recent posts available.</div>
                )}
            </CardLayout>
            
            <div className="py-5"></div>
            <Link href="/blogfeed">
                <Mybutton content="See all" iconName="ChevronRight" iconPos="right" pxDefault="px-2" pxLg="lg:px-4" pyDefault="py-1.5"/>
            </Link>
            
            <div className="py-5"></div>

        </SectionLayout>
    );
}