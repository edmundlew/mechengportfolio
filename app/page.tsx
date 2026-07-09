import Link from "next/link";
import Image from "next/image";
import { getPortfolioData } from "@/lib/data";
import Hero from "@/components/Hero";

const exploreLinks = [
    {
        title: "Education",
        href: "/education",
        watermark: "01",
        description: "Berkeley, UCL, and the road there — grades, awards, and key modules.",
    },
    {
        title: "Projects",
        href: "/projects",
        watermark: "02",
        description: "Rocketry, research, and computational modelling challenges.",
    },
    {
        title: "Experience",
        href: "/experience",
        watermark: "03",
        description: "Arup internship and leadership across engineering and community.",
    },
    {
        title: "Interests",
        href: "/interests",
        watermark: "04",
        description: "Photography from the road, and a map of 22 countries so far.",
    },
];

export default async function Home() {
    const data = await getPortfolioData();

    return (
        <div className="flex flex-col min-h-screen bg-[#FBFBFD]">
            {/* Client-Side Animated Hero */}
            <Hero />

            {/* About Section - Photo + Statement */}
            <section className="px-6 pb-20 max-w-4xl mx-auto w-full">
                <div className="bg-white/50 backdrop-blur-sm border border-zinc-100 p-8 md:p-10 rounded-3xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-8 md:gap-10 items-start">
                        {/* Portrait — natural 2:3 aspect ratio, never cropped */}
                        <div className="relative w-48 md:w-full max-w-[260px] mx-auto md:mx-0 aspect-[2/3] rounded-2xl overflow-hidden border border-zinc-100 shadow-md bg-zinc-50">
                            <Image
                                src="/assets/profile.jpg"
                                alt="Portrait of Edmund"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 192px, 260px"
                                priority
                            />
                        </div>

                        {/* Statement */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-5 text-zinc-800 tracking-tight">About Me</h2>
                            <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
                                {data.personalInfo.longDescription}
                            </p>

                            {/* Toolkit chips */}
                            {data.personalInfo.toolkit && data.personalInfo.toolkit.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {data.personalInfo.toolkit.map((tool: string) => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1.5 text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-full"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Cards */}
            <section className="px-6 pb-32 max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {exploreLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative bg-white border border-zinc-100 rounded-3xl p-8 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <span
                                aria-hidden
                                className="absolute -top-4 -right-2 text-[5rem] font-bold leading-none text-zinc-100/80 select-none pointer-events-none group-hover:text-zinc-100 transition-colors"
                            >
                                {link.watermark}
                            </span>
                            <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-2 relative z-10">
                                {link.title}
                            </h3>
                            <p className="text-sm text-zinc-500 leading-relaxed relative z-10 mb-6">
                                {link.description}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors relative z-10">
                                Explore
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center border-t border-zinc-100/50">
                <div className="flex items-center justify-center gap-6 mb-4 text-sm">
                    <a
                        href="https://www.linkedin.com/in/edmund-lew"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        LinkedIn
                    </a>
                    <span className="text-zinc-200">|</span>
                    <a
                        href="/edmund_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        Résumé
                    </a>
                </div>
                <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Edmund. Built with Next.js &amp; Tailwind.</p>
            </footer>
        </div>
    );
}
