import { getPortfolioData } from "@/lib/data";
import ExperienceItem from "@/components/ExperienceItem";

import PageHeader from "@/components/PageHeader";

// Organization logos (files in public/assets/experience/)
const getLogoPath = (organization: string) => {
    if (organization.includes("Arup")) return "/assets/experience/arup.png";
    if (organization.includes("Sarawak Student Initiative")) return "/assets/experience/ssi.png";
    if (organization.includes("Boys")) return "/assets/experience/boys-brigade.png";
    return "";
};

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
                {/* Timeline rule down the left, cards flow down the right */}
                <div
                    aria-hidden
                    className="absolute top-2 bottom-2 left-[5px] w-px bg-zinc-200"
                />
                <div className="space-y-8 md:space-y-10">
                    {experience.map((role: any, index: number) => (
                        <ExperienceItem
                            key={index}
                            role={role}
                            index={index}
                            logo={getLogoPath(role.organization)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
