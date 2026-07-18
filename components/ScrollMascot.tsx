'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

/**
 * A small scroll companion, different on every page:
 *   /            rocket climbs (thrust)
 *   /education   graduation cap floats up
 *   /projects    gear spins with scroll
 *   /experience  F1 car drives along the bottom
 *   /interests   paper plane glides up
 * Purely decorative — pointer-events off, slightly smaller on phones.
 */
export default function ScrollMascot() {
    const pathname = usePathname();

    if (pathname === '/') return <Rocket />;
    if (pathname.startsWith('/education')) return <GradCap />;
    if (pathname.startsWith('/projects')) return <Gear />;
    if (pathname.startsWith('/experience')) return <F1Car />;
    if (pathname.startsWith('/interests')) return <PaperPlane />;
    return null;
}

function useSmoothScroll(): MotionValue<number> {
    const { scrollYProgress } = useScroll();
    return useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
}

/* ---------- Home: rocket ---------- */
function Rocket() {
    const smooth = useSmoothScroll();
    const y = useTransform(smooth, [0, 1], ['0vh', '-72vh']);

    return (
        <div aria-hidden className="fixed right-2 md:right-5 bottom-[8vh] z-40 pointer-events-none scale-[0.8] sm:scale-100 origin-bottom-right">
            <motion.div style={{ y }}>
                <svg width="20" height="46" viewBox="0 0 20 46" fill="none">
                    <path
                        d="M10 1 C14 6 15 12 15 18 L15 26 C15 27.1 14.1 28 13 28 L7 28 C5.9 28 5 27.1 5 26 L5 18 C5 12 6 6 10 1 Z"
                        fill="#18181b"
                    />
                    <circle cx="10" cy="15" r="2.4" fill="#ffffff" stroke="#a1a1aa" strokeWidth="0.8" />
                    <path d="M5 21 L1 30 L5 27.5 Z" fill="#18181b" />
                    <path d="M15 21 L19 30 L15 27.5 Z" fill="#18181b" />
                    <motion.g
                        style={{ originX: '10px', originY: '29px' }}
                        animate={{ scaleY: [1, 0.72, 1.12, 0.85, 1], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
                        transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path d="M10 29.5 C12.4 33 13 36.5 10 43 C7 36.5 7.6 33 10 29.5 Z" fill="#f97316" opacity="0.9" />
                        <path d="M10 30.5 C11.5 33 11.8 35.5 10 39.5 C8.2 35.5 8.5 33 10 30.5 Z" fill="#fbbf24" />
                    </motion.g>
                </svg>
            </motion.div>
        </div>
    );
}

/* ---------- Education: graduation cap ---------- */
function GradCap() {
    const smooth = useSmoothScroll();
    const y = useTransform(smooth, [0, 1], ['0vh', '-72vh']);

    return (
        <div aria-hidden className="fixed right-2 md:right-5 bottom-[8vh] z-40 pointer-events-none scale-[0.8] sm:scale-100 origin-bottom-right">
            <motion.div
                style={{ y }}
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg width="32" height="34" viewBox="0 0 32 34" fill="none">
                    {/* Mortarboard */}
                    <path d="M16 2 L30 9 L16 16 L2 9 Z" fill="#18181b" />
                    {/* Base */}
                    <path d="M9 12.5 L9 19 C9 21 12 23 16 23 C20 23 23 21 23 19 L23 12.5 L16 16 Z" fill="#3f3f46" />
                    {/* Button */}
                    <circle cx="16" cy="9" r="1.1" fill="#fbbf24" />
                    {/* Tassel — swings */}
                    <motion.g
                        style={{ originX: '16px', originY: '9px' }}
                        animate={{ rotate: [10, -10, 10] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path d="M16 9 L16 26" stroke="#fbbf24" strokeWidth="1.1" strokeLinecap="round" />
                        <circle cx="16" cy="28" r="2" fill="#fbbf24" />
                    </motion.g>
                </svg>
            </motion.div>
        </div>
    );
}

/* ---------- Projects: gear ---------- */
function Gear() {
    const smooth = useSmoothScroll();
    const rotate = useTransform(smooth, [0, 1], [0, 540]);

    return (
        <div aria-hidden className="fixed right-2 md:right-5 bottom-[10vh] z-40 pointer-events-none scale-[0.8] sm:scale-100 origin-bottom-right">
            <motion.svg width="34" height="34" viewBox="-18 -18 36 36" style={{ rotate }}>
                {/* Teeth */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <rect
                        key={i}
                        x="-2.6"
                        y="-17"
                        width="5.2"
                        height="7"
                        rx="1.2"
                        fill="#3f3f46"
                        transform={`rotate(${i * 45})`}
                    />
                ))}
                {/* Body */}
                <circle r="12.5" fill="#3f3f46" />
                {/* Hub */}
                <circle r="5" fill="#FBFBFD" />
                <circle r="5" fill="none" stroke="#a1a1aa" strokeWidth="1" />
            </motion.svg>
        </div>
    );
}

/* ---------- Experience: F1 car ---------- */
function F1Car() {
    const smooth = useSmoothScroll();
    const x = useTransform(smooth, [0, 1], ['2vw', '88vw']);

    const wheelSpin = {
        animate: { rotate: 360 },
        transition: { duration: 0.5, repeat: Infinity, ease: 'linear' as const },
    };

    return (
        <div aria-hidden className="fixed left-0 bottom-1 z-40 pointer-events-none w-full scale-[0.8] sm:scale-100 origin-bottom-left">
            <motion.div style={{ x }} className="w-fit">
                <svg width="46" height="18" viewBox="0 0 46 18" fill="none">
                    {/* Rear wing */}
                    <path d="M1 2 L4 2 L4 9 L1 9 Z" fill="#18181b" />
                    {/* Body */}
                    <path d="M3 12 L4 8 L13 7 L17 4.5 L24 4.5 L27 7 L38 8.5 L44 10.5 L44 12.5 L3 12.5 Z" fill="#dc2626" />
                    {/* Cockpit / halo */}
                    <path d="M17.5 4.5 C18 2.8 23 2.8 23.5 4.5" stroke="#18181b" strokeWidth="1.2" fill="none" />
                    {/* Front wing */}
                    <path d="M39 12 L46 12 L46 13.5 L39 13.5 Z" fill="#18181b" />
                    {/* Wheels with spinning spokes */}
                    <motion.g {...wheelSpin} style={{ originX: '9px', originY: '13px' }}>
                        <circle cx="9" cy="13" r="4" fill="#18181b" />
                        <path d="M9 10.2 L9 15.8 M6.2 13 L11.8 13" stroke="#71717a" strokeWidth="0.9" />
                    </motion.g>
                    <motion.g {...wheelSpin} style={{ originX: '33px', originY: '13px' }}>
                        <circle cx="33" cy="13" r="4" fill="#18181b" />
                        <path d="M33 10.2 L33 15.8 M30.2 13 L35.8 13" stroke="#71717a" strokeWidth="0.9" />
                    </motion.g>
                </svg>
            </motion.div>
        </div>
    );
}

/* ---------- Interests: paper plane ---------- */
function PaperPlane() {
    const smooth = useSmoothScroll();
    const y = useTransform(smooth, [0, 1], ['0vh', '-72vh']);
    const x = useTransform(smooth, [0, 0.5, 1], ['0px', '-10px', '0px']);

    return (
        <div aria-hidden className="fixed right-3 md:right-6 bottom-[8vh] z-40 pointer-events-none scale-[0.8] sm:scale-100 origin-bottom-right">
            <motion.div style={{ y, x, rotate: -8 }}>
                <svg width="34" height="52" viewBox="0 0 34 52" fill="none">
                    {/* Plane */}
                    <path d="M30 2 L2 13 L13 16.5 Z" fill="#ffffff" stroke="#52525b" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M30 2 L13 16.5 L15.5 25 Z" fill="#e4e4e7" stroke="#52525b" strokeWidth="1" strokeLinejoin="round" />
                    {/* Dashed trail — echoes the travel map arcs */}
                    <g className="flight-arc">
                        <path
                            d="M14 30 C10 36 8 42 9 50"
                            stroke="#0071e3"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.5"
                        />
                    </g>
                </svg>
            </motion.div>
        </div>
    );
}
