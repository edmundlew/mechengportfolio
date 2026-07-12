'use client';

import { motion } from 'framer-motion';

interface ExperienceItemProps {
    role: any;
    index: number;
}

export default function ExperienceItem({ role, index }: ExperienceItemProps) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`relative pl-8 py-2 group md:pl-0 md:w-[calc(50%-3rem)] ${
                isLeft ? 'md:mr-auto' : 'md:ml-auto'
            }`}
        >
            {/* Timeline Node — sits on the left rule on mobile, on the centre rule on desktop */}
            <div
                className={`absolute left-0 top-3 w-3 h-3 bg-zinc-900 rounded-full border-2 border-white ring-4 ring-white transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(24,24,27,0.1)] ${
                    isLeft
                        ? 'md:left-auto md:right-[calc(-3rem-6px)]'
                        : 'md:left-[calc(-3rem-6px)]'
                }`}
            />

            <div className="flex flex-col gap-1 bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-1.5 gap-x-8 mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-black transition-colors">
                        {role.organization} – {role.role}
                    </h3>
                    <span className="font-mono text-sm text-zinc-400 uppercase tracking-tighter whitespace-nowrap shrink-0 sm:pt-0.5">
                        {role.dates}
                    </span>
                </div>

                {role.longDescription && (
                    <div className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                        <p>{role.longDescription}</p>
                    </div>
                )}

                {role.skillsAcquired && role.skillsAcquired.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {role.skillsAcquired.map((skill: string, i: number) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-md transition-colors group-hover:bg-emerald-50/60 group-hover:text-zinc-900"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
