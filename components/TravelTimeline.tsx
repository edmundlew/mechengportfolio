'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CountryEntry {
    flag: string;
    cities: string[];
    country: string;
    month: string;
}

export interface CountryYearGroup {
    year: string;
    entries: CountryEntry[];
}

interface TravelTimelineProps {
    years: CountryYearGroup[];
}

export default function TravelTimeline({ years }: TravelTimelineProps) {
    // Newest year first, all collapsed by default
    const ordered = [...years].reverse();
    const [open, setOpen] = useState<Set<string>>(new Set());

    const toggle = (year: string) => {
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(year)) next.delete(year);
            else next.add(year);
            return next;
        });
    };

    return (
        <div className="mt-16 space-y-3">
            {ordered.map((yearGroup) => {
                const isOpen = open.has(yearGroup.year);
                // Unique flags across the year, in order of first appearance
                const yearFlags: string[] = [];
                yearGroup.entries.forEach((e) => {
                    if (e.flag && !yearFlags.includes(e.flag)) yearFlags.push(e.flag);
                });

                return (
                    <div
                        key={yearGroup.year}
                        className="border border-zinc-100 rounded-2xl bg-white shadow-sm overflow-hidden"
                    >
                        {/* Year header — click to toggle */}
                        <button
                            onClick={() => toggle(yearGroup.year)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-4 hover:bg-zinc-50/70 transition-colors text-left"
                        >
                            <div className="flex items-baseline gap-3 min-w-0">
                                <span className="text-xl font-bold tracking-tighter text-zinc-900">
                                    {yearGroup.year}
                                </span>
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                                    {yearFlags.length} {yearFlags.length === 1 ? 'country' : 'countries'}
                                </span>
                                <span className="text-sm truncate">{yearFlags.join(' ')}</span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className={`w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {/* Country visits */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="px-6 pb-5 divide-y divide-zinc-50">
                                        {[...yearGroup.entries].reverse().map((entry, i) => (
                                            <div
                                                key={i}
                                                className="py-3.5 first:pt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-8 gap-y-0.5"
                                            >
                                                <p className="font-semibold text-zinc-800 text-sm md:text-base min-w-0">
                                                    <span className="mr-2">{entry.flag}</span>
                                                    {entry.cities.join(', ')}
                                                    <span className="text-zinc-400 font-normal">
                                                        , {entry.country}
                                                    </span>
                                                </p>
                                                <span className="font-mono text-xs text-zinc-400 uppercase tracking-tighter whitespace-nowrap shrink-0">
                                                    {entry.month}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
