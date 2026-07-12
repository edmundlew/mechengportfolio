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
                accentWatermark="text-emerald-100/70"
                accentBorder="border-emerald-200"
            />

            <div className="relative pb-4">
                {/* Timeline rule — left edge on mobile, centred zigzag spine on desktop */}
                <div
                    aria-hidden
                    className="absolute top-2 bottom-2 left-[5px] md:left-1/2 md:-translate-x-1/2 w-px bg-zinc-200"
                />
                <div className="space-y-10 md:space-y-14">
                    {experience.map((role: any, index: number) => (
                        <ExperienceItem key={index} role={role} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
