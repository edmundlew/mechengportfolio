import { getPortfolioData } from "@/lib/data";
import EducationCard from "@/components/EducationCard";
import { motion } from "framer-motion";

// Helper to map institution names to existing logo paths
const getLogoPath = (institution: string) => {
    if (institution.includes("Berkeley")) return "/assets/education/berkeley.png";
    if (institution.includes("UCL") || institution.includes("University College London")) return "/assets/education/ucl.png";
    if (institution.includes("Kolej Yayasan UEM") || institution.includes("KYUEM")) return "/assets/education/kyuem.png";
    if (institution.includes("Kuching")) return "/assets/education/kuching-high.png";
    return ""; // Fallback will be handled by Image or via empty string check
};

import PageHeader from "@/components/PageHeader";

// ... (existing imports)

export default async function EducationPage() {
    const data = await getPortfolioData();
    const educationArr = data.education || [];

    return (
        <div className="min-h-screen w-full pt-48 pb-20 px-6 max-w-5xl mx-auto">
            <PageHeader
                title="Education"
                description="A timeline of rigorous training in mechanical principles, ranging from foundational A-Levels to advanced research at global institutions."
                watermark="01"
            />

            <div className="flex flex-col gap-6 w-full">
                {educationArr.map((item: any, index: number) => (
                    <EducationCard
                        key={index}
                        item={item}
                        logo={getLogoPath(item.institution)}
                    />
                ))}
            </div>
        </div>
    );
}
