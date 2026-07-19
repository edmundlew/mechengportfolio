'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceItemProps {
    role: any;
    index: number;
    logo?: string;
}

export default function ExperienceItem({ role, index, logo }: ExperienceItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative pl-8 md:pl-12 py-2 group"
        >
            {/* Timeline Node — sits on the left rule */}
            <div className="absolute left-0 top-8 w-3 h-3 bg-zinc-900 rounded-full border-2 border-white ring-4 ring-white transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(24,24,27,0.1)]" />

            <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                <div className="flex items-start gap-4 md:gap-6">
                    {/* Logo */}
                    {logo && (
                        <div className="shrink-0 relative w-16 h-16 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center p-2">
                            <Image
                                src={logo}
                                alt={`${role.organization} logo`}
                                width={48}
                                height={48}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-1 flex-1 min-w-0">
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

                        {/* Mini milestone timeline */}
                        {role.milestones && role.milestones.length > 0 && (
                            <div className="mt-4 space-y-2.5 border-l-2 border-zinc-100 pl-4 max-w-2xl">
                                {role.milestones.map((m: any) => (
                                    <div key={m.year} className="text-sm leading-relaxed">
                                        <span className="font-mono text-xs font-semibold text-zinc-400 mr-2">
                                            {m.year}
                                        </span>
                                        <span className="text-zinc-600">{m.text}</span>
                                    </div>
                                ))}
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
                </div>
            </div>
        </motion.div>
    );
}
