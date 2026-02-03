import Link from "next/link";
import { getPortfolioData } from "@/lib/data";
import Hero from "@/components/Hero";

export default async function Home() {
    const data = await getPortfolioData();

    return (
        <div className="flex flex-col min-h-screen bg-[#FBFBFD]">
            {/* Navbar handled by Layout */}

            {/* Client-Side Animated Hero */}
            <Hero />

            {/* About Section - Consistent Monochrome */}
            <section className="px-6 pb-32 max-w-3xl mx-auto">
                <div className="bg-white/50 backdrop-blur-sm border border-zinc-100 p-10 rounded-3xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6 text-zinc-800 tracking-tight">About Me</h2>
                    <p className="text-lg text-zinc-600 leading-relaxed font-light">
                        {data.personalInfo.longDescription}
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-sm text-zinc-400 border-t border-zinc-100/50">
                <p>© {new Date().getFullYear()} Edmund. Built with Next.js & Tailwind.</p>
            </footer>
        </div>
    );
}
