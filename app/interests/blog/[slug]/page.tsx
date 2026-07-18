import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

export function generateStaticParams() {
    return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getBlogPost(params.slug);
    if (!post) return { title: "Blog" };
    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = getBlogPost(params.slug);
    if (!post) notFound();

    return (
        <article className="min-h-screen pt-28 md:pt-40 pb-24 px-6 max-w-3xl mx-auto">
            {/* Back link */}
            <Link
                href="/interests"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-900 transition-colors mb-10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
                Back to Interests
            </Link>

            {/* Header */}
            <header className="mb-10">
                <p className="text-sm text-zinc-400 mb-3">{post.dateFormatted}</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">
                    {post.title}
                </h1>
            </header>

            {/* Cover image (optional) */}
            {post.cover && (
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-100 shadow-md mb-12 bg-zinc-50">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority
                    />
                </div>
            )}

            {/* Body */}
            <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.html }}
            />
        </article>
    );
}
