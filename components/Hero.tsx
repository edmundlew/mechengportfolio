'use client';
import { motion } from "framer-motion";


export default function Hero() {
    return (
        // Removed ALL max-w constraints on container to ensure text can grow
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center w-full mx-auto gap-8 overflow-hidden">

            {/* Main Headline - Massive Viewport-Based Sizing via Inline Style */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                // Explicit inline style to override any Tailwind limitations
                style={{ fontSize: "7.5vw", lineHeight: 0.9 }}
                className="font-bold text-zinc-900 tracking-tighter mb-6"
            >
                Hi, I&apos;m Edmund.
            </motion.h1>

            {/* Sub-Headline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-2xl md:text-3xl font-light text-zinc-500 max-w-3xl"
            >
                Mechanical Engineering @ UC Berkeley & UCL
            </motion.p>

            {/* Specialist Triad */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-xs md:text-sm font-medium tracking-[0.25em] text-zinc-400 uppercase mt-4"
            >
                Structural Mechanics • Computational Modeling • Energy Systems
            </motion.div>

            {/* Awards Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="text-xs md:text-sm font-medium tracking-[0.25em] text-zinc-400 uppercase"
            >
                4.00 GPA • Frederic Barnes Waldron Best Student Award
            </motion.div>



        </section>
    );
}
