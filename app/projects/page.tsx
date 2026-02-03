import { getPortfolioData } from "@/lib/data";
import ProjectsCarousel from "@/components/ProjectsCarousel";

import PageHeader from "@/components/PageHeader";

// ... (existing imports)

export default async function ProjectsPage() {
    const data = await getPortfolioData();
    const projects = data.technicalProjects || [];

    return (
        <div className="min-h-screen pt-48 pb-20 px-6 max-w-5xl mx-auto overflow-hidden">
            <PageHeader
                title="Projects"
                description="Drag to explore a collection of engineering challenges, from aerospace systems to computational modelling."
                watermark="02"
            />

            <div className="flex-1 flex items-center">
                <ProjectsCarousel projects={projects} />
            </div>
        </div>
    );
}
