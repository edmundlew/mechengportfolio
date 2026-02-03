'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: any;
    onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    if (!project) return null;

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            className="group relative flex-shrink-0 w-full md:w-[600px] lg:w-[700px] aspect-[16/9] bg-white rounded-3xl overflow-hidden border border-zinc-200/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
        >
            {/* Image Section (70%) */}
            <div className="h-[70%] bg-zinc-100 relative overflow-hidden">
                {/* Fallback gradient if no image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-zinc-200 group-hover:scale-105 transition-transform duration-700" />

                {/* Optional: Add actual Image component here if media exists */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 font-bold text-6xl text-zinc-300 select-none">
                    {project.title.charAt(0)}
                </div>
            </div>

            {/* Text Section (30%) */}
            <div className="h-[30%] p-6 md:p-8 flex flex-col justify-center bg-white relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-zinc-900 mb-2 truncate pr-4">{project.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technicalTags?.slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className="text-sm font-medium text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                            {project.technicalTags?.length > 3 && (
                                <span className="text-sm font-medium text-zinc-400 py-1">
                                    +{project.technicalTags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Arrow hint */}
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-900">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
