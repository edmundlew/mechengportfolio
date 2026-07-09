import fs from "fs";
import path from "path";
import { marked } from "marked";

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string; // ISO, e.g. "2026-07-10"
    dateFormatted: string;
    excerpt: string;
    cover?: string;
}

export interface BlogPost extends BlogPostMeta {
    html: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Parses the "---" frontmatter block at the top of a markdown file. */
function parseFrontmatter(raw: string): {
    meta: Record<string, string>;
    body: string;
} {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!match) return { meta: {}, body: raw };

    const meta: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const val = line
            .slice(idx + 1)
            .trim()
            .replace(/^["']|["']$/g, "");
        if (key) meta[key] = val;
    }
    return { meta, body: raw.slice(match[0].length) };
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/** First non-heading paragraph of the body, stripped of markdown syntax. */
function autoExcerpt(body: string): string {
    const para = body
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .find((p) => p && !p.startsWith("#") && !p.startsWith("!["));
    if (!para) return "";
    const text = para
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[*_`>#]/g, "")
        .trim();
    return text.length > 180 ? text.slice(0, 177).trimEnd() + "…" : text;
}

function readPost(filename: string): BlogPost {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const date = meta.date || "";
    return {
        slug,
        title: meta.title || slug.replace(/[-_]/g, " "),
        date,
        dateFormatted: formatDate(date),
        excerpt: meta.excerpt || autoExcerpt(body),
        cover: meta.cover || undefined,
        html: marked.parse(body) as string,
    };
}

/** All posts, newest first. Returns [] if the folder doesn't exist yet. */
export function getBlogPosts(): BlogPostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.toLowerCase().endsWith(".md"))
        .map(readPost)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map(({ html, ...meta }) => meta);
}

export function getBlogPost(slug: string): BlogPost | null {
    const file = path.join(BLOG_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) return null;
    return readPost(`${slug}.md`);
}
