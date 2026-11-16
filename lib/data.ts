import fs from "fs";
import path from "path";

/**
 * All site content lives in public/data/ as one JSON file per section.
 * These files are what the /admin editor reads and writes.
 *
 *   about.json       About Me text, toolkit chips, footer status bar
 *   education.json   Education cards
 *   projects.json    "Things I've Built" cards
 *   papers.json      "Things I've Written" cards
 *   experience.json  Experience timeline
 *   site-text.json   Page titles, headings, hero text, footer
 *   travels.json     Travel map + timeline
 */
const DATA_DIR = path.join(process.cwd(), "public", "data");

function readJson(name: string): any {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf-8"));
}

export async function getPortfolioData(): Promise<any> {
    return {
        personalInfo: readJson("about.json"),
        education: readJson("education.json").education || [],
        technicalProjects: readJson("projects.json").technicalProjects || [],
        papers: readJson("papers.json").papers || [],
        professionalAndLeadership: readJson("experience.json").professionalAndLeadership || [],
    };
}

/** Page titles, headings and other short pieces of text. */
export function getSiteText(): any {
    return readJson("site-text.json");
}

/** Travel map + timeline data, with numbers coerced in case an editor saved them as text. */
export function getTravels(): any {
    const t = readJson("travels.json");
    return {
        ...t,
        summary: {
            countries: Number(t.summary?.countries) || 0,
            cities: Number(t.summary?.cities) || 0,
        },
        cities: (t.cities || []).map((c: any) => ({
            ...c,
            coords: [Number(c.coords?.[0]), Number(c.coords?.[1])],
            visits: c.visits || [],
        })),
        years: (t.years || []).map((y: any) => ({
            ...y,
            year: String(y.year),
            trips: (y.trips || []).map((trip: any) => ({
                ...trip,
                stops: trip.stops || [],
                flags: trip.flags || [],
            })),
        })),
    };
}
