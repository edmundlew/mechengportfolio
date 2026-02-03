'use client';

import { motion } from 'framer-motion';

interface ProjectModalProps {
    project: any;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 md:p-8"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
                {/* Header Image (Optional or placeholder gradient) */}
                <div className="h-48 md:h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 shrink-0 w-full relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-md transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-900">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">{project.title}</h2>
                        {project.role && <p className="text-lg text-zinc-500 font-medium">{project.role}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="md:col-span-2 space-y-6">
                            {project.longDescription && (
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Project Overview</h3>
                                    <p className="text-zinc-600 leading-relaxed text-lg">
                                        {project.longDescription}
                                    </p>
                                </div>
                            )}

                            {project.subProjects && project.subProjects.map((sub: any, idx: number) => (
                                <div key={idx} className="mt-6">
                                    <h4 className="font-bold text-zinc-900 text-lg mb-1">{sub.title}</h4>
                                    <p className="text-zinc-600">{sub.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-8">
                            {project.technicalTags && (
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Tech Stack</h3>
                                    <div className="flex flex-col gap-2">
                                        {project.technicalTags.map((tag: string, i: number) => (
                                            <span key={i} className="text-zinc-600 border-l-2 border-zinc-200 pl-3">
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
                </div>
            </motion.div>
        </motion.div>
    );
}
