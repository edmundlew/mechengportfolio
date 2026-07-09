'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface ProjectsCarouselProps {
    projects: any[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(0);

    // Measure the real step size (card width + gap) from the DOM
    const getStep = useCallback(() => {
        const track = trackRef.current;
        if (track && track.children.length > 1) {
            const first = track.children[0] as HTMLElement;
            const second = track.children[1] as HTMLElement;
            return second.offsetLeft - first.offsetLeft;
        }
        return 640;
    }, []);

    // Update drag bounds on resize
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
        const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));
        const newX = Math.max(Math.min(-clampedIndex * getStep(), 0), -width);
        animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
        setActiveIndex(clampedIndex);
    };

    // Keep the dot indicator in sync when the user drags freely
    const handleDragEnd = () => {
        const step = getStep();
        const index = Math.max(0, Math.min(Math.round(-x.get() / step), projects.length - 1));
        setActiveIndex(index);
    };

    const handleNext = () => scrollTo(activeIndex + 1);
    const handlePrev = () => scrollTo(activeIndex - 1);

    return (
        <div className="relative w-full h-full flex flex-col justify-center">
            {/* Carousel Container */}
            <motion.div
                ref={containerRef}
                className="w-full overflow-hidden px-4 md:px-12 cursor-grab active:cursor-grabbing pb-10 pt-10"
            >
                <motion.div
                    ref={trackRef}
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    onDragEnd={handleDragEnd}
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

            {/* Dot Indicators */}
            <div className="flex justify-center items-center gap-2 pb-6">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to project ${index + 1}`}
                        className={`rounded-full transition-all duration-300 ${index === activeIndex
                            ? 'w-6 h-1.5 bg-zinc-900'
                            : 'w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400'
                            }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 pointer-events-none">
                <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    aria-label="Previous project"
                    className={`w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-lg flex items-center justify-center pointer-events-auto transition-transform text-zinc-600 hover:text-zinc-900 ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    disabled={activeIndex === projects.length - 1}
                    aria-label="Next project"
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
