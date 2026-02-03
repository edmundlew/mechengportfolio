'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface EducationItem {
    institution: string;
    degree: string;
    dates?: string;
    grades?: string;
    awards?: string[];
    keyModules?: string[];
    certPaths?: string[];
    longDescription?: string;
}

interface EducationCardProps {
    item: EducationItem;
    logo: string;
}

export default function EducationCard({ item, logo }: EducationCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);

    // Helper to get button label based on index and institution
    const getButtonLabel = (index: number, total: number) => {
        if (total === 1) return "View Certificate";
        if (item.institution.includes("KYUEM") || item.institution.includes("Kolej Yayasan UEM")) {
            return index === 0 ? "View AS Certificate" : "View A2 Certificate";
        }
        return `View Certificate ${index + 1}`;
    };

    return (
        <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}
            className={`border border-zinc-200/50 rounded-2xl p-6 bg-white cursor-pointer transition-shadow duration-300 overflow-hidden w-full ${isOpen ? 'shadow-xl ring-1 ring-zinc-900/5' : 'hover:shadow-xl shadow-sm'
                }`}
        >
            <motion.div layout="position" className="flex items-start gap-4 md:gap-6">
                {/* Logo */}
                <div className="shrink-0 relative w-16 h-16 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center p-2">
                    <Image
                        src={logo}
                        alt={`${item.institution} Logo`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                    />
                </div>

                {/* Header Info */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-900 leading-tight">
                        {item.institution}
                    </h3>
                    <p className="text-zinc-500 text-md font-medium mt-1">
                        {item.degree}
                    </p>
                    {item.dates && (
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mt-2">
                            {item.dates}
                        </p>
                    )}
                </div>

                {/* Expand Icon */}
                <div className="text-zinc-400 pt-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pt-6 mt-6 border-t border-zinc-100 pl-2 md:pl-[5.5rem]">
                            <div className="space-y-6">
                                {/* Description */}
                                {item.longDescription && (
                                    <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                                        {item.longDescription}
                                    </p>
                                )}

                                {/* Grades */}
                                {item.grades && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Performance</span>
                                        <span className="text-zinc-600">{item.grades}</span>
                                    </div>
                                )}

                                {/* Awards */}
                                {item.awards && item.awards.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Honors & Awards</span>
                                        <ul className="space-y-2">
                                            {item.awards.map((award, idx) => (
                                                <li key={idx} className="text-sm text-zinc-500 flex items-start gap-2">
                                                    <span className="block w-1 h-1 mt-2 rounded-full bg-zinc-300 shrink-0" />
                                                    {award}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Modules */}
                                {item.keyModules && item.keyModules.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Key Modules</span>
                                        <ul className="space-y-2">
                                            {item.keyModules.map((mod, idx) => (
                                                <li key={idx} className="text-sm text-zinc-500 flex items-start gap-2">
                                                    <span className="block w-1 h-1 mt-2 rounded-full bg-zinc-300 shrink-0" />
                                                    {mod}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Certificate Buttons */}
                                {item.certPaths && item.certPaths.length > 0 && (
                                    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.certPaths.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveCertIndex(activeCertIndex === index ? null : index)}
                                                    className={`border rounded-lg px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all
                                                        ${activeCertIndex === index
                                                            ? 'bg-zinc-900 text-white border-zinc-900'
                                                            : 'border-zinc-200 text-zinc-600 hover:bg-zinc-900 hover:text-white'
                                                        }`}
                                                >
                                                    {getButtonLabel(index, item.certPaths!.length)}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Certificate Image Reveal */}
                                        <AnimatePresence mode="wait">
                                            {activeCertIndex !== null && item.certPaths![activeCertIndex] && (
                                                <motion.div
                                                    key={activeCertIndex}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full relative"
                                                >
                                                    <div className="rounded-xl border border-zinc-100 shadow-sm overflow-hidden bg-zinc-50">
                                                        <Image
                                                            src={item.certPaths![activeCertIndex]}
                                                            alt={`Certificate for ${item.institution}`}
                                                            width={800}
                                                            height={600}
                                                            className="w-full h-auto object-contain max-h-[600px]"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
