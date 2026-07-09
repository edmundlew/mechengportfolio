'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
    src: string;
    caption: string;
}

interface PhotoGalleryProps {
    photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const close = useCallback(() => setSelected(null), []);
    const prev = useCallback(
        () => setSelected((s) => (s === null ? null : (s + photos.length - 1) % photos.length)),
        [photos.length]
    );
    const next = useCallback(
        () => setSelected((s) => (s === null ? null : (s + 1) % photos.length)),
        [photos.length]
    );

    useEffect(() => {
        if (selected === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        document.addEventListener('keydown', handleKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [selected, close, prev, next]);

    if (photos.length === 0) {
        return (
            <div className="border-2 border-dashed border-zinc-200 rounded-3xl p-12 text-center text-zinc-400 text-sm">
                Photo gallery coming soon.
            </div>
        );
    }

    return (
        <>
            {/* Masonry grid via CSS columns */}
            <div className="columns-2 md:columns-3 gap-4">
                {photos.map((photo, i) => (
                    <motion.button
                        key={photo.src}
                        onClick={() => setSelected(i)}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="block w-full mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                            className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
                        />
                    </motion.button>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 z-[10000] bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                            key={selected}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            src={photos[selected].src}
                            alt={photos[selected].caption}
                            onClick={(e) => e.stopPropagation()}
                            className="max-h-full max-w-full rounded-xl shadow-2xl object-contain"
                        />

                        {photos[selected].caption && (
                            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-zinc-300 bg-zinc-900/70 px-4 py-1.5 rounded-full">
                                {photos[selected].caption}
                            </p>
                        )}

                        <button
                            onClick={close}
                            aria-label="Close"
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prev(); }}
                                    aria-label="Previous photo"
                                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); next(); }}
                                    aria-label="Next photo"
                                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
