interface SectionLayoutProps {
    id?: string
    children: React.ReactNode
}

function SectionLayout({id = "default-id", children}: SectionLayoutProps) {
    return (
        <section id={id} className="md:max-w-7xl md:mx-auto px-10 md:px-12 lg:px-20 py-4 md:py-8 lg:py-12 xl:py-16">
            {children}
        </section>  
    )
}

export default SectionLayout;