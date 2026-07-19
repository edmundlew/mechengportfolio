import { getPortfolioData } from "@/lib/data";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import PageHeader from "@/components/PageHeader";
import PaperCard from "@/components/PaperCard";

export default async function ProjectsPage() {
    const data = await getPortfolioData();
    const projects = data.technicalProjects || [];
    const papers = data.papers || [];

    return (
        <div className="min-h-screen pt-28 md:pt-48 pb-20 px-6 max-w-5xl mx-auto overflow-hidden">
            <PageHeader
                title="Projects"
                description="Built, broken, rebuilt, then written up."
                watermark="02"
                accentWatermark="text-violet-100/70"
                accentBorder="border-violet-200"
            />

            {/* Technical Projects */}
            <section>
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.25em] mb-2">
                    Things I&apos;ve Built
                </h2>
                <p className="text-sm text-zinc-400 mb-4">Tap on any card for more details.</p>
                <div className="flex-1 flex items-center">
                    <ProjectsCarousel projects={projects} />
                </div>
            </section>

            {/* Research & Papers */}
            {papers.length > 0 && (
                <section className="mt-14 md:mt-20">
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.25em] mb-2">
                        Things I&apos;ve Written
                    </h2>
                    <p className="text-sm text-zinc-400 mb-8">
                        Putting pen to paper.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {papers.map((paper: any, index: number) => (
                            <PaperCard key={paper.pdf} paper={paper} index={index} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
