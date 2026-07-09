'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trip {
    label: string;
    period: string;
    stops: string[];
    flags?: string[];
}

interface YearGroup {
    year: string;
    trips: Trip[];
}

interface TravelTimelineProps {
    years: YearGroup[];
}

export default function TravelTimeline({ years }: TravelTimelineProps) {
    // Newest year first, expanded by default
    const ordered = [...years].reverse();
    const [open, setOpen] = useState<Set<string>>(new Set(ordered.length ? [ordered[0].year] : []));

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
                yearGroup.trips.forEach((t) =>
                    (t.flags || []).forEach((f) => {
                        if (!yearFlags.includes(f)) yearFlags.push(f);
                    })
                );

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
                                    {yearGroup.trips.length} {yearGroup.trips.length === 1 ? 'trip' : 'trips'}
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

                        {/* Trips */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="px-6 pb-5 divide-y divide-zinc-50">
                                        {[...yearGroup.trips].reverse().map((trip, i) => (
                                            <div key={i} className="py-4 first:pt-1">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-8 gap-y-0.5 mb-2">
                                                    <p className="font-semibold text-zinc-800 text-sm md:text-base">
                                                        <span className="mr-2">{(trip.flags || []).join(' ')}</span>
                                                        {trip.label}
                                                    </p>
                                                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-tighter whitespace-nowrap shrink-0">
                                                        {trip.period}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {trip.stops.map((stop, j) => (
                                                        <span
                                                            key={j}
                                                            className="px-2.5 py-1 text-xs text-zinc-500 bg-zinc-50 border border-zinc-100 rounded-full"
                                                        >
                                                            {stop}
                                                        </span>
                                                    ))}
                                                </div>
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
