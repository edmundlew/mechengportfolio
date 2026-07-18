'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Education', path: '/education' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Interests', path: '/interests' },
];

export default function Navbar() {
  const pathname = usePathname();
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [pill, setPill] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const el = linkRefs.current.get(pathname);
      if (el) {
        setPill({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
        });
      } else {
        setPill(null);
      }
    };
    update();
    // Re-measure if the window resizes (responsive padding changes link sizes)
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pathname]);

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[9999] w-max max-w-[calc(100vw-1.5rem)]">
      <div className="relative flex items-center gap-1 sm:gap-4 px-2.5 sm:px-6 py-2.5 bg-white/80 backdrop-blur-xl border border-zinc-200/50 shadow-2xl shadow-zinc-900/5 rounded-full overflow-x-auto no-scrollbar">
        {/* Logo — hidden on very small screens to keep the pill compact */}
        <Link
          href="/"
          className="hidden sm:block font-bold tracking-tighter text-zinc-900 pr-4 border-r border-zinc-200"
        >
          Edmund
        </Link>

        {/* Single persistent pill that slides between tabs */}
        {pill && (
          <motion.div
            initial={false}
            animate={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="absolute bg-zinc-900 rounded-full"
          />
        )}

        {/* Links Flat List */}
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              ref={(el) => {
                if (el) linkRefs.current.set(item.path, el);
                else linkRefs.current.delete(item.path);
              }}
              className={`relative px-2 sm:px-4 py-2 sm:py-1.5 z-10 text-[0.72rem] sm:text-sm whitespace-nowrap transition-colors duration-300 ${
                isActive ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
