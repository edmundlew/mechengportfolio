import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PhotoGallery from "@/components/PhotoGallery";
import TravelMap from "@/components/TravelMap";
import TravelTimeline from "@/components/TravelTimeline";
import Reveal from "@/components/Reveal";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
    title: "Interests",
};

function getPhotos() {
    const dir = path.join(process.cwd(), "public", "interests", "photography");
    if (!fs.existsSync(dir)) return [];
    const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
    return fs
        .readdirSync(dir)
        .filter((f) => exts.has(path.extname(f).toLowerCase()))
        .sort()
        .map((f) => ({
            src: `/interests/photography/${f}`,
            // "01 golden-gate-at-dusk.jpg" -> "Golden gate at dusk"
            caption: f
                .replace(/\.[^.]+$/, "")
                .replace(/^\d+[-_ ]*/, "")
                .replace(/[-_]/g, " ")
                .replace(/^\w/, (c) => c.toUpperCase()),
        }));
}

function getTravels() {
    const filePath = path.join(process.cwd(), "public", "data", "travels.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/**
 * Reshape the trip-based travel data into country visits:
 * each trip is split per country — flag, cities, country name, month only.
 */
function buildCountryTimeline(travels: any) {
    const cityIndex: Record<string, { country: string; flag: string }> = {};
    travels.cities.forEach((c: any) => {
        cityIndex[c.name] = { country: c.country, flag: c.flag || "" };
    });

    return travels.years.map((y: any) => ({
        year: y.year,
        entries: y.trips.flatMap((trip: any) => {
            // Group this trip's stops by country, preserving stop order
            const groups: { country: string; flag: string; cities: string[] }[] = [];
            trip.stops.forEach((stop: string) => {
                const info = cityIndex[stop] || {
                    country: "",
                    flag: trip.flags?.[0] || "",
                };
                const existing = groups.find((g) => g.country === info.country);
                if (existing) existing.cities.push(stop);
                else groups.push({ country: info.country, flag: info.flag, cities: [stop] });
            });
            // Single month only: "March–April 2025" → "March", "December 2025 – January 2026" → "December"
            const monthMatch = trip.period.match(
                /January|February|March|April|May|June|July|August|September|October|November|December/
            );
            const month = monthMatch ? monthMatch[0] : trip.period.replace(/\s*\d{4}$/, "");
            return groups.map((g) => ({
                flag: g.flag,
                cities: g.cities,
                country: g.country,
                month,
            }));
        }),
    }));
}

export default function InterestsPage() {
    const photos = getPhotos();
    const travels = getTravels();
    const posts = getBlogPosts();

    return (
        <div className="min-h-screen pt-48 pb-20 px-6 max-w-5xl mx-auto">
            <PageHeader
                title="Interests"
                description="Away from the workbench — the world through my camera, the map of everywhere it's taken me, and a few stories from along the way."
                watermark="04"
                accentWatermark="text-amber-100/70"
                accentBorder="border-amber-200"
            />

            {/* Photography */}
            <section>
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.25em] mb-2">
                    Photography
                </h2>
                <p className="text-sm text-zinc-400 mb-8">
                    Shot on the road — click any photo to view it full screen.
                </p>
                <PhotoGallery photos={photos} />
            </section>

            {/* Travels */}
            <section className="mt-20">
                <Reveal>
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.25em] mb-2">
                    Travels
                </h2>
                <p className="text-sm text-zinc-400 mb-8">
                    From Kuching to the world — every dot is a story.
                </p>

                <TravelMap cities={travels.cities} summary={travels.summary} />
                </Reveal>

                {/* Timeline — collapsible by year, newest first, grouped by country */}
                <TravelTimeline years={buildCountryTimeline(travels)} />
            </section>

            {/* Blog */}
            <section className="mt-20">
                <Reveal>
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.25em] mb-2">
                    Stories
                </h2>
                <p className="text-sm text-zinc-400 mb-8">
                    Notes and stories from along the way.
                </p>

                {posts.length === 0 && (
                    <div className="border border-dashed border-zinc-200 rounded-3xl p-10 text-center">
                        <p className="text-sm text-zinc-400 italic">
                            On the way — first stories coming soon.
                        </p>
                    </div>
                )}

                {posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/interests/blog/${post.slug}`}
                                className="group bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {post.cover && (
                                    <div className="relative w-full aspect-[16/9] bg-zinc-50">
                                        <Image
                                            src={post.cover}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 480px"
                                        />
                                    </div>
                                )}
                                <div className="p-7">
                                    <p className="text-xs text-zinc-400 mb-2">
                                        {post.dateFormatted}
                                    </p>
                                    <h3 className="text-lg font-bold text-zinc-900 tracking-tight mb-2 group-hover:text-[#0071e3] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors">
                                        Read
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                </Reveal>
            </section>
        </div>
    );
}
