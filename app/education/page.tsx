import { getPortfolioData } from "@/lib/data";
import EducationCard from "@/components/EducationCard";

// Helper to map institution names to existing logo paths
const getLogoPath = (institution: string) => {
    if (institution.includes("Berkeley")) return "/assets/education/berkeley.png";
    if (institution.includes("UCL") || institution.includes("University College London")) return "/assets/education/ucl.png";
    if (institution.includes("Kolej Yayasan UEM") || institution.includes("KYUEM")) return "/assets/education/kyuem.png";
    if (institution.includes("Kuching")) return "/assets/education/kuching-high.png";
    return ""; // Fallback will be handled by Image or via empty string check
};

// Faint country/state flag per institution — traces the journey across countries
const getFlagPath = (institution: string) => {
    // UC Berkeley → United States
    if (institution.includes("Berkeley")) return "/assets/education/flags/us.svg";
    // UCL → United Kingdom
    if (institution.includes("UCL") || institution.includes("University College London"))
        return "/assets/education/flags/uk.svg";
    // KYUEM → Malaysia
    if (institution.includes("Kolej Yayasan UEM") || institution.includes("KYUEM"))
        return "/assets/education/flags/malaysia.svg";
    // Kuching High → Sarawak
    if (institution.includes("Kuching")) return "/assets/education/flags/sarawak.svg";
    return "";
};

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export default async function EducationPage() {
    const data = await getPortfolioData();
    const educationArr = data.education || [];

    return (
        <div className="min-h-screen w-full pt-28 md:pt-48 pb-20 px-6 max-w-5xl mx-auto">
            <PageHeader
                title="Education"
                description="From Borneo, to Berkeley and Britain."
                watermark="01"
                accentWatermark="text-sky-100/70"
                accentBorder="border-sky-200"
            />

            <div className="flex flex-col gap-6 w-full">
                {educationArr.map((item: any, index: number) => (
                    <Reveal key={index} delay={index * 0.06}>
                        <EducationCard
                            item={item}
                            logo={getLogoPath(item.institution)}
                            flagSrc={getFlagPath(item.institution)}
                        />
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
