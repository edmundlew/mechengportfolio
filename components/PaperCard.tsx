'use client';

import { motion } from 'framer-motion';

interface PaperCardProps {
    paper: any;
    index: number;
}

export default function PaperCard({ paper, index }: PaperCardProps) {
    return (
        <motion.a
            href={paper.pdf}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="group flex flex-col bg-white border border-zinc-100 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            {/* Course + solo badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                    {paper.course}
                </span>
                {paper.solo && (
                    <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        Solo Author
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 leading-snug tracking-tight mb-3 group-hover:text-black">
                {paper.title}
            </h3>

            {/* Authors */}
            {paper.authors && !paper.solo && (
                <p className="text-xs text-zinc-400 mb-3">{paper.authors}</p>
            )}

            {/* Abstract */}
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1">
                {paper.abstract}
            </p>

            {/* Footer: tags + read link */}
            <div className="flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    {paper.tags?.map((tag: string) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-[0.65rem] font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors whitespace-nowrap">
                    Read PDF
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </span>
            </div>
        </motion.a>
    );
}
