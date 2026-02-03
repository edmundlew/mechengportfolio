'use client';

import { motion } from 'framer-motion';

interface ExperienceItemProps {
    role: any;
}

export default function ExperienceItem({ role }: ExperienceItemProps) {
    return (
        <div className="relative pl-8 md:pl-12 py-2 group">
            {/* Timeline Node */}
            <div className="absolute left-[-6px] top-3 w-3 h-3 bg-zinc-900 rounded-full border-2 border-white ring-4 ring-white transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(24,24,27,0.1)]" />

            <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-black transition-colors">
                        {role.organization} – {role.role}
                    </h3>
                    <span className="font-mono text-sm text-zinc-400 uppercase tracking-tighter">
                        {role.dates}
                    </span>
                </div>

                {role.longDescription && (
                    <div className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                        {/* If description contains sentences, we could bullet them effectively */}
                        <p>{role.longDescription}</p>
                    </div>
                )}

                {role.skillsAcquired && role.skillsAcquired.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {role.skillsAcquired.map((skill: string, i: number) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-md transition-colors group-hover:bg-zinc-100 group-hover:text-zinc-900"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
