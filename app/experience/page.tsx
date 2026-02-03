import { getPortfolioData } from "@/lib/data";
import ExperienceItem from "@/components/ExperienceItem";

import PageHeader from "@/components/PageHeader";

// ... (existing imports)

export default async function ExperiencePage() {
    const data = await getPortfolioData();
    const experience = data.professionalAndLeadership || [];

    return (
        <div className="min-h-screen pt-48 pb-20 px-6 max-w-5xl mx-auto">
            <PageHeader
                title="Experience"
                description="Leadership roles and engineering internships that have shaped my technical and managerial capabilities."
                watermark="03"
            />

            <div className="relative border-l border-zinc-200 ml-3 space-y-12 pb-4">
                {experience.map((role: any, index: number) => (
                    <ExperienceItem key={index} role={role} />
                ))}
            </div>
        </div>
    );
}
