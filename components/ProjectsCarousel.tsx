'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface ProjectsCarouselProps {
    projects: any[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(0);

    // Update width on resize
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [projects]);

    const scrollTo = (index: number) => {
        const cardWidth = window.innerWidth >= 1024 ? 740 : 640; // 700+40 or 600+40 approx
        const newX = -index * cardWidth;

        // Clamp newX to bounds
        const clampedX = Math.max(Math.min(newX, 0), -width);

        animate(x, clampedX, { type: "spring", stiffness: 300, damping: 30 });
        setActiveIndex(index);
    };

    const handleNext = () => {
        const nextIndex = Math.min(activeIndex + 1, projects.length - 1);
        scrollTo(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = Math.max(activeIndex - 1, 0);
        scrollTo(prevIndex);
    };

    return (
        <div className="relative w-full h-full flex flex-col justify-center">
            {/* Carousel Container */}
            <motion.div
                ref={containerRef}
                className="w-full overflow-hidden px-4 md:px-12 cursor-grab active:cursor-grabbing pb-20 pt-10"
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    style={{ x }}
                    className="flex gap-6 md:gap-10 w-max"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 pointer-events-none">
                <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className={`w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-lg flex items-center justify-center pointer-events-auto transition-transform text-zinc-600 hover:text-zinc-900 ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    disabled={activeIndex === projects.length - 1}
                    className={`w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-lg flex items-center justify-center pointer-events-auto transition-transform text-zinc-600 hover:text-zinc-900 ${activeIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
