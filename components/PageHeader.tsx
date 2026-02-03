'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    description: string;
    watermark: string;
}

export default function PageHeader({ title, description, watermark }: PageHeaderProps) {
    return (
        <header className="mb-16 text-left relative">
            {/* Geometric Watermark */}
            <span className="font-bold text-zinc-100/50 absolute -top-20 -left-10 -z-10 select-none text-[10rem] leading-none pointer-events-none">
                {watermark}
            </span>

            {/* Staggered Entrance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Text-to-Glass Title */}
                <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent mb-6 pb-2">
                    {title}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
                {/* Visual Anchor Description */}
                <p className="max-w-2xl text-zinc-500 text-lg leading-relaxed border-l-2 border-zinc-200 pl-6 mt-4">
                    {description}
                </p>
            </motion.div>
        </header>
    );
}
