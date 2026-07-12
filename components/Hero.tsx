'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 text-center w-full mx-auto overflow-hidden">
            {/* Ambient background glow */}
            <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-blue-100/40 via-transparent to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tl from-zinc-100/60 via-transparent to-transparent blur-3xl" />
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center gap-6"
            >
                {/* Main Headline — responsive fluid type */}
                <motion.h1
                    variants={item}
                    style={{ fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)", lineHeight: 1.02 }}
                    className="font-display font-bold tracking-tight text-zinc-900"
                >
                    Hi, I&apos;m{" "}
                    <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-400 bg-clip-text text-transparent">
                        Edmund.
                    </span>
                </motion.h1>

                {/* Sub-Headline */}
                <motion.p
                    variants={item}
                    className="text-xl md:text-3xl font-light text-zinc-500 max-w-3xl"
                >
                    Mechanical Engineering @ UC Berkeley &amp; UCL
                </motion.p>

                {/* Specialist Triad */}
                <motion.div
                    variants={item}
                    className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.65rem] md:text-sm font-medium tracking-[0.25em] text-zinc-400 uppercase"
                >
                    <span>Engineer</span>
                    <span className="text-zinc-300">•</span>
                    <span>Photographer</span>
                    <span className="text-zinc-300">•</span>
                    <span>Traveller</span>
                </motion.div>

                {/* Awards Badge */}
                <motion.div
                    variants={item}
                    className="inline-flex flex-wrap items-center justify-center text-center gap-2 px-4 py-1.5 max-w-full rounded-full border border-zinc-200/70 bg-white/60 backdrop-blur-sm text-[0.65rem] md:text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase shadow-sm"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    4.00 GPA · Frederic Barnes Waldron Best Student Award
                </motion.div>

                {/* CTAs */}
                <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mt-4">
                    <Link
                        href="/projects"
                        className="px-7 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium tracking-wide shadow-lg shadow-zinc-900/10 hover:bg-zinc-700 hover:shadow-zinc-900/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        View Projects
                    </Link>
                    <a
                        href="/edmund_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 rounded-full border border-zinc-300 text-zinc-700 text-sm font-medium tracking-wide bg-white/60 backdrop-blur-sm hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Download Résumé
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                aria-hidden
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-5 h-9 rounded-full border border-zinc-300 flex items-start justify-center p-1.5"
                >
                    <div className="w-1 h-2 rounded-full bg-zinc-400" />
                </motion.div>
            </motion.div>
        </section>
    );
}
