import { auth } from "@/auth"
import SectionLayout from "@/components/layout/SectionLayout";
import { CardLayout, CardBlock, CardGrid, CardMainContent, CardSubContentLayout, CardSubContent, SubscribeBox } from "@/components/ui/Featured/FeatureCard";
import { mainContent, subContents } from "@/components/ui/Featured/data/FeatureCardData";
import { Mybutton } from "@/components/common/button";
import Link from "next/link";

export default async function Home() {
  
  const mysession = await auth();
  console.log(mysession);

  return (
    <SectionLayout>
        <div className="py-5 xl:py-0"></div>
        <CardLayout>
            <h1 className="font-serif font-semibold text-3xl px-4 py-2">
                Featured
            </h1>
            <CardGrid>
                <CardBlock>
                    <CardMainContent content={mainContent} />
                </CardBlock>
                <CardBlock>
                    <CardSubContentLayout>
                        {subContents.map((item, index) => (
                                <CardSubContent key={index} content={item} />
                            ))
                        }
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
            <CardGrid>
                <CardBlock>
                    <CardMainContent content={mainContent} />
                </CardBlock>
                <CardBlock>
                    <CardMainContent content={mainContent} />
                </CardBlock>
            </CardGrid>
                        <CardGrid>
                <CardBlock>
                    <CardMainContent content={mainContent} />
                </CardBlock>
                <CardBlock>
                    <CardMainContent content={mainContent} />
                </CardBlock>
            </CardGrid>
        </CardLayout>
        
        <div className="py-5"></div>
        <Link href="/blogfeed">
            <Mybutton content="See all" iconName="ChevronRight" iconPos="right" pxDefault="px-2" pxLg="lg:px-4" pyDefault="py-1.5"/>
        </Link>
        
        <div className="py-5"></div>

    </SectionLayout>
  );
}