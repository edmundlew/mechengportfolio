'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProjectModalProps {
    project: any;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    // Close on Escape + lock body scroll while open
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
        >
            <motion.div
                initial={{ scale: 0.95, y: 16, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.97, y: 8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
                {/* Header banner */}
                <div className="h-40 md:h-56 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 shrink-0 w-full relative overflow-hidden">
                    {/* Oversized watermark initial */}
                    <span
                        aria-hidden
                        className="absolute -bottom-8 left-6 text-[9rem] md:text-[12rem] font-bold leading-none text-zinc-900/[0.04] select-none pointer-events-none tracking-tighter"
                    >
                        {project.title?.charAt(0)}
                    </span>

                    {/* Tag strip */}
                    {project.technicalTags && (
                        <div className="absolute bottom-5 right-6 flex flex-wrap justify-end gap-2 max-w-[70%]">
                            {project.technicalTags.slice(0, 4).map((tag: string, i: number) => (
                                <span key={i} className="text-xs font-medium text-zinc-500 bg-white/70 backdrop-blur-sm border border-zinc-200/60 px-2.5 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-4 right-4 bg-white/60 hover:bg-white p-2 rounded-full backdrop-blur-md transition-colors shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-900">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-12 space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-2">{project.title}</h2>
                        {project.role && <p className="text-base md:text-lg text-zinc-500 font-medium">{project.role}</p>}
                        {project.dates && <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mt-2">{project.dates}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="md:col-span-2 space-y-6">
                            {project.longDescription && (
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Project Overview</h3>
                                    <p className="text-zinc-600 leading-relaxed text-base md:text-lg">
                                        {project.longDescription}
                                    </p>
                                </div>
                            )}

                            {project.subProjects && project.subProjects.map((sub: any, idx: number) => (
                                <div key={idx} className="mt-6 border-l-2 border-zinc-100 pl-4 hover:border-zinc-300 transition-colors">
                                    <h4 className="font-bold text-zinc-900 text-lg mb-1">{sub.title}</h4>
                                    <p className="text-zinc-600">{sub.description}</p>
                                </div>
                            ))}

                            {project.reportUrl && (
                                <a
                                    href={project.reportUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
                                >
                                    Read the full report
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            )}
                        </div>

                        <div className="space-y-8">
                            {project.technicalTags && (
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Tech Stack</h3>
                                    <div className="flex flex-col gap-2">
                                        {project.technicalTags.map((tag: string, i: number) => (
                                            <span key={i} className="text-zinc-600 border-l-2 border-zinc-200 pl-3 hover:border-zinc-900 hover:text-zinc-900 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.metrics && project.metrics.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Impact</h3>
                                    <ul className="space-y-2">
                                        {project.metrics.map((metric: string, i: number) => (
                                            <li key={i} className="text-zinc-900 font-semibold text-lg">
                                                {metric}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Media Gallery */}
                    {project.mediaArray && project.mediaArray.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {project.mediaArray.map((src: string, i: number) => (
                                    <div key={i} className="relative rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100 aspect-[4/3]">
                                        {src.endsWith('.mp4') || src.endsWith('.webm') ? (
                                            <video
                                                src={src}
                                                muted
                                                loop
                                                playsInline
                                                controls
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={src}
                                                alt={`${project.title} media ${i + 1}`}
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
