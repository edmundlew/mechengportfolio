'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    description: string;
    watermark: string;
    /** Tailwind text color class for the giant watermark number */
    accentWatermark?: string;
    /** Tailwind border color class for the description's left rule */
    accentBorder?: string;
}

export default function PageHeader({
    title,
    description,
    watermark,
    accentWatermark = 'text-zinc-100/60',
    accentBorder = 'border-zinc-200',
}: PageHeaderProps) {
    return (
        <header className="mb-12 md:mb-16 text-left relative">
            {/* Geometric Watermark — contained so it never causes horizontal overflow */}
            <span
                aria-hidden
                className={`font-bold ${accentWatermark} absolute -top-12 md:-top-20 left-0 md:-left-6 -z-10 select-none text-[6rem] md:text-[10rem] leading-none pointer-events-none`}
            >
                {watermark}
            </span>

            {/* Staggered Entrance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Text-to-Glass Title */}
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent mb-4 md:mb-6 pb-2">
                    {title}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
                {/* Visual Anchor Description */}
                <p className={`max-w-2xl text-zinc-500 text-base md:text-lg leading-relaxed border-l-2 ${accentBorder} pl-4 md:pl-6 mt-4`}>
                    {description}
                </p>
            </motion.div>
        </header>
    );
}
